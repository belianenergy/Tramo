/**
 * Tramo - Landing Generator v3 (Energetico)
 *
 * Creates a new Stitch project, generates a dark dynamic energy-management
 * landing page, fetches the generated screen, and saves all Stitch responses.
 */

import { existsSync, statSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import https from "https";

const PREFIX = "stitch-tramo-energetico";
const PROJECT_TITLE = "Tramo Energetico Landing v3";
const API_KEY =
  process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

const LANDING_PROMPT = `Design a visually striking, dynamic B2B landing page for Tramo — an intelligent energy platform for Spanish tourist property portfolios.

This is NOT a flat editorial page. It must feel energetic, tech-forward, and visually compelling — like a premium deep-tech energy product.

PRIMARY VALUE PROPOSITION:
Track consumption in real time, automate appliances around reservations, optimize tariffs, and run battery arbitrage from a single intelligent layer — with hardware installed at the property.

H1: "Controla tus activos energéticos por reserva: aparatos, tarifas y baterías desde una sola capa inteligente."

Subcopy: "Tramo instala hardware en tus alojamientos turísticos para que veas el consumo en tiempo real, automatices reglas por check-in/check-out, optimices tarifas con datos reales de OMIE, y actives arbitraje con baterías cuando los números cuadren. Sin sorpresas en la factura."

Primary CTA: "Solicitar diagnóstico de cartera"
Secondary CTA: "Ver panel en vivo"

VISUAL STYLE — DARK & DYNAMIC:
- Dark background: #0a0e0f or similar deep near-black
- Primary accent: vibrant lime/green (#aff755 or similar) for energy/optimization
- Secondary accent: electric blue/teal for data/tech
- Cards: dark glass containers with subtle borders
- Typography: Inter for body, JetBrains Mono for metrics/numbers
- Charts and data visualizations: SVG sparklines, animated indicators, live pulse dots
- Use dark mode throughout — this is a deep-tech energy product

HERO SECTION:
- Two columns: Left = H1 + subcopy + dual CTA + trust badge ("12 pilotos activos")
- Right = LIVE DASHBOARD PANEL showing:
  - Real-time consumption gauge (kWh now vs expected)
  - Battery status indicator (charging/discharging/standby)
  - OMIE price sparkline (today's hourly)
  - Active property count with pulse indicator
- Below hero: 4 KPI pills: Ahorro medio, kWh optimizados, Alertas resueltas, Baterías activas

KEY MODULES (visual cards, 3 columns):
1. ⚡ CONSUMO EN TIEMPO REAL — "Detecta consumos anómalos antes de que llegue la factura." Show: live meter, alert example, Telegram notification preview
2. 🔋 BATERÍA & ARBITRAJE — "Compra barato, consume cuando conviene." Show: OMIE hourly chart, battery cycle simulation, estimated monthly savings in EUR
3. 🏠 DOMÓTICA POR RESERVA — "Reglas automáticas por check-in/check-out." Show: reservation timeline, appliance rules (AC, heating, water heater), action log

PAIN SECTION (3 alternating rows with visual evidence):
1. "Sin visibilidad en tiempo real" → "Detecta 4.2 kWh fuera de reserva y actúa en minutos, no en meses"
2. "Tarifas heredadas sin revisar" → "Potencia P2 recomendada 3.3 kW vs actual 4.6 kW · ahorro estimado 180€/año"
3. "Baterías sin estrategia de carga" → "Ciclo diario simulado con OMIE: diferencial de 0.12€/kWh · payback estimado"

PRODUCT PROOF SECTION:
"Tramo en acción" — Real dashboard panel showing:
- Portfolio overview with live data
- Alert timeline with real property codes (VGO-014, COR-007...)
- Tariff comparison pre/post optimization
- Battery cycle chart

LEAD FORM (dark styled, professional):
- Fields: Nombre, Empresa, Email, Nº alojamientos, Ciudad, PMS, ¿Acceso Datadis?, ¿Tiene baterías?, Dolor principal
- CTA: "Solicitar diagnóstico de cartera"
- Privacy text near submit

FOOTER:
- Tramo logo + "Control energético inteligente para carteras turísticas"
- Madrid, España
- Links: Privacidad, Términos, LinkedIn

COPY RULES:
- DO use: tiempo real, automatización, batería, arbitraje, OMIE, ahorro, optimización
- DO NOT use: "IA" as main claim, "climatización" as central framing, guaranteed savings percentages
- DO NOT use: cream/paper backgrounds, editorial minimalism
- Language: Spanish throughout

COLOR PALETTE (dark mode):
--bg: #0a0e0f
--surface: #111618
--card: #161b1d
--border: #222a2d
--text: #dfe4de
--muted: #88998a
--accent: #aff755 (lime green)
--accent2: #02aebe (teal/cyan)
--warning: #f59e0b
--error: #ef4444`;

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
            reject(new Error(data.slice(0, 500)));
          }
        });
      },
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function parseEmbeddedPayloads(response) {
  const content = response?.result?.content;
  if (!Array.isArray(content)) return [];

  return content
    .map((item) => item?.text?.trim())
    .filter((text) => text?.startsWith("{"))
    .map((text) => {
      try {
        return JSON.parse(text);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function extractProjectId(response) {
  for (const payload of parseEmbeddedPayloads(response)) {
    const name = payload.name || payload.project?.name || payload.project_id;
    if (name) return String(name).replace(/^projects\//, "");
  }
  return null;
}

function extractScreen(response) {
  if (response?.result?.structuredContent?.screen) return response.result.structuredContent.screen;
  if (response?.result?.screen) return response.result.screen;

  for (const payload of parseEmbeddedPayloads(response)) {
    if (payload.screen) return payload.screen;
    if (Array.isArray(payload.screens)) return payload.screens[payload.screens.length - 1];
    if (payload.name && String(payload.name).includes("/screens/")) return payload;

    for (const component of payload.outputComponents || []) {
      const screens = component?.design?.screens;
      if (!Array.isArray(screens)) continue;
      const designScreen = [...screens].reverse().find((screen) => screen.screenType === "DESIGN");
      return designScreen || screens[screens.length - 1];
    }
  }

  return null;
}

function extractScreenId(response) {
  const screen = extractScreen(response);
  const raw =
    screen?.id ||
    screen?.screenId ||
    screen?.name ||
    response?.result?.structuredContent?.screenId ||
    response?.result?.screenId;
  if (raw) return String(raw).split("/").pop();

  for (const payload of parseEmbeddedPayloads(response)) {
    const candidate = payload.id || payload.screenId || payload.name;
    if (candidate && String(candidate).includes("screens/")) return String(candidate).split("/").pop();
  }

  return null;
}

function download(url, target) {
  if (!url) return false;
  try {
    execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "ignore" });
    return existsSync(target) && statSync(target).size > 0;
  } catch {
    return false;
  }
}

async function main() {
  console.log("Creating new Stitch project for Tramo...");
  const projectResponse = await callStitch("create_project", { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, `${JSON.stringify(projectResponse, null, 2)}\n`);

  const projectId = extractProjectId(projectResponse);
  if (!projectId) throw new Error("Could not extract project ID from create_project response");
  writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);

  console.log(`Project ID: ${projectId}`);
  console.log("Generating landing screen...");
  const generateResponse = await callStitch("generate_screen_from_text", {
    projectId,
    project_id: projectId,
    prompt: LANDING_PROMPT,
    device_type: "DESKTOP",
  });
  writeFileSync(`${PREFIX}-generate-response.json`, `${JSON.stringify(generateResponse, null, 2)}\n`);

  if (generateResponse?.error || generateResponse?.result?.isError) {
    throw new Error(
      JSON.stringify(generateResponse?.error || generateResponse?.result?.content, null, 2).slice(0, 1000),
    );
  }

  const generatedScreen = extractScreen(generateResponse);
  const screenId = extractScreenId(generateResponse);
  if (!screenId) throw new Error("Could not extract screen ID from generate_screen_from_text response");
  writeFileSync(`${PREFIX}-screen.json`, `${JSON.stringify({ projectId, screenId, generatedScreen }, null, 2)}\n`);
  console.log(`Screen ID: ${screenId}`);

  console.log("Fetching generated screen...");
  const getScreenResponse = await callStitch("get_screen", {
    projectId,
    project_id: projectId,
    screenId,
    screen_id: screenId,
    name: `projects/${projectId}/screens/${screenId}`,
  });
  writeFileSync(`${PREFIX}-get-screen-response.json`, `${JSON.stringify(getScreenResponse, null, 2)}\n`);

  const fetchedScreen = extractScreen(getScreenResponse) || generatedScreen;
  const htmlUrl = fetchedScreen?.htmlCode?.downloadUrl || fetchedScreen?.downloadUrl || null;
  const screenshotUrl = fetchedScreen?.screenshot?.downloadUrl || null;

  if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) console.log("HTML saved");
  if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) console.log("Screenshot saved");

  const summary = `# Tramo Energetico — Stitch Summary

- Project ID: ${projectId}
- Project: projects/${projectId}
- Screen ID: ${screenId}
- Screen: projects/${projectId}/screens/${screenId}
- Prompt source: \`${PREFIX}.mjs\`
- Responses saved:
  - \`${PREFIX}-project-response.json\`
  - \`${PREFIX}-generate-response.json\`
  - \`${PREFIX}-get-screen-response.json\`
  - \`${PREFIX}-screen.json\`
- Local artifacts:
  - \`${PREFIX}.html\` ${existsSync(`${PREFIX}.html`) ? "(saved)" : "(not available from response)"}
  - \`${PREFIX}-stitch.png\` ${existsSync(`${PREFIX}-stitch.png`) ? "(saved)" : "(not available from response)"}
`;
  writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(summary);
}

main().catch((error) => {
  console.error("FATAL:", error.message);
  process.exit(1);
});
