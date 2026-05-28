import https from "https";
import fs from "fs";

const PREFIX = "stitch-tramo-final";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

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

const PROMPT = `Design a complete, professional B2B DESKTOP landing page for Tramo — an energy operations platform for Spanish tourist property managers.

DESKTOP ONLY (1440px width). DO NOT design for mobile. Full desktop layout.

STUDY THESE THREE REFERENCE SITES TO UNDERSTAND THE VISUAL LANGUAGE, then apply exactly what each teaches:

REFERENCE 1 — https://www.sourceful.energy/platform (60% of the visual DNA):
This is an energy infrastructure company. Take from it:
- Cream/paper light background
- Ink/near-black text
- A SINGLE signal orange accent color — no other colorful accents
- Short, editorial headlines
- Specific physical data: kWh, EUR, CUPS, timestamps
- Fine SVG line charts, technical diagrams, infrastructure flows
- Voice: "data before buzzwords"
- NO eco-green, NO AI gradients, NO phone mockups

REFERENCE 2 — https://pirsch.io/es (25% — product clarity):
This is a privacy analytics platform. Take from it:
- Clean metric cards with compact charts and visible units
- Product panels that look real (not decorative mockups)
- Clear module separation
- Friendly but professional analytics presentation
- Lots of white space but filled with actionable data
- European, professional, privacy-respecting feel

REFERENCE 3 — https://www.orderful.com/ (15% — conversion rhythm):
This is a B2B EDI platform. Take from it:
- Clear layout: hero → problem → system → modules → proof → form
- Strong recurring CTAs
- Alternating text/visual panels
- Single consistent action color
- Serious, fast, operational software feel

---

BRAND: Tramo
LOGO: SVG monoline segmented bracket with 3 interval segments, 1 orange (#e6813a) dot, small tick marks. NO lightning, leaf, bolt, eco.

HEADLINE: "Controla la energía de tu cartera turística."
SUBCOPY: "Tramo cruza consumo en tiempo real, reservas, CUPS/Datadis y tarifas para detectar kWh fuera de reserva, priorizar acciones y entregar informes claros a cada propietario."

PRIMARY CTA: "Diagnosticar mi cartera" (orange filled)
SECONDARY CTA: "Ver dashboard demo" (outlined)

COLORS:
Background: #fcf9f8 (cream/paper)
Cards: #ffffff with border #ead8cd
Text: #1c1b1b (ink)
Muted text: #554338
Secondary text: #755c4f
ACCENT (use only this one): #e6813a (signal orange)
Accent hover: #984700
Green only for success: #0f766e
Error: #ba1a1a

TYPOGRAPHY:
Headings: Plus Jakarta Sans, weight 600
Body: Inter, weight 400
Numbers/Metrics: JetBrains Mono

---

SECTIONS (in this exact order):

=== SECTION 1: HERO (Sourceful style) ===
Two columns. 
LEFT: Pill badge "Para gestoras con 10+ alojamientos" | H1 headline | Subcopy | Two CTA buttons
RIGHT: A REALISTIC PRODUCT PANEL built in HTML/CSS/SVG (NOT an image, NOT a phone mockup) showing:
- "Panel de control · Mayo 2026"
- 4 KPI pills: 1,847 kWh total | 312 kWh fuera reserva | 7 alertas | 12/14 informados
- An ALERT prominently displayed: "⚠ VGO-014 · vacío · 4.2 kWh fuera de reserva · 42 EUR"
- P1/P2 bars: "Actual 4.6/4.6 kW | Recomendado 3.3/4.6 kW"
- Small sparkline chart
- When hovering over any data point, it should illuminate in orange

=== SECTION 2: PAIN TRIPTYCH (3 editorial cards, Sourceful style) ===
Card 1: "Consumo fantasma" — "La factura llega a los 2 meses y no sabes qué pasó" → "Tramo te avisa en minutos"
Card 2: "Tarifa y potencia heredadas" — "Cada propiedad arrastra CUPS sin revisar" → "P2 recomendada 3.3 kW, ahorro 180€/año"
Card 3: "Propietarios sin explicación" — "El propietario ve coste; tú no tienes evidencias" → "Informe mensual con 412 kWh, 3 acciones, 42.50 EUR"

=== SECTION 3: SYSTEM FLOW (diagram style, Sourceful) ===
Show: [PMS/Reservas] + [Sensores] + [CUPS/Datadis] + [Tarifas] → Tramo → [Alertas] → [Decisiones] → [Informes propietarios]
Clean icons, arrows, cream background.

=== SECTION 4: MODULES GRID (clean cards, Pirsch analytics style, 25%) ===
4 modules in a 2x2 grid:
1. "Consumo en tiempo real" — detect kWh fuera de reserva, live gauge
2. "Tarifa y potencia" — P1/P2 optimization, CUPS analysis  
3. "Reglas por reserva" — automate appliances around check-in/check-out
4. "Informes a propietarios" — monthly reports ready to send
Each card: clean, white, with a metric and a mini chart. Battery/arbitrage as a small "premium" badge on the 4th card.

=== SECTION 5: PRODUCT PROOF (dashboard style, Pirsch) ===
A clean dashboard panel showing:
- Property table: VGO-014 (Alerta), COR-007 (OK), SJO-021 (OK), MDR-003 (Alerta), BCN-055 (OK)
- Consumption chart: occupied vs idle vs anomaly — as a clean area chart
- Alert queue: 4 active alerts
- Date selector: "Mayo 2026"
Clean, white cards, fine charts, visible units.

=== SECTION 6: TRUST (editorial, Sourceful) ===
"Datos que usamos" vs "Datos que NO pedimos"
"Estimaciones prudentes" — no savings guarantees
"Piloto seguro" — start with diagnosis, no commitment

=== SECTION 7: LEAD FORM (Orderful B2B style, 15%) ===
Clean, compact form:
Fields: Nombre*, Empresa*, Email*, Nº alojamientos*, Ciudad*, PMS, ¿Datadis/CUPS?, Dolor principal*
CTA: "Solicitar diagnóstico" (orange)
Privacy copy visible: "No envíes credenciales ni facturas por este formulario."

FOOTER: Tramo · "consumo atribuido por reserva y propietario" · Madrid · © 2026

---

CRITICAL RULES:
- DO NOT design for mobile. DESKTOP ONLY. Full width.
- DO NOT mix styles chaotically. Sourceful leads identity, Pirsch leads data clarity, Orderful leads conversion structure.
- DO NOT use gradients, orbs, decorative blobs, AI/eco cliches, phone mockups, or stock images.
- DO NOT use English text anywhere. Spanish throughout.
- DO NOT use more than one accent color. Orange only.
- The single orange accent must be used sparingly — CTAs, alert indicators, the logo dot, chart highlights on hover.
- Every data point must have a unit: kWh, EUR, kW, timestamp.
- Charts must be fine SVG lines, not heavy filled areas.`;

