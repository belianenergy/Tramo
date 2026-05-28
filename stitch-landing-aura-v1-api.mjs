/**
 * EnergyOS — Generate Landing Page (Aura Style) via Stitch API
 */

import https from 'fs';
import { writeFileSync } from 'fs';

const PREFIX = 'stitch-landing-aura-v1';
const PROJECT_TITLE = 'EnergyOS Landing — Aura Style';

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error('Missing STITCH_API_KEY');
  process.exit(1);
}

const LANDING_PROMPT = `Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

Design style: Aura Mobile Flow 4 — clean, elevated surfaces, warm beige background (#FAFAFA), orange primary accent (#e8913a), white cards with soft shadows (no dark glassmorphism). NO purple/violet. Use amber/orange as primary, emerald green for positive states, clean whites and light grays.

Language: ALL text in SPANISH (Spain market)

Sections to include:

1. HEADER (sticky, glass blur):
   - Logo: "EnergyOS" with orange square icon, no emoji
   - Nav: Producto, Operaciones, Informes, Precios
   - CTA button: "Solicitar piloto" (orange, rounded)
   - No hamburger menu on desktop

2. HERO SECTION (2 columns):
   Left column:
   - Badge: "Gestión energética para alquiler vacacional"
   - Headline: "Controla el coste energético de tu cartera turística"
   - Subtext: "Automatiza aparatos por reservas. Optimiza tarifas por período. Gestiona baterías o arbitrajes. Todo desde un solo panel — sin hardware adicional."
   - Primary CTA: "Solicitar diagnóstico gratuito" (orange button with shadow)
   - Secondary CTA: "Ver cómo funciona" (white outline button)
   
   Right column:
   - Dashboard mockup card showing:
     • Property: "Apartamento Centro 04"
     • Status badge: "AUTO" green
     • Metrics: 24% ahorro, -9% tarifa, 1 alerta
     • Feature rows showing:
       - ⚡ Optimización de tarifa: "Mover 3.2 kWh a horas baratas"
       - 🔋 Batería: "Carga 18:00-22:00 | Descarga 07:00-11:00"
       - ✅ Sin hardware · Sincronizado con Datadis

3. PROOF BAR (4 metric tiles in a row):
   - "120+ Propiedades gestionadas"
   - "24% Ahorro medio en climatización"
   - "1.400+ Facturas procesadas"
   - "Datadis Sincronizado"

4. PROBLEMA / SOLUCIÓN (3 feature cards):
   Card 1: "Facturas sin explicación"
   - "¿Cuánto gasta cada alojamiento? ¿Por qué esta factura es tan alta? Sin datos, no hay respuestas."
   
   Card 2: "Tarifas mal optimizadas"
   - "La potencia contratada, los períodos horarios y los impuestos hacen que pagues de más cada mes sin saberlo."
   
   Card 3: "Baterías sin rentabilizar"
   - "Si tienes almacenamiento, probablemente estés perdiendo la oportunidad de arbitrar entre horas baratas y caras."

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
   - Botón: "Solicitar diagnóstico gratuito"

8. FOOTER:
   - Logo EnergyOS
   - Links: Producto, Seguridad, Privacidad, Contacto
   - "© 2026 EnergyOS. Todos los derechos reservados."

Design specifications:
- Background: #FAFAFA (warm beige page background)
- Cards: #FFFFFF (pure white cards)
- Primary accent: #e8913a (amber/orange for CTAs)
- Success/accent: #10b981 (emerald green for positive states)
- Text primary: #1A1A2E (near black)
- Text secondary: #6B7280 (medium gray)
- Border: 1px solid rgba(0,0,0,0.06) (very subtle borders)
- Shadows: 0 2px 12px rgba(0,0,0,0.06) (soft elevated shadows)
- Border radius: 16px for cards, 12px for buttons, 8px for inputs
- Typography: Inter for body, Public Sans for headings
- Font weights: 800 for display, 700 for h1/h2, 600 for h3, 400 for body
- Spacing: 8px base grid (multiples of 8)

NO purple, NO violet, NO dark glassmorphism. Clean light mode only.
All text in SPANISH. Desktop responsive.`;

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
  const content = response?.result?.content;
  if (!Array.isArray(content)) return null;
  for (const item of content) {
    const text = item?.text?.trim();
    if (!text || !text.startsWith('{')) continue;
    try {
      const parsed = JSON.parse(text);
      return response?.result?.structuredContent?.name
        || parsed?.name
        || parsed?.project?.id
        || parsed?.projectId
        || null;
    } catch {}
  }
  return response?.result?.structuredContent?.name
    || response?.result?.project?.id
    || response?.result?.projectId
    || null;
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
          if (Array.isArray(comp?.design?.screens)) return comp.design.screens[comp.design.screens.length - 1];
        }
      }
    } catch {}
  }
  return null;
}

function download(url, target) {
  if (!url) return false;
  try {
    const { execFileSync } = require('child_process');
    execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'ignore' });
    return require('fs').existsSync(target) && require('fs').statSync(target).size > 0;
  } catch { return false; }
}

async function main() {
  console.log('🎨 Creating EnergyOS Landing (Aura Style) project in Stitch...\n');
  
  const projectResponse = await callStitch('create_project', { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));
  
  if (projectResponse?.error || projectResponse?.result?.isError) {
    console.error('Project creation failed:', JSON.stringify(projectResponse?.error || projectResponse?.result?.content, null, 2));
    process.exit(1);
  }
  
  const projectName = extractProjectName(projectResponse);
  if (!projectName) {
    console.error('Could not extract project id');
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
  
  writeFileSync(`${PREFIX}-landing-response.json`, JSON.stringify(screenResponse, null, 2));
  
  if (screenResponse?.error || screenResponse?.result?.isError) {
    console.error('Screen generation failed:', JSON.stringify(screenResponse?.error || screenResponse?.result?.content, null, 2));
    process.exit(1);
  }
  
  const screen = extractBestScreen(screenResponse);
  if (!screen) {
    console.error('No screen found in response');
    process.exit(1);
  }
  
  console.log('✅ Screen generated');
  console.log('Screen data:', JSON.stringify(screen, null, 2).slice(0, 2000));
  
  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;
  
  if (htmlUrl) {
    console.log('\n📥 Downloading HTML...');
    if (download(htmlUrl, `${PREFIX}-landing.html`)) {
      console.log('✅ HTML saved:', `${PREFIX}-landing.html`);
    }
  }
  
  if (screenshotUrl) {
    console.log('\n📥 Downloading screenshot...');
    if (download(screenshotUrl, `${PREFIX}-landing-stitch.png`)) {
      console.log('✅ Screenshot saved:', `${PREFIX}-landing-stitch.png`);
    }
  }
  
  const meta = {
    projectId,
    projectName: `projects/${projectId}`,
    screenId: screen.id || null,
    htmlDownloadUrl: htmlUrl,
    screenshotDownloadUrl: screenshotUrl,
    generatedAt: new Date().toISOString()
  };
  writeFileSync(`${PREFIX}-landing-meta.json`, JSON.stringify(meta, null, 2));
  
  console.log('\n✨ Done!');
  console.log('Files:', `${PREFIX}-landing.html`, `${PREFIX}-landing-stitch.png`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});