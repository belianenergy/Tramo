import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

// Prompt moito máis específico e exixente
const prompt = `Create a PREMIUM, CUTTING-EDGE dashboard for a B2B energy management platform called EnergyOS Pro. This must look like it was designed by a top-tier design agency in 2026 — not a template, not AI-generated, but CUSTOM CRAFTED.

## DESIGN DIRECTION: "Warm Premium" — Like Linear meets Notion meets Stripe

### Visual Style:
- **NOT dark mode** — use a warm, light background with subtle depth
- **Background:** Very subtle warm gray (#F8F7F4) — NOT white, NOT cold gray
- **Cards:** Pure white (#FFFFFF) with VERY subtle warm shadow (0 1px 3px rgba(0,0,0,0.04))
- **Borders:** Almost invisible (#F0EFEF) — depth through shadow, not borders
- **Primary color:** Deep forest green (#1B4332) — sophisticated, NOT neon/emerald
- **Accent:** Warm amber (#D4A574) — premium feel, NOT bright orange
- **Text:** Rich charcoal (#1A1A2E) — NOT pure black
- **Secondary text:** Warm gray (#6B7280)

### Typography (CRITICAL):
- **Font:** Plus Jakarta Sans for EVERYTHING (headings, body, numbers)
- **NO monospace** for numbers — use tabular figures in Plus Jakarta Sans
- **Headings:** Tight letter-spacing (-0.02em), bold but not heavy
- **Body:** 15px, regular weight, generous line-height (1.6)
- **Numbers:** Large, bold, with subtle color coding (green for positive, amber for attention)

### Layout & Spacing:
- **Sidebar:** 280px, warm background (#FAFAF8), NO hard borders — use shadow for separation
- **Content:** Max-width 1400px, centered, generous padding (32px)
- **Cards:** 16px border-radius, subtle hover lift (translateY(-2px)), warm shadow on hover
- **Grid:** 4-column KPI row, 2-column content below
- **Gaps:** 20px between cards, 32px between sections

### Components — MUST LOOK PREMIUM:

**KPI Cards:**
- Large number (48px, Plus Jakarta Sans Bold)
- Small label above (12px, uppercase, letter-spacing 0.08em, warm gray)
- Subtle trend indicator (tiny arrow + percentage, green/amber)
- Icon in a soft circle (40px, light green/amber/blue background)
- NO hard borders, only subtle shadow

**Sidebar:**
- Logo at top with subtle brand mark
- Navigation items: 48px height, 12px border-radius on hover
- Active item: subtle warm green background (#F0F7F4), NOT hard accent
- Icons: Phosphor Icons (light, 1.5px stroke)
- Sections separated by subtle 1px line (#F0EFEF)
- Bottom: user avatar + name, NOT just icon

**Data Table:**
- Alternating rows with VERY subtle background (#FAFAF8 / #FFFFFF)
- Row hover: warm background (#F5F4F2)
- Status badges: pill-shaped, soft colors (green bg + green text, amber bg + amber text)
- NO hard grid lines — use spacing for separation
- Action icons on hover (appear with fade)

**Charts:**
- Area chart with subtle gradient (green to transparent)
- NO hard grid lines — use subtle dotted lines
- Tooltip: warm card style, NOT dark overlay
- Legend: horizontal, small dots + labels

**Alerts/Notifications:**
- Toast style: warm card with left accent border (4px, colored)
- NOT harsh red — use warm coral (#E74C3C) for errors
- Success: soft green (#27AE60) with green bg (#F0F7F4)

### Micro-interactions:
- Page load: cards fade in with stagger (50ms delay between each)
- KPI numbers: countUp animation on load
- Hover on cards: subtle lift + shadow increase (200ms ease)
- Hover on table rows: background fade (150ms)
- Sidebar items: subtle background fade on hover (150ms)
- Buttons: subtle scale on press (0.98)

### Spanish Market (CRITICAL):
- ALL text in SPANISH (Castellano)
- Sidebar: Panel, Fincas, Apartamentos, Arbitraje, Asesor, Configuración, Ayuda, Cerrar sesión
- KPIs: Total Comunidades, kWh Mensual, Coste Mensual, Alertas Activas
- Table: Nombre, Unidades, Consumo (kWh), Coste (€), Estado
- States: Optimizado, Analizando, Alerta
- CTA buttons: "Ver Estrategia", "Solicitar Presupuesto"

### Lead Capture Section (for Shelly hardware):
- Section title: "Monitorización en Tiempo Real"
- Subtitle: "Instala un medidor de consumo y optimiza tu factura"
- 3 benefit cards with icons
- CTA: "Solicitar Presupuesto Gratis"
- Form: Nombre, Email, Teléfono, Tipo de propiedad

### Key Reference Sites:
- Linear.app — clean, fast, premium dark (but we do LIGHT)
- Notion — warm, friendly, professional
- Stripe — trustworthy, data-rich
- Vercel — minimal, technical
- Raycast — modern, fast, beautiful

THIS MUST LOOK LIKE A REAL PRODUCT, NOT A TEMPLATE. Every pixel must be intentional.`;

