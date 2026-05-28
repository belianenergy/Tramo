import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-tramo-v2";
const OUT_PREFIX = "stitch-tramo-v2-landing-v3";
const PROJECT_ID = "14459937659544842449";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";
const SCREEN_ID = JSON.parse(fs.readFileSync(`${PREFIX}-landing-screen.json`, "utf8")).screenId;

const prompt = `
Redesign this landing page to be a professional B2B energy operations platform for Spanish tourist property managers.

H1 (keep exactly):
"Control energético por reserva para carteras de apartamentos turísticos."

Subcopy:
"Tramo cruza reservas, CUPS/Datadis, facturas, tarifas y reglas operativas para atribuir consumo, detectar desvíos fuera de estancia y preparar informes defendibles para propietarios."

Proof line (under subcopy):
"Cada kWh queda situado en su tramo: estancia, espera, tarifa, factura y propietario."

Primary CTA: "Diagnosticar mi cartera"
Secondary CTA: "Ver dashboard demo"

VISUAL SYSTEM:
- Background: #fcf9f8 cream/paper
- Cards: #ffffff with border #ead8cd
- Text: #1c1b1b ink, muted #554338, secondary #755c4f
- Accent: #e6813a signal orange, deep #984700
- Error: #ba1a1a
- Typography: Plus Jakarta Sans (headlines 600), Inter (body 400), JetBrains Mono (metrics)
- Radius: marketing cards 24px, app panels 16px, form fields 10-12px
- Shadows: default cards subtle border only, hero product panel 0 16px 60px rgba(86,37,0,.08)
- NO gradients, NO orbs, NO decorative blobs, NO eco/leaf/lightning logos

LOGO: Draw an inline SVG monoline segmented bracket/path with three interval segments, one orange signal dot, and small optional tick marks. Do NOT use lightning, leaf, bolt, eco, or AI symbols.

HERO PRODUCT PANEL: Must be built with HTML/CSS/SVG components, NOT a screenshot, stock image, remote image, base64 logo, or phone mockup. Include:

Evidence row:
"VGO-014 · checkout 11:00 · 4,2 kWh entre 13:10-16:40 sin reserva activa · acción: revisar termo y regla post-checkout"

Show:
- P1/P2 power comparison (Actual: 4.6/4.6 kW vs Recomendado: 3.3/4.6 kW)
- Owner report status indicator
- Reservation energy timeline segment

VISUAL GRAMMAR: Include least one visible segmented-time device: reservation window, idle window, P1/P2 tariff band, checkout marker, or evidence row.

PAIN TRIPTYCH (3 cards below hero):
1. "Consumo fuera de reserva" — "4,2 kWh sin reserva activa · VGO-014 · checkout 11:00"
2. "Potencia o tarifa equivocada" — "P2 recomendada: 3,3 kW | Actual: 4,6 kW"
3. "Informes sin explicación operativa" — "412 kWh · 3 acciones de gestión · 42,50 EUR"

SYSTEM FLOW: PMS/Reservas → CUPS/Datadis/Facturas → Decisiones defendibles → Informes propietarios

MODULES GRID (keep battery/arbitrage late and small):
Dashboard · Operaciones · Apartamentos · Tarifas y Potencia · Informes · Piloto · Batería/arbitraje (small, labeled "premium")

LEAD FORM SECTION:
Title: "Valida Tramo con tu cartera"
Fields (ALL required, ALL in Spanish):
- Nombre
- Empresa
- Email
- Nº de alojamientos
- Ciudad/Región
- PMS utilizado
- ¿Acceso a Datadis/CUPS? (Sí/No/No lo sé)
- ¿Facturas recientes? (Sí/No)
- ¿Quién paga la factura eléctrica? (Propietario/Gestor/Huésped/Varía)
- Dolor principal (textarea)
- Módulos de interés (checkboxes): Consumo fuera de reserva, Reglas operativas, Tarifa/potencia, Informes propietarios, Evaluación batería/arbitraje (solo si los datos lo justifican)

PRIVACY COPY (visible near submit button):
"No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles y cómo preparar un piloto seguro."

DO NOT INCLUDE:
- English text anywhere
- References to Sourceful, Seline, Pirsch, Orderful, Precision Operations, or design process
- "Ahorro garantizado" or savings-first messaging
- Generic phone mockups
- Decorative gradients or orbs
- More than one dark/ink section

MOBILE: At 375px, hero stacks text first, panel second, CTA visible early, no horizontal scroll.

DARK SECTION: One optional ink band for editorial contrast maximum. The product UI stays paper/white, not dark.
`.trim();

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
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch {
            reject(new Error(`Failed to parse Stitch response: ${data.slice(0, 1000)}`));
          }
        });
      },
    );
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Stitch request timed out"));
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
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
  return (
    all.filter((screen) => screen.screenType === "DESIGN").at(-1) ||
    all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) ||
    all.at(-1) ||
    null
  );
}

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "ignore" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

console.log(`Editing landing screen ${SCREEN_ID} in project ${PROJECT_ID}`);
const response = await callStitch("edit_screens", {
  projectId: PROJECT_ID,
  selectedScreenIds: [SCREEN_ID],
  prompt,
  deviceType: "DESKTOP",
  modelId: "GEMINI_3_1_PRO",
});

fs.writeFileSync(`${OUT_PREFIX}-response.json`, `${JSON.stringify(response, null, 2)}\n`);
if (response?.error || response?.result?.isError) {
  throw new Error(JSON.stringify(response?.error || response?.result?.content, null, 2).slice(0, 1000));
}

const screen = extractBestScreen(response);
if (!screen) throw new Error("Could not extract edited screen");

const meta = {
  key: "landing",
  title: "Landing — Loop 3 corrected regeneration",
  projectId: PROJECT_ID,
  previousScreenId: SCREEN_ID,
  screenId: screen.id || null,
  htmlDownloadUrl: screen.htmlCode?.downloadUrl || null,
  screenshotDownloadUrl: screen.screenshot?.downloadUrl || null,
  generatedAt: new Date().toISOString(),
};

fs.writeFileSync(`${OUT_PREFIX}-screen.json`, `${JSON.stringify(meta, null, 2)}\n`);
if (meta.htmlDownloadUrl) download(meta.htmlDownloadUrl, `${OUT_PREFIX}.html`);
if (meta.screenshotDownloadUrl) download(meta.screenshotDownloadUrl, `${OUT_PREFIX}-stitch.png`);

console.log(JSON.stringify(meta, null, 2));
