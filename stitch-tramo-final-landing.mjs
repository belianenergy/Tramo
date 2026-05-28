import https from "https";
import fs from "fs";

const PREFIX = "stitch-tramo-final";
const PROJECT_TITLE = "Tramo Final — Energy Operations for Tourist Portfolios";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

function tool(name, args) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      jsonrpc: "2.0", id: 1, method: "tools/call",
      params: { name, arguments: args },
    });
    const req = https.request({
      hostname: "stitch.googleapis.com", port: 443, path: "/mcp", method: "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body), "X-Goog-Api-Key": API_KEY },
    }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve(data); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function extractProjectName(resp) {
  // Try structured content first
  if (resp?.result?.structuredContent?.name) {
    return resp.result.structuredContent.name;
  }
  if (resp?.result?.content?.[0]?.text) {
    const t = resp.result.content[0].text;
    const m = t.match(/projects\/\d+/);
    if (m) return m[0];
  }
  return null;
}

function extractScreenId(resp) {
  // try structured content first
  if (resp?.result?.structuredContent?.name) {
    return resp.result.structuredContent.name;
  }
  if (resp?.result?.content?.[0]?.text) {
    const t = resp.result.content[0].text;
    // Try screen name pattern
    let m = t.match(/"name":\s*"([^"]+)"/);
    if (m) return m[1];
    m = t.match(/"screenId":\s*"([^"]+)"/);
    if (m) return m[1];
  }
  return null;
}

const LANDING_PROMPT = `Design a B2B landing page for Tramo — energy operations platform for Spanish tourist property managers.

H1 (EXACT, in Spanish):
"Convierte la energía de tu cartera turística en margen operativo."

Subcopy (in Spanish):
"Tramo cruza reservas, CUPS/Datadis, facturas y tarifas para que cada kWh tenga explicación, cada decisión tenga evidencia y cada propietario reciba un informe claro del impacto operativo sobre su factura."

Tagline: "Cada kWh, en su tramo correcto."
Primary CTA: "Diagnosticar mi cartera"
Secondary CTA: "Ver dashboard demo"

COLORS EXACT:
Background: #fcf9f8 cream/paper
Surface: #fffaf5 warm
Cards: #ffffff with border #ead8cd
Strong border: #dbc1b3
Text: #1c1b1b ink
Muted: #554338
Secondary: #755c4f
Signal orange: #e6813a
Deep orange: #984700
Error: #ba1a1a
Success: #0f766e

TYPOGRAPHY: Plus Jakarta Sans for headlines (weight 600), Inter for body (weight 400), JetBrains Mono for numbers and metrics.

LOGO: Draw an inline SVG monoline segmented bracket/path with three interval segments, one orange (#e6813a) signal dot on the active segment, and small tick marks at segment boundaries. Do NOT use lightning, leaf, bolt, eco, or AI symbols.

HERO LAYOUT:
Two columns. Left side: the H1 headline, subcopy text, two CTA buttons ("Diagnosticar mi cartera" in orange filled, "Ver dashboard demo" in outlined ghost). Above the H1, a small pill badge: "Pilotos con gestoras 10+ alojamientos". 

Right side: A PRODUCT PANEL built with HTML/CSS/SVG (NOT an image, NOT a screenshot, NOT a phone mockup). The panel is a realistic dashboard card with:
- Header: "Panel de control" with a date "Mayo 2026"
- KPI row: "1,847 kWh" (total), "312 kWh fuera de reserva" (in orange)
- Evidence row: "VGO-014 · checkout 11:00 · 4,2 kWh entre 13:10-16:40 sin reserva activa"
- P1/P2 comparison: "Actual: 4.6/4.6 kW | Recomendado: 3.3/4.6 kW"
- Action: "Revisar termo y regla post-checkout"
- Small owner report status indicator

PAIN TRIPTYCH (3 cards below hero, centered):
1. "Consumo fuera de reserva" — "4,2 kWh sin reserva activa · VGO-014 · checkout 11:00"
2. "Potencia o tarifa equivocada" — "P2 recomendada: 3,3 kW | Actual: 4,6 kW · Ahorro potencial"
3. "Informes sin explicación operativa" — "412 kWh · 3 acciones de gestión · 42,50 EUR estimados"

SYSTEM FLOW section (horizontal):
PMS/Reservas → CUPS/Datadis/Facturas → Decisiones defendibles → Informes propietarios
Use simple clean icons, connected by arrows. Warm paper background.

MODULES GRID (3 columns, 2 rows):
Dashboard · Operaciones · Apartamentos · Tarifas y Potencia · Informes Propietario · Piloto
(Battery/arbitrage as a small 7th module labeled "premium" at bottom)

PRODUCT PROOF section:
"Valida Tramo con tu cartera" — show a dashboard preview card with real-looking data.

LEAD FORM section:
Title: "Solicitar diagnóstico"
All fields in Spanish:
- Nombre*
- Empresa*
- Email*
- Nº de alojamientos*
- Ciudad/Región*
- PMS utilizado*
- ¿Acceso a Datadis/CUPS? (Sí/No/No lo sé)
- ¿Facturas recientes? (Sí/No)
- ¿Quién paga la factura eléctrica? (Propietario/Gestor/Huésped/Varía)
- Dolor principal* (textarea)
- Módulos de interés (checkboxes): Consumo fuera de reserva, Reglas operativas, Tarifa/potencia, Informes propietarios, Evaluación batería/arbitraje (solo si los datos lo justifican)

PRIVACY HELPER COPY (visible near the submit button):
"No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles y cómo preparar un piloto seguro."

CTA button: "Solicitar diagnóstico" (orange filled)

FOOTER: Logo "Tramo", © 2026 Tramo, links (Privacidad, Términos)

DO NOT INCLUDE:
- English text anywhere on the page
- References to "Sourceful", "Seline", "Pirsch", "Orderful", "Precision Operations" or design process
- "Ahorro garantizado" or savings-first messaging
- Generic phone mockups or screenshot placeholders
- Decorative gradients, orbs, blobs
- More than one dark/ink section (one optional editorial band max)
- AI/eco/green cliches

MOBILE: At 375px width, hero stacks text first then panel, CTA visible without scrolling deep, no horizontal scroll.

DARK SECTION: One optional ink band for editorial contrast. The product UI stays paper/white — this is an energy operations tool, not a dark-mode SaaS.`;

