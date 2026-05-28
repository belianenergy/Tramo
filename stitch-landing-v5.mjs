/**
 * EnergyOS — Generate Landing Page v5 (Restro Style + Strategic Improvements)
 * Via Stitch API
 */

import https from 'https';
import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';

const PREFIX = 'stitch-landing-v5';
const PROJECT_TITLE = 'EnergyOS Landing v5 — Restro Style';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error('Missing STITCH_API_KEY in .env');
  process.exit(1);
}

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain (gestoras with 10-100 apartments).

## DESIGN SYSTEM — Restro Style

Background: warm beige cream (#F5F0EB)
Surface/Cards: pure white (#FFFFFF)
Primary accent: terracotta/rust (#A05A18)
Secondary accent: lighter terracotta (#B8621B)
Alert red: #DC2626
Text primary: #1C1917 (near black)
Text secondary: #78716C (warm gray)
NO shadows (flat design, whitespace creates depth)
Border-radius: 16px for cards, full/pill for badges and buttons
Typography: Inter for body, JetBrains Mono for metrics
Charts: smooth line (NO area fill), pill-shaped progress bars

## STRATEGIC IMPROVEMENTS

1. Social proof section near hero (logos or metrics "X gestoras confían")
2. "Sin hardware" as prominent badge near hero
3. Pricing hint: "Desde €X/mes por apartamento"
4. ROI quantification: "Ahorra €300-600 por apartamento al año"
5. Simple tariff optimization example in hero

## SECTIONS

### 1. HERO (full-width, warm cream background)
Left column:
- Pill badge row (3 badges):
  * "🏠 Sin hardware adicional" 
  * "⚡ Ahorra desde el primer mes"
  * "🔌 Configuración en 48h"
- Headline: "Controla y reduce la energía de tus apartamentos turísticos"
- Sub: "EnergyOS conecta tus reservas con el consumo real. Ahorra €300-600 por apartamento al año — sin hardware, sin obras."
- Example box (light): "Ejemplo: mismo consumo, mismo apartamento → cambia a tarifa óptima → -22% en factura"
- CTA button: "Solicitar piloto gratuito →" (full pill, #A05A18 bg)

Right column:
- Visual mockup card (white card, border-radius 16px, NO shadow):
  * Line chart SVG: smooth curve, #A05A18 stroke, NO fill
  * 3 pill-shaped progress bars showing: Ahorro 18%, Tarifa -9%, Alertas 1
  * Property name in JetBrains Mono: "Apartamento Centro 04"
  * Small badge: "AUTO" in green pill

Below hero: Proof bar with 4 tiles:
- "+X gestoras confían en EnergyOS"
- "Ahorro medio: 15-22% en climatización"
- "Sin hardware · Sin obra"
- "Primera factura optimizada en 30 días"

### 2. PROBLEMA (white card, border-radius 16px)
Section title: "El problema que ninguna gestora ve venir"
3 stat boxes in a row (cream background cards):
- "€400-800/año" — lo que paga de más un apartamento con climatización mal gestionada
- "0 datos" — por alojamiento en la mayoría de gestoras
- "3 períodos" — horarios que complican la factura sin ayuda

Subtext: "La mayoría de las gestoras de apartamentos vacacionales pagan de más en energía sin saberlo. No por mala gestión, sino porque nadie les enseña dónde está el gasto."

### 3. CÓMO FUNCIONA (3 steps, horizontal, cream background)
Step 1: Icon "Conecta" — "Sin hardware. Accedemos a tus datos de consumo reales a través de Datadis."
Step 2: Icon "Analiza" — "Revisamos reservas, consumos, tarifas y oportunidades de ahorro."
Step 3: Icon "Ahorra" — "Mides el ahorro en tu próxima factura. Primera optimización en 30 días."

### 4. BENEFICIOS CLAVE (white card, 2x2 grid)
Card 1: "Ahorro en climatización"
- "Reduce un 15-22% el gasto en aire acondicionado y calefacción"
- Show pill bar: 18% ahorro

Card 2: "Alertas inteligentes"
- "Detecta consumos anómalos y te avisa antes de que llegue la factura"
- Show small alert badge

Card 3: "Optimización de tarifas"
- "Compara todas las tarifas del mercado y mueve tu consumo a las horas más baratas"
- Show tariff periods visualization (3 pill bars: P1 cara, P2 media, P3 barata)

Card 4: "Informes para propietarios"
- "Reportes mensuales automáticos. Cada propietario ve el consumo de su apartamento."
- Show document icon

### 5. SOCIAL PROOF (cream background)
- "X gestoras ya confían en EnergyOS"
- Show 4-5 placeholder logo circles (gray muted)
- Testimonial quote: "Antes no sabíamos por qué某些 apartamentos consumían el doble. Ahora tenemos datos para explicarlo." — [Nombre, Empresa]
- Metric row: "X apartamentos gestionados · Y% ahorro medio · Z países"

### 6. PRICING (white card, centered)
Section title: "Piloto gratuito — sin compromiso"
Sub: "Empieza con un diagnóstico gratuito de tu cartera. Sin hardware, sin obra, sin riesgo."

2-column layout:
Left: Lista de beneficios del piloto
- Diagnóstico gratuito de tu cartera
- Sin compromiso inicial
- Primera factura optimizada en 30 días
- Sin hardware adicional
- Soporte en español

Right: Lead capture form
- "Solicitar piloto gratuito"
- Input: Nombre
- Input: Email
- Select: Nº apartamentos (5-10, 11-25, 26-50, 51-100, 100+)
- Select: Dolor principal (Facturas altas, Optimización tarifas, Reporting propietarios, Otro)
- Button: "Solicitar diagnóstico gratuito" (full width, pill, #A05A18)

Below form: Small text "Sin spam. Sin compromiso. Puedes cancelar cuando quieras."

### 7. FOOTER (cream background)
- Logo EnergyOS (orange square icon, no emoji)
- Links: Producto, Seguridad, Privacidad, Contacto
- "© 2026 EnergyOS. Todos los derechos reservados."

## TECHNICAL SPECS

- Font: Inter (400/500/600/700/800) + JetBrains Mono (400/500/600) via Google Fonts
- Tailwind CSS via CDN
- Background: #F5F0EB (warm cream)
- Cards: #FFFFFF
- Primary: #A05A18
- Secondary: #B8621B
- Alert: #DC2626
- Text: #1C1917
- Muted: #78716C
- Border-radius: 16px cards, full/pill badges, 9999px buttons
- NO box shadows (flat design)
- Smooth line chart SVG in hero (no area fill, stroke #A05A18)
- Pill progress bars: rounded-full, bg-primary for fill, bg-cream for track
- Generous whitespace

## COPY (all SPANISH)

Hero badges: "🏠 Sin hardware adicional" | "⚡ Ahorra desde el primer mes" | "🔌 Configuración en 48h"
Hero headline: "Controla y reduce la energía de tus apartamentos turísticos"
Hero sub: "EnergyOS conecta tus reservas con el consumo real. Ahorra €300-600 por apartamento al año — sin hardware, sin obras."
CTA: "Solicitar piloto gratuito →"
Proof bar: "+X gestoras confían" | "15-22% ahorro medio" | "Sin hardware · Sin obra" | "30 días"

Problem stats: "€400-800/año de más" | "0 datos por alojamiento" | "3 períodos horarios"

How it works: "Conecta" | "Analiza" | "Ahorra"

Benefits: "Ahorro en climatización" | "Alertas inteligentes" | "Optimización de tarifas" | "Informes para propietarios"

Pricing: "Piloto gratuito" | "Sin compromiso" | "Desde €X/mes por apartamento"

Form button: "Solicitar diagnóstico gratuito"

Footer: "© 2026 EnergyOS"

DESKTOP responsive. All text in SPANISH. Clean Restro-inspired flat design.`;

// ---- Stitch API helpers ----

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
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
        catch { reject(new Error(`Failed to parse Stitch response: ${data.slice(0, 500)}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function extractProjectName(response) {
  const name = response?.result?.structuredContent?.name;
  if (name) return name;
  const content = response?.result?.content;
  if (Array.isArray(content)) {
    for (const item of content) {
      const text = item?.text?.trim();
      if (!text || !text.startsWith('{')) continue;
      try { return JSON.parse(text)?.name || JSON.parse(text)?.project?.id || null; } catch {}
    }
  }
  return response?.result?.project?.id || response?.result?.projectId || null;
}

function extractBestScreen(response) {
  const content = response?.result?.content;
  if (!Array.isArray(content)) return null;
  for (const item of content) {
    const text = item?.text?.trim();
    if (!text || !text.startsWith('{')) continue;
    try {
      const parsed = JSON.parse(text);
      if (parsed.screen) return parsed.screen;
      if (Array.isArray(parsed.screens)) return parsed.screens[parsed.screens.length - 1];
      if (parsed.outputComponents) {
        for (const comp of parsed.outputComponents) {
          const screens = comp?.design?.screens;
          if (Array.isArray(screens)) return screens[screens.length - 1];
        }
      }
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
  console.log('🎨 Creating EnergyOS Landing v5 (Restro Style) in Stitch...\n');
  
  const projectResponse = await callStitch('create_project', { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));
  
  if (projectResponse?.error || projectResponse?.result?.isError) {
    console.error('Project creation failed:', JSON.stringify(projectResponse?.error || projectResponse?.result?.content, null, 2));
    process.exit(1);
  }
  
  const projectName = extractProjectName(projectResponse);
  if (!projectName) {
    console.error('Could not extract project id');
    console.error('Response:', JSON.stringify(projectResponse, null, 2).slice(0, 1000));
    process.exit(1);
  }
  
  const projectId = String(projectName).replace(/^projects\//, '');
  writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);
  console.log(`✅ Project created: ${projectId}\n`);
  
  console.log('Generating landing page screen...');
  
  const screenResponse = await callStitch('generate_screen_from_text', {
    project_id: projectId,
    prompt: LANDING_PROMPT,
    device_type: 'DESKTOP'
  });
  
  writeFileSync(`${PREFIX}-response.json`, JSON.stringify(screenResponse, null, 2));
  
  if (screenResponse?.error || screenResponse?.result?.isError) {
    console.error('Screen generation failed:', JSON.stringify(screenResponse?.error || screenResponse?.result?.content, null, 2));
    process.exit(1);
  }
  
  const screen = extractBestScreen(screenResponse);
  if (!screen) {
    console.error('No screen found in response');
    console.error('Response:', JSON.stringify(screenResponse, null, 2).slice(0, 2000));
    process.exit(1);
  }
  
  console.log('✅ Screen generated');
  console.log('Screen name:', screen.name || screen.id);
  console.log('Screen dimensions:', screen.width, 'x', screen.height);
  
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;
  
  if (htmlUrl) {
    console.log('\n📥 Downloading HTML...');
    if (download(htmlUrl, `${PREFIX}.html`)) {
      console.log('✅ HTML saved:', `${PREFIX}.html`);
    }
  }
  
  if (screenshotUrl) {
    console.log('\n📥 Downloading screenshot...');
    if (download(screenshotUrl, `${PREFIX}-preview.png`)) {
      console.log('✅ Screenshot saved:', `${PREFIX}-preview.png`);
    }
  }
  
  const meta = {
    projectId,
    projectName: `projects/${projectId}`,
    screenId: screen.id || null,
    screenName: screen.name || null,
    htmlDownloadUrl: htmlUrl,
    screenshotDownloadUrl: screenshotUrl,
    generatedAt: new Date().toISOString()
  };
  writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(meta, null, 2));
  
  console.log('\n✨ Done!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});