import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

// Prompt moito máis específico e exixente baseado no deseño innovador
const prompt = `Create a REVOLUTIONARY dashboard for EnergyOS Pro — a B2B energy management platform for property managers in Spain.

THIS IS NOT A STANDARD DASHBOARD. This is a BENTO LAYOUT — asymmetric, modern, premium. Think Linear.app meets Raycast meets Notion.

## LAYOUT: Bento Grid (Asymmetric)

The content area uses a BENTO GRID — not a boring 4-column grid. Different cards have DIFFERENT SIZES creating visual hierarchy:

### Row 1: HERO METRIC (Full width, tall)
- One LARGE card spanning full width
- Shows the most important number: "8.420€" (Coste Mensual)
- Big number (56px), subtitle, trend indicator
- Subtle gradient accent bar on the left (green)

### Row 2: TWO KPI CARDS (Half width each)
- Left: "12 Comunidades" with building icon
- Right: "45.2k kWh" with lightning icon
- Each has trend arrow + percentage

### Row 3: WIDE CHART (Full width)
- "Consumo Agregado" area chart
- Period selector tabs: 24H | 7D | 30D
- Subtle gradient fill

### Row 4: TWO ACTION CARDS (Half width each)
- Left: "Asesor IA" — "8.500€/año ahorro" with CTA button
- Right: "Monitorización" — Shelly lead capture with CTA

### Row 5: DATA TABLE (Full width)
- "Listado de Comunidades"
- Columns: Nombre, Unidades, kWh, Coste, Estado
- Alternating rows, hover states

## COLORS (Warm Premium):
- Background: #F8F7F4 (warm off-white)
- Cards: #FFFFFF
- Primary: #1B4332 (deep forest green)
- Accent: #D4A574 (warm amber)
- Text: #1A1A2E
- Text secondary: #6B7280

## SIDEBAR (280px):
- Background: #FAFAF8 (slightly warmer)
- NO hard border — shadow separation only
- Logo "EnergyOS" at top
- Nav items: Panel, Fincas, Apartamentos, Arbitraje, Asesor
- Bottom: Configuración, Ayuda, Cerrar sesión
- Active item: subtle green background, left accent bar
- Icons: Phosphor/Lucide style, 20px

## TYPOGRAPHY:
- Font: Plus Jakarta Sans for everything
- Hero number: 56px Bold
- Headings: 22-28px SemiBold
- Body: 15px Regular
- Labels: 11px uppercase, letter-spacing 0.08em

## STYLE RULES:
- Border-radius: 16px on cards
- Shadows: subtle warm (not harsh)
- NO hard borders between elements
- Hover: translateY(-2px) + shadow increase
- All text in SPANISH (Castellano)

## SPANISH TEXT:
- Sidebar: Panel, Fincas, Apartamentos, Arbitraje, Asesor, Configuración, Ayuda, Cerrar sesión
- KPIs: Total Comunidades, kWh Mensual, Coste Mensual, Alertas Activas
- Table: Nombre, Unidades, Consumo (kWh), Coste (€), Estado
- States: Optimizado, Analizando, Alerta
- Buttons: Ver Estrategia, Solicitar Presupuesto

THIS MUST LOOK LIKE A REAL 2026 PRODUCT. Not a template. Not AI-generic. Premium, warm, innovative.`;

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
          reject(new Error('Failed to parse: ' + data.substring(0, 500)));
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. Creando proxecto Stitch BENTO...');
  const project = await callStitch('create_project', { title: 'EnergyOS Pro — Bento Dashboard 2026' });
  
  let projectId = null;
  if (project.result?.structuredContent?.name) projectId = project.result.structuredContent.name;
  else if (project.result?.project?.id) projectId = project.result.project.id;
  else if (project.result?.projectId) projectId = project.result.projectId;
  else if (project.result?.name) projectId = project.result.name;
  
  const numericProjectId = projectId?.replace('projects/', '');
  console.log('Project ID:', numericProjectId);
  
  if (!projectId) { console.error('Non se puido extraer o Project ID'); return; }

  console.log('\n2. Xerando BENTO dashboard...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  
  fs.writeFileSync('stitch-bento-response.json', JSON.stringify(screen, null, 2));

  if (screen.result?.isError) {
    console.error('Erro:', screen.result?.content?.[0]?.text);
    return;
  }

  const text = JSON.stringify(screen);
  const urls = text.match(/https:\/\/contribution\.usercontent\.google\.com\/download\?[^"\\]+/g) || [];
  console.log('URLs atopadas:', urls.length);

  if (urls.length > 0) {
    const { execSync } = await import('child_process');
    
    for (let i = 0; i < Math.min(urls.length, 8); i++) {
      execSync(`curl -sL -o "test-bento-${i}.html" "${urls[i]}"`, { stdio: 'inherit' });
      console.log(`URL ${i}: ${fs.statSync(`test-bento-${i}.html`).size} bytes`);
    }
    
    let bestIdx = 0, bestSize = 0;
    for (let i = 0; i < Math.min(urls.length, 8); i++) {
      const size = fs.statSync(`test-bento-${i}.html`).size;
      if (size > bestSize) { bestSize = size; bestIdx = i; }
    }
    
    execSync(`cp test-bento-${bestIdx}.html stitch-dashboard-bento.html`);
    console.log(`\nUsando URL ${bestIdx} (${bestSize} bytes)`);
    
    const html = fs.readFileSync('stitch-dashboard-bento.html', 'utf8');
    console.log('É HTML:', html.includes('<!DOCTYPE'));
    console.log('En español:', html.includes('Panel') || html.includes('Comunidades'));
    
    fs.writeFileSync('screenshot-bento.mjs', `
      import { chromium } from 'playwright';
      import path from 'path';
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('file://' + path.resolve('stitch-dashboard-bento.html'), { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-bento-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    `);
    execSync('node screenshot-bento.mjs', { stdio: 'inherit' });
  }
}

main().catch(console.error);
