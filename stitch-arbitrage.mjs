import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

const prompt = `Create a PREMIUM "Arbitrage Simulator" page for EnergyOS — a B2B energy management platform in Spain.

This page helps property managers understand if investing in a battery is worth it. It must be CONVINCING and INFORMATIVE.

## PAGE STRUCTURE:

### Header:
- Title: "Simulador de Arbitraje"
- Subtitle: "Descubre cuánto puedes ahorrar con una batería"
- Back button to dashboard

### SECTION 1: HERO — Battery Recommendation (Full width, prominent)
- Large card with green accent
- Title: "Recomendación de Batería para tu Propiedad"
- Subtitle: "Basado en tu consumo y los precios OMIE en tiempo real"
- Key metrics in large font:
  - "Ahorro Estimado: 1.247€/año"
  - "ROI: 24 meses"
  - "Batería Recomendada: Pylontech US3000C (7.2 kWh)"
- CTA button: "Solicitar Presupuesto" (large, green)

### SECTION 2: Configuration Panel (Left side)
Title: "Configuración de la Batería"
Inputs:
- Capacidad (kWh): slider 5-20 kWh, default 10
- Potencia máxima (kW): slider 2-10 kW, default 5
- Rendimiento (%): slider 85-95%, default 90%
- Precio estimado (€): auto-calculated based on capacity

### SECTION 3: Price Chart (Right side)
Title: "Precios OMIE — Últimas 24h"
- Line chart showing hourly electricity prices
- Green zones = cheap hours (charge battery)
- Red zones = expensive hours (discharge battery)
- Current price highlighted
- Average price line (dashed)

### SECTION 4: Simulation Results (Full width)
Title: "Resultados de la Simulación"
Three cards side by side:
1. "Sin Batería" — Coste actual: 8.420€/año
2. "Con Batería" — Coste con arbitraje: 7.173€/año
3. "Ahorro" — Ahorro anual: 1.247€/año (green, large number)

### SECTION 5: ROI Calculator
Title: "Retorno de la Inversión"
- Investment cost: 3.500€
- Annual savings: 1.247€
- Payback period: 2.8 years
- 10-year savings: 12.470€
- Visual: progress bar showing months to payback

### SECTION 6: CTA — Lead Capture
Title: "¿Quieres instalar esta batería?"
Subtitle: "Solicita un presupuesto sin compromiso"
Form:
- Nombre
- Email  
- Teléfono
- CUPS (optional)
Button: "Solicitar Presupuesto Gratis"

## COLORS:
- Background: #F8F7F4
- Cards: #FFFFFF
- Primary: #1B4332 (deep green)
- Accent: #D4A574 (warm amber)
- Text: #1A1A2E
- Success: #059669
- Warning: #D97706

## TYPOGRAPHY:
- Font: Plus Jakarta Sans
- Numbers: large, bold
- All text in SPANISH

## STYLE:
- Border-radius: 16px
- Shadows: subtle warm
- Premium, trustworthy feel
- NOT generic template look`;

async function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'tools/call',
      params: { name: toolName, arguments: args }
    });
    const options = {
      hostname: 'stitch.googleapis.com', port: 443, path: '/mcp', method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'X-Goog-Api-Key': API_KEY }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { reject(new Error(data.substring(0, 500))); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  console.log('1. Creando proxecto Arbitraje...');
  const project = await callStitch('create_project', { title: 'EnergyOS — Simulador de Arbitraje con Baterías' });
  let projectId = project.result?.structuredContent?.name || project.result?.project?.id || project.result?.projectId || project.result?.name;
  const numericProjectId = projectId?.replace('projects/', '');
  console.log('Project ID:', numericProjectId);
  if (!projectId) { console.error('Non se puido extraer o Project ID'); return; }

  console.log('\n2. Xerando pantalla de Arbitraje...');
  const screen = await callStitch('generate_screen_from_text', { project_id: numericProjectId, prompt: prompt, device_type: 'DESKTOP' });
  fs.writeFileSync('stitch-arbitrage-response.json', JSON.stringify(screen, null, 2));
  if (screen.result?.isError) { console.error('Erro:', screen.result?.content?.[0]?.text); return; }

  const text = JSON.stringify(screen);
  const urls = text.match(/https:\/\/contribution\.usercontent\.google\.com\/download\?[^"\\]+/g) || [];
  console.log('URLs:', urls.length);

  if (urls.length > 0) {
    const { execSync } = await import('child_process');
    for (let i = 0; i < Math.min(urls.length, 6); i++) {
      execSync(`curl -sL -o "test-arb-${i}.html" "${urls[i]}"`, { stdio: 'inherit' });
      console.log(`URL ${i}: ${fs.statSync(`test-arb-${i}.html`).size} bytes`);
    }
    let bestIdx = 0, bestSize = 0;
    for (let i = 0; i < Math.min(urls.length, 6); i++) {
      const size = fs.statSync(`test-arb-${i}.html`).size;
      if (size > bestSize) { bestSize = size; bestIdx = i; }
    }
    execSync(`cp test-arb-${bestIdx}.html stitch-arbitrage.html`);
    console.log(`\nUsando URL ${bestIdx} (${bestSize} bytes)`);
    
    fs.writeFileSync('screenshot-arb.mjs', `
      import { chromium } from 'playwright';
      import path from 'path';
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto('file://' + path.resolve('stitch-arbitrage.html'), { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-arbitrage-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    `);
    execSync('node screenshot-arb.mjs', { stdio: 'inherit' });
  }
}
main().catch(console.error);
