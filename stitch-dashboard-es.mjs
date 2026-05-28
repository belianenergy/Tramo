import https from 'https';
import fs from 'fs';

const API_KEY = process.env.STITCH_API_KEY || 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';

// Cargar o prompt en español
const prompt = fs.readFileSync('STITCH_PROMPT_ES.md', 'utf8');

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
  console.log('1. Creando proxecto Stitch...');
  const project = await callStitch('create_project', { title: 'EnergyOS Dashboard - España' });
  fs.writeFileSync('stitch-es-response-1.json', JSON.stringify(project, null, 2));
  
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
  console.log('Project ID:', projectId);
  console.log('Numeric Project ID:', numericProjectId);
  
  if (!projectId) {
    console.error('Non se puido extraer o Project ID');
    return;
  }

  console.log('\n2. Xerando pantalla do dashboard en español...');
  const screen = await callStitch('generate_screen_from_text', {
    project_id: numericProjectId,
    prompt: prompt,
    device_type: 'DESKTOP'
  });
  fs.writeFileSync('stitch-es-response-2.json', JSON.stringify(screen, null, 2));
  console.log('Resposta gardada en stitch-es-response-2.json');

  // Verificar se hai erro
  if (screen.result?.isError) {
    console.error('Erro na xeración:', screen.result?.content?.[0]?.text);
    return;
  }

  // Extraer URL de descarga do HTML
  let downloadUrl = null;
  let screenId = null;
  
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
          screenId = key;
        }
      }
    }
  }

  console.log('Screen ID:', screenId);
  console.log('Download URL:', downloadUrl ? 'Atopado' : 'Non atopado');

  if (downloadUrl) {
    console.log('\n3. Descargando HTML...');
    // Usar curl para descargar
    const { execSync } = await import('child_process');
    execSync(`curl -L -o stitch-dashboard-es.html "${downloadUrl}"`, { stdio: 'inherit' });
    console.log('HTML descargado como stitch-dashboard-es.html');
    
    // Tomar screenshot
    console.log('\n4. Tomando screenshot...');
    const screenshotScript = `
      import { chromium } from 'playwright';
      import path from 'path';
      
      const htmlPath = path.resolve('stitch-dashboard-es.html');
      const htmlUrl = 'file://' + htmlPath;
      
      (async () => {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
        await page.goto(htmlUrl, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'stitch-dashboard-es-preview.png', fullPage: true });
        console.log('Screenshot gardado como stitch-dashboard-es-preview.png');
        await browser.close();
      })();
    `;
    fs.writeFileSync('screenshot-es.mjs', screenshotScript);
    execSync('node screenshot-es.mjs', { stdio: 'inherit' });
  } else {
    console.error('Non se atopou URL de descarga');
  }
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
