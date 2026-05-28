import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-tramo-v2";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

// Screens that failed / weren't generated
const REMAINING = [
  {
    key: "owner-report",
    title: "Owner Report — Monthly Explanation",
    prompt: `Design a professional B2B owner report preview screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary: muted brown (#755c4f)
- Cards: white with warm border (#ead8cd), radius 16px
- Typography: Plus Jakarta Sans headlines, Inter body, JetBrains Mono metrics
- NO gradients, NO decorative orbs

NOTE: This is a report preview that will be SENT to property owners. It must look professional, trustworthy, and clear. Not a dashboard — a formal document-style report.

LAYOUT:
- DOCUMENT HEADER:
  - Tramo logo (small, top left)
  - 'Informe de energía — Mayo 2026'
  - Property: 'VGO-014 — Apartamento Vigo Centro'
  - Owner: 'María González'
  - Generated: '17 Mayo 2026'

- SECTION 1: CONSUMPTION SUMMARY (large KPI cards):
  - 'Consumo total: 412 kWh' (large, prominent)
  - 'Coste estimado: 68.40 EUR' (with small note: ' PVP medio 0.166 EUR/kWh')
  - Breakdown bar: 'Estancia: 340 kWh (82%)' + 'Fuera de reserva: 72 kWh (18%)'
  - Visual: horizontal stacked bar in orange/gray

- SECTION 2: CONSUMPTION DETAIL TABLE:
  - Table: Periodo, kWh, EUR, Notas
  - Rows:
    - 'Estancia 1-10 May': 142 kWh, 23.57 EUR, '7 noches'
    - 'Estancia 12-16 May': 98 kWh, 16.27 EUR, '4 noches'
    - 'Estancia 20-26 May': 100 kWh, 16.60 EUR, '6 noches'
    - 'Idle / fuera reserva': 72 kWh, 11.95 EUR, 'Sin ocupación'
  - Footer: 'Total: 412 kWh | 68.40 EUR'

- SECTION 3: ACTIONS TAKEN:
  - Card with list:
    1. 'Revisión potencia contratada · 4.60 → 3.30 kW P2 · Ahorro estimado: 14.20 EUR/mes'
    2. 'Regla termo post-checkout · Activada · Ahorro estimado: 8.30 EUR/mes'
    3. 'Detección consumo fuera de reserva · 72 kWh identificados · Investigando'
  - 'Total ahorro estimado: 22.50 EUR/mes'

- SECTION 4: COMPARISON:
  - 'vs mes anterior: +8% consumo' (explained: 'más días ocupación')
  - 'vs media portfolio: -12% kWh/estancia' (positive signal)

- FOOTER:
  - 'Informe generado automáticamente por Tramo — kWh explicados por reserva'
  - 'Para más detalle: Tramo Dashboard [link]'
  - Contact: 'Tu gestor de energía: Tramo'

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e for positive indicators

MOBILE: Single column, table scrolls horizontally, sections stack`,
  },
  {
    key: "leads",
    title: "Leads — Pilot CRM",
    prompt: `Design a professional B2B internal leads/pilot CRM screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary: muted brown (#755c4f)
- Cards: white with warm border (#ead8cd), radius 16px
- Typography: Plus Jakarta Sans headlines, Inter body, JetBrains Mono metrics
- NO gradients, NO decorative orbs

NOTE: This is an INTERNAL CRM tool, not customer-facing. Show realistic lead management data.

LAYOUT:
- Top bar: 'Tramo' logo, breadcrumb 'Pilot / Leads', [+ Nuevo Lead] button
- SUMMARY CARDS (top row):
  - 'Leads totales: 8'
  - 'Qualificados: 5'
  - 'Llamada programada: 2'
  - 'Piloto en curso: 1'

- FILTER/SORT BAR:
  - Search: 'Buscar lead...'
  - Filter pills: Estado (Todos, Nuevo, Qualificado, Llamada, Piloto)
  - Sort: 'Fecha ↓'

- LEADS TABLE:
  Columns: Lead, Empresa, Unidades, Ciudad, PMS, Pain principal, Datadis/CUPS, Facturas, Energía pago, Estado, Acciones

  Rows (realistic data):
  1. Carlos Mendoza | Apartamentos Mendoza | 12 | A Coruña | Beds24 | Consumo fuera de reserva | Sí | Sí | Propietario | Cualificado | [Ver] [Contactar]
  2. Laura García | Gestión Costa | 24 | Sanxenxo | Guesty | Informes propietarios | Parcial | Sí | Manager | Nuevo | [Ver] [Contactar]
  3. Pablo Santos | Santos Vacaciones | 8 | Vigo | Airbnb | Tarifa/potencia | No | No | Varía | Llamada 20 May | [Ver] [Contactar]
  4. Elena Torres | Torres Apartamentos | 31 | Barcelona | Siteminder | Todas | Sí | Sí | Propietario | Piloto propuesto | [Ver] [Contactar]
  5. Miguel Rodríguez | Rodríguez Pisos | 6 | Madrid | Booking | Reglas aparato | Desconocido | No | Propietario | Nuevo | [Ver] [Contactar]

- DETAIL PANEL (right side or modal):
  When a lead is selected:
  - Name, company, contact info
  - Status selector: Nuevo → Cualificado → Llamada programada → Piloto propuesto → Piloto en curso → Cliente
  - Notes section: free text area for call notes
  - Next action: date picker + 'Programar llamada'
  - Qualification checklist:
    - [x] 10+ unidades
    - [x] PMS conocido
    - [ ] Acceso Datadis confirmado
    - [ ] Facturas disponibles
    - [ ] Pain claro
  - Hardware interest: 'Shelly + datadis' / 'Solo datadis' / 'Evaluación completa'

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e for positive states

MOBILE: Card-based list view, detail panel as full-screen overlay`,
  },
  {
    key: "pilot-settings",
    title: "Pilot Settings — Configuration",
    prompt: `Design a professional B2B pilot settings/configuration screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary: muted brown (#755c4f)
- Cards: white with warm border (#ead8cd), radius 16px
- Typography: Plus Jakarta Sans headlines, Inter body, JetBrains Mono metrics
- NO gradients, NO decorative orbs

LAYOUT:
- Top bar: 'Tramo' logo, breadcrumb 'Pilot / Configuración', [Guardar cambios] button
- PAGE TITLE: 'Configuración del piloto'
- SUBTITLE: 'Define qué datos tienes disponibles y qué módulos activar para este cliente.'

- SECTION 1: FUENTES DE DATOS (2x2 grid):
  1. PMS / Reservas:
     - Status badge: 'Conectado' (teal)
     - PMS: 'Beds24'
     - Last sync: 'Hace 2h'
     - Properties: '12 apartamentos'
     - [Configurar →]

  2. Datadis / CUPS:
     - Status badge: 'Pendiente' (orange)
     - Explanation: 'Acceso no configurado'
     - Note: 'Sin acceso Datadis no podemos separar consumo por reserva automáticamente'
     - [Solicitar acceso Datadis →]

  3. Facturas / CSV:
     - Status badge: 'Parcial' (yellow)
     - '5 facturas cargadas (Ene-Abr 2026)'
     - Last invoice: 'Abril 2026'
     - [Subir facturas →]

  4. Reglas de aparato:
     - Status badge: 'No configurado' (gray)
     - '0 reglas activas'
     - Example: 'Termo OFF 30min post-checkout'
     - [Crear regla →]

- SECTION 2: ALCANCE DEL PILOTO:
  - Checkbox list of modules:
    - [x] Dashboard de portfolio
    - [x] Cola de operaciones
    - [x] Apartamentos
    - [x] Tarifa y potencia
    - [ ] Informes propietario (requires Datadis)
    - [ ] Evaluación batería/arbitraje (requires 6+ meses datos)
  - Pilot duration: '4 semanas'
  - Pilot start: '17 Mayo 2026'

- SECTION 3: UMBRALES Y ALERTAS:
  - 'kWh fuera de reserva threshold: 5 kWh/mes' (input field)
  - 'Potencia alert: >10% sobre recomendación' (toggle)
  - 'Notificar a: mauro@tramo.io' (email input)

- SECTION 4: NOTAS INTERNAS:
  - Textarea: 'Cliente con 12 apartamentos en A Coruña. Acceso Datadis pendiente. Primer contacto: 20 Mayo. Pain principal: consumo fuera de reserva en temporada alta.'

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e for connected, orange for pending, yellow for partial

MOBILE: Stack cards vertically, sections scroll naturally`,
  },
];

