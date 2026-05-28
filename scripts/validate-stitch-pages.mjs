import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const summaryFile = process.env.SUMMARY_FILE || "stitch-mvp-restro-style-v1-summary.json";
const reportName =
  process.env.REPORT_NAME ||
  path.basename(summaryFile, "-summary.json").replace(/\.json$/, "");
const summaryPath = path.join(root, summaryFile);
const outDir = path.join(root, "qa-reports", reportName);

const viewports = [
  { name: "desktop-1440", width: 1440, height: 1000, isMobile: false },
  { name: "mobile-375", width: 375, height: 812, isMobile: true },
];

const placeholderPattern =
  /\b(lorem ipsum|placeholder|tbd|fixme|undefined|null|nan|\[.*?\]|your\s+(company|name|email))\b/i;
const bannedCopyPattern =
  /\b(climatizaci[oó]n|A\/C|temperatura|confort|ROI garantizado|trading|48 monitorizados|7 alertas|-12%|3,8 kW)\b/i;
const platformConceptPattern =
  /\b(consumo|tarifa|potencia|reserva|reservas|propietario|informe|operaciones|contrato|bater[ií]a|solar|arbitraje|cartera)\b/i;

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function validatePage(page, htmlPath) {
  const url = pathToFileURL(htmlPath).href;
  const consoleMessages = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(500);

  return page.evaluate(({ placeholderSource, bannedCopySource, platformConceptSource }) => {
    const bodyText = document.body?.innerText || "";
    const bodyRect = document.body?.getBoundingClientRect();
    const h1 = document.querySelector("h1")?.innerText?.trim() || "";
    const metaDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
    const elements = Array.from(document.body?.querySelectorAll("*") || []);
    const visibleElements = elements.filter((el) => {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      return (
        rect.width > 0 &&
        rect.height > 0 &&
        style.visibility !== "hidden" &&
        style.display !== "none" &&
        style.opacity !== "0"
      );
    });

    const overflowing = elements
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      })
      .slice(0, 10)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80),
        left: Math.round(el.getBoundingClientRect().left),
        right: Math.round(el.getBoundingClientRect().right),
      }));

    const fixedOverlaps = [];
    const fixed = elements.filter((el) => {
      const style = getComputedStyle(el);
      return style.position === "fixed" || style.position === "sticky";
    });
    for (let i = 0; i < fixed.length; i += 1) {
      for (let j = i + 1; j < fixed.length; j += 1) {
        const a = fixed[i].getBoundingClientRect();
        const b = fixed[j].getBoundingClientRect();
        const overlaps =
          a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
        if (overlaps) {
          fixedOverlaps.push({
            a: fixed[i].tagName.toLowerCase(),
            b: fixed[j].tagName.toLowerCase(),
          });
        }
      }
    }

    return {
      title: document.title,
      textLength: bodyText.trim().length,
      visibleElementCount: visibleElements.length,
      documentHeight: Math.round(document.documentElement.scrollHeight),
      bodyWidth: Math.round(bodyRect?.width || 0),
      viewportWidth: window.innerWidth,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > window.innerWidth + 1 ||
        document.body.scrollWidth > window.innerWidth + 1,
      overflowing,
      fixedOverlaps,
      placeholderHits: bodyText.match(new RegExp(placeholderSource, "gi"))?.slice(0, 10) || [],
      bannedCopyHits: bodyText.match(new RegExp(bannedCopySource, "gi"))?.slice(0, 10) || [],
      platformConceptHits:
        bodyText.match(new RegExp(platformConceptSource, "gi"))?.slice(0, 20) || [],
      h1,
      h1Length: h1.length,
      hasSingleH1: document.querySelectorAll("h1").length === 1,
      metaDescription,
      metaDescriptionLength: metaDescription.length,
    };
  }, {
    placeholderSource: placeholderPattern.source,
    bannedCopySource: bannedCopyPattern.source,
    platformConceptSource: platformConceptPattern.source,
  }).then((metrics) => ({
    ...metrics,
    consoleMessages,
    pageErrors,
  }));
}

const summary = JSON.parse(await fs.readFile(summaryPath, "utf8"));
await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const report = {
  suite: summary.projectTitle,
  source: path.basename(summaryPath),
  generatedAt: new Date().toISOString(),
  pages: [],
};

