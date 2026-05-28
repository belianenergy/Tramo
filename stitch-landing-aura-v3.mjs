/**
 * EnergyOS — Landing Page v3: Stitch colors + Restro visual style
 */

import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import https from 'https';

const PREFIX = 'stitch-landing-aura-v3';
const PROJECT_ID = '2975961112638901651';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) { console.error('Missing STITCH_API_KEY'); process.exit(1); }

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

IMPORTANT: Follow EXACTLY this design style from reference screenshot "Restro" dashboard:
- Large ROUNDED CORNERS (16-20px border radius for cards, 12px for buttons)
- Soft DIFFUSED DROP SHADOWS (no hard borders, shadows create depth)
- Thin minimalist LINE ICONS (1.5-2px stroke, geometric)
- Bento-box GRID layout for content sections
- Rounded TOP bar charts (pill-shaped bars)
- Tabular monospaced NUMBERS for metrics

COLOR PALETTE (EnergyOS — keep these exact colors):
- primary: "#2C3B31" (dark forest green — for CTAs, headers, borders)
- accent: "#7A9E7E" (sage green — for positive states, badges, secondary accents)
- background: "#fbf9f7" (warm off-white page background)
- surface: "#FFFFFF" (pure white for cards)
- text-primary: "#111827" (near black)
- text-secondary: "#4B5563" (medium gray)
- border: "#2C3B31" (use sparingly — prefer shadows)

TYPOGRAPHY:
- Headlines: Playfair Display (serif, elegant)
- Body: Inter (clean sans-serif)
- Labels/metrics: JetBrains Mono (monospaced for data)
- Font sizes: large headlines (48px), readable body (16-18px)

LAYOUT STYLE (Restro-inspired):
- Bento grid sections with generous whitespace
- Cards with 20px rounded corners and soft shadows
- Metrics displayed with large bold numbers + small labels
- Icons as thin line drawings, not filled shapes
- Charts with rounded bars (pill-shaped, not sharp)

SPACING:
- Section padding: 80px vertical
- Card padding: 24px
- Gap between elements: 16-24px
- Border radius: 20px for cards, 12px for buttons, pill for badges

Language: SPANISH

SECTIONS to include:

1. HEADER (sticky, minimal):
   - Logo: "EnergyOS" text + green square icon
   - Nav: Producto, Operaciones, Informes, Precios
   - CTA: "Solicitar piloto" (rounded pill button, green bg)

2. HERO SECTION (2 columns):
   Left:
   - Badge: "Gestión energética para alquiler vacacional" (pill badge, sage green)
   - Headline: "Controla el coste energético de tu cartera turística" (Playfair, large)
   - Subtext: "Automatiza aparatos por reservas. Optimiza tarifas. Gestiona baterías. Sin hardware adicional."
   - Primary CTA: "Solicitar diagnóstico gratuito" (rounded button, dark green, soft shadow)
   - Secondary CTA: "Ver cómo funciona" (outline, rounded)
   
   Right (Bento card mockup):
   - Rounded card (20px radius, soft shadow) showing:
     - Property name + status badge (pill, sage green)
     - Metrics: 24% ahorro | -9% tarifa | 1 alerta (big numbers)
     - Battery arbitrage visualization (rounded bar chart style)
     - "Sin hardware · Datadis Sync" footer

3. PROOF BAR (4 metric tiles in bento grid):
   - "120+ Propiedades" | "24% Ahorro" | "1.400+ Facturas" | "Datadis Sync"
   - Each tile: rounded card, large number (JetBrains Mono), small label

4. PROBLEMA (3 feature cards):
   - "Facturas sin explicación"
   - "Tarifas mal optimizadas"
   - "Baterías sin rentabilizar"
   - Cards: white bg, soft shadow, 20px radius, icon + title + description

5. CÓMO FUNCIONA (4 steps horizontal, bento style):
   - Step cards with rounded corners and soft shadows
   - Each with number, title, description
   - Connected with subtle lines or spacing

6. CARACTERÍSTICAS (6 feature cards, bento grid 3x2):
   - Automatización, Alertas, Tarifas, Reporting, Arbitraje, Datadis
   - Cards with icon, title, short description
   - Rounded corners, soft shadows, consistent spacing

7. CTA / PILOTO (2 columns):
   Left: Benefits list (checkmarks, clean)
   Right: Lead form (rounded inputs, green CTA button)

8. FOOTER: Logo, links, copyright

CRITICAL DESIGN REQUIREMENTS:
- NO sharp corners — everything rounded (20px cards, 12px buttons)
- Soft diffused shadows — 0 8px 30px rgba(0,0,0,0.08) style
- Thin line icons throughout
- Bento grid layout with breathing room
- Green primary palette (#2C3B31) with sage accent (#7A9E7E)
- NO orange, NO purple, NO glassmorphism

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
  console.log('Generating v3 landing: Stitch colors + Restro visual style');
  
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