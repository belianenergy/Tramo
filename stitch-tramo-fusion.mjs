import https from "https";
import { execFileSync } from "child_process";
import {
  existsSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "fs";

const PREFIX = "stitch-tramo-fusion";
const PROJECT_TITLE = "Tramo Fusion — Manager-Ready Energy Operations Landing";
const API_KEY = process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

const REQUIRED_SOURCES = [
  "stitch-landing-aura-v5-5.html",
  "stitch-mvp-restro-style-v1-landing.html",
  "stitch-tramo-energetico.html",
];

const LANDING_PROMPT = `Design a premium B2B landing page for Tramo — an intelligent energy operations platform for Spanish tourist property managers.

This must be a MANAGER-READY product page, not a generic SaaS landing. Every section must feel specific to the energy/property domain.

HEADLINE (exact):
"Convierte cada kWh de tu cartera turística en margen operativo."

SUBCOPY:
"Tramo instala sensores en tus alojamientos, cruza reservas, CUPS, Datadis y tarifas, y te da el control sobre aparatos, tarifas y baterías desde una sola plataforma inteligente."

Primary CTA: "Solicitar diagnóstico de cartera"
Secondary CTA: "Ver panel en vivo"

STYLE: Professional dark mode energy-tech aesthetic.
- Background: deep near-black (#080c0d)
- Cards: dark containers (#131719) with subtle warm borders (#2a2520)
- Primary accent: vibrant amber/orange (#f59e0b) for energy/action
- Secondary accent: teal (#14b8a6) for data/metrics
- Typography: Inter body, JetBrains Mono for numbers/metrics
- Visual elements: fine SVG charts, sparklines, live indicators, segmented timeline bars

LAYOUT:

1. HEADER: Tramo logo (text only, bold), nav (Producto, Demo, Precio), CTA

2. HERO (two columns):
   LEFT: Badge "12 pilotos activos" + H1 + subcopy + dual CTA
   RIGHT: LIVE PRODUCT PANEL (built in HTML/CSS, NOT an image):
   - Real-time consumption: "Ahora: 2.4 kW" with live pulse dot
   - Last alert: "VGO-014 · 4.2 kWh fuera de reserva · hace 2h"
   - Battery status: "Cargando · 0.08 €/kWh OMIE"
   - Reservation status: "3 activas · próxima salida 11:00"

3. KPI BAR: 4 metric pills with numbers + labels

4. THREE CORE MODULES (alternating, 2-column each):

   Module 1 — CONSUMO EN TIEMPO REAL:
   "Detecta fugas antes de que llegue la factura."
   - Consumption gauge showing "Ahora vs Reserva activa"
   - Alert: "4.2 kWh sin reserva activa · VGO-014"
   - Benefit: "Actúa en minutos, no en meses."

   Module 2 — TARIFAS & POTENCIA:
   "Cada propiedad con la tarifa y potencia óptimas."
   - P1/P2 comparison: Actual vs Recomendado
   - "Ahorro estimado: 180€/año por propiedad"
   - Supported by real CUPS data

   Module 3 — BATERÍA & ARBITRAJE:
   "Tus baterías trabajando cuando la red está cara."
   - OMIE hourly price chart
   - Battery cycle: "Carga a 0.06€, descarga a 0.18€"
   - Payback estimator

5. THREE PAINS → SOLUTIONS (alternating rows with visual evidence):
   Pain 1: "Sin visibilidad en tiempo real" → Real-time dashboard panel
   Pain 2: "Tarifas heredadas sin revisar" → Tariff comparison card
   Pain 3: "Informes manuales a propietarios" → Auto-generated report preview

6. SYSTEM FLOW: PMS/Reservas → CUPS/Datadis → Tramo → Decisiones → Informes

7. PRODUCT PROOF: "Tramo en acción" section with dashboard preview

8. LEAD FORM (dark styled, all Spanish):
   Fields: Nombre, Empresa, Email, Nº alojamientos, Ciudad/Región, PMS, ¿Acceso Datadis/CUPS?, ¿Tiene baterías?, Dolor principal, Módulos de interés
   CTA: "Solicitar diagnóstico de cartera"
   Privacy copy visible

9. FOOTER: Tramo · Madrid

COLOR PALETTE:
--bg: #080c0d
--surface: #0f1315
--card: #131719
--card-hover: #181d1f
--border: #262b2d
--border-strong: #333a3c
--text: #e6e9ea
--text-muted: #8a9295
--amber: #f59e0b
--amber-deep: #d97706
--teal: #14b8a6
--red: #ef4444
--green: #22c55e

DO NOT INCLUDE:
- English text
- Cream/paper backgrounds
- Leaf/eco/lightning logos
- Generic phone mockups
- "AI" as main claim
- Guaranteed savings percentages`;

function assertSourcesRead() {
  const sourceNotes = [];
  for (const source of REQUIRED_SOURCES) {
    if (!existsSync(source)) throw new Error(`Missing required source: ${source}`);
    const text = readFileSync(source, "utf8");
    sourceNotes.push(`${source}: ${text.length} chars read`);
  }
  return sourceNotes;
}

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
  const screens = collectScreens(response);
  return screens.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) || screens.at(-1) || null;
}

