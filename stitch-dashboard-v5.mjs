import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

// Cargar o prompt v5 en castelán con captación de leads Shelly
const prompt = fs.readFileSync('STITCH_PROMPT_ES_V5.md', 'utf8');

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
  console.log('1. Creando proxecto Stitch v5...');
  const project = await callStitch('create_project', { title: 'EnergyOS Dashboard v5 - Español + Leads Shelly' });
  
  // Extraer project ID
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

  console.log('\n2. Xerando pantalla do dashboard v5 en castelán...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  
  fs.writeFileSync('stitch-v5-response.json', JSON.stringify(screen, null, 2));
  console.log('Resposta gardada en stitch-v5-response.json');

  // Verificar se hai erro
  if (screen.result?.isError) {
    console.error('Erro na xeración:', screen.result?.content?.[0]?.text);
    return;
  }

  // Extraer URLs de descarga
  const text = JSON.stringify(screen);
  const urls = text.match(/https:\/\/contribution\.usercontent\.google\.com\/download\?[^"\\]+/g) || [];
  console.log('URLs atopadas:', urls.length);

  if (urls.length > 0) {
    console.log('\n3. Descargando HTML...');
    const { execSync } = await import('child_process');
    
    // Descargar todos e coller o máis grande
    for (let i = 0; i < Math.min(urls.length, 6); i++) {
      execSync(`curl -sL -o "test-v5-${i}.html" "${urls[i]}"`, { stdio: 'inherit' });
      const size = fs.statSync(`test-v5-${i}.html`).size;
      console.log(`URL ${i}: ${size} bytes`);
    }
    
    // Coller o máis grande
    let bestIdx = 0;
    let bestSize = 0;
    for (let i = 0; i < Math.min(urls.length, 6); i++) {
      const size = fs.statSync(`test-v5-${i}.html`).size;
      if (size > bestSize) {
        bestSize = size;
        bestIdx = i;
      }
    }
    
    execSync(`cp test-v5-${bestIdx}.html stitch-dashboard-v5.html`);
    console.log(`\nUsando URL ${bestIdx} (${bestSize} bytes)`);
    
    // Verificar contido
    const html = fs.readFileSync('stitch-dashboard-v5.html', 'utf8');
    const isSpanish = html.includes('lang="es"') || html.includes('Panel') || html.includes('Comunidades') || html.includes('Fincas');
    const isLightMode = html.includes('class="light"') || html.includes('#FAFAFA') || html.includes('#fafafa');
    const hasShelly = html.includes('Shelly') || html.includes('shelly') || html.includes('Monitorización') || html.includes('monitorización');
    const hasLeads = html.includes('Presupuesto') || html.includes('presupuesto') || html.includes('Solicitar');
    console.log('En castelán:', isSpanish);
    console.log('Modo claro:', isLightMode);
    console.log('Ten Shelly:', hasShelly);
    console.log('Ten leads:', hasLeads);
    
    // Tomar screenshot
    console.log('\n4. Tomando screenshot...');
    const screenshotScript = `
      import { chromium } from 'playwright';
      import path from 'path';
      
      const htmlPath = path.resolve('stitch-dashboard-v5.html');
      const htmlUrl = 'file://' + htmlPath;
      
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(htmlUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-v5-preview.png', fullPage: true });
        console.log('Screenshot gardado');
        await browser.close();
      })();
    `;
    fs.writeFileSync('screenshot-v5.mjs', screenshotScript);
    execSync('node screenshot-v5.mjs', { stdio: 'inherit' });
  } else {
    console.error('Non se atoparon URLs de descarga');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
