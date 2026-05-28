import https from 'https';
import fs from 'fs';

const API_KEY = 'AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw';
const PROJECT_ID = '9100679721232803019';

function call(method, params = {}) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method, params });
    const options = {
      hostname: 'stitch.googleapis.com',
      port: 443,
      path: '/mcp',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-Goog-Api-Key': API_KEY,
      },
      timeout: 120000,
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve({ error: { message: 'Bad JSON: ' + data.slice(0, 500) } }); }
      });
    });
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function tool(name, args, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await call('tools/call', { name, arguments: args });
      if (res.result?.isError || res.error) {
        const msg =
          res.result?.content?.map((c) => c.text).join('\n') ||
          res.error?.message ||
          JSON.stringify(res).slice(0, 500);
        throw new Error(`${name} failed: ${msg}`);
      }
      return res;
    } catch (e) {
      if (i < retries && (e.message.includes('timeout') || e.message.includes('ETIMEDOUT'))) {
        console.warn(`  Retry ${i + 1}/${retries} for ${name}...`);
        await new Promise((r) => setTimeout(r, 5000));
        continue;
      }
      throw e;
    }
  }
  throw new Error('Should not reach');
}

const pages = [
  {
    key: 'landing',
    prompt:
      `Create the public landing page for EnergyOS, a Spanish B2B energy management platform for property managers.

Must include:
1. Hero title: "Reduce el coste energético de tus fincas y apartamentos con datos reales" with subheading about CUPS, Datadis, tariffs, OMIE, battery arbitrage and unit-level alerts.
2. Two primary CTAs: "Solicitar demo" and "Ver simulación".
3. Three segmented value props: Administración de Fincas, Gestión de Apartamentos, and Hardware Pilot (Shelly EM).
4. A product screenshot mockup area.
5. Problem section: opaque invoices, tariff complexity, no CUPS visibility, shared cost disputes.
6. Feature grid: Datadis, CUPS management, tariffs with taxes, OMIE prices, battery arbitrage, Shelly EM.
7. Hardware pilot section: "Fase 2: medición real con Shelly EM".
8. Pricing teaser.
9. Lead capture form fields: name, company, portfolio size, email, interest.

Design: Light mode (#FAFAFA background, white cards, #E5E5E5 borders). Primary accent #10B981 emerald. Plus Jakarta Sans headings, Inter body, JetBrains Mono for numbers. Premium B2B SaaS like Stripe/Linear. Spanish text throughout.`,
  },
  {
    key: 'dashboard',
    prompt:
      `Create the app Dashboard / Panel page for EnergyOS with a fixed left sidebar navigation.

Left sidebar navigation items (vertical list, icon + label):
- Logo "EnergyOS" at top
- Panel (active)
- Fincas
- Apartamentos
- CUPS/Datadis
- Tarifas/Asesor IA
- OMIE/Arbitraje
- Hardware Pilot
- Configuración

Main content:
- Header row with KPI cards: Total Comunidades (12, +2), Apartamentos (48, +5), CUPS Activos (15), Ahorro Estimado (8.500€/año), Coste Mensual (8.420€), Alertas Activas (3 red).
- OMIE price strip showing today/tomorrow prices.
- Consumption and cost area chart (emerald green fill).
- Portfolio split: fincas vs apartamentos pie/bar.
- AI Advisor card: next best action text, CTA button.
- Alerts summary: 3 alert rows with status badges.

Design: Light mode (#FAFAFA background, white cards, #E5E5E5 borders). Primary accent #10B981. Fincas blue #1565C0, apartments orange #F57C00. Plus Jakarta Sans headings, Inter body, JetBrains Mono for numbers. Premium B2B SaaS. Spanish text.`,
  },
  {
    key: 'fincas',
    prompt:
      `Create the "Fincas" module page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas (active), Apartamentos, CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot, Configuración.

Main content:
- Header "Fincas" with subtitle "Gestión de comunidades y reparto de gastos" and "Añadir comunidad" button.
- Community table with columns: Comunidad, Ciudad, Unidades, Consumo (kWh), Coste (€), Coeficiente, Estado.
- Status badges: Optimizado (green), Analizando (amber), Atención (red).
- Each row has an expand arrow for details.
- Expanded row detail card showing: coefficient-based expense split breakdown, common areas tags (Ascensor, Garaje, Iluminación), monthly billing allocation, and a "Calcular reparto" CTA.

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Plus Jakarta Sans headings, Inter body, JetBrains Mono for numbers. Professional B2B. Spanish.`,
  },
  {
    key: 'apartamentos',
    prompt:
      `Create the "Apartamentos" module page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos (active), CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot, Configuración.

Main content:
- Header "Apartamentos" with subtitle "Consumo por unidad y alertas a inquilinos" and "Añadir apartamento" button.
- Unit cards in a grid: each card shows apartment name, tenant/guest status badge (Ocupado/Disponible), monthly kWh consumption, contract/tariff badge, and a high-consumption alert indicator.
- Filter tabs: Todos, Ocupados, Alertas.
- A detail section showing: consumption history sparkline, current contract status, and a remote notification concept area with "Enviar alerta" CTA.

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Plus Jakarta Sans headings, Inter body, JetBrains Mono. Spanish.`,
  },
  {
    key: 'cups-datadis',
    prompt:
      `Create the "CUPS + Datadis" page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis (active), Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot, Configuración.

Main content:
- Header "CUPS y Datadis" with subtitle "Conecta tus contadores oficiales" and "Añadir CUPS" button.
- CUPS list table with columns: CUPS, Comunidad/Apartamento, Datadis Estado, Última sincronización, Consumo último mes (kWh), Alertas.
- Status badges: Conectado (green), Pendiente (amber), Error (red).
- An expanded row showing: Datadis authorization form preview (checkbox + email field), last sync timestamp, and monthly kWh imported from Datadis mini chart.
- A summary KPI bar: CUPS totales, Conectados, Pendientes, Errores.

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Spanish.`,
  },
  {
    key: 'tarifas-advisor',
    prompt:
      `Create the "Tarifas y Asesor IA" page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis, Tarifas/Asesor IA (active), OMIE/Arbitraje, Hardware Pilot, Configuración.

Main content:
- Header "Tarifas y Asesor IA" with subtitle "Recomendación de tarifa óptima y cálculos completos" and "Generar recomendación" CTA button.
- Current tariff card vs recommended tariff card, side by side, with savings amount highlighted in large emerald green numbers.
- Full tariff breakdown including: power term (kW), energy term (kWh), fixed costs, electricity tax, VAT, meter rental, and total.
- AI Advisor explanation card with icon, text explaining why the recommendation is optimal, and a confidence score.
- A table: Tarifa, Coste anual estimado (€), Ahorro vs actual (%), Ahorro absoluto (€). Rows for 3-4 tariff options.
- A detail expandable section: "Ver desglose completo con impuestos".

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Emerald numbers for savings. Spanish.`,
  },
  {
    key: 'omie-arbitraje',
    prompt:
      `Create the "OMIE + Arbitraje de Baterías" page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje (active), Hardware Pilot, Configuración.

Main content:
- Header "OMIE y Arbitraje de Baterías" with subtitle "Simulación de ahorro con baterías en mercado OMIE".
- Hourly OMIE price chart (line chart with price in €/MWh on y-axis, hours on x-axis).
- Battery capacity selector slider or segmented control: 2.4 kWh, 5 kWh, 10 kWh, 20 kWh.
- Charge/discharge window cards: charge when price < X, discharge when price > Y, with emerald green arrows.
- Simulated results panel with large numbers:
  - Ahorro diario simulado (€)
  - Ahorro mensual simulado (€)
  - Ahorro anual simulado (€)
  - Payback estimado (años)
- Battery brand context section mentioning Pylontech, BYD, Huawei, Victron with small logo placeholders.
- Important note badge: "Simulador en MVP. Piloto de hardware (baterías reales) como Fase 2."

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Arbitrage accent violet #7B1FA2 (subtle). Spanish.`,
  },
  {
    key: 'hardware-shelly',
    prompt:
      `Create the "Hardware Pilot / Shelly" page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot (active), Configuración.

Main content:
- Header "Piloto de Hardware" with subtitle "Monitores reales de consumo para tus propiedades".
- Hero section: Shelly EM and Shelly Pro EM cards showing product image placeholder, key specs (WiFi + Bluetooth, pinzas amperimétricas no intrusivas, 2 canales, CE certified), and "Ver especificaciones" link.
- Non-intrusive installation explanation card with icon steps: 1) Auditará el cuadro, 2) Colocamos pinzas amperimétricas, 3) Conectamos a WiFi, 4) Datos en tu panel en 5 min.
- Pilot package cards:
  - Starter: 1 Shelly EM + instalación + conexión al panel
  - Professional: 3 Shelly Pro EM + instalación + soporte 12 meses
  - Enterprise: 10+ unidades + custom
- Roadmap visual: Auditar → Instalar → Conectar → Optimizar
- Lead capture form: name, company, number of properties, email, message.
- Footer note: "Fase 2 del roadmap EnergyOS. El software MVP está disponible ahora."

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Spanish.`,
  },
  {
    key: 'configuracion',
    prompt:
      `Create the "Configuración" admin page for EnergyOS with left sidebar navigation.

Sidebar items: EnergyOS logo, Panel, Fincas, Apartamentos, CUPS/Datadis, Tarifas/Asesor IA, OMIE/Arbitraje, Hardware Pilot, Configuración (active).

Main content:
- Header "Configuración de Organización".
- Vertical tab navigation on the left of main area: Perfil, Usuarios, Conexiones, Plan de facturación, Reglas de alertas.
- Perfil tab: organization name, tax ID, address, logo upload placeholder, "Guardar cambios" button.
- Usuarios tab: team member table with name, email, role (Admin, Editor, Viewer), status badge (Activo/Invitado), and add user button.
- Conexiones tab: API/data connection cards:
  - Datadis: status green "Conectado", last sync date, "Reautorizar" button.
  - OMIE: status green "Activo", "Ver precios" button.
  - Shelly Cloud: status gray "No conectado", "Configurar" button.
- Plan de facturación tab: current plan card, usage metrics (comunidades, apartamentos, CUPS), upgrade CTA.
- Reglas de alertas tab: alert rule rows with condition text ("Consumo > 150% media"), threshold input, channel toggle (email/panel), status toggle.

Design: light mode #FAFAFA, white cards, #E5E5E5 borders. Primary #10B981. Spanish.`,
  },
];