async function main() {
  // Step 1: Create project
  console.log("Creating project...");
  const projResp = await tool("create_project", { title: PROJECT_TITLE });
  fs.writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projResp, null, 2));
  const projName = extractProjectName(projResp);
  if (!projName) { console.error("FAIL: no project name in response"); process.exit(1); }
  const projectId = String(projName).replace(/^projects\//, "");
  console.log(`Project: projects/${projectId}`);

  // Step 2: Generate landing
  console.log("Generating landing...");
  const genResp = await tool("generate_screen_from_text", { prompt: LANDING_PROMPT, projectId });
  fs.writeFileSync(`${PREFIX}-landing-response.json`, JSON.stringify(genResp, null, 2));
  const screenId = extractScreenId(genResp);
  if (!screenId) { console.error("FAIL: no screenId in response"); process.exit(1); }
  fs.writeFileSync(`${PREFIX}-landing-screen.json`, JSON.stringify({ projectId, screenId }, null, 2));
  console.log(`Screen: ${screenId}`);

  // Step 3: Get screen details
  console.log("Fetching screen...");
  const getResp = await tool("get_screen", { screenId });
  fs.writeFileSync(`${PREFIX}-landing-get-response.json`, JSON.stringify(getResp, null, 2));
  console.log("Done!");

  // Summary
  const summary = `# Tramo Final — Stitch Project Summary\n\n- Project: projects/${projectId}\n- Landing screen: ${screenId}\n- Files saved: response + screen + screenshot\n`;
  fs.writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(summary);
}

main().catch((e) => { console.error("FATAL:", e); process.exit(1); });
