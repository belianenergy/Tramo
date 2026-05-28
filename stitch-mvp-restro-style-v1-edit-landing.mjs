import https from 'https';
import fs from 'fs';
import { execFileSync } from 'child_process';

const PROJECT_ID = '11820050226044719534';
const SCREEN_ID = JSON.parse(fs.readFileSync('stitch-mvp-restro-style-v1-landing-meta.json', 'utf8')).screenId;
const PREFIX = 'stitch-mvp-restro-style-v1-landing';
const PROMPT_FILE = 'STITCH_PROMPT_MVP_COMPLETO_RESTRO_STYLE_V1.md';

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
    const eq = normalized.indexOf('=');
    if (eq === -1) continue;
    const key = normalized.slice(0, eq).trim();
    let value = normalized.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');
const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error('Missing STITCH_API_KEY.');
  process.exit(1);
}

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: args }
    });
    const req = https.request({
      hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': API_KEY }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error(`Failed to parse Stitch response: ${data.slice(0, 1000)}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function parseEmbeddedPayload(response) {
  const content = response?.result?.content;
  if (!Array.isArray(content)) return null;
  for (const item of content) {
    const text = item?.text?.trim();
    if (!text || !text.startsWith('{')) continue;
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
    const comps = root.outputComponents || [];
    for (const comp of comps) {
      const compScreens = comp?.design?.screens || [];
      if (Array.isArray(compScreens)) found.push(...compScreens);
      else if (typeof compScreens === 'object') found.push(...Object.values(compScreens));
    }
  }
  return found.filter(Boolean);
}

function extractBestScreen(response) {
  const all = collectScreens(response);
  const design = all.filter(s => s.screenType !== 'DOCUMENT');
  return design[design.length - 1] || all[all.length - 1] || null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'inherit' });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

const fullPrompt = fs.readFileSync(PROMPT_FILE, 'utf8');
const prompt = `${fullPrompt}\n\n---\n\n# Edición concreta de la pantalla Landing pública - EnergyOS\n\nEdita la pantalla existente manteniendo estrictamente el estilo Restro aprobado: fondo crema cálido, acento naranja/caramelo, cards redondeadas, mucho aire, mockup dashboard premium, misma estructura general de landing.\n\nCambio principal: el hero NO debe sonar a detector de problemas ni a herramienta cerrada de incidencias. Debe representar EnergyOS como plataforma/sistema operativo energético para toda la cartera turística.\n\nCopy exacto deseado para el hero:\n- Badge: "Para gestoras 10+"\n- H1: "Gestiona la energía de tu cartera turística desde un solo sistema."\n- Subtítulo: "EnergyOS conecta consumos, reservas, tarifas, alertas e informes para reducir costes, coordinar operaciones y evaluar baterías o arbitraje cuando la cartera lo permite."\n- CTA primario: "Solicitar diagnóstico"\n- CTA secundario: "Ver casos de uso"\n\nLa proof bar debe evitar métricas fake y mostrar capacidades:\n- Enfoque: 10+ alojamientos por gestora\n- Operación: alertas / consumo ligado a reservas\n- Optimización: tarifas / potencia, periodos y contrato\n- Avanzado: baterías / solar y arbitraje bajo estudio\n\nLa sección de problemas debe sonar amplia, no solo detección:\n1. Señales de consumo y reservas dispersas\n2. Tarifas y potencia sin revisar\n3. Informes, baterías y arbitraje sin criterio operativo\n\nNo uses los términos: climatización, A/C, temperatura, confort, ROI garantizado, trading.\nNo inventes métricas tipo 48 monitorizados, 7 alertas, -12% o 3,8 kW.\nMantén el formulario y la estética. Devuelve la pantalla desktop responsive en modo claro.`;

console.log(`Editing Stitch screen ${SCREEN_ID} in project ${PROJECT_ID}`);
const response = await callStitch('edit_screens', {
  projectId: PROJECT_ID,
  selectedScreenIds: [SCREEN_ID],
  prompt,
  deviceType: 'DESKTOP',
  modelId: 'GEMINI_3_1_PRO'
});
fs.writeFileSync(`${PREFIX}-edit-response.json`, JSON.stringify(response, null, 2));
if (response?.error || response?.result?.isError) {
  console.error('Stitch edit failed. Response saved.');
  console.error(JSON.stringify(response?.error || response?.result?.content, null, 2));
  process.exit(1);
}

const screen = extractBestScreen(response);
if (!screen) {
  console.error('Could not extract edited screen. Response saved.');
  process.exit(1);
}
const screenName = screen.name || (screen.id ? `projects/${PROJECT_ID}/screens/${screen.id}` : null);
const screenId = screen.id || screenName?.split('/').pop() || null;
const htmlUrl = screen.htmlCode?.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;
const local = { response: `${PREFIX}-edit-response.json`, meta: `${PREFIX}-meta.json`, html: null, stitchPng: null, previews: [] };
if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) local.html = `${PREFIX}.html`;
if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) local.stitchPng = `${PREFIX}-stitch.png`;
const meta = {
  key: 'landing',
  requestedName: 'landing-publica',
  title: screen.title || 'Landing pública - EnergyOS',
  projectId: PROJECT_ID,
  projectName: `projects/${PROJECT_ID}`,
  screenId,
  screenName,
  width: screen.width || null,
  height: screen.height || null,
  htmlCodeName: screen.htmlCode?.name || null,
  screenshotName: screen.screenshot?.name || null,
  htmlDownloadUrl: htmlUrl,
  screenshotDownloadUrl: screenshotUrl,
  generatedAt: new Date().toISOString(),
  sourcePromptFile: PROMPT_FILE,
  editedFromScreenId: SCREEN_ID,
  localFiles: local,
  note: 'Edited via Stitch edit_screens to broaden hero from issue detection to full energy management platform.'
};
fs.writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(meta, null, 2));
console.log(JSON.stringify({ screenId, screenName, html: local.html, stitchPng: local.stitchPng }, null, 2));
