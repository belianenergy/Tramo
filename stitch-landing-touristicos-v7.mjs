import https from 'https';
import fs from 'fs';
import { execFileSync } from 'child_process';

const API_KEY = process.env.STITCH_API_KEY;
const projectFile = '.stitch_project_id';
const rawProjectId = process.env.STITCH_PROJECT_ID || (fs.existsSync(projectFile) ? fs.readFileSync(projectFile, 'utf8').trim() : '');
const PROJECT_ID = rawProjectId.replace(/^projects\//, '');
const PROMPT_FILE = 'STITCH_PROMPT_APARTAMENTOS_TURISTICOS_V7.md';
const PREFIX = 'stitch-landing-touristicos-v7';

if (!API_KEY) {
  console.error('Missing STITCH_API_KEY. Load .env/.env.local before running this script.');
  process.exit(1);
}
if (!PROJECT_ID) {
  console.error('Missing Stitch project id. Set STITCH_PROJECT_ID or create .stitch_project_id.');
  process.exit(1);
}

const prompt = fs.readFileSync(PROMPT_FILE, 'utf8');

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: { name: toolName, arguments: args }
    });
    const req = https.request({
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Failed to parse Stitch response: ${data}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function parseEmbeddedPayload(response) {
  const text = response?.result?.content?.find?.(item => item.type === 'text' && item.text?.trim()?.startsWith('{'))?.text;
  if (!text) return null;
  try { return JSON.parse(text); } catch { return null; }
}

function collectScreens(response) {
  const screens = [];
  const roots = [response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean);
  for (const root of roots) {
    const comps = root.outputComponents || [];
    for (const comp of comps) {
      const compScreens = comp?.design?.screens || [];
      if (Array.isArray(compScreens)) screens.push(...compScreens);
      else if (typeof compScreens === 'object') screens.push(...Object.values(compScreens));
    }
  }
  return screens.filter(Boolean);
}

function download(url, target) {
  if (!url) return false;
  execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'inherit' });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

async function screenshotHtml(htmlPath, pngPath) {
  const scriptPath = `${PREFIX}-screenshot.mjs`;
  fs.writeFileSync(scriptPath, `
import { chromium } from 'playwright';
import path from 'path';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('file://' + path.resolve('${htmlPath}'), { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
await page.screenshot({ path: '${pngPath}', fullPage: true });
await browser.close();
console.log('Screenshot saved: ${pngPath}');
`);
  execFileSync('node', [scriptPath], { stdio: 'inherit' });
}

async function main() {
  console.log(`Generating ${PREFIX} in Stitch project ${PROJECT_ID}`);
  const response = await callStitch('generate_screen_from_text', {
    project_id: PROJECT_ID,
    prompt,
    device_type: 'DESKTOP'
  });
  fs.writeFileSync(`${PREFIX}-response.json`, JSON.stringify(response, null, 2));

  if (response?.error || response?.result?.isError) {
    console.error('Stitch generation failed. Raw response saved.');
    console.error(JSON.stringify(response?.error || response?.result?.content, null, 2));
    process.exit(1);
  }

  const screens = collectScreens(response);
  const designScreens = screens.filter(s => s.screenType !== 'DOCUMENT');
  const screen = designScreens[designScreens.length - 1] || screens[screens.length - 1];
  if (!screen) {
    console.error('No screen found in Stitch response. Raw response saved.');
    process.exit(1);
  }

  const screenName = screen.name || (screen.id ? `projects/${PROJECT_ID}/screens/${screen.id}` : null);
  const screenId = screen.id || screenName?.split('/').pop();
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;

  const meta = {
    projectId: PROJECT_ID,
    projectName: `projects/${PROJECT_ID}`,
    screenId,
    screenName,
    title: screen.title || null,
    width: screen.width || null,
    height: screen.height || null,
    htmlCodeName: screen.htmlCode?.name || null,
    screenshotName: screen.screenshot?.name || null,
    htmlDownloadUrl: htmlUrl,
    screenshotDownloadUrl: screenshotUrl,
    generatedAt: new Date().toISOString(),
    promptFile: PROMPT_FILE
  };
  fs.writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(meta, null, 2));

  if (htmlUrl) {
    console.log('Downloading HTML export...');
    download(htmlUrl, `${PREFIX}.html`);
  }
  if (screenshotUrl) {
    console.log('Downloading Stitch screenshot...');
    download(screenshotUrl, `${PREFIX}-stitch.png`);
  }
  if (fs.existsSync(`${PREFIX}.html`)) {
    console.log('Rendering local preview PNG...');
    await screenshotHtml(`${PREFIX}.html`, `${PREFIX}-preview.png`);
  }

  console.log('Done');
  console.log(JSON.stringify(meta, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
