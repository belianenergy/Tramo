import https from 'https';
import fs from 'fs';
import { execFileSync } from 'child_process';

const PROJECT_ID = '11820050226044719534';
const meta = JSON.parse(fs.readFileSync('stitch-mvp-restro-style-v1-landing-meta.json', 'utf8'));
const SCREEN_ID = meta.screenId;
const PREFIX = 'stitch-mvp-restro-style-v1-landing';

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
loadEnvFile('.env'); loadEnvFile('.env.local');
if (!process.env.STITCH_API_KEY) throw new Error('Missing STITCH_API_KEY');

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method: 'tools/call', params: { name: toolName, arguments: args } });
    const req = https.request({ hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': process.env.STITCH_API_KEY } }, res => {
      let data = ''; res.on('data', c => data += c); res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error(data.slice(0, 1000))); } });
    });
    req.on('error', reject); req.write(body); req.end();
  });
}
function parseEmbeddedPayload(response) { for (const item of response?.result?.content || []) { const text = item?.text?.trim(); if (text?.startsWith('{')) { try { return JSON.parse(text); } catch {} } } return null; }
function collectScreens(response) { const roots=[response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean); const found=[]; for(const root of roots){ if(root.screen) found.push(root.screen); if(Array.isArray(root.screens)) found.push(...root.screens); for(const comp of root.outputComponents||[]){ const screens=comp?.design?.screens||[]; if(Array.isArray(screens)) found.push(...screens); else if(typeof screens==='object') found.push(...Object.values(screens)); }} return found.filter(Boolean); }
function extractBestScreen(response) { const all=collectScreens(response); return all.filter(s=>s.screenType!=='DOCUMENT').at(-1)||all.at(-1)||null; }
function download(url, target){ if(!url) return false; execFileSync('curl',['-L','-sS','-o',target,url],{stdio:'inherit'}); return fs.existsSync(target)&&fs.statSync(target).size>0; }

const prompt = `Edición mínima de copy en la pantalla existente. No rediseñes, no cambies layout, no cambies tema Restro. Mantén el hero amplio de plataforma energética.

Haz SOLO estas sustituciones de texto visible si aparecen:
- "Empieza a ahorrar hoy mismo." -> "Descubre el potencial energético de tu cartera."
- "Únete al programa de EnergyOS para gestoras profesionales y empieza a optimizar la eficiencia de toda tu cartera." -> "Solicita un diagnóstico para revisar consumos, reservas, tarifas, alertas, informes y oportunidades avanzadas como baterías o arbitraje."
- "Automatiza reglas" -> "Prioriza acciones"
- "Establece límites de temperatura y horarios de apagado automático según tus políticas internas." -> "Define prioridades por coste, contrato, reserva y oportunidad de ahorro."
- "Recibe avisos solo cuando algo requiere acción humana: una ventana abierta o un A/C olvidado." -> "Recibe avisos solo cuando una acción energética requiere atención del equipo."
- "Quejas de confort" -> "Batería / solar / arbitraje"

Prohibido usar: climatización, A/C, temperatura, confort, ROI garantizado, trading, 48 monitorizados, 7 alertas, -12%, 3,8 kW.`;

console.log(`Cleaning copy in Stitch screen ${SCREEN_ID}`);
const response = await callStitch('edit_screens', { projectId: PROJECT_ID, selectedScreenIds: [SCREEN_ID], prompt, deviceType: 'DESKTOP', modelId: 'GEMINI_3_1_PRO' });
fs.writeFileSync(`${PREFIX}-cleanup-response.json`, JSON.stringify(response, null, 2));
if (response?.error || response?.result?.isError) { console.error('Stitch cleanup failed'); console.error(JSON.stringify(response?.error || response?.result?.content, null, 2)); process.exit(1); }
const screen = extractBestScreen(response);
if (!screen) throw new Error('Could not extract screen');
const screenName = screen.name || (screen.id ? `projects/${PROJECT_ID}/screens/${screen.id}` : null);
const screenId = screen.id || screenName?.split('/').pop() || null;
const htmlUrl = screen.htmlCode?.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;
if (htmlUrl) download(htmlUrl, `${PREFIX}.html`);
if (screenshotUrl) download(screenshotUrl, `${PREFIX}-stitch.png`);
const nextMeta = { ...meta, screenId, screenName, htmlCodeName: screen.htmlCode?.name || null, screenshotName: screen.screenshot?.name || null, htmlDownloadUrl: htmlUrl, screenshotDownloadUrl: screenshotUrl, generatedAt: new Date().toISOString(), editedFromScreenId: SCREEN_ID, note: 'Remote Stitch cleanup: broadened platform hero and removed narrow/problem-only copy remnants.' };
fs.writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(nextMeta, null, 2));
console.log(JSON.stringify({ screenId, screenName }, null, 2));
