import https from "https";
import fs from "fs";

const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";
const PREFIX = "stitch-tramo-vfinal";

const PROMPT = `Design a complete DESKTOP (1440px) B2B landing page for Tramo — an energy operations platform for Spanish tourist property managers.

CRITICAL: This is DESKTOP ONLY. Do not design for mobile.

STUDY AND APPLY THESE THREE REFERENCES WITH LOGIC:

60% — https://www.sourceful.energy/platform (energy infrastructure DNA):
Take: cream/paper light background, ink/near-black text, ONE signal orange (#e6813a) accent only, short editorial headlines, physical data (kWh, EUR, CUPS, P1/P2, timestamps), fine SVG line charts, technical diagrams, infrastructure flows. NO eco-green, AI gradients, or phone mockups.

25% — https://pirsch.io/es (product clarity):
Take: clean white metric cards with compact charts and visible units, real-looking product panels, clear module separation, friendly analytics, European professional feel, lots of white space with actionable data.

15% — https://www.orderful.com/ (conversion):
Take: clear hero-to-problem-to-system-to-modules-to-proof-to-form structure, strong recurring CTAs, alternating panels, single consistent action color, serious operational software feel.

---

BRAND: Tramo
LOGO: Create an inline SVG of a clean monoline segmented bracket/path. It has THREE horizontal interval segments of equal width connected by curved joints, ONE bright orange (#e6813a) signal dot positioned on the middle segment, and two small tick marks at the segment boundaries. The mark looks like an infrastructure/energy diagram. Pure monoline stroke, no fill except the dot. Use this in the header and footer.

H1: "Controla la energía de tu cartera turística."
SUBCOPY: "Tramo cruza consumo en tiempo real, reservas, CUPS/Datadis y tarifas para detectar kWh fuera de reserva, priorizar acciones y entregar informes claros a cada propietario."
PRIMARY CTA: "Diagnosticar mi cartera" (orange filled)
SECONDARY CTA: "Ver dashboard demo" (outlined)

EXACT COLORS:
Background: #fcf9f8 (cream/paper)
Surface: #fffaf5 (warm)
Cards: #ffffff with border #ead8cd
Strong border: #dbc1b3
Ink: #1c1b1b (main text)
Muted: #554338 (secondary)
Secondary text: #755c4f
ACCENT (use ONLY this one): #e6813a (signal orange)
Accent hover: #984700
Success only: #0f766e (teal)
Error: #ba1a1a

TYPOGRAPHY:
Headings: Plus Jakarta Sans, weight 600
Body: Inter, weight 400
Numbers/metrics: JetBrains Mono

---

SECTIONS (exact order, desktop 1440px):

=== HERO (two columns) ===
LEFT: Pill badge "Para gestoras con 10+ alojamientos" · H1 · Subcopy · Two CTAs
RIGHT: Realistic product dashboard in HTML/CSS (NOT an image):
- "Panel de control · Mayo 2026"
- 4 KPI pills: "1,847 kWh total" · "312 kWh fuera reserva" (orange) · "7 alertas" · "12/14 informados"
- Large alert card: "VGO-014 · vacío · 4.2 kWh fuera de reserva · 42 EUR estimados"
- P1/P2 comparison: "Actual 4.6/4.6 kW · Recomendado 3.3/4.6 kW"
- Small sparkline showing daily consumption
HOVER EFFECT: When hovering over dashboard data points, the highlighted element glows orange briefly.

=== PAIN TRIPTYCH (3 cards, centered) ===
Card 1 "Consumo fantasma": Before/After — "La factura llega a los 2 meses" → "Tramo te avisa en minutos"
Card 2 "Tarifa heredada": "Cada propiedad arrastra CUPS sin revisar" → "P2 3.3 kW, ahorro 180 EUR/año"
Card 3 "Sin explicación al propietario": "El propietario ve coste sin evidencias" → "Informe mensual con 412 kWh, 3 acciones, 42.50 EUR"

=== SYSTEM FLOW ===
Clean diagram: [PMS/Reservas] + [Sensores] + [CUPS/Datadis] + [Tarifas] → Tramo → [Alertas] → [Decisiones] → [Informes]

=== MODULES (2x2 grid, Pirsch-style clean cards) ===
1. "Consumo en tiempo real" — detect kWh fuera de reserva, live gauge, VGO-014 evidence
2. "Tarifa y potencia" — P1/P2 bars, CUPS analysis, 180 EUR/year savings
3. "Reglas por reserva" — automate appliances, check-in/check-out rules
4. "Informes a propietarios" — monthly reports, 412 kWh, 3 actions

=== BATTERY & ARBITRAGE (premium module) ===
A dedicated section with:
- DYNAMIC BATTERY ILLUSTRATION: An SVG battery outline (rounded rectangle) partially filled. On hover, the fill level animates upward and the fill color transitions from neutral gray to vibrant orange (#e6813a), simulating a charging cycle.
- Next to the battery: "Carga a 0.06 EUR/kWh · Descarga a 0.18 EUR/kWh · Diferencial 0.12 EUR/kWh"
- Small OMIE hourly price sparkline (fine SVG line, orange)
- Copy: "Tus baterías compran barato y consumen cuando conviene. Tramo analiza los precios horarios de OMIE y activa la carga inteligente."
- Label: "Premium — evaluación bajo datos reales"

=== PRODUCT PROOF (dashboard, Pirsch style) ===
Property table + consumption area chart + alert queue + date selector. Clean white cards, fine charts, visible units.

=== TRUST ===
"Datos que usamos: PMS, CUPS/Datadis, facturas, sensores, tarifas"
"Datos que NO pedimos públicamente: credenciales, facturas completas"
"Estimaciones prudentes — sin ahorros garantizados"
"Piloto seguro — empieza con diagnóstico, sin compromiso"

=== LEAD FORM (Orderful conversion style) ===
Clean compact form. Fields: Nombre*, Empresa*, Email*, Nº alojamientos*, Ciudad*, PMS, ¿Datadis/CUPS?, Dolor principal*
CTA: "Solicitar diagnóstico" (orange)
Privacy text nearby: "No envíes credenciales ni facturas por este formulario."

FOOTER: Tramo wordmark · "consumo atribuido por reserva y propietario" · Madrid · © 2026

---

RULES:
- Spanish throughout, NEVER English
- ONE accent color maximum (orange #e6813a). Use it sparingly.
- Every data point has a unit: kWh, EUR, kW, timestamp
- Charts are fine SVG lines, not heavy fills
- NO gradients, orbs, blobs, phone mockups, stock images, AI/eco cliches
- DESKTOP ONLY`;