async function main() {
  const outputs = [];
  let currentScreenId = '';

  for (const page of pages) {
    await new Promise((r) => setTimeout(r, 2000));

    if (currentScreenId) {
      console.log(`\nCloning from previous screen for ${page.key}...`);
      try {
        const cloneRes = await tool(
          'clone_screen',
          {
            sourceScreenInstance: {
              id: currentScreenId,
              sourceScreen: `projects/${PROJECT_ID}/screens/${currentScreenId}`,
            },
            projectId: PROJECT_ID,
            newPrompt: `Modify this to become the ${page.key} page: ${page.prompt}`,
          },
          1
        );
        const text = cloneRes.result?.content?.[0]?.text || '';
        let parsed = null;
        try {
          parsed = JSON.parse(text);
        } catch {}
        outputs.push({ key: page.key, method: 'clone', response: parsed });
        if (parsed?.screenId) currentScreenId = parsed.screenId;
        fs.writeFileSync(`stitch-${page.key}-clone.json`, JSON.stringify(cloneRes, null, 2));
        console.log(`Saved stitch-${page.key}-clone.json`);
        continue;
      } catch (e) {
        console.warn(`Clone failed for ${page.key}, falling back to text generation: ${e.message}`);
      }
    }

    console.log(`\nGenerating ${page.key} from text...`);
    try {
      const res = await tool(
        'generate_screen_from_text',
        {
          projectId: PROJECT_ID,
          prompt: page.prompt,
          deviceType: 'DESKTOP',
        },
        2
      );
      const text = res.result?.content?.[0]?.text || '';
      let parsed = null;
      try {
        parsed = JSON.parse(text);
      } catch {}
      outputs.push({ key: page.key, method: 'generate', response: parsed });
      if (parsed?.screen?.id || parsed?.screenId) {
        currentScreenId = parsed.screen?.id || parsed.screenId;
      }
      fs.writeFileSync(`stitch-${page.key}.json`, JSON.stringify(res, null, 2));
      console.log(`Saved stitch-${page.key}.json`);
    } catch (e) {
      console.error(`Failed to generate ${page.key}: ${e.message}`);
      outputs.push({ key: page.key, method: 'generate', error: e.message });
    }
  }

  fs.writeFileSync('stitch-summary.json', JSON.stringify({ projectId: PROJECT_ID, outputs }, null, 2));
  console.log('\nDone. Summary saved to stitch-summary.json');
}

main().catch((err) => {
  console.error(err.stack || err.message || err);
  process.exit(1);
});
