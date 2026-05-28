import fs from 'fs';
import https from 'https';
import { execFileSync } from 'child_process';

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const s = line.startsWith('export ') ? line.slice(7).trim() : line;
    const i = s.indexOf('=');
    if (i < 0) continue;
    let v = s.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    process.env[s.slice(0, i).trim()] ??= v;
  }
}
loadEnvFile('.env');
loadEnvFile('.env.local');
const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) throw new Error('Missing STITCH_API_KEY');
const PROJECT_ID = fs.readFileSync('stitch-mvp-restro-style-v1.project-id', 'utf8').trim();
const PREFIX = 'stitch-mvp-restro-style-v1-owner-report';
const PROMPT_FILE = 'STITCH_PROMPT_MVP_COMPLETO_RESTRO_STYLE_V1.md';
const fullPrompt = fs.readFileSync(PROMPT_FILE, 'utf8');

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method: 'tools/call', params: { name: toolName, arguments: args } });
    const req = https.request({ hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': API_KEY } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error(data.slice(0, 1000))); } });
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
    if (text?.startsWith('{')) { try { return JSON.parse(text); } catch {} }
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
      const s = comp?.design?.screens || [];
      if (Array.isArray(s)) found.push(...s); else if (typeof s === 'object') found.push(...Object.values(s));
    }
  }
  return found.filter(Boolean);
}
function download(url, target) {
  if (!url) return false;
  execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'inherit' });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

const prompt = `${fullPrompt}\n\n---\n\n# Tarea concreta para esta llamada\n\nCrear SOLO la pantalla 6) Informe mensual propietario para Marta Lago · Apartamento Areal · Abril 2026.\n\nDebe ser una vista tipo informe limpio, premium y cálido en Restro Style: fondo gris/beige claro, contenedor blanco/cream con bordes redondeados, acento naranja/caramelo, gráficos finos, microcards compactas y texto sobrio.\n\nContenido obligatorio: resumen ejecutivo, consumo total mensual, consumo fuera de estancia detectado, incidencias resueltas, ahorro estimado prudente, timeline/incidencias relevantes, gráfico fino mensual, texto listo para enviar al propietario, CTAs Exportar PDF y Enviar por email.\n\nNombre interno sugerido: informe-mensual-propietario\nTítulo visible: Informe mensual propietario — EnergyOS\n\nRepite la navegación común del MVP para que parezca parte del mismo producto. Mantén castellano, modo claro y responsive.`;

const response = await callStitch('generate_screen_from_text', { project_id: PROJECT_ID, prompt, device_type: 'DESKTOP' });
fs.writeFileSync(`${PREFIX}-response.json`, JSON.stringify(response, null, 2));
if (response?.error || response?.result?.isError) {
  const err = response?.error || response?.result?.content || 'Unknown Stitch error';
  fs.writeFileSync(`${PREFIX}-error.json`, JSON.stringify(err, null, 2));
  throw new Error(JSON.stringify(err));
}
const all = collectScreens(response).filter(s => s.screenType !== 'DOCUMENT');
const screen = all[all.length - 1];
if (!screen) throw new Error('No screen found');
const screenName = screen.name || (screen.id ? `projects/${PROJECT_ID}/screens/${screen.id}` : null);
const screenId = screen.id || screenName?.split('/').pop();
const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;
const local = { response: `${PREFIX}-response.json`, meta: `${PREFIX}-meta.json`, html: null, stitchPng: null, previews: [] };
if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) local.html = `${PREFIX}.html`;
if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) local.stitchPng = `${PREFIX}-stitch.png`;
const meta = {
  key: 'owner-report',
  requestedName: 'informe-mensual-propietario',
  title: screen.title || 'Informe mensual propietario — EnergyOS',
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
  localFiles: local,
  note: 'Regenerated after transient Stitch unavailable error.'
};
fs.writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(meta, null, 2));
const summary = JSON.parse(fs.readFileSync('stitch-mvp-restro-style-v1-summary.json', 'utf8'));
summary.screens['owner-report'] = meta;
summary.errors = (summary.errors || []).filter(e => e.key !== 'owner-report');
summary.regenerated = [...(summary.regenerated || []), { key: 'owner-report', at: meta.generatedAt, reason: meta.note }];
fs.writeFileSync('stitch-mvp-restro-style-v1-summary.json', JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ projectId: PROJECT_ID, screenId }, null, 2));
