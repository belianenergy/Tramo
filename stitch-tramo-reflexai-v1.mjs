import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PROMPT_FILE = "STITCH_PROMPT_TRAMO_REFLEXAI_V1.md";
const PREFIX = "stitch-tramo-reflexai-v1";
const PROJECT_TITLE = "Tramo Landing - ReflexAI V1";
const MODEL_ID = "GEMINI_3_1_PRO";

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
    try { return JSON.parse(text); } catch {}
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

// Force new project for ReflexAI version
console.log(`Creating new project: ${PROJECT_TITLE}`);

const projectResponse = await tool("create_project", { title: PROJECT_TITLE });
fs.writeFileSync(`${PREFIX}-project-response.json`, `${JSON.stringify(projectResponse, null, 2)}\n`);

const projectName = extractProjectName(projectResponse);
if (!projectName) throw new Error("Could not extract project name from Stitch response.");

const projectId = String(projectName).replace(/^projects\//, "");
fs.writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);

console.log(`Project: https://stitch.withgoogle.com/projects/${projectId}`);
console.log(`Generating landing page with ${MODEL_ID}`);

const response = await tool("generate_screen_from_text", {
  projectId,
  prompt: sourcePrompt,
  deviceType: "DESKTOP",
  modelId: MODEL_ID,
});

fs.writeFileSync(`${PREFIX}-response.json`, `${JSON.stringify(response, null, 2)}\n`);

const screen = extractBestScreen(response);
if (!screen) throw new Error("No screen found in Stitch response.");

const screenName = screen.name || (screen.id ? `projects/${projectId}/screens/${screen.id}` : null);
const screenId = screen.id || screenName?.split("/").pop() || null;
const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;

const localFiles = {
  response: `${PREFIX}-response.json`,
  meta: `${PREFIX}-meta.json`,
  html: htmlUrl ? `${PREFIX}.html` : null,
  stitchPng: screenshotUrl ? `${PREFIX}-stitch.png` : null,
};

if (htmlUrl) download(htmlUrl, localFiles.html);
if (screenshotUrl) download(screenshotUrl, localFiles.stitchPng);

const meta = {
  projectTitle: PROJECT_TITLE,
  projectId,
  projectName: `projects/${projectId}`,
  projectUrl: `https://stitch.withgoogle.com/projects/${projectId}`,
  screenId,
  screenName,
  width: screen.width || null,
  height: screen.height || null,
  modelId: MODEL_ID,
  htmlCodeName: screen.htmlCode?.name || null,
  screenshotName: screen.screenshot?.name || null,
  htmlDownloadUrl: htmlUrl,
  screenshotDownloadUrl: screenshotUrl,
  generatedAt: new Date().toISOString(),
  sourcePromptFile: PROMPT_FILE,
  localFiles,
};

fs.writeFileSync(`${PREFIX}-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);
console.log(JSON.stringify(meta, null, 2));
