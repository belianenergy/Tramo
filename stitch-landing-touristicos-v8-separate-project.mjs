import https from 'https';
import fs from 'fs';
import { execFileSync } from 'child_process';

const API_KEY = process.env.STITCH_API_KEY;
const PROMPT_FILE = 'STITCH_PROMPT_APARTAMENTOS_TURISTICOS_V8.md';
const PREFIX = 'stitch-landing-touristicos-v8-separate';
const PROJECT_TITLE = 'EnergyOS Landing MVP — Apartamentos Turísticos v8';

if (!API_KEY) {
  console.error('Missing STITCH_API_KEY. Load .env/.env.local before running this script.');
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

function extractProjectName(response) {
  const embedded = parseEmbeddedPayload(response);
  return response?.result?.structuredContent?.name
    || response?.result?.project?.id
    || response?.result?.projectId
    || response?.result?.name
    || embedded?.name
    || embedded?.project?.id
    || embedded?.projectId
    || null;
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

async function screenshotHtml(htmlPath) {
  const scriptPath = `${PREFIX}-screenshot.mjs`;
  fs.writeFileSync(scriptPath, `
import { chromium } from 'playwright';
import path from 'path';
const viewports = [
  { name: 'mobile-375', width: 375, height: 1200 },
  { name: 'tablet-768', width: 768, height: 1200 },
  { name: 'desktop-1440', width: 1440, height: 1400 }
];
const browser = await chromium.launch({ headless: true });
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve('${htmlPath}'), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const out = '${PREFIX}-preview-' + viewport.name + '.png';
  await page.screenshot({ path: out, fullPage: true });
  await page.close();
  console.log('Screenshot saved: ' + out);
}
await browser.close();
`);
  execFileSync('node', [scriptPath], { stdio: 'inherit' });
}

async function main() {
  console.log(`Creating clean Stitch project: ${PROJECT_TITLE}`);
  const projectResponse = await callStitch('create_project', { title: PROJECT_TITLE });
  fs.writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));

  if (projectResponse?.error || projectResponse?.result?.isError) {
    console.error('Stitch project creation failed. Raw response saved.');
    console.error(JSON.stringify(projectResponse?.error || projectResponse?.result?.content, null, 2));
    process.exit(1);
  }

  const projectName = extractProjectName(projectResponse);
  if (!projectName) {
    console.error('Could not extract new project id. Raw response saved.');
    process.exit(1);
  }
  const projectId = projectName.replace(/^projects\//, '');
  console.log(`Generating v8 screen in clean project ${projectId}`);

  const response = await callStitch('generate_screen_from_text', {
    project_id: projectId,
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

  const screenName = screen.name || (screen.id ? `projects/${projectId}/screens/${screen.id}` : null);
  const screenId = screen.id || screenName?.split('/').pop();
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;

  const meta = {
    projectId,
    projectName: `projects/${projectId}`,
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
    sourcePromptFile: PROMPT_FILE,
    sourceScreen: 'projects/9100679721232803019/screens/f49b9826a13c4402a0463e1cb7f919dc',
    note: 'Clean standalone project generated from the approved v8 prompt because Stitch move-between-projects is not exposed by the current scripts/API.',
    localPreviews: [
      `${PREFIX}-preview-mobile-375.png`,
      `${PREFIX}-preview-tablet-768.png`,
      `${PREFIX}-preview-desktop-1440.png`
    ]
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
    console.log('Rendering local responsive preview PNGs...');
    await screenshotHtml(`${PREFIX}.html`);
  }

  console.log('Done');
  console.log(JSON.stringify(meta, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