for (const [key, screen] of Object.entries(summary.screens)) {
  const htmlFile = screen.localFiles?.html;
  const htmlPath = path.join(root, htmlFile || "");
  const pageReport = {
    key,
    title: screen.title,
    htmlFile,
    status: "pass",
    checks: [],
    issues: [],
    viewports: {},
  };

  if (!htmlFile || !(await exists(htmlPath))) {
    pageReport.status = "fail";
    pageReport.issues.push(`Missing HTML file: ${htmlFile || "(none)"}`);
    report.pages.push(pageReport);
    continue;
  }

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
    });
    const page = await context.newPage();
    const metrics = await validatePage(page, htmlPath);
    const screenshot = `${key}-${viewport.name}.png`;
    await page.screenshot({ path: path.join(outDir, screenshot), fullPage: true });
    await context.close();

    pageReport.viewports[viewport.name] = { ...metrics, screenshot };

    if (metrics.textLength < 300) {
      pageReport.issues.push(`${viewport.name}: page text looks too short (${metrics.textLength})`);
    }
    if (metrics.visibleElementCount < 20) {
      pageReport.issues.push(
        `${viewport.name}: too few visible elements (${metrics.visibleElementCount})`,
      );
    }
    if (metrics.hasHorizontalOverflow) {
      pageReport.issues.push(
        `${viewport.name}: horizontal overflow; first offenders: ${JSON.stringify(
          metrics.overflowing,
        )}`,
      );
    }
    if (metrics.pageErrors.length) {
      pageReport.issues.push(`${viewport.name}: page errors: ${metrics.pageErrors.join(" | ")}`);
    }
    if (metrics.consoleMessages.some((message) => message.startsWith("error:"))) {
      pageReport.issues.push(
        `${viewport.name}: console errors: ${metrics.consoleMessages.join(" | ")}`,
      );
    }
    if (metrics.placeholderHits.length) {
      pageReport.issues.push(
        `${viewport.name}: placeholder-like text: ${metrics.placeholderHits.join(", ")}`,
      );
    }
    if (metrics.bannedCopyHits.length) {
      pageReport.issues.push(
        `${viewport.name}: narrow/forbidden copy remains: ${metrics.bannedCopyHits.join(", ")}`,
      );
    }
    if (viewport.name === "desktop-1440") {
      if (!metrics.hasSingleH1) {
        pageReport.issues.push(`${viewport.name}: expected exactly one H1`);
      }
      if (!metrics.h1 || metrics.h1Length > 95) {
        pageReport.issues.push(`${viewport.name}: H1 should be direct and under 95 chars`);
      }
      if (metrics.platformConceptHits.length < 8) {
        pageReport.issues.push(
          `${viewport.name}: copy does not sufficiently cover the full EnergyOS platform scope`,
        );
      }
      pageReport.checks.push(
        `SEO/aesthetic: title="${metrics.title}", h1="${metrics.h1}", metaDescriptionLength=${metrics.metaDescriptionLength}`,
      );
    }
  }

  pageReport.status = pageReport.issues.length ? "fail" : "pass";
  report.pages.push(pageReport);
}

await browser.close();

report.summary = {
  total: report.pages.length,
  passed: report.pages.filter((page) => page.status === "pass").length,
  failed: report.pages.filter((page) => page.status === "fail").length,
};

await fs.writeFile(path.join(outDir, "report.json"), `${JSON.stringify(report, null, 2)}\n`);

const lines = [
  `# Stitch QA Report - ${summary.projectTitle}`,
  "",
  `Generated: ${report.generatedAt}`,
  `Source: ${report.source}`,
  `Result: ${report.summary.passed}/${report.summary.total} passed`,
  "",
  "| Page | Status | Issues |",
  "|---|---:|---|",
  ...report.pages.map((page) => {
    const issues = page.issues.length ? page.issues.join("<br>") : "None";
    return `| ${page.key} | ${page.status.toUpperCase()} | ${issues} |`;
  }),
  "",
  "Screenshots are in this directory next to the report.",
  "",
];
await fs.writeFile(path.join(outDir, "report.md"), lines.join("\n"));

console.log(`Validated ${report.summary.total} pages: ${report.summary.passed} passed, ${report.summary.failed} failed`);
console.log(path.join(outDir, "report.md"));
if (report.summary.failed) {
  process.exitCode = 1;
}
