/**
 * EnergyOS — Landing v4: Better chart graphics in hero mockup
 */

import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import https from 'https';

const PREFIX = 'stitch-landing-aura-v4';
const PROJECT_ID = '2975961112638901651';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) { console.error('Missing STITCH_API_KEY'); process.exit(1); }

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

CRITICAL: Make the dashboard mockup in the hero section EXTRA ATTRACTIVE with beautiful data visualization.

DESIGN STYLE: Restro dashboard with Bento grid, but with PREMIUM chart graphics.

COLOR PALETTE:
- primary: "#2C3B31" (dark forest green)
- accent: "#7A9E7E" (sage green)
- background: "#fbf9f7"
- surface: "#FFFFFF"
- chart gradient: green to sage gradient for fills

CHARTS MUST BE BEAUTIFUL:
- Line chart with smooth curve, gradient fill underneath (green to transparent)
- Data points as small circles with hover effect
- Area chart with semi-transparent gradient fill
- Bar charts with rounded tops (pill-shaped), gradient fills
- Mini sparklines with subtle styling
- Chart grid lines: very subtle (opacity 0.1)

HERO SECTION - Make this stunning:
Left column:
- Badge: "Gestión energética para alquiler vacacional" (pill, sage green)
- Headline: "Controla el coste energético de tu cartera turística" (Playfair Display, 48px, bold)
- Subtext: "Automatiza aparatos por reservas. Optimiza tarifas. Gestiona baterías. Sin hardware adicional."
- CTAs: "Solicitar diagnóstico gratuito" (green rounded) + "Ver cómo funciona" (outline)

Right column - PREMIUM DASHBOARD MOCKUP:
Create a beautiful dashboard card (20px rounded, soft shadow) showing:
- Header: "Apartamento Centro 04" with status badge "AUTO" (pill, green)
- Metrics row: 3 cards showing 24% ahorro, -9% tarifa, 1 alerta (big mono numbers)
- MAIN CHART: An attractive line/area chart showing energy consumption over 24h
  - Smooth curved line in dark green
  - Gradient fill underneath (green fading to transparent)
  - Time labels on X axis (00h, 06h, 12h, 18h, 24h)
  - kWh labels on Y axis
  - Highlight the cheap hours (valley) in sage green and expensive (peak) in darker shade
- Battery arbitrage visualization: 
  - Horizontal pill-shaped bars showing charge (green) and discharge (darker) cycles
  - Time labels showing 18:00-22:00 (charge) and 07:00-11:00 (discharge)
  - Gradient fills on bars
- Footer: "Sin hardware · Datadis Sincronizado" with small icons

PROOF BAR - 4 metric tiles with beautiful numbers:
- "120+ Propiedades" (big mono number + small label)
- "24% Ahorro" (with small trend arrow or percentage)
- "1.400+ Facturas" (processed count)
- "Datadis Sync" (with sync/checkmark icon)
Each tile: white card, soft shadow, 20px radius, centered content

PROBLEMA SECTION - 3 cards with line icons:
- "Facturas sin explicación" (icon: document with question mark)
- "Tarifas mal optimizadas" (icon: chart going down)
- "Baterías sin rentabilizar" (icon: battery with arrows)
Cards: white, 20px radius, soft shadow, icon + title + description

CÓMO FUNCIONA - 4 steps in bento grid:
1. "Conecta tus contadores" - icon: plug/wifi
2. "Analizamos tu cartera" - icon: magnifying glass/chart
3. "Activamos módulos" - icon: toggle/switch
4. "Mides el ahorro" - icon: trophy/money
Each: numbered, rounded card, icon, title, description

CARACTERÍSTICAS - 6 cards in 3x2 bento grid:
- Automatización por reservas (icon: calendar/lightning)
- Alertas de consumo anómalo (icon: warning/bell)
- Optimización de tarifas (icon: percent/calculator)
- Reporting para propietarios (icon: document/text)
- Arbitraje de baterías (icon: battery/arrows)
- Sincronización Datadis (icon: database/sync)
Cards: white, 20px radius, line icons, title, short description

CTA SECTION - 2 columns:
Left: Benefits list with checkmark icons
Right: Lead form (rounded inputs, green submit button)

TYPOGRAPHY:
- Headlines: Playfair Display, 48px, bold
- Body: Inter, 16-18px
- Metrics/numbers: JetBrains Mono, bold, large

LAYOUT: Bento grid with 80px section spacing, 24px card padding, 20px rounded corners, soft shadows. NO orange, NO purple, NO glassmorphism.

All text SPANISH. Desktop responsive.`;

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
      const screens = parsed?.outputComponents?.[0]?.design?.screens;
      if (Array.isArray(screens)) return screens[screens.length - 1];
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
  console.log('Generating v4 landing: Enhanced chart graphics...');
  
  const response = await callStitch('generate_screen_from_text', {
    project_id: PROJECT_ID,
    prompt: LANDING_PROMPT,
    device_type: 'DESKTOP'
  });
  
  writeFileSync(`${PREFIX}-response.json`, JSON.stringify(response, null, 2));
  
  if (response?.error || response?.result?.isError) {
    console.error('Error:', JSON.stringify(response?.error || response?.result?.content, null, 2).slice(0, 500));
    process.exit(1);
  }
  
  const screen = extractScreen(response);
  if (!screen) { console.error('No screen found'); process.exit(1); }
  
  console.log(`Screen: ${screen.id || screen.name} (${screen.width}x${screen.height})`);
  
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;
  
  if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) console.log('HTML saved');
  if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) console.log('Screenshot saved');
  
  console.log('Done!');
}

main().catch(err => { console.error(err.message); process.exit(1); });