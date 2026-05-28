import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

// Cargar o prompt v3 en español con estilo amigable
const prompt = fs.readFileSync('STITCH_PROMPT_ES_V3.md', 'utf8');

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
  console.log('1. Creando proxecto Stitch v3...');
  const project = await callStitch('create_project', { title: 'EnergyOS Dashboard v3 - España (Estilo Amigable)' });
  
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

  console.log('\n2. Xerando pantalla do dashboard v3 en español (estilo amigable)...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  
  fs.writeFileSync('stitch-v3-response.json', JSON.stringify(screen, null, 2));
  console.log('Resposta gardada en stitch-v3-response.json');

  // Verificar se hai erro
  if (screen.result?.isError) {
    console.error('Erro na xeración:', screen.result?.content?.[0]?.text);
    return;
  }

  // Extraer URL de descarga do HTML
  let downloadUrl = null;
  if (screen.result?.structuredContent?.outputComponents) {
    for (const comp of screen.result.structuredContent.outputComponents) {
      if (comp.design?.downloadUrl) {
        downloadUrl = comp.design.downloadUrl;
      }
      if (comp.design?.screens) {
        for (const [key, value] of Object.entries(comp.design.screens)) {
          if (value.downloadUrl) {
            downloadUrl = value.downloadUrl;
          }
        }
      }
    }
  }

  // Se non atopou downloadUrl, buscar no texto
  if (!downloadUrl) {
    const text = JSON.stringify(screen);
    const match = text.match(/https:\/\/contribution\.usercontent\.google\.com\/download\?[^"\\]+/);
    if (match) {
      downloadUrl = match[0];
    }
  }

  console.log('Download URL:', downloadUrl ? 'Atopado' : 'Non atopado');

  if (downloadUrl) {
    console.log('\n3. Descargando HTML...');
    const { execSync } = await import('child_process');
    execSync(`curl -L -o stitch-dashboard-v3.html "${downloadUrl}"`, { stdio: 'inherit' });
    console.log('HTML descargado como stitch-dashboard-v3.html');
    
    // Verificar que está en español e modo claro
    const html = fs.readFileSync('stitch-dashboard-v3.html', 'utf8');
    const isSpanish = html.includes('lang="es"') || html.includes('Panel') || html.includes('Comunidades');
    const isLightMode = !html.includes('#0f172a') && !html.includes('#000000');
    console.log('En español:', isSpanish);
    console.log('Modo claro:', isLightMode);
    
    // Tomar screenshot
    console.log('\n4. Tomando screenshot...');
    const screenshotScript = `
      import { chromium } from 'playwright';
      import path from 'path';
      
      const htmlPath = path.resolve('stitch-dashboard-v3.html');
      const htmlUrl = 'file://' + htmlPath;
      
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(htmlUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-v3-preview.png', fullPage: true });
        console.log('Screenshot gardado como stitch-dashboard-v3-preview.png');
        await browser.close();
      })();
    `;
    fs.writeFileSync('screenshot-v3.mjs', screenshotScript);
    execSync('node screenshot-v3.mjs', { stdio: 'inherit' });
  } else {
    console.error('Non se atopou URL de descarga');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