async function main() {
  function tool(name, args) {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name, arguments: args } });
      const req = https.request({
        hostname: "stitch.googleapis.com", port: 443, path: "/mcp", method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body), "X-Goog-Api-Key": API_KEY },
      }, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => { try { resolve(JSON.parse(d)); } catch (e) { resolve(d); } });
      });
      req.on("error", reject);
      req.write(body);
      req.end();
    });
  }

  console.log("Creating project...");
  const proj = await tool("create_project", { title: "Tramo Final v2 — Desktop" });
  const pid = proj.result.structuredContent.name.replace("projects/", "");
  console.log("Project:", pid);

  console.log("Generating landing (60-90s)...");
  const gen = await tool("generate_screen_from_text", { projectId: pid, prompt: PROMPT });
  const text = gen.result?.content?.[0]?.text || "";
  const sm = text.match(/"name":\s*"([^"]+)"/);
  const screenId = sm ? sm[1] : "NOT_FOUND";
  console.log("Screen:", screenId);

  fs.writeFileSync(`${PREFIX}-project.json`, JSON.stringify(proj, null, 2));
  fs.writeFileSync(`${PREFIX}-generate.json`, JSON.stringify(gen, null, 2));
  
  const summary = `# Tramo vFinal\n- Project: ${pid}\n- Screen: ${screenId}\n- URL: https://stitch.withgoogle.com/projects/${pid}\n`;
  fs.writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(summary);
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
