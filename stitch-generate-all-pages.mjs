import https from 'https';
import fs from 'fs';

const dashboardScript = fs.readFileSync('stitch-dashboard.mjs', 'utf8');
const API_KEY = (dashboardScript.match(/const API_KEY = '([^']+)'/) || [])[1] || process.env.STITCH_API_KEY;
if (!API_KEY) throw new Error('STITCH_API_KEY not found');

const PROJECT_ID_FILE = '.stitch_project_id';
const design = fs.readFileSync('DESIGN.md', 'utf8');
const brief = fs.readFileSync('STITCH_COMPLETE_BRIEF.md', 'utf8');

function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
    const req = https.request({
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY,
      },
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error('Bad JSON: ' + data)); }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function tool(name, args) {
  const result = await call('tools/call', { name, arguments: args });
  if (result.result?.isError) {
    const msg = result.result.content?.map(c => c.text).join('\n') || JSON.stringify(result);
    throw new Error(`${name} failed: ${msg}`);
  }
  return result;
}

async function createProject() {
  const existing = fs.existsSync(PROJECT_ID_FILE) ? fs.readFileSync(PROJECT_ID_FILE, 'utf8').trim().replace('projects/', '') : '';
  if (existing) {
    try {
      await tool('get_project', { name: `projects/${existing}` });
      return existing;
    } catch {}
  }
  const project = await tool('create_project', { title: 'EnergyOS Complete Product' });
  const text = project.result.content?.[0]?.text;
  const data = JSON.parse(text);
  const id = data.name.replace('projects/', '');
  fs.writeFileSync(PROJECT_ID_FILE, id);
  return id;
}

const common = `
Use this product brief and design system as mandatory source of truth.

DESIGN SYSTEM:\n${design}

PRODUCT BRIEF:\n${brief}

Hard requirements:
- Spanish UI text.
- Light mode only.
- Premium B2B professional SaaS, not generic AI startup.
- Must explicitly include validated EnergyOS functions: Fincas, Apartamentos, CUPS, Datadis, tariffs with taxes, OMIE, battery arbitrage, AI advisor, Shelly EM hardware pilot leads.
- Use EnergyOS as brand name, not EnergiCore or other names.
`;

const pages = [
  {
    key: 'landing',
    title: 'Landing Page',
    prompt: `${common}\nCreate the public landing page. Include hero, value props for Fincas/Apartamentos/Hardware Pilot, product screenshot mockup, problem section, feature grid, hardware pilot section, pricing teaser, and lead form.`
  },
  {
    key: 'dashboard',
    title: 'Dashboard / Panel',
    prompt: `${common}\nCreate the app Dashboard / Panel page with sidebar navigation. Include KPIs for comunidades, apartamentos, CUPS activos, ahorro estimado, coste mensual, alertas; OMIE strip; consumption/cost chart; portfolio split; advisor next best action; alerts summary.`
  },
  {
    key: 'fincas',
    title: 'Fincas',
    prompt: `${common}\nCreate the Fincas module page with sidebar. Include community table, coefficient-based expense split, common areas consumption, elevator/garage/lighting tags, monthly billing allocation, alert badges, and CTA Calcular reparto.`
  },
  {
    key: 'apartamentos',
    title: 'Apartamentos',
    prompt: `${common}\nCreate the Apartamentos module page with sidebar. Include rental unit cards/table, tenant/guest status, per-unit consumption, contract/tariff status, high consumption alerts, and remote notification concept.`
  },
  {
    key: 'cups-datadis',
    title: 'CUPS + Datadis',
    prompt: `${common}\nCreate the CUPS + Datadis page with sidebar. Include CUPS list, Datadis authorization status, last sync, missing/failed connections, add CUPS modal preview, and monthly kWh imported from Datadis.`
  },
  {
    key: 'tarifas-advisor',
    title: 'Tarifas + Asesor IA',
    prompt: `${common}\nCreate the Tarifas + Asesor IA page with sidebar. Include current vs recommended tariff, full tariff breakdown including taxes and regulated costs, AI explanation card, confidence score, and CTA Generar recomendación.`
  },
  {
    key: 'omie-arbitraje',
    title: 'OMIE + Arbitraje',
    prompt: `${common}\nCreate the OMIE + Arbitraje de Baterías page with sidebar. Include hourly OMIE price chart, battery capacity selector, charge/discharge windows, simulated savings daily/monthly/yearly, and battery brands Pylontech, BYD, Huawei, Victron. Say simulation now, hardware pilot later.`
  },
  {
    key: 'hardware-shelly',
    title: 'Hardware Leads / Shelly Pilot',
    prompt: `${common}\nCreate the Hardware Leads / Shelly Pilot page with sidebar. Include Shelly EM / Shelly Pro EM explanation, non-intrusive clamp measurement, pilot package cards, lead capture form, roadmap audit-install-connect-optimize.`
  },
  {
    key: 'configuracion',
    title: 'Configuración',
    prompt: `${common}\nCreate the Configuración admin page with sidebar. Include organization profile, team users, API/data connections (Datadis, OMIE, Shelly), billing plan, and alert rules.`
  }
];

async function main() {
  const projectId = await createProject();
  console.log(`Project: https://stitch.withgoogle.com/projects/${projectId}`);
  const outputs = [];

  for (const page of pages) {
    console.log(`\nGenerating ${page.key}...`);
    const res = await tool('generate_screen_from_text', {
      projectId,
      prompt: page.prompt,
      deviceType: 'DESKTOP',
      modelId: 'GEMINI_3_1_PRO'
    });
    fs.writeFileSync(`stitch-${page.key}-response.json`, JSON.stringify(res, null, 2));
    const text = res.result?.content?.[0]?.text;
    let parsed = null;
    try { parsed = JSON.parse(text); } catch {}
    outputs.push({ key: page.key, title: page.title, parsed });
    console.log(`Saved stitch-${page.key}-response.json`);
  }

  fs.writeFileSync('stitch-all-pages-summary.json', JSON.stringify({ projectId, outputs }, null, 2));
  console.log('\nDone. Summary saved to stitch-all-pages-summary.json');
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exit(1);
});
