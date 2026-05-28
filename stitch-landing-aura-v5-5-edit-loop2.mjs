import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-landing-aura-v5-5";
const PROJECT_ID = fs.readFileSync(`${PREFIX}.project-id`, "utf8").trim().replace(/^projects\//, "");
const SCREEN_ID = JSON.parse(fs.readFileSync(`${PREFIX}-screen.json`, "utf8")).id;

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim().replace(/^export\s+/, "");
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] == null) process.env[key] = value;
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

if (!process.env.STITCH_API_KEY) throw new Error("Missing STITCH_API_KEY.");

const prompt = `
Edita esta landing existente de EnergyOS. Mantén el estilo visual avanzado actual: dark graphite, command center, bordes 1px, estética Aura/mobile-flow, densidad premium. No rediseñes desde cero.

Objetivo del loop 2: precisión, credibilidad y microcopy.

Cambios obligatorios:
- Elimina cualquier porcentaje visible que parezca claim o prueba: "32%", "22%" o similares. Sustituye por estados cualitativos como "fuga detectada", "pendiente de validar", "prioridad alta", "estimación en revisión".
- No uses cifras grandes de prueba social ni claims de ahorro sin fuente.
- No digas que Datadis es tiempo real. Sustituye "Captura datos de Datadis, inversores y reservas en tiempo real" por una idea precisa: "Cruza Datadis histórico, reservas, inversores y señales de dispositivos conectados".
- Mantén visible en el primer viewport: aparatos, tarifas, baterías, Datadis/CUPS y propietario/informe.
- En el bloque de dolor, cambia cualquier línea tipo "% fugas detectadas" por "fuga operativa detectada".
- En el módulo de tarifa, evita "análisis de mercado diario" si parece promesa automática de comercializadora; usa "comparativa tarifa/potencia".
- En el módulo Solar/Batería, usa "simulación de ciclos" o "arbitraje avanzado" sin prometer rentabilidad.
- En el hero, conserva exactamente el H1: "Controla aparatos, tarifas y baterías desde una sola capa inteligente."
- Mantén CTA único: "Solicitar diagnóstico gratuito".
- Haz que el primer viewport sea un poco más refinado visualmente: más contraste en la maqueta, chips mejor alineados, y que no parezca screenshot borroso.
- No añadas orbes, gradientes decorativos ni estilo marketing genérico.
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
          "X-Goog-Api-Key": process.env.STITCH_API_KEY,
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
  return all.filter((screen) => screen.screenType === "DESIGN").at(-1) ||
    all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) ||
    all.at(-1) ||
    null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "ignore" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

console.log(`Editing ${SCREEN_ID} in project ${PROJECT_ID}`);
const response = await callStitch("edit_screens", {
  projectId: PROJECT_ID,
  selectedScreenIds: [SCREEN_ID],
  prompt,
  deviceType: "DESKTOP",
  modelId: "GEMINI_3_1_PRO",
});

fs.writeFileSync(`${PREFIX}-loop2-edit-response.json`, `${JSON.stringify(response, null, 2)}\n`);
if (response?.error || response?.result?.isError) {
  throw new Error(JSON.stringify(response?.error || response?.result?.content, null, 2).slice(0, 1000));
}

const screen = extractBestScreen(response);
if (!screen) throw new Error("Could not extract edited screen");

fs.writeFileSync(`${PREFIX}-screen.json`, `${JSON.stringify(screen, null, 2)}\n`);
if (screen.htmlCode?.downloadUrl) download(screen.htmlCode.downloadUrl, `${PREFIX}.html`);
if (screen.screenshot?.downloadUrl) download(screen.screenshot.downloadUrl, `${PREFIX}-stitch.png`);

console.log(
  JSON.stringify(
    {
      screenId: screen.id,
      screenName: screen.name,
      html: Boolean(screen.htmlCode?.downloadUrl),
      screenshot: Boolean(screen.screenshot?.downloadUrl),
    },
    null,
    2,
  ),
);