async function main() {
  // Create project
  console.log("Creating project...");
  const proj = await tool("create_project", { title: "Tramo Final — Desktop Landing" });
  const pid = proj.result.structuredContent.name.replace("projects/", "");
  fs.writeFileSync(`${PREFIX}-project.json`, JSON.stringify(proj, null, 2));
  console.log("Project:", pid);

  // Generate
  console.log("Generating (this takes ~60-90s)...");
  const gen = await tool("generate_screen_from_text", { projectId: pid, prompt: PROMPT });
  fs.writeFileSync(`${PREFIX}-generate.json`, JSON.stringify(gen, null, 2));
  
  const text = gen.result?.content?.[0]?.text || "";
  const sm = text.match(/"name":\s*"([^"]+)"/);
  const screenId = sm ? sm[1] : "NOT_FOUND";
  console.log("Screen:", screenId);

  // Get screen
  const scr = await tool("get_screen", { screenId });
  fs.writeFileSync(`${PREFIX}-screen.json`, JSON.stringify(scr, null, 2));
  
  // Extract HTML and screenshot
  const st = scr.result?.content?.[0]?.text || "";
  try {
    const sj = JSON.parse(st);
    if (sj.html) {
      fs.writeFileSync(`${PREFIX}.html`, sj.html);
      console.log("HTML saved:", sj.html.length, "chars");
    }
    if (sj.thumbnailUrl) {
      console.log("Thumbnail:", sj.thumbnailUrl);
    }
  } catch(e) {
    console.log("Screen raw (first 200):", st.substring(0, 200));
  }

  const summary = `# Tramo Final\n- Project: ${pid}\n- Screen: ${screenId}\n- URL: https://stitch.withgoogle.com/projects/${pid}\n`;
  fs.writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(summary);
}

main().catch(e => { console.error("FATAL:", e.message); process.exit(1); });
