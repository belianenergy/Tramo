import { existsSync, statSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import https from "https";

const PREFIX = "stitch-tramo-fusion-final";
const PROJECT_TITLE = "Tramo Landing Fusion Final";
const API_KEY =
  process.env.STITCH_API_KEY || "AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw";

const PROMPT = `Design a professional B2B landing page for Tramo — an intelligent energy operations platform for Spanish tourist property managers.

BASE STYLE — Tramo visual system:
- Background: cream/paper #fcf9f8
- Surface: warm #fffaf5
- Cards: white #ffffff with border #ead8cd
- Text: ink #1c1b1b, muted #554338
- Accent: signal orange #e6813a, deep #984700
- Typography: Plus Jakarta Sans (headings, weight 600), Inter (body, weight 400), JetBrains Mono (metrics)
- NOT dark mode, NOT generic SaaS, NOT eco-green

LOGO: Create an inline SVG of a monoline segmented bracket/path with THREE interval segments, ONE orange (#e6813a) signal dot marking the active segment, and small tick marks at segment boundaries. The mark should look like an infrastructure/energy diagram. NO lightning, NO leaf, NO bolt, NO eco symbols.

HEADLINE (exact):
"Convierte cada kWh de tu cartera turística en margen operativo."

SUBCOPY:
"Tramo conecta sensores, reservas, CUPS, Datadis y tarifas para darte control en tiempo real sobre aparatos, optimizar cada tarifa y activar arbitraje con baterías cuando los números cuadren. Todo desde una sola plataforma, con informes claros para cada propietario."

Primary CTA: "Solicitar diagnóstico de cartera" (orange filled button)
Secondary CTA: "Ver panel en vivo" (outlined ghost button)

HERO SECTION (TWO COLUMNS):
LEFT:
- Small badge: "12 pilotos activos en España"
- H1 headline
- Subcopy text
- Two CTA buttons

RIGHT — INTERACTIVE PRODUCT PANEL (built in HTML/CSS, NOT an image):
The panel is a realistic dashboard card with LIVE-STYLE elements:
- Consumption gauge: "Ahora: 2.4 kW" with a green pulse dot indicator
- Last alert: "VGO-014 · 4.2 kWh fuera de reserva · hace 2h" in orange
- Reservation timeline showing: "3 activas · próxima salida 11:00"
- Battery status: "Cargando a 0.08 €/kWh · OMIE"
- Small OMIE price sparkline
- The panel should have a subtle hover effect: when the user hovers, the data indicators brighten and the orange accent intensifies

THREE CORE MODULES (alternating 2-column layout, each with an icon, title, description, and evidence):

Module 1 — CONSUMO EN TIEMPO REAL:
Icon: activity/pulse
Title: "Detecta fugas antes de que llegue la factura."
Description: "Nuestros sensores monitorizan el consumo 24/7 en cada alojamiento. Cuando detectamos consumo fuera de reserva, te avisamos al instante por Telegram."
Evidence box: "VGO-014 · checkout 11:00 · 4.2 kWh entre 13:10-16:40 sin reserva activa · ahorro estimado: 42€"
Right side: a small dashboard panel showing live consumption vs reservation status

Module 2 — TARIFAS & POTENCIA:
Icon: zap/lightning
Title: "Cada propiedad con la tarifa y potencia óptimas."
Description: "Analizamos tus facturas y CUPS para asegurar que cada propiedad tiene la potencia contratada correcta y la tarifa más competitiva del mercado."
Evidence box: "P2 recomendada: 3.3 kW | Actual: 4.6 kW · Ahorro estimado: 180€/año"
Right side: P1/P2 comparison card

Module 3 — BATERÍA & ARBITRAJE:
Icon: battery
Title: "Tus baterías trabajando cuando la red está cara."
Description: "Tramo analiza los precios horarios de OMIE y activa tus baterías para comprar barato y consumir cuando conviene, maximizando el autoconsumo real."
Evidence box: "Ciclo diario: carga a 0.06€, descarga a 0.18€ · Diferencial: 0.12€/kWh"
Right side: OMIE hourly price mini-chart with battery charge/discharge markers

THREE PAINS → SOLUTIONS (compact alternating sections):

Pain 1: "Sin visibilidad en tiempo real"
→ "Detecta consumos anómalos en minutos, no cuando llegue la factura dentro de 2 meses."

Pain 2: "Tarifas heredadas sin revisar"
→ "Cada propiedad con la potencia justa y la tarifa más competitiva. Sin pagar de más por inercia."

Pain 3: "Informes manuales a propietarios"
→ "Cada mes, un informe claro con kWh, acciones realizadas y ahorro estimado. Listo para enviar."

PRODUCT PROOF SECTION:
"Tramo en acción" — a realistic dashboard panel showing portfolio data:
- Property list with status indicators
- Monthly consumption trends
- Owner report preview

LEAD FORM SECTION (clean, professional, all in Spanish):
Title: "Solicitar diagnóstico de cartera"
Fields:
- Nombre*
- Empresa*
- Email*
- Nº de alojamientos*
- Ciudad/Región*
- PMS utilizado
- ¿Acceso a Datadis/CUPS? (Sí/No/No lo sé)
- ¿Tiene baterías instaladas? (Sí/No)
- Dolor principal* (select)
- Módulos de interés (checkboxes): Consumo en tiempo real, Tarifas y potencia, Batería y arbitraje, Informes a propietarios
- Mensaje (optional)
CTA button: "Solicitar diagnóstico" (orange)
Privacy helper text visible near submit:
"No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles."

FOOTER:
Tramo logo (text wordmark) · "Control energético inteligente para carteras turísticas"
© 2026 Tramo · Madrid, España
Links: Privacidad, Términos

COPY RULES:
- USE: kWh, CUPS, Datadis, OMIE, P1/P2, tiempo real, batería, arbitraje, sensores, margen operativo, propietarios
- DO NOT USE: "IA" as main claim, "ahorro garantizado", "climatización", eco/green cliches, English text

MOBILE: At 375px, hero stacks text first then panel, CTAs visible without deep scroll, no horizontal overflow.`;

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
  console.log("Generating landing screen...");
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
      projectResponse: `${PREFIX}-project-response.json`,
      generateResponse: `${PREFIX}-generate-response.json`,
      getScreenResponse: `${PREFIX}-get-screen-response.json`,
      screen: `${PREFIX}-screen.json`,
      html: htmlSaved ? `${PREFIX}.html` : null,
      screenshot: screenshotSaved ? `${PREFIX}-stitch.png` : null,
    },
  };
  writeFileSync(`${PREFIX}-meta.json`, `${JSON.stringify(meta, null, 2)}\n`);

  const summary = `# Tramo Fusion Final — Stitch Summary

- Project ID: ${projectId}
- Project: projects/${projectId}
- Project URL: https://stitch.withgoogle.com/projects/${projectId}
- Screen ID: ${screenId}
- Screen: projects/${projectId}/screens/${screenId}
- Prompt source: \`${PREFIX}.mjs\`
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

  writeFileSync("stitch-tramo-fusion-summary.md", summary);
  console.log(summary);
}

main().catch((error) => {
  console.error("FATAL:", error.message);
  process.exit(1);
});