function extractScreenId(response) {
  const screen = extractBestScreen(response);
  const raw = screen?.id || screen?.name || response?.result?.structuredContent?.screenId || null;
  return raw ? String(raw).split("/").pop() : null;
}

function download(url, target) {
  if (!url) return false;
  try {
    execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
    return existsSync(target) && statSync(target).size > 0;
  } catch {
    return false;
  }
}

async function main() {
  console.log("Reading required source landings...");
  const sourceNotes = assertSourcesRead();
  sourceNotes.forEach((note) => console.log(`- ${note}`));

  console.log("\nCreating Stitch project...");
  const projectResponse = await tool("create_project", { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, `${JSON.stringify(projectResponse, null, 2)}\n`);

  const projectName = extractProjectName(projectResponse);
  if (!projectName) throw new Error("Could not extract project name from create_project response");
  const projectId = String(projectName).replace(/^projects\//, "");
  console.log(`Project ID: ${projectId}`);
  console.log(`Project URL: https://stitch.withgoogle.com/projects/${projectId}`);

  console.log("\nGenerating fusion landing screen...");
  const generateResponse = await tool("generate_screen_from_text", {
    projectId,
    project_id: projectId,
    prompt: LANDING_PROMPT,
    deviceType: "DESKTOP",
    device_type: "DESKTOP",
    modelId: "GEMINI_3_1_PRO",
  });
  writeFileSync(`${PREFIX}-generate-response.json`, `${JSON.stringify(generateResponse, null, 2)}\n`);

  const generatedScreen = extractBestScreen(generateResponse);
  const screenId = extractScreenId(generateResponse);
  if (!screenId) throw new Error("Could not extract screen ID from generate_screen_from_text response");
  writeFileSync(
    `${PREFIX}-screen.json`,
    `${JSON.stringify({ projectId, screenId, generatedScreen }, null, 2)}\n`,
  );
  console.log(`Screen ID: ${screenId}`);

  console.log("\nFetching generated screen...");
  const getScreenResponse = await tool("get_screen", {
    projectId,
    project_id: projectId,
    screenId,
    screen_id: screenId,
    name: `projects/${projectId}/screens/${screenId}`,
  });
  writeFileSync(`${PREFIX}-get-screen-response.json`, `${JSON.stringify(getScreenResponse, null, 2)}\n`);

  const fetchedScreen = extractBestScreen(getScreenResponse) || generatedScreen;
  const htmlUrl = fetchedScreen?.htmlCode?.downloadUrl || fetchedScreen?.downloadUrl || null;
  const screenshotUrl = fetchedScreen?.screenshot?.downloadUrl || null;

  const htmlSaved = download(htmlUrl, `${PREFIX}.html`);
  const screenshotSaved = download(screenshotUrl, `${PREFIX}-stitch.png`);

  const summary = `# Tramo Fusion — Stitch Summary

- Project ID: ${projectId}
- Project: projects/${projectId}
- Project URL: https://stitch.withgoogle.com/projects/${projectId}
- Screen ID: ${screenId}
- Screen: projects/${projectId}/screens/${screenId}
- Prompt source: \`${PREFIX}.mjs\`
- Required source files read:
${sourceNotes.map((note) => `  - ${note}`).join("\n")}
- Responses saved:
  - \`${PREFIX}-project-response.json\`
  - \`${PREFIX}-generate-response.json\`
  - \`${PREFIX}-get-screen-response.json\`
  - \`${PREFIX}-screen.json\`
- Local artifacts:
  - \`${PREFIX}.html\` ${htmlSaved ? "(saved)" : "(not available from response)"}
  - \`${PREFIX}-stitch.png\` ${screenshotSaved ? "(saved)" : "(not available from response)"}

## Prompt Intent

Fusion landing for Tramo combining dark energy-tech visuals, detailed manager-ready operational modules, Spanish tourist portfolio positioning, battery/arbitrage evidence, pains-to-solutions, PMS/CUPS/Datadis flow, and a sector-specific lead form.

## Status

COMPLETE
`;

  writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(`\n${summary}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
