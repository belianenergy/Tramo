/**
 * EnergyOS — Landing Page (Aura Mobile Flow 4 style) via Stitch API
 * Using exact Aura color palette from design.md
 */

import { writeFileSync, existsSync, statSync } from 'fs';
import { execFileSync } from 'child_process';
import https from 'https';

const PREFIX = 'stitch-landing-aura-v2';
const PROJECT_TITLE = 'EnergyOS Landing — Aura Mobile Flow 4';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error('Missing STITCH_API_KEY');
  process.exit(1);
}

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

Design style: EXACT Aura Mobile Flow 4 from aura.build/design-systems/aura-mobile-flow-4

COLOR PALETTE (exact values):
- primary: "#2C3B31" (dark forest green — use for buttons, accents, headers)
- secondary: "#FFFFFF" (white)
- accent: "#7A9E7E" (sage green — secondary accents)
- background: "#FFFFFF" (white page background)
- surface: "#2C3B31" (dark green for contrast sections)
- text-primary: "#111827" (near black)
- text-secondary: "#4B5563" (medium gray)
- border: "#2C3B31" (dark green borders)

TYPOGRAPHY:
- Display headings: Playfair Display
- Body: Inter
- Labels/mono: JetBrains Mono
- Font weights: 700 for h1/h2, 600 for h3, 400 for body

SPACING (8px base):
- base: 8px
- gap: 16px
- card-padding: 24px
- section-padding: 80px
- rounded card: 8px
- rounded control: 8px
- rounded pill: 9999px (full round)

