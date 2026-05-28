import https from 'https';
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const PROMPT_FILE = 'STITCH_PROMPT_MVP_COMPLETO_RESTRO_STYLE_V1.md';
const PREFIX = 'stitch-mvp-restro-style-v1';
const PROJECT_TITLE = 'EnergyOS MVP Completo — Restro Style';

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const normalized = line.startsWith('export ') ? line.slice(7).trim() : line;
    const eq = normalized.indexOf('=');
    if (eq === -1) continue;
    const key = normalized.slice(0, eq).trim();
    let value = normalized.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile('.env');
loadEnvFile('.env.local');

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error('Missing STITCH_API_KEY. Load .env/.env.local before running this script.');
  process.exit(1);
}

const fullPrompt = fs.readFileSync(PROMPT_FILE, 'utf8');

const screens = [
  {
    key: 'landing',
    name: 'landing-publica',
    title: 'Landing pública',
    renderPreviews: true,
    focus: 'Crear SOLO la pantalla 1) Landing pública. Debe ser una landing SaaS completa con hero, proof bar, CTA demo y formulario/lead. No crear dashboard en esta llamada salvo como mini preview visual.'
  },
  {
    key: 'dashboard',
    name: 'dashboard-operativo',
    title: 'Dashboard operativo',
    renderPreviews: true,
    focus: 'Crear SOLO la pantalla 2) Dashboard operativo. Debe ser el centro de operaciones con KPIs accionables, prioridad ahora y operaciones recientes.'
  },
  {
    key: 'apartments',
    name: 'apartamentos-cartera',
    title: 'Apartamentos / cartera',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 3) Apartamentos / cartera. Debe mostrar tabla/cards de apartamentos con filtros y próximas acciones.'
  },
  {
    key: 'operations',
    name: 'operaciones-cola',
    title: 'Operaciones',
    renderPreviews: true,
    focus: 'Crear SOLO la pantalla 4) Operaciones. Debe mostrar cola filtrable de automatizaciones/alertas y detalle accionable lateral para VGO-014.'
  },
  {
    key: 'apartment-detail',
    name: 'detalle-apartamento',
    title: 'Detalle apartamento',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 5) Detalle apartamento para VGO-014 · Apartamento Areal, con timeline reserva/check-in/check-out, clima, consumo, alerta y recomendación tarifa discreta.'
  },
  {
    key: 'owner-report',
    name: 'informe-mensual-propietario',
    title: 'Informe mensual propietario',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 6) Informe mensual propietario para Marta Lago · Apartamento Areal · Abril 2026, con resumen, métricas, incidencias, ahorro estimado y CTA exportar/enviar.'
  },
  {
    key: 'tariff-power',
    name: 'optimizacion-tarifa-potencia',
    title: 'Optimización tarifa/potencia',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 7) Optimización tarifa/potencia como módulo secundario/discreto, con comparativa tarifa actual vs recomendada y ahorro estimado prudente.'
  },
  {
    key: 'leads',
    name: 'leads-solicitudes-piloto',
    title: 'Leads / solicitudes piloto',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 8) Leads / solicitudes piloto, vista interna simple con leads cualificados, número de alojamientos, dolor principal, intereses y estado contacto.'
  },
  {
    key: 'pilot-settings',
    name: 'configuracion-piloto',
    title: 'Configuración piloto',
    renderPreviews: false,
    focus: 'Crear SOLO la pantalla 9) Configuración piloto con integración calendario/PMS, reglas clima, umbrales consumo y notificaciones.'
  }
];

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
        catch { reject(new Error(`Failed to parse Stitch response: ${data.slice(0, 1000)}`)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

function parseEmbeddedPayload(response) {
  const content = response?.result?.content;
  if (!Array.isArray(content)) return null;
  for (const item of content) {
    const text = item?.text?.trim();
    if (!text || !text.startsWith('{')) continue;
    try { return JSON.parse(text); } catch {}
  }
  return null;
}

function extractProjectName(response) {
  const embedded = parseEmbeddedPayload(response);
  return response?.result?.structuredContent?.name
    || response?.result?.project?.id
    || response?.result?.projectId
    || response?.result?.name
    || embedded?.name
    || embedded?.project?.id
    || embedded?.projectId
    || null;
}

function collectScreens(response) {
  const roots = [response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean);
  const found = [];
  for (const root of roots) {
    if (root.screen) found.push(root.screen);
    if (Array.isArray(root.screens)) found.push(...root.screens);
    const comps = root.outputComponents || [];
    for (const comp of comps) {
      const compScreens = comp?.design?.screens || [];
      if (Array.isArray(compScreens)) found.push(...compScreens);
      else if (typeof compScreens === 'object') found.push(...Object.values(compScreens));
    }
  }
  return found.filter(Boolean);
}

function extractBestScreen(response) {
  const all = collectScreens(response);
  const design = all.filter(s => s.screenType !== 'DOCUMENT');
  return design[design.length - 1] || all[all.length - 1] || null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync('curl', ['-L', '-sS', '-o', target, url], { stdio: 'inherit' });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

function makePreviewScript(htmlPath, prefix) {
  return `
import { chromium } from 'playwright';
import path from 'path';
const viewports = [
  { name: 'mobile-375', width: 375, height: 1200 },
  { name: 'desktop-1440', width: 1440, height: 1400 }
];
const browser = await chromium.launch({ headless: true });
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.resolve(${JSON.stringify(htmlPath)}), { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const out = ${JSON.stringify(prefix)} + '-preview-' + viewport.name + '.png';
  await page.screenshot({ path: out, fullPage: true });
  await page.close();
  console.log('Screenshot saved: ' + out);
}
await browser.close();
`;
}

async function renderPreviews(htmlPath, prefix) {
  const scriptPath = `${prefix}-screenshot.mjs`;
  fs.writeFileSync(scriptPath, makePreviewScript(htmlPath, prefix));
  execFileSync('node', [scriptPath], { stdio: 'inherit' });
  return [`${prefix}-preview-mobile-375.png`, `${prefix}-preview-desktop-1440.png`];
}

function screenPrompt(screen) {
  return `${fullPrompt}\n\n---\n\n# Tarea concreta para esta llamada\n\n${screen.focus}\n\nNombre interno sugerido de la pantalla: ${screen.name}\nTítulo visible/metadata: ${screen.title}\n\nRepite la navegación común del MVP para que parezca parte del mismo producto. Mantén consistencia visual Restro Style con las demás pantallas: shell gris/beige cálido, paneles blanco/cream, acento naranja/caramelo, sidebar estrecha con iconos circulares, topbar compacta, cards redondeadas, charts finos y mucho aire. Devuelve una pantalla desktop responsive en modo claro.`;
}

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function main() {
  console.log(`Creating clean Stitch project: ${PROJECT_TITLE}`);
  const projectResponse = await callStitch('create_project', { title: PROJECT_TITLE });
  fs.writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));

  if (projectResponse?.error || projectResponse?.result?.isError) {
    console.error('Stitch project creation failed. Raw response saved.');
    console.error(JSON.stringify(projectResponse?.error || projectResponse?.result?.content, null, 2));
    process.exit(1);
  }

  const projectName = extractProjectName(projectResponse);
  if (!projectName) {
    console.error('Could not extract new project id. Raw response saved.');
    process.exit(1);
  }
  const projectId = String(projectName).replace(/^projects\//, '');
  fs.writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);
  console.log(`Project created: ${projectId}`);

  const summary = {
    projectTitle: PROJECT_TITLE,
    projectId,
    projectName: `projects/${projectId}`,
    promptFile: PROMPT_FILE,
    generatedAt: new Date().toISOString(),
    screens: {},
    errors: []
  };

  for (const screenDef of screens) {
    const base = `${PREFIX}-${screenDef.key}`;
    console.log(`\nGenerating ${screenDef.title} -> ${base}`);
    try {
      const response = await callStitch('generate_screen_from_text', {
        project_id: projectId,
        prompt: screenPrompt(screenDef),
        device_type: 'DESKTOP'
      });
      fs.writeFileSync(`${base}-response.json`, JSON.stringify(response, null, 2));

      if (response?.error || response?.result?.isError) {
        const err = response?.error || response?.result?.content || 'Unknown Stitch error';
        fs.writeFileSync(`${base}-error.json`, JSON.stringify(err, null, 2));
        summary.errors.push({ key: screenDef.key, title: screenDef.title, error: err });
        console.error(`Failed ${screenDef.key}; continuing.`);
        await sleep(1500);
        continue;
      }

      const screen = extractBestScreen(response);
      if (!screen) {
        const err = 'No screen found in Stitch response';
        summary.errors.push({ key: screenDef.key, title: screenDef.title, error: err });
        console.error(`${err} for ${screenDef.key}; continuing.`);
        await sleep(1500);
        continue;
      }

      const screenName = screen.name || (screen.id ? `projects/${projectId}/screens/${screen.id}` : null);
      const screenId = screen.id || screenName?.split('/').pop() || null;
      const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
      const screenshotUrl = screen.screenshot?.downloadUrl || null;
      const local = {
        response: `${base}-response.json`,
        meta: `${base}-meta.json`,
        html: null,
        stitchPng: null,
        previews: []
      };

      if (htmlUrl && download(htmlUrl, `${base}.html`)) local.html = `${base}.html`;
      if (screenshotUrl && download(screenshotUrl, `${base}-stitch.png`)) local.stitchPng = `${base}-stitch.png`;
      if (screenDef.renderPreviews && local.html) {
        local.previews = await renderPreviews(local.html, base);
      }

      const meta = {
        key: screenDef.key,
        requestedName: screenDef.name,
        title: screen.title || screenDef.title,
        projectId,
        projectName: `projects/${projectId}`,
        screenId,
        screenName,
        width: screen.width || null,
        height: screen.height || null,
        htmlCodeName: screen.htmlCode?.name || null,
        screenshotName: screen.screenshot?.name || null,
        htmlDownloadUrl: htmlUrl,
        screenshotDownloadUrl: screenshotUrl,
        generatedAt: new Date().toISOString(),
        sourcePromptFile: PROMPT_FILE,
        localFiles: local
      };
      fs.writeFileSync(`${base}-meta.json`, JSON.stringify(meta, null, 2));
      summary.screens[screenDef.key] = meta;
      console.log(`Generated ${screenDef.key}: ${screenId}`);
    } catch (error) {
      const err = { message: error.message, stack: error.stack };
      fs.writeFileSync(`${base}-exception.json`, JSON.stringify(err, null, 2));
      summary.errors.push({ key: screenDef.key, title: screenDef.title, error: error.message });
      console.error(`Exception ${screenDef.key}: ${error.message}`);
    }
    await sleep(2500);
  }

  fs.writeFileSync(`${PREFIX}-summary.json`, JSON.stringify(summary, null, 2));
  console.log('\nDone. Summary:');
  console.log(JSON.stringify({ projectId, screenCount: Object.keys(summary.screens).length, errors: summary.errors.length }, null, 2));
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