async function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args
      }
    });

    const options = {
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Failed to parse response: ' + data));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. Creando proxecto Stitch PREMIUM...');
  const project = await callStitch('create_project', { title: 'EnergyOS Pro — Premium Dashboard 2026' });
  
  let projectId = null;
  if (project.result?.structuredContent?.name) {
    projectId = project.result.structuredContent.name;
  } else if (project.result?.project?.id) {
    projectId = project.result.project.id;
  } else if (project.result?.projectId) {
    projectId = project.result.projectId;
  } else if (project.result?.name) {
    projectId = project.result.name;
  }
  
  const numericProjectId = projectId?.replace('projects/', '');
  console.log('Project ID:', numericProjectId);
  
  if (!projectId) {
    console.error('Non se puido extraer o Project ID');
    return;
  }

  console.log('\n2. Xerando dashboard PREMIUM...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  
  fs.writeFileSync('stitch-premium-response.json', JSON.stringify(screen, null, 2));

  if (screen.result?.isError) {
    console.error('Erro:', screen.result?.content?.[0]?.text);
    return;
  }

  const text = JSON.stringify(screen);
  const urls = text.match(/https:\/\/contribution\.usercontent\.google\.com\/download\?[^"\\]+/g) || [];
  console.log('URLs atopadas:', urls.length);

  if (urls.length > 0) {
    console.log('\n3. Descargando HTML...');
    const { execSync } = await import('child_process');
    
    for (let i = 0; i < Math.min(urls.length, 8); i++) {
      execSync(`curl -sL -o "test-premium-${i}.html" "${urls[i]}"`, { stdio: 'inherit' });
      const size = fs.statSync(`test-premium-${i}.html`).size;
      console.log(`URL ${i}: ${size} bytes`);
    }
    
    let bestIdx = 0;
    let bestSize = 0;
    for (let i = 0; i < Math.min(urls.length, 8); i++) {
      const size = fs.statSync(`test-premium-${i}.html`).size;
      if (size > bestSize) {
        bestSize = size;
        bestIdx = i;
      }
    }
    
    execSync(`cp test-premium-${bestIdx}.html stitch-dashboard-premium.html`);
    console.log(`\nUsando URL ${bestIdx} (${bestSize} bytes)`);
    
    const html = fs.readFileSync('stitch-dashboard-premium.html', 'utf8');
    console.log('É HTML:', html.includes('<!DOCTYPE'));
    console.log('Modo claro:', html.includes('class="light"') || html.includes('#F8F7F4'));
    console.log('En español:', html.includes('Panel') || html.includes('Comunidades'));
    
    console.log('\n4. Tomando screenshot...');
    fs.writeFileSync('screenshot-premium.mjs', `
      import { chromium } from 'playwright';
      import path from 'path';
      const htmlPath = path.resolve('stitch-dashboard-premium.html');
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-premium-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    `);
    execSync('node screenshot-premium.mjs', { stdio: 'inherit' });
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
