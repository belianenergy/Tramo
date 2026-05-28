import { existsSync, statSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import https from "https";

const PREFIX = "stitch-tramo-definitivo";
const PROJECT_TITLE = "Tramo Landing Definitiva";
const API_KEY =
  process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

const PROMPT = `Design a complete, section-rich B2B landing page for Tramo — an energy operations platform for Spanish tourist property managers. This must be a long, detailed page with multiple clear sections.

NARRATIVE SEQUENCE (follow exactly):
1. HERO with interactive dashboard mock
2. PAIN TRIPTYCH (3 cards)
3. SYSTEM FLOW diagram
4. CORE MODULES (4 modules with detail)
5. PRODUCT PROOF dashboard
6. TRUST / PILOT SAFETY
7. LEAD FORM

BASE STYLE — Tramo visual system (60% Sourceful):
- Background: cream/paper #fcf9f8
- Cards: white #ffffff with border #ead8cd
- Text: ink #1c1b1b, muted #554338
- Accent: signal orange #e6813a, deep #984700
- Green only for success: #0f766e
- Error: #ba1a1a
- Typography: Plus Jakarta Sans (headings 600), Inter (body 400), JetBrains Mono (metrics)
- Dark ink section: one optional editorial band maximum
- Overall feel: energy infrastructure + editorial quality + live data

LOGO: Create an SVG monoline segmented bracket/path with THREE interval segments, ONE orange (#e6813a) signal dot, and small tick marks. Infrastructure/energy diagram feel. NO lightning/leaf/bolt/eco.

---

SECTION 1 — HERO WITH INTERACTIVE DASHBOARD:

LEFT COLUMN:
- Small badge: "Para gestoras con 10+ alojamientos"
- H1: "Convierte la energía de tu cartera turística en margen operativo."
- Subcopy: "Tramo cruza consumo en tiempo real, reservas, CUPS/Datadis y tarifas para detectar kWh fuera de reserva, priorizar acciones y entregar informes claros a cada propietario."
- Primary CTA: "Diagnosticar mi cartera" (orange filled)
- Secondary CTA: "Ver dashboard demo" (outlined)

RIGHT COLUMN — INTERACTIVE DASHBOARD MOCK (built in HTML/CSS, NOT an image):
Create a realistic product panel with:
- Top: "Panel de control · 32 alojamientos monitorizados"
- Live consumption indicator: "18.4 kW ahora" with green pulse dot
- ALERT CARD (visually prominent): "⚠ VGO-014 · vacío desde 11:00 · 4.2 kWh fuera de reserva · 42 EUR estimados"
- Reservation timeline: "checkout 11:00 · consumo detectado 13:10-16:40"
- P1/P2 comparison: "Actual 4.6 kW · Recomendado 3.3 kW"
- Small OMIE sparkline
- Small battery status indicator
- Owner report: "Informe Abril listo"

INTERACTION: Design the dashboard so that hover/active states are visually clear. When hovering over the alert card, the related metric glows orange. When hovering over a property row, its timeline segment lights up.

---

SECTION 2 — PAIN TRIPTYCH (3 cards with before/after):

Card 1: "Consumo fantasma"
Before: "La factura llega a los 2 meses y no sabes qué pasó."
After: "Tramo te avisa en minutos: VGO-014 vacío, 4.2 kWh sin reserva activa."
Evidence: timestamp, kWh, property code, EUR estimate.

Card 2: "Tarifa y potencia heredadas"
Before: "Cada propiedad arrastra CUPS, potencia y tarifa sin revisar."
After: "Tramo analiza cada CUPS: P2 recomendada 3.3 kW, ahorro 180€/año."
Evidence: P1/P2 actual vs recomendado, EUR/year.

Card 3: "Propietarios sin explicación"
Before: "El propietario ve coste; tú no tienes evidencias."
After: "Informe mensual: 412 kWh, 3 acciones de gestión, 42.50 EUR en acciones defendibles."
Evidence: sample report card with KPIs.

---

SECTION 3 — SYSTEM FLOW (diagram-like):

Show a connected flow with clean icons and arrows:
\`\`\`
[PMS / Reservas] + [Sensores / consumo real] + [CUPS / Datadis / facturas] + [Tarifas / OMIE]
                          ↓
                    Tramo atribuye cada kWh
                          ↓
       [Alertas operativas] → [Decisiones] → [Informes propietarios]
\`\`\`

---

SECTION 4 — FOUR CORE MODULES (each with title, description, visual evidence, and a metric card):

Module 1: CONSUMO EN TIEMPO REAL
"Detecta kWh fuera de reserva antes de que llegue la factura."
- Visual: live consumption gauge + alert queue
- Evidence: "VGO-014 · 4.2 kWh sin reserva · 13:10-16:40 · 42 EUR"
- Benefit: "Actúa en minutos, no en meses."

Module 2: TARIFA Y POTENCIA POR CUPS
"Cada propiedad con la tarifa y potencia óptimas."
- Visual: P1/P2 comparison bars
- Evidence: "P2 actual 4.6 kW → recomendado 3.3 kW · 180€/año"
- Benefit: "Sin pagar de más por inercia."

Module 3: REGLAS OPERATIVAS POR RESERVA
"Automatiza aparatos según check-in/check-out."
- Visual: reservation timeline with appliance rules
- Evidence: "Regla: apagar AC 30 min post-checkout · 8 propiedades"
- Benefit: "Control sin añadir tareas manuales."

Module 4: INFORMES A PROPIETARIOS
"Cada mes, un informe claro y defendible."
- Visual: report preview card
- Evidence: "412 kWh · 3 acciones · 42.50 EUR en acciones defendibles"
- Benefit: "Transparencia que construye confianza."

Note: Battery/arbitrage is mentioned as a premium evaluation module at the bottom, not one of the main 4.

---

SECTION 5 — PRODUCT PROOF DASHBOARD:

Show a realistic portfolio dashboard with:
- Property list: VGO-014 (Alerta), COR-007 (OK), SJO-021 (OK), MDR-003 (Alerta), BCN-055 (OK)
- Consumption chart: occupied (green) vs idle (gray) vs anomaly (orange)
- Alert queue: 4 active alerts with timestamps
- Tariff recommendation card
- Date range selector: "Mayo 2026"

---

SECTION 6 — TRUST / PILOT SAFETY:

"Datos que usamos":
PMS/reservas · CUPS/Datadis · Facturas · Sensores · Tarifas

"Datos que NO pedimos en público":
Credenciales · Facturas completas · Documentos privados

"Estimaciones prudentes":
Sin ahorros garantizados. Todos los números son estimaciones basadas en tus datos reales.

"Piloto seguro":
Empieza con un diagnóstico de cartera. Sin compromiso. Sin instalación hasta que los números cuadren.

---

SECTION 7 — LEAD FORM:

Title: "Solicita un diagnóstico de cartera"

Supporting copy: "Revisamos cuántas propiedades tienes, qué datos están disponibles y dónde puede haber kWh sin explicación antes de plantear un piloto."

Fields (all Spanish):
- Nombre*, Empresa*, Email*, Nº alojamientos*, Ciudad/Región*, PMS utilizado, ¿Acceso Datadis/CUPS? (Sí/No/No lo sé), ¿Tiene baterías? (Sí/No), Dolor principal*, Módulos de interés (checkboxes), Mensaje (optional)

CTA: "Solicitar diagnóstico" (orange)

Privacy copy (visible near submit):
"No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles y cómo preparar un piloto seguro."

---

FOOTER:
Tramo wordmark · "consumo atribuido por reserva y propietario"
© 2026 Tramo · Madrid, España
Links: Privacidad, Términos

---

COPY RULES:
- USE: kWh, CUPS, Datadis, OMIE, P1/P2, tiempo real, reserva, propietario, margen operativo, evidencia, piloto
- DO NOT USE: "IA", "ahorro garantizado", "climatización", eco/green cliches, English

DO NOT INCLUDE:
- Stock photos or generic phone mockups
- Eco/leaf/lightning logos
- Cream/paper backgrounds replaced with dark
- Battery/arbitrage as main module (keep as premium)`;

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

async function tool(name, args) {
  const response = await callStitch(name, args);
  if (response?.error || response?.result?.isError) {
    const text =
      response?.error?.message ||
      response?.result?.content?.map((item) => item.text).join("\n") ||
      "Unknown Stitch error";
    throw new Error(`${name} failed: ${text}`);
  }
  return response;
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
    const name = payload.name || payload.project?.name || payload.project_id || payload.projectId;
    if (name) return String(name).replace(/^projects\//, "");
  }
  const name = response?.result?.structuredContent?.name || response?.result?.name;
  return name ? String(name).replace(/^projects\//, "") : null;
}

function collectScreens(response) {
  const roots = [response?.result?.structuredContent, ...parseEmbeddedPayloads(response)].filter(Boolean);
  const found = [];
  for (const root of roots) {
    if (root.screen) found.push(root.screen);
    if (Array.isArray(root.screens)) found.push(...root.screens);
    if (root.name && String(root.name).includes("/screens/")) found.push(root);
    for (const component of root.outputComponents || []) {
      const screens = component?.design?.screens;
      if (Array.isArray(screens)) found.push(...screens);
      else if (screens && typeof screens === "object") found.push(...Object.values(screens));
    }
  }
  return found.filter(Boolean);
}

function extractScreen(response) {
  const all = collectScreens(response);
  return (
    all.filter((screen) => screen.screenType === "DESIGN").at(-1) ||
    all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) ||
    all.at(-1) ||
    null
  );
}

function extractScreenId(response) {
  const screen = extractScreen(response);
  const raw =
    screen?.id ||
    screen?.screenId ||
    screen?.name ||
    response?.result?.structuredContent?.screenId ||
    response?.result?.screenId;
  return raw ? String(raw).split("/").pop() : null;
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
  console.log("Creating new Stitch project...");
  const projectResponse = await tool("create_project", { title: PROJECT_TITLE });
  writeFileSync(`${PREFIX}-project-response.json`, `${JSON.stringify(projectResponse, null, 2)}\n`);

  const projectId = extractProjectId(projectResponse);
  if (!projectId) throw new Error("Could not extract project ID from create_project response");
  writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);

  console.log(`Project ID: ${projectId}`);
  console.log("Generating definitive Tramo landing screen...");
  const generateResponse = await tool("generate_screen_from_text", {
    projectId,
    project_id: projectId,
    prompt: PROMPT,
    deviceType: "DESKTOP",
    device_type: "DESKTOP",
  });
  writeFileSync(`${PREFIX}-generate-response.json`, `${JSON.stringify(generateResponse, null, 2)}\n`);

  const generatedScreen = extractScreen(generateResponse);
  const screenId = extractScreenId(generateResponse);
  if (!screenId) throw new Error("Could not extract screen ID from generate_screen_from_text response");
  writeFileSync(`${PREFIX}-screen.json`, `${JSON.stringify({ projectId, screenId, generatedScreen }, null, 2)}\n`);

  console.log(`Screen ID: ${screenId}`);
  console.log("Fetching generated screen...");
  const getScreenResponse = await tool("get_screen", {
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

  const htmlSaved = htmlUrl ? download(htmlUrl, `${PREFIX}.html`) : false;
  const screenshotSaved = screenshotUrl ? download(screenshotUrl, `${PREFIX}-stitch.png`) : false;

  const meta = {
    projectTitle: PROJECT_TITLE,
    projectId,
    projectName: `projects/${projectId}`,
    projectUrl: `https://stitch.withgoogle.com/projects/${projectId}`,
    screenId,
    screenName: `projects/${projectId}/screens/${screenId}`,
    htmlDownloadUrl: htmlUrl,
    screenshotDownloadUrl: screenshotUrl,
    generatedAt: new Date().toISOString(),
    localFiles: {
      script: `${PREFIX}.mjs`,
      projectResponse: `${PREFIX}-project-response.json`,
      generateResponse: `${PREFIX}-generate-response.json`,
      getScreenResponse: `${PREFIX}-get-screen-response.json`,
      screen: `${PREFIX}-screen.json`,
      meta: `${PREFIX}-meta.json`,
      html: htmlSaved ? `${PREFIX}.html` : null,
      screenshot: screenshotSaved ? `${PREFIX}-stitch.png` : null,
      summary: `${PREFIX}-summary.md`,
    },
  };
  writeFileSync(`${PREFIX}-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);

  const summary = `# Tramo Definitivo — Stitch Summary

- Project ID: ${projectId}
- Project: projects/${projectId}
- Project URL: https://stitch.withgoogle.com/projects/${projectId}
- Screen ID: ${screenId}
- Screen: projects/${projectId}/screens/${screenId}
- Prompt source: \`${PREFIX}.mjs\`
- Prompt basis: \`CEO_VISION_LANDING.md\`, \`stitch-landing-aura-v5-5.html\`, \`stitch-mvp-restro-style-v1-landing.html\`, \`stitch-tramo-fusion-final.html\`
- Narrative sequence requested: hero dashboard, pain triptych, system flow, four core modules, product proof dashboard, trust/pilot safety, lead form
- Responses saved:
  - \`${PREFIX}-project-response.json\`
  - \`${PREFIX}-generate-response.json\`
  - \`${PREFIX}-get-screen-response.json\`
  - \`${PREFIX}-screen.json\`
  - \`${PREFIX}-meta.json\`
- Local artifacts:
  - \`${PREFIX}.html\` ${htmlSaved ? "(saved)" : "(not available from response)"}
  - \`${PREFIX}-stitch.png\` ${screenshotSaved ? "(saved)" : "(not available from response)"}
`;

  writeFileSync(`${PREFIX}-summary.md`, summary);
  console.log(summary);
}

main().catch((error) => {
  console.error("FATAL:", error.message);
  process.exit(1);
});
