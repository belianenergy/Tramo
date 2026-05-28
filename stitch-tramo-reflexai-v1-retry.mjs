import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PROMPT_FILE = "STITCH_PROMPT_TRAMO_REFLEXAI_V1.md";
const PREFIX = "stitch-tramo-reflexai-v1";
const MODEL_ID = "GEMINI_3_1_PRO";
const PROJECT_ID = "5313304972244187780";

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
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

if (!process.env.STITCH_API_KEY) {
  throw new Error("Missing STITCH_API_KEY.");
}

const sourcePrompt = fs.readFileSync(PROMPT_FILE, "utf8");

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: "2.0", id: Date.now(), method: "tools/call", params: { name: toolName, arguments: args } });
    const req = https.request({
      hostname: "stitch.googleapis.com", port: 443, path: "/mcp", method: "POST",
      timeout: 480000,
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body), "X-Goog-Api-Key": process.env.STITCH_API_KEY },
    }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch { reject(new Error(`Parse failed: ${data.slice(0, 500)}`)); }
      });
    });
    req.on("timeout", () => { req.destroy(); reject(new Error("Stitch timed out")); });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function tool(name, args) {
  const response = await callStitch(name, args);
  if (response?.error || response?.result?.isError) {
    const text = response?.error?.message || response?.result?.content?.map(i => i.text).join("\n") || "Unknown";
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
  return all.filter(s => s.screenType !== "DOCUMENT").at(-1) || all.at(-1) || null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

console.log(`Project: https://stitch.withgoogle.com/projects/${PROJECT_ID}`);
console.log(`Generating landing with ${MODEL_ID} (timeout: 8 min)...`);

const response = await tool("generate_screen_from_text", {
  projectId: PROJECT_ID,
  prompt: sourcePrompt,
  deviceType: "DESKTOP",
  modelId: MODEL_ID,
});

fs.writeFileSync(`${PREFIX}-generate-response.json`, `${JSON.stringify(response, null, 2)}\n`);

const screen = extractBestScreen(response);
if (!screen) throw new Error("No screen found in response.");

const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;

if (htmlUrl) download(htmlUrl, `${PREFIX}-landing.html`);
if (screenshotUrl) download(screenshotUrl, `${PREFIX}-landing.png`);

const meta = {
  projectId: PROJECT_ID,
  projectUrl: `https://stitch.withgoogle.com/projects/${PROJECT_ID}`,
  screenId: screen.id || null,
  width: screen.width || null,
  height: screen.height || null,
  modelId: MODEL_ID,
  htmlUrl, screenshotUrl,
  localHtml: htmlUrl ? `${PREFIX}-landing.html` : null,
  localPng: screenshotUrl ? `${PREFIX}-landing.png` : null,
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(`${PREFIX}-landing-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);
console.log(JSON.stringify(meta, null, 2));
