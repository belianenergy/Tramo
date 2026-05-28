import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-tramo-v2";
const PROJECT_TITLE = "Tramo V2 — Energy Management for Tourist Property Portfolios";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";
const SUMMARY_FILE = `${PREFIX}-summary.md`;

const SCREENS = [
  {
    key: "landing",
    title: "Landing — Lead Capture",
    prompt: `Design a professional B2B landing page for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary text: muted brown (#755c4f)
- Cards: white (#ffffff) with warm border (#ead8cd), radius 24-32px
- Typography: Plus Jakarta Sans for headlines (600 weight), Inter for body (400), JetBrains Mono for numbers/data
- NO gradients, NO decorative orbs, NO phone mockups, NO leaf/eco logos

LAYOUT:
1. HEADER: Logo 'Tramo' (wordmark, lowercase, confident sans), nav (Producto, Precio, Demo), CTA button 'Diagnosticar mi cartera' in orange
2. HERO SECTION:
   - H1: 'Explica cada kWh de tu cartera turística por reserva, factura y propietario.' (Plus Jakarta Sans, 48-56px, tight leading)
   - Subcopy: 'Tramo conecta reservas, CUPS/Datadis, facturas, tarifas y aparatos para separar consumo de estancia, consumo fuera de reserva y decisiones de potencia con evidencias defendibles.' (Inter, 18-20px, muted brown)
   - Right side: Real product panel showing a dashboard with metrics (kWh numbers, EUR amounts, timestamps)
   - Below H1: CTA 'Diagnosticar mi cartera' (orange, large) + secondary 'Ver dashboard demo' (ghost button)
3. PAIN TRIPTYCH (3 cards):
   - Card 1: 'Consumo fuera de reserva' — '4.2 kWh sin reserva activa' with evidence example
   - Card 2: 'Potencia o tarifa equivocada' — 'P2 recomendada: 3.3 kW | Actual: 4.6 kW'
   - Card 3: 'Informes sin explicación operativa' — '412 kWh | 3 acciones de gestión | 42.50 EUR estimados'
4. SYSTEM FLOW (horizontal): PMS/Reservas → CUPS/Datadis/Facturas → Decisiones → Informes Propietarios
5. MODULES GRID (3x2): Dashboard, Operaciones, Apartamentos, Tarifas y Potencia, Informes Propietario, Piloto
6. PRODUCT PROOF: Real dashboard screenshot showing actual portfolio data
7. LEAD FORM SECTION:
   - Title: 'Diagnosticar mi cartera'
   - Fields: Name*, Company*, Email*, Number of units*, City/Region*, PMS used*, Has Datadis/CUPS access? (yes/no/unknown), Has recent invoices? (yes/no), Who pays energy bill? (owner/manager/guest/varies), Main pain* (textarea)
   - Helper text: 'No envies credenciales ni facturas por este formulario. En la llamada revisamos que datos tienes disponibles y como preparar un piloto seguro.'
   - CTA: 'Solicitar diagnóstico'
8. FOOTER: Logo, © 2024 Tramo, links (Privacidad, Términos)

COLORS EXACTAS:
--paper: #fcf9f8
--surface: #fffaf5
--card: #ffffff
--border: #ead8cd
--strong-border: #dbc1b3
--ink: #1c1b1b
--muted: #755c4f
--signal-orange: #e6813a
--deep-orange: #984700

MOBILE: Stack vertical, hamburger menu, full-width cards

IMPORTANT: This is NOT a generic SaaS landing. It must look like energy infrastructure software with editorial quality. No AI buzzwords, no green eco imagery.`,
  },
  {
    key: "dashboard",
    title: "Dashboard — Portfolio KPIs",
    prompt: `Design a professional B2B portfolio dashboard for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary text: muted brown (#755c4f)
- Cards: white (#ffffff) with warm border (#ead8cd), radius 24-32px for marketing, 16px for app panels
- Typography: Plus Jakarta Sans for headlines (600 weight), Inter for body (400), JetBrains Mono for numbers/data
- NO gradients, NO decorative orbs, NO phone mockups, NO leaf/eco logos

DASHBOARD CONTENT:
- Top bar: 'Tramo' logo, breadcrumb 'Portfolio / Dashboard', date range selector (May 2026), user avatar
- KPI ROW (4 cards):
  1. 'Total kWh Mayo' — '1,847 kWh' with small sparkline
  2. 'kWh fuera de reserva' — '312 kWh' in orange (alerts)
  3. 'Alertas activas' — '7 acciones' 
  4. 'Propietarios informados' — '12 / 14'
- MAIN CHART AREA: 'Consumo por estado de reserva' — line/area chart showing kWh split by: estancia, fuera de reserva, idle. X-axis: días del mes. Legend: 3 series. Orange for estancia, gray for fuera de reserva.
- ACTION QUEUE PANEL (right side or below):
  - 'Cola de alertas' header
  - 4-5 alert rows showing: property code, alert type (icon), description, timestamp, action button 'Revisar'
  - Example rows:
    - 'VGO-014 · Consumo fuera de reserva · 4.2 kWh sin reserva · Hace 2h · [Revisar]'
    - 'COR-007 · Potencia recomendada · P2: 3.3 kW vs actual 4.6 kW · Hace 5h · [Revisar]'
- PROPERTY LIST (bottom):
  - Table with columns: Apartamento, Propietario, Ocupación %, kWh/estancia, kWh fuera reserva, Estado
  - 5-6 rows with realistic data
  - Status pills: 'OK' in teal, 'Alerta' in orange

DATA EXAMPLES:
- VGO-014: 87% ocupación, 142 kWh/estancia, 18.3 kWh fuera reserva, Alerta
- COR-007: 62% ocupación, 98 kWh/estancia, 4.1 kWh fuera reserva, OK
- SJO-021: 91% ocupación, 201 kWh/estancia, 0.8 kWh fuera reserva, OK
- MDR-003: 45% ocupación, 76 kWh/estancia, 22.1 kWh fuera reserva, Alerta

COLORS:
--paper: #fcf9f8, --surface: #fffaf5, --card: #ffffff, --border: #ead8cd
--ink: #1c1b1b, --muted: #755c4f, --signal-orange: #e6813a, --deep-orange: #984700
--teal: #0f766e, --error: desaturated red

MOBILE: Stack KPIs 2x2, chart full width, table scrolls horizontally`,
  },
  {
    key: "operations",
    title: "Operations — Action Queue",
    prompt: `Design a professional B2B operations queue screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary text: muted brown (#755c4f)
- Cards: white (#ffffff) with warm border (#ead8cd), radius 16px for app panels
- Typography: Plus Jakarta Sans for headlines, Inter for body, JetBrains Mono for metrics
- NO gradients, NO decorative orbs

LAYOUT:
- Top bar: 'Tramo' logo, breadcrumb 'Portfolio / Operaciones', filter/search area
- FILTER TABS (horizontal pill tabs):
  - 'Todas (14)'
  - 'Fuera de reserva (6)'
  - 'Potencia/Tarifa (4)'
  - 'Reglas de aparato (3)'
  - 'Informe propietario (1)'
- ALERT LIST (main content):
  Each alert row should show:
  - Left: alert type icon (colored), property code in bold, alert description
  - Middle: evidence snippet (e.g., 'VGO-014 · checkout 11:00 · consumo 13:10-16:40')
  - Right: timestamp ('Hace 2h'), severity indicator, action button '[Revisar]'
  
  Example rows:
  1. FUERA DE RESERVA:
     - Icon: calendar with X
     - 'VGO-014 · Consumo fuera de reserva'
     - 'checkout 11:00 · consumo 13:10-16:40 · 4.2 kWh facturado sin reserva activa'
     - 'Hace 2h' | orange badge 'Alta' | [Revisar]
  
  2. POTENCIA:
     - Icon: lightning bolt
     - 'COR-007 · Potencia recomendada'
     - 'P2 recomendada: 3.3 kW | Actual: 4.6 / 4.6 kW · Penalización activa'
     - 'Hace 5h' | orange badge 'Pendiente' | [Revisar]
  
  3. APARATO:
     - Icon: thermostat
     - 'MDR-003 · Termo activo fuera de reserva'
     - 'Reserva finalized hace 3 días · Termo sigue activo · 12.4 kWh acumulados'
     - 'Ayer 14:30' | yellow badge 'Media' | [Revisar]
  
  4. OWNER REPORT:
     - Icon: document
     - 'SJO-021 · Informe propietario pendientes'
     - '412 kWh Mayo · 3 acciones de gestión · 42.50 EUR estimados'
     - 'Hace 1d' | teal badge 'Listo' | [Ver informe]

- DETAIL PANEL (right side, when alert selected):
  - Property code and name
  - Alert type header
  - Evidence section: timestamps, kWh, invoice reference
  - 'Acción recomendada' section
  - 'Marcar como resuelta' button
  - 'Asignar a propietario' button

COLORS: same as blueprint (#fcf9f8, #ffffff, #ead8cd, #e6813a, #0f766e)

MOBILE: Stack vertically, filter tabs scroll horizontally, detail panel is a bottom sheet`,
  },
  {
    key: "apartments",
    title: "Apartments — Portfolio List",
    prompt: `Design a professional B2B apartments/portfolio screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary: muted brown (#755c4f)
- Cards: white with warm border (#ead8cd), radius 16px
- Typography: Plus Jakarta Sans headlines, Inter body, JetBrains Mono metrics
- NO gradients, NO decorative orbs, NO phone mockups

LAYOUT:
- Top bar: 'Tramo' logo, breadcrumb 'Portfolio / Apartamentos', date range, [Nuevo apartamento] button
- FILTER BAR:
  - Search input 'Buscar apartamento...'
  - Filter pills: Ciudad (Todos), Propietario (Todos), Estado (Todos + Alerta)
  - Sort: 'kWh/estancia ↓'
- PROPERTY GRID (3 columns on desktop):
  Each card shows:
  - Card header: property code 'VGO-014' + status badge 'Alerta' (orange) or 'OK' (teal)
  - Owner: 'María González'
  - Location: 'Vigo, Galicia'
  - Metrics row (JetBrains Mono):
    - Ocupación: '87%'
    - kWh/estancia: '142 kWh'
    - kWh fuera reserva: '18.3 kWh' (orange if high)
  - Last 7 days mini sparkline (kWh)
  - Footer: PMS 'Beds24', last sync 'Hace 3h', [Ver detalle →] link

  Example cards:
  1. VGO-014 · María González · Vigo · Alerta
     - 87% | 142 kWh/est | 18.3 kWh fuera (HIGH, orange)
     - Sparkline showing spikes mid-week
  
  2. COR-007 · Carlos Ruiz · Corunha · OK
     - 62% | 98 kWh/est | 4.1 kWh fuera (OK)
  
  3. SJO-021 · Susana Jiménez · Sanxenxo · OK
     - 91% | 201 kWh/est | 0.8 kWh fuera (OK)
  
  4. MDR-003 · Manuel Díaz · Madrid · Alerta
     - 45% | 76 kWh/est | 22.1 kWh fuera (HIGH, orange)
  
  5. PBL-008 · Paula Blanco ·PB Coruña · OK
     - 78% | 113 kWh/est | 2.3 kWh fuera (OK)
  
  6. OVR-015 · Olga Vázquez · Ourense · OK
     - 55% | 89 kWh/est | 1.2 kWh fuera (OK)

- STATS SUMMARY (bottom bar):
  - Total: 14 apartamentos
  - Media ocupación: 71%
  - Media kWh/estancia: 118 kWh
  - Alertas activas: 3

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e

MOBILE: 1 column stack, horizontal scroll for filter pills`,
  },
  {
    key: "tariff-power",
    title: "Tariff & Power — Optimization",
    prompt: `Design a professional B2B tariff and power optimization screen for Tramo, an energy management platform for Spanish tourist property managers.

STYLE:
- Background: cream/paper (#fcf9f8)
- Text: ink/near-black (#1c1b1b)
- Accent: signal orange (#e6813a)
- Secondary: muted brown (#755c4f)
- Cards: white with warm border (#ead8cd), radius 16px
- Typography: Plus Jakarta Sans headlines, Inter body, JetBrains Mono metrics
- NO gradients, NO decorative orbs

LAYOUT:
- Top bar: 'Tramo' logo, breadcrumb 'Portfolio / Tarifa y Potencia'
- SECTION 1: CURRENT TARIFF INFO
  - Card showing: Tarifa actual: '3.0 A (PEAJE 2.0TD)'
  - Contracted power: P1: 4.6 kW, P2: 4.6 kW
  - Billing period: 'Mayo 2026'
  - Last Datadis sync: 'Hace 2h'

- SECTION 2: POWER ANALYSIS TABLE
  - Table with columns: Apartamento, P1 actual, P1 recom., P2 actual, P2 recom., Estado
  - 5 rows with data:
    - VGO-014: P1 4.6/4.6→3.3, P2 4.6/4.6→3.3, 'Revisar'
    - COR-007: P1 4.6/4.6→3.3, P2 4.6/4.6→3.3, 'Revisar'
    - SJO-021: P1 5.5/5.5→4.1, P2 5.5/5.5→4.1, 'Revisar'
    - MDR-003: P1 3.3/3.3→3.3, P2 4.6/4.6→3.3, 'Pendiente'
    - PBL-008: P1 4.6/4.6→4.1, P2 4.6/4.6→3.3, 'OK'
  - Orange highlighting on rows needing action

- SECTION 3: SAVINGS ESTIMATE CARD
  - Card with border: 'Estimación de ahorro mensual'
  - 'P2 reducida de 4.6 a 3.3 kW en 8 apartamentos'
  - 'Ahorro estimado: 38-52 EUR/mes en terme de potencia'
  - Small note: 'Basado en 3 meses de consumo. No es una garantía.'
  - CTA: 'Revisar todos los cambios propuestos →'

- SECTION 4: TARIFF COMPARISON CHART
  - Simple bar chart: current tariff vs suggested (3.0A vs 2.0TD)
  - Show P1 and P2 separately
  - Orange for current, teal for recommended

- SECTION 5: RECOMMENDATIONS LIST
  - 3-4 action items:
    1. 'Revisar P2 en 8 apartamentos con potencia inflada'
    2. 'Evaluar cambio a tarifa 2.0TD con maxima potencia reducida'
    3. 'VGO-014:历史的 consumo de mayo sugiere P1 de 3.3 kW suficiente'
    4. 'Solicitar cambio de potencia a distribuidora antes del día 10 para生效el mes siguiente'

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e

MOBILE: Stack cards vertically, table scrolls horizontally with sticky first column`,
  },
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

- SECTION 4: COMPARISON (optional):
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

- SECTION 1: FUENTES DE DATOS (3 status cards):
  4 source cards in a 2x2 grid:

  1. PMS / Reservas:
     - Status badge: 'Conectado' (teal) or 'Pendiente' (orange)
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
  - Checkbox list of modules to activate:
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

COLORS: paper #fcf9f8, card #ffffff, border #ead8cd, ink #1c1b1b, signal-orange #e6813a, teal #0f766e for connected status, orange for pending

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

function extractProjectName(response) {
  const embedded = parseEmbeddedPayload(response);
  return (
    response?.result?.structuredContent?.name ||
    embedded?.name ||
    embedded?.project?.name ||
    embedded?.projectId ||
    null
  );
}

function collectScreens(response) {
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
  return found.filter(Boolean);
}

function extractBestScreen(response) {
  const all = collectScreens(response);
  return all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) || all.at(-1) || null;
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
  console.log("=== Tramo V2 — Stitch Generator ===\n");

  // Create project
  console.log("Creating project...");
  const projectResponse = await tool("create_project", { title: PROJECT_TITLE });
  fs.writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));
  const projectName = extractProjectName(projectResponse);
  if (!projectName) throw new Error("Could not extract project name");
  const projectId = String(projectName).replace(/^projects\//, "");
  console.log(`Project: projects/${projectId}`);
  console.log(`URL: https://stitch.withgoogle.com/projects/${projectId}\n`);

  const results = [];
  const errors = [];

  for (const screen of SCREENS) {
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

  // Summary
  const summaryMd = `# Tramo V2 — Stitch Summary

Generated: ${new Date().toISOString()}
Project: https://stitch.withgoogle.com/projects/${projectId}

## Screens Generated

${results.map(r => `- ${r.key}: screenId=${r.screenId}, html=${r.htmlUrl ? 'YES' : 'NO'}, png=${r.screenshotUrl ? 'YES' : 'NO'}`).join("\n")}

## Errors

${errors.length ? errors.map(e => `- ${e.key}: ${e.error}`).join("\n") : "None"}

## Status: ${errors.length === 0 ? "READY FOR LOOP 2" : "COMPLETED WITH ERRORS"}
`;

  fs.writeFileSync(SUMMARY_FILE, summaryMd);
  console.log("\n" + summaryMd);
}

generateScreens().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});