IMPORTANT: This is NOT orange/amber. The Aura Mobile Flow 4 style uses dark forest green (#2C3B31) as primary color with sage green accents. NO orange, NO purple, NO violet. Clean professional green palette.

Language: ALL text in SPANISH (Spain market)

Sections to include:

1. HEADER (sticky, clean):
   - Logo: "EnergyOS" with dark green square icon
   - Nav: Producto, Operaciones, Informes, Precios
   - CTA button: "Solicitar piloto" (dark green bg, white text, pill rounded)
   - Clean minimal header, no glassmorphism

2. HERO SECTION (2 columns):
   Left column:
   - Badge: "Gestión energética para alquiler vacacional" (pill badge, sage green bg)
   - Headline: "Controla el coste energético de tu cartera turística"
   - Subtext: "Automatiza aparatos por reservas. Optimiza tarifas por período. Gestiona baterías o arbitrajes. Todo desde un solo panel — sin hardware adicional."
   - Primary CTA: "Solicitar diagnóstico gratuito" (dark green bg, white text, 8px radius)
   - Secondary CTA: "Ver cómo funciona" (outline, dark green border and text)
   
   Right column:
   - Dashboard mockup card showing:
     Property: "Apartamento Centro 04"
     Status badge: "AUTO" (sage green bg)
     Metrics: 24% ahorro, -9% tarifa, 1 alerta
     Feature rows showing:
       - Optimización de tarifa: "Mover 3.2 kWh a horas baratas"
       - Batería: "Carga 18:00-22:00 | Descarga 07:00-11:00"
       - Sin hardware · Sincronizado con Datadis

3. PROOF BAR (4 metric tiles in a row):
   - "120+ Propiedades gestionadas"
   - "24% Ahorro medio en climatización"
   - "1.400+ Facturas procesadas"
   - "Datadis Sincronizado"

4. PROBLEMA / SOLUCIÓN (3 feature cards):
   Card 1: "Facturas sin explicación"
   - "¿Cuánto gasta cada alojamiento? Sin datos, no hay respuestas."
   
   Card 2: "Tarifas mal optimizadas"
   - "La potencia contratada, los períodos horarios y los impuestos hacen que pagues de más."
   
   Card 3: "Baterías sin rentabilizar"
   - "Si tienes almacenamiento, probablemente estés perdiendo la oportunidad de arbitrar."

5. CÓMO FUNCIONA (4 steps horizontal):
   Step 1: "Conecta tus contadores"
   - Sin hardware. Accedemos a tus datos de consumo reales a través de Datadis.
   
   Step 2: "Analizamos tu cartera"
   - Revisamos reservas, consumos, tarifas y oportunidades de ahorro.
   
   Step 3: "Activamos módulos"
   - Alertas, automatización, optimización de tarifas o simulación de batería.
   
   Step 4: "Mides el ahorro"
   - Informes mensuales con datos reales. Primera facturación optimizada en 30 días.

6. CARACTERÍSTICAS PRINCIPALES (6 feature cards in 2 rows):
   - Automatización por reservas (ON/OFF automático según check-in/check-out)
   - Alertas de consumo anómalo (detección de patrones extraños)
   - Optimización de tarifas (comparación completa con impuestos incluidos)
   - Reporting para propietarios (informes mensuales automáticos)
   - Arbitraje de baterías (simulación OMIE para carga/descarga)
   - Sincronización Datadis (datos reales de consumo sin hardware)

7. PRICING / PILOTO (2 columns):
   Left: Benefits list
   - Sin compromiso inicial
   - Diagnóstico gratuito de tu cartera
   - Primer resultado en 30 días
   - Sin hardware adicional
   - Integración con tus sistemas existentes
   
   Right: Lead capture form
   - Nombre (input)
   - Email (input)
   - Nº de apartamentos (select: 5-10, 11-25, 26-50, 51-100, 100+)
   - Interés principal (select: Automatización, Tarifas, Batería, Reporting)
   - Botón: "Solicitar diagnóstico gratuito" (dark green bg)

8. FOOTER:
   - Logo EnergyOS
   - Links: Producto, Seguridad, Privacidad, Contacto
   - "© 2026 EnergyOS. Todos los derechos reservados."

Design specifications:
- Background: #FFFFFF (white)
- Primary accent: #2C3B31 (dark forest green — for CTAs, headers, borders)
- Accent: #7A9E7E (sage green — for badges, secondary elements)
- Text primary: #111827 (near black)
- Text secondary: #4B5563 (medium gray)
- Border radius: 8px for cards and controls, pill (9999px) for badges
- Shadows: subtle, clean — 0 1px 3px rgba(0,0,0,0.08)
- NO orange. NO purple. NO violet. NO glassmorphism. Clean light mode.
- All text in SPANISH. Desktop responsive.`;

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
      try {
        const parsed = JSON.parse(text);
        return parsed?.name || parsed?.project?.id || parsed?.projectId || null;
      } catch {}
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
  console.log('🎨 Creating EnergyOS Landing (Aura Mobile Flow 4) project...\n');
  
  const projectResponse = await callStitch('create_project', { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));
  
  if (projectResponse?.error || projectResponse?.result?.isError) {
    console.error('Project creation failed');
    process.exit(1);
  }
  
  const projectName = extractProjectName(projectResponse);
  if (!projectName) {
    console.error('Could not extract project id');
    process.exit(1);
  }
  
  const projectId = String(projectName).replace(/^projects\//, '');
  writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);
  console.log(`✅ Project: ${projectId}\n`);
  
  console.log('Generating screen with EXACT Aura Mobile Flow 4 colors...');
  
  const screenResponse = await callStitch('generate_screen_from_text', {
    project_id: projectId,
    prompt: LANDING_PROMPT,
    device_type: 'DESKTOP'
  });
  
  writeFileSync(`${PREFIX}-response.json`, JSON.stringify(screenResponse, null, 2));
  
  if (screenResponse?.error || screenResponse?.result?.isError) {
    console.error('Screen generation failed');
    process.exit(1);
  }
  
  const screen = extractBestScreen(screenResponse);
  if (!screen) {
    console.error('No screen found');
    process.exit(1);
  }
  
  console.log(`✅ Screen: ${screen.name || screen.id} (${screen.width}x${screen.height})\n`);
  
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;
  
  if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) {
    console.log('✅ HTML saved');
  }
  
  if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) {
    console.log('✅ Screenshot saved');
  }
  
  const meta = { projectId, screenId: screen.id, generatedAt: new Date().toISOString() };
  writeFileSync(`${PREFIX}-meta.json`, JSON.stringify(meta, null, 2));
  
  console.log('\n✨ Done!');
}

main().catch(err => { console.error('Error:', err.message); process.exit(1); });