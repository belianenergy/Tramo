import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PROMPT_FILE = "STITCH_PROMPT_ENERGYOS_STR_CLEAN_V1.md";
const PREFIX = "stitch-energyos-str-clean-v1";
const PROJECT_TITLE = "EnergyOS STR Clean V1";
const MODEL_ID = "GEMINI_3_1_PRO";
const PROJECT_ID_FILE = `${PREFIX}.project-id`;
const SUMMARY_FILE = `${PREFIX}-summary.json`;
const ONLY_PAGES = (process.env.ONLY_PAGES || "")
  .split(",")
  .map((page) => page.trim())
  .filter(Boolean);

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const normalized = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = normalized.indexOf("=");
    if (eq === -1) continue;
    const key = normalized.slice(0, eq).trim();
    let value = normalized.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

if (!process.env.STITCH_API_KEY) {
  throw new Error("Missing STITCH_API_KEY. Add it to energyos/.env or export it before running.");
}

const sourcePrompt = fs.readFileSync(PROMPT_FILE, "utf8");

const screens = [
  { key: "landing", title: "Landing", focus: "Create only page 1: public landing." },
  { key: "dashboard", title: "Dashboard", focus: "Create only page 2: app dashboard." },
  { key: "apartments", title: "Apartments", focus: "Create only page 3: apartments portfolio." },
  { key: "operations", title: "Operations", focus: "Create only page 4: operations queue." },
  { key: "apartment-detail", title: "Apartment Detail", focus: "Create only page 5: apartment detail." },
  { key: "tariff-power", title: "Tariff Power", focus: "Create only page 6: tariff and power optimization." },
  { key: "leads", title: "Leads", focus: "Create only page 7: pilot leads." },
  { key: "pilot-settings", title: "Pilot Settings", focus: "Create only page 8: pilot settings." },
  { key: "owner-report", title: "Owner Report", focus: "Create only page 9: owner report." },
];

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name: toolName, arguments: args },
    });
    const req = https.request(
      {
        hostname: "stitch.googleapis.com",
        port: 443,
        path: "/mcp",
        method: "POST",
        timeout: 240000,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "X-Goog-Api-Key": process.env.STITCH_API_KEY,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse Stitch response: ${data.slice(0, 1000)}`));
          }
        });
      },
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Stitch request timed out"));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function tool(name, args) {
  const response = await callStitch(name, args);
  if (response?.error || response?.result?.isError) {
    const text =
      response?.error?.message ||
      response?.result?.content?.map((item) => item.text).join("\n") ||
      "Unknown Stitch error";
    throw new Error(`${name} failed: ${text}`);
  }
  return response;
}

function parseEmbeddedPayload(response) {
  for (const item of response?.result?.content || []) {
    const text = item?.text?.trim();
    if (!text?.startsWith("{")) continue;
    try {
      return JSON.parse(text);
    } catch {}
  }
  return null;
}

function extractProjectName(response) {
  const embedded = parseEmbeddedPayload(response);
  return (
    response?.result?.structuredContent?.name ||
    response?.result?.name ||
    embedded?.name ||
    embedded?.project?.name ||
    embedded?.projectId ||
    null
  );
}

function collectScreens(response) {
  const roots = [response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean);
  const found = [];
  for (const root of roots) {
    if (root.screen) found.push(root.screen);
    if (Array.isArray(root.screens)) found.push(...root.screens);
    for (const comp of root.outputComponents || []) {
      const screens = comp?.design?.screens || [];
      if (Array.isArray(screens)) found.push(...screens);
      else if (typeof screens === "object") found.push(...Object.values(screens));
    }
  }
  return found.filter(Boolean);
}

function extractBestScreen(response) {
  const all = collectScreens(response);
  return all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) || all.at(-1) || null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

function screenPrompt(screen) {
  return `${sourcePrompt}

---

Task for this Stitch call:

${screen.focus}

Return one complete responsive desktop web screen. Keep visual language consistent with the other screens. Do not include pages other than the requested page.`;
}

let projectId = fs.existsSync(PROJECT_ID_FILE)
  ? fs.readFileSync(PROJECT_ID_FILE, "utf8").trim()
  : "";
if (!projectId || process.env.FORCE_NEW_PROJECT === "1") {
  const projectResponse = await tool("create_project", { title: PROJECT_TITLE });
  fs.writeFileSync(`${PREFIX}-project-response.json`, `${JSON.stringify(projectResponse, null, 2)}\n`);
  const projectName = extractProjectName(projectResponse);
  if (!projectName) throw new Error("Could not extract project name from Stitch response.");
  projectId = String(projectName).replace(/^projects\//, "");
  fs.writeFileSync(PROJECT_ID_FILE, `${projectId}\n`);
}

const summary = fs.existsSync(SUMMARY_FILE)
  ? JSON.parse(fs.readFileSync(SUMMARY_FILE, "utf8"))
  : {
  projectTitle: PROJECT_TITLE,
  projectId,
  projectName: `projects/${projectId}`,
  projectUrl: `https://stitch.withgoogle.com/projects/${projectId}`,
  promptFile: PROMPT_FILE,
  generatedAt: new Date().toISOString(),
  screens: {},
  errors: [],
};

summary.projectId = projectId;
summary.projectName = `projects/${projectId}`;
summary.projectUrl = `https://stitch.withgoogle.com/projects/${projectId}`;

for (const screen of screens) {
  const base = `${PREFIX}-${screen.key}`;
  const metaPath = `${base}-meta.json`;
  const htmlPath = `${base}.html`;
  if (fs.existsSync(metaPath) && fs.existsSync(htmlPath)) {
    summary.screens[screen.key] = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  }
}

console.log(`Project: ${summary.projectUrl}`);

for (const screen of screens) {
  if (ONLY_PAGES.length && !ONLY_PAGES.includes(screen.key)) continue;
  const base = `${PREFIX}-${screen.key}`;
  if (!ONLY_PAGES.length && summary.screens[screen.key]?.localFiles?.html && fs.existsSync(summary.screens[screen.key].localFiles.html)) {
    console.log(`Skipping existing ${screen.key}`);
    continue;
  }
  console.log(`Generating ${screen.key}`);
  try {
    const response = await tool("generate_screen_from_text", {
      projectId,
      prompt: screenPrompt(screen),
      deviceType: "DESKTOP",
      modelId: MODEL_ID,
    });
    fs.writeFileSync(`${base}-response.json`, `${JSON.stringify(response, null, 2)}\n`);
    const nextScreen = extractBestScreen(response);
    if (!nextScreen) throw new Error("No screen found in Stitch response.");

    const screenName =
      nextScreen.name || (nextScreen.id ? `projects/${projectId}/screens/${nextScreen.id}` : null);
    const screenId = nextScreen.id || screenName?.split("/").pop() || null;
    const htmlUrl = nextScreen.htmlCode?.downloadUrl || nextScreen.downloadUrl || null;
    const screenshotUrl = nextScreen.screenshot?.downloadUrl || null;

    const localFiles = {
      response: `${base}-response.json`,
      meta: `${base}-meta.json`,
      html: htmlUrl ? `${base}.html` : null,
      stitchPng: screenshotUrl ? `${base}-stitch.png` : null,
    };
    if (htmlUrl) download(htmlUrl, localFiles.html);
    if (screenshotUrl) download(screenshotUrl, localFiles.stitchPng);

    const meta = {
      key: screen.key,
      title: nextScreen.title || screen.title,
      projectId,
      projectName: `projects/${projectId}`,
      projectUrl: summary.projectUrl,
      screenId,
      screenName,
      width: nextScreen.width || null,
      height: nextScreen.height || null,
      htmlCodeName: nextScreen.htmlCode?.name || null,
      screenshotName: nextScreen.screenshot?.name || null,
      htmlDownloadUrl: htmlUrl,
      screenshotDownloadUrl: screenshotUrl,
      generatedAt: new Date().toISOString(),
      sourcePromptFile: PROMPT_FILE,
      localFiles,
    };
    fs.writeFileSync(`${base}-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);
    summary.screens[screen.key] = meta;
    summary.generatedAt = new Date().toISOString();
    fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`);
  } catch (error) {
    summary.errors.push({ key: screen.key, error: error.message });
    fs.writeFileSync(`${base}-error.json`, `${JSON.stringify({ message: error.message, stack: error.stack }, null, 2)}\n`);
    console.error(`${screen.key} failed: ${error.message}`);
    fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`);
  }
}

fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`);
console.log(JSON.stringify({ projectId, screenCount: Object.keys(summary.screens).length, errors: summary.errors.length }, null, 2));
