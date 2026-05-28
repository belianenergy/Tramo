/**
 * EnergyOS — Generate screen only (project already exists)
 */

import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import https from 'https';

const PREFIX = 'stitch-landing-aura-v2';
const PROJECT_ID = '2975961112638901651';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) { console.error('Missing STITCH_API_KEY'); process.exit(1); }

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

Design style: Aura Mobile Flow 4 (aura.build/design-systems/aura-mobile-flow-4)

COLOR PALETTE (exact):
- primary: "#2C3B31" (dark forest green)
- secondary: "#FFFFFF" (white)
- accent: "#7A9E7E" (sage green)
- background: "#FFFFFF"
- surface: "#2C3B31"
- text-primary: "#111827"
- text-secondary: "#4B5563"
- border: "#2C3B31"

TYPOGRAPHY: Playfair Display for display, Inter for body, JetBrains Mono for labels.

SPACING: base 8px, gap 16px, card-padding 24px, section-padding 80px. Border radius 8px for cards, pill for badges.

NO orange. NO purple. Clean green palette.

Language: SPANISH

Sections:
1. Header: logo EnergyOS, nav links, "Solicitar piloto" CTA (dark green)
2. Hero (2 cols): badge "Gestión energética para alquiler vacacional", headline "Controla el coste energético de tu cartera turística", subtext about automation + tariffs + battery arbitrage, CTAs primary + secondary, right mockup card showing property with metrics 24% ahorro, -9% tarifa, 1 alerta, battery arbitrage details
3. Proof bar: 4 tiles "120+ Propiedades", "24% Ahorro", "1.400+ Facturas", "Datadis Sync"
4. 3 feature cards: "Facturas sin explicación", "Tarifas mal optimizadas", "Baterías sin rentabilizar"
5. 4 steps: "Conecta tus contadores", "Analizamos tu cartera", "Activamos módulos", "Mides el ahorro"
6. 6 feature cards grid: automatización, alertas, tarifas, reporting, arbitraje, datadis
7. Pricing/Piloto: benefits list + lead form
8. Footer

Design specs:
- Background: #FFFFFF, Primary: #2C3B31 (dark forest green), Accent: #7A9E7E (sage)
- Text primary: #111827, Text secondary: #4B5563
- Subtle shadows, 8px border radius, pill badges
- NO orange, NO purple, NO violet, NO glassmorphism
- All text SPANISH, desktop responsive`;

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
      params: { name: toolName, arguments: args }
    });
    const req = https.request({
      hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': API_KEY }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch { reject(new Error(data.slice(0,500))); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function extractScreen(response) {
  const content = response?.result?.content;
  if (!Array.isArray(content)) return null;
  for (const item of content) {
    const text = item?.text?.trim();
    if (!text || !text.startsWith('{')) continue;
    try {
      const parsed = JSON.parse(text);
      if (parsed.screen) return parsed.screen;
      if (Array.isArray(parsed.screens)) return parsed.screens[parsed.screens.length - 1];
    } catch {}
  }
  return null;
}

function download(url, target) {
  if (!url) return false;
  try {
    execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'ignore' });
    return existsSync(target) && statSync(target).size > 0;
  } catch { return false; }
}

async function main() {
  console.log('Generating screen for project', PROJECT_ID);
  
  const response = await callStitch('generate_screen_from_text', {
    project_id: PROJECT_ID,
    prompt: LANDING_PROMPT,
    device_type: 'DESKTOP'
  });
  
  writeFileSync(`${PREFIX}-screen-response.json`, JSON.stringify(response, null, 2));
  
  if (response?.error || response?.result?.isError) {
    console.error('Error:', JSON.stringify(response?.error || response?.result?.content, null, 2));
    process.exit(1);
  }
  
  const screen = extractScreen(response);
  if (!screen) { console.error('No screen found'); process.exit(1); }
  
  console.log(`Screen: ${screen.id || screen.name} (${screen.width}x${screen.height})`);
  
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;
  
  if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) console.log('HTML saved');
  if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) console.log('Screenshot saved');
  
  writeFileSync(`${PREFIX}-meta.json`, JSON.stringify({ projectId: PROJECT_ID, screenId: screen.id, generatedAt: new Date().toISOString() }, null, 2));
  console.log('Done!');
}

main().catch(err => { console.error(err.message); process.exit(1); });