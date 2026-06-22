import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.VISUAL_QA_BASE_URL ?? 'http://localhost:3001';
const outDir = path.resolve('memory/visual-qa-latest');
const chromePath = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';

const routes = [
  ['home', '/'],
  ['precios', '/precios'],
  ['dashboard', '/app/dashboard'],
  ['operations', '/app/operations'],
  ['informe', '/app/informe'],
  ['advisor', '/app/advisor'],
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

function isAllowedOverflow(item) {
  return item.className.includes('marquee-track') ||
    item.className.includes('marquee-wrapper') ||
    item.className.includes('overflow-x-auto') ||
    item.className.includes('truncate') ||
    item.tag === 'TABLE';
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath: fs.existsSync(chromePath) ? chromePath : undefined,
  headless: true,
});

const results = [];

for (const [slug, route] of routes) {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const url = `${baseUrl}${route}`;
    let status = null;
    let error = null;
    try {
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      status = response?.status() ?? null;
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(outDir, `${slug}-${viewportName}.png`), fullPage: false });

      const pageOverflow = await page.evaluate(() => ({
        viewportWidth: window.innerWidth,
        documentWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));

      const overflows = await page.evaluate(() => {
        return [...document.querySelectorAll('body *')]
          .filter((el) => el.scrollWidth > el.clientWidth + 8)
          .map((el) => ({
            tag: el.tagName,
            text: (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100),
            clientWidth: el.clientWidth,
            scrollWidth: el.scrollWidth,
            className: typeof el.className === 'string' ? el.className : '',
          }));
      });

      const actionableOverflows = overflows.filter((item) => !isAllowedOverflow(item));
      const hasPageOverflow = pageOverflow.documentWidth > pageOverflow.viewportWidth + 8;
      results.push({ slug, route, viewport: viewportName, status, consoleErrors, pageOverflow: hasPageOverflow ? pageOverflow : null, overflows: actionableOverflows });
    } catch (err) {
      error = String(err);
      results.push({ slug, route, viewport: viewportName, status, error, consoleErrors, overflows: [] });
    } finally {
      await page.close();
    }
  }
}

await browser.close();

const failures = results.filter((result) =>
  result.error ||
  (result.status && result.status >= 400) ||
  result.pageOverflow ||
  result.consoleErrors.some((msg) => !msg.includes('404')),
);

fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify({ baseUrl, results, failures }, null, 2));

if (failures.length > 0) {
  console.error(`Visual QA failed: ${failures.length} viewport states need attention.`);
  for (const failure of failures) {
    console.error(`${failure.slug} ${failure.viewport} ${failure.route}`);
    if (failure.error) console.error(`  error: ${failure.error}`);
    if (failure.status && failure.status >= 400) console.error(`  status: ${failure.status}`);
    if (failure.pageOverflow) console.error(`  page overflow: ${JSON.stringify(failure.pageOverflow)}`);
    for (const overflow of failure.overflows.slice(0, 5)) {
      console.error(`  overflow: ${overflow.tag} ${overflow.clientWidth}->${overflow.scrollWidth} "${overflow.text}"`);
    }
    for (const msg of failure.consoleErrors.filter((m) => !m.includes('404')).slice(0, 3)) {
      console.error(`  console: ${msg}`);
    }
  }
  process.exit(1);
}

console.log(`Visual QA passed. Screenshots and report written to ${outDir}`);