function callStitch(toolName, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      id: Date.now(),
      method: "tools/call",
      params: { name: toolName, arguments: args },
    });
    const req = https.request(
      {
        hostname: "stitch.googleapis.com",
        port: 443,
        path: "/mcp",
        method: "POST",
        timeout: 240000,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
          "X-Goog-Api-Key": API_KEY,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse response: ${data.slice(0, 500)}`));
          }
        });
      },
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out after 240s"));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

async function tool(name, args) {
  const response = await callStitch(name, args);
  if (response?.error || response?.result?.isError) {
    const text =
      response?.error?.message ||
      response?.result?.content?.map((item) => item.text).join("\n") ||
      "Unknown error";
    throw new Error(`${name} failed: ${text}`);
  }
  return response;
}

function parseEmbeddedPayload(response) {
  for (const item of response?.result?.content || []) {
    const text = item?.text?.trim();
    if (!text?.startsWith("{")) continue;
    try {
      return JSON.parse(text);
    } catch {}
  }
  return null;
}

function extractBestScreen(response) {
  const roots = [response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean);
  const found = [];
  for (const root of roots) {
    if (root.screen) found.push(root.screen);
    if (Array.isArray(root.screens)) found.push(...root.screens);
    for (const comp of root.outputComponents || []) {
      const screens = comp?.design?.screens || [];
      if (Array.isArray(screens)) found.push(...screens);
      else if (typeof screens === "object") found.push(...Object.values(screens));
    }
  }
  return found.filter((s) => s.screenType !== "DOCUMENT").at(-1) || found.at(-1) || null;
}

function download(url, target) {
  if (!url) return false;
  try {
    execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
    return fs.existsSync(target) && fs.statSync(target).size > 0;
  } catch {
    return false;
  }
}

async function generateScreens() {
  // Read project ID from existing run
  const projectIdFile = `${PREFIX}.project-id`;
  let projectId = fs.readFileSync(projectIdFile, "utf8").trim();
  if (!projectId) {
    console.error("Cannot find project ID. Run the full generator first.");
    process.exit(1);
  }
  console.log(`Using project: ${projectId}`);

  const results = [];
  const errors = [];

  for (const screen of REMAINING) {
    const base = `${PREFIX}-${screen.key}`;
    console.log(`[${screen.key}] Generating...`);
    try {
      const response = await tool("generate_screen_from_text", {
        projectId,
        prompt: screen.prompt,
        deviceType: "DESKTOP",
        modelId: "GEMINI_3_1_PRO",
      });
      fs.writeFileSync(`${base}-response.json`, JSON.stringify(response, null, 2));

      const nextScreen = extractBestScreen(response);
      if (!nextScreen) throw new Error("No screen found in response");

      const screenId = nextScreen.id || null;
      const htmlUrl = nextScreen.htmlCode?.downloadUrl || nextScreen.downloadUrl || null;
      const screenshotUrl = nextScreen.screenshot?.downloadUrl || null;

      const meta = {
        key: screen.key,
        title: screen.title,
        projectId,
        screenId,
        htmlDownloadUrl: htmlUrl,
        screenshotDownloadUrl: screenshotUrl,
        generatedAt: new Date().toISOString(),
      };

      if (htmlUrl) download(htmlUrl, `${base}.html`);
      if (screenshotUrl) download(screenshotUrl, `${base}-stitch.png`);

      fs.writeFileSync(`${base}-screen.json`, JSON.stringify(meta, null, 2));
      console.log(`[${screen.key}] Done. screenId=${screenId}, html=${!!htmlUrl}, png=${!!screenshotUrl}`);
      results.push({ key: screen.key, screenId, htmlUrl, screenshotUrl });
    } catch (err) {
      console.error(`[${screen.key}] ERROR: ${err.message}`);
      errors.push({ key: screen.key, error: err.message });
    }
  }

  console.log(`\n=== Remaining Screens ===`);
  console.log(`Generated: ${results.map(r => r.key).join(", ")}`);
  console.log(`Errors: ${errors.map(e => e.key + ": " + e.error).join("; ")}`);
}

generateScreens().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});