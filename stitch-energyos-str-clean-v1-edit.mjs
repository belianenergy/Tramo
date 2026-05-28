import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-energyos-str-clean-v1";
const SUMMARY_FILE = `${PREFIX}-summary.json`;
const MODEL_ID = "GEMINI_3_1_PRO";
const ONLY_PAGES = (process.env.ONLY_PAGES || "")
  .split(",")
  .map((page) => page.trim())
  .filter(Boolean);

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return;
  for (const rawLine of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const normalized = line.startsWith("export ") ? line.slice(7).trim() : line;
    const eq = normalized.indexOf("=");
    if (eq === -1) continue;
    const key = normalized.slice(0, eq).trim();
    let value = normalized.slice(eq + 1).trim();
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

const commonPrompt = `
Edita esta pantalla existente de EnergyOS. Mantén layout, densidad, jerarquía y estilo SaaS premium. No rediseñes desde cero.

Reglas obligatorias:
- Marca siempre "EnergyOS". Prohibido: EnergyOps, EnergyManager, EnergiCore.
- Todo el texto visible debe estar en español profesional.
- El H1 de landing debe ser exactamente: "Control energético para carteras turísticas."
- Evita hero largo: H1 corto, subcopy debajo.
- No uses climatización, A/C, temperatura, confort, HVAC, AC running, ROI garantizado, trading, "30%" ni porcentajes agresivos sin contexto.
- En landing no uses porcentajes visibles en métricas o claims; usa importes, conteos, estados o etiquetas cualitativas.
- Sustituye cualquier caso por consumo fuera de reserva, fuga operativa, validación con factura, tarifa/potencia, Datadis/CUPS, PMS/reservas e informe propietario.
- Solar, batería, arbitraje y hardware solo como módulos futuros o simulación prudente.
- Usa claims prudentes: "ahorro estimado", "validable con factura", "priorizar oportunidades", "pendiente de confirmar".
- Mantén estética moderna: menos beige, más blanco/gris claro, acento teal/emerald sobrio, cards de 8px, app real y densa.
`.trim();

const pagePrompts = {
  landing: `
Refina especialmente la zona above-the-fold.
H1 exacto: "Control energético para carteras turísticas."
Subcopy exacta: "Cruza reservas, Datadis/CUPS, facturas y tarifas para detectar fugas, priorizar operaciones y entregar informes claros a propietarios."
En problemas, sustituye "Climatización encendida en periodos vacíos" por "Consumo activo fuera de reserva".
No incluyas porcentajes tipo 30% ni claims de ahorro total.
No incluyas ningún porcentaje visible en la landing: ni 30%, ni 14%, ni 8%, ni "potencial". Usa "Validable con factura", "Fuga detectada" o "Pendiente de validar".
`,
  dashboard: `
Dashboard de cartera. Cambia cualquier porcentaje tipo 30% por variaciones prudentes como "pendiente de validar" o "estimación con factura".
`,
  operations: `
Cola de operaciones. Cambia porcentajes agresivos por evidencia operativa: kWh, coste estimado, umbral, estado y siguiente acción.
`,
  "apartment-detail": `
Detalle de apartamento. Cambia marca EnergyOps por EnergyOS y elimina cualquier texto inglés tipo "AC running while vacant"; usa "consumo activo fuera de reserva".
`,
  "tariff-power": `
Tarifa/potencia. Cambia porcentajes agresivos por ahorro estimado anual y recomendación pendiente de confirmar con factura.
`,
  leads: `
Leads. Mantén tabla de cualificación; todo en español; marca EnergyOS.
`,
  "pilot-settings": `
Configuración piloto. Traduce textos ingleses: "Manage integrations..." etc. Mantén Datadis/CUPS, CSV/manual fallback, reglas, informes y módulos futuros.
`,
  "owner-report": `
Informe propietario. Cambia EnergyManager por EnergyOS. Elimina climatización y porcentajes agresivos. Enfatiza informe financiero-operativo defendible.
`,
};

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
        res.on("data", (chunk) => (data += chunk));
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
  return all.filter((screen) => screen.screenType !== "DOCUMENT").at(-1) || all.at(-1) || null;
}

function extractUpdatedScreenId(response) {
  const roots = [response?.result?.structuredContent, parseEmbeddedPayload(response)].filter(Boolean);
  for (const root of roots) {
    for (const comp of root.outputComponents || []) {
      const screenId = comp?.sessionEvent?.eventPayload?.screen_id;
      if (screenId) return screenId;
    }
  }
  return null;
}

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

const summary = JSON.parse(fs.readFileSync(SUMMARY_FILE, "utf8"));

for (const [key, screen] of Object.entries(summary.screens)) {
  if (ONLY_PAGES.length && !ONLY_PAGES.includes(key)) continue;

  const prompt = `${commonPrompt}\n\n${pagePrompts[key] || ""}`.trim();
  const base = `${PREFIX}-${key}`;
  const response = await callStitch("edit_screens", {
    projectId: summary.projectId,
    selectedScreenIds: [screen.screenId],
    prompt,
    deviceType: "DESKTOP",
    modelId: MODEL_ID,
  });
  fs.writeFileSync(`${base}-clean-edit-response.json`, `${JSON.stringify(response, null, 2)}\n`);
  if (response?.error || response?.result?.isError) {
    const text =
      response?.error?.message ||
      response?.result?.content?.map((item) => item.text).join("\n") ||
      "Unknown Stitch error";
    throw new Error(`${key} edit failed: ${text}`);
  }

  let nextScreen = extractBestScreen(response);
  const updatedScreenId = extractUpdatedScreenId(response);
  if (!nextScreen && updatedScreenId) {
    const screenResponse = await callStitch("get_screen", {
      projectId: summary.projectId,
      screenId: updatedScreenId,
      name: `projects/${summary.projectId}/screens/${updatedScreenId}`,
    });
    fs.writeFileSync(`${base}-clean-edit-get-screen.json`, `${JSON.stringify(screenResponse, null, 2)}\n`);
    nextScreen = extractBestScreen(screenResponse) || screenResponse?.result?.structuredContent || parseEmbeddedPayload(screenResponse)?.screen;
  }
  if (!nextScreen) throw new Error(`Could not extract edited screen for ${key}`);

  const nextScreenName =
    nextScreen.name || (nextScreen.id ? `projects/${summary.projectId}/screens/${nextScreen.id}` : null);
  const nextScreenId = nextScreen.id || nextScreenName?.split("/").pop() || screen.screenId;
  const htmlUrl = nextScreen.htmlCode?.downloadUrl || null;
  const screenshotUrl = nextScreen.screenshot?.downloadUrl || null;

  const local = screen.localFiles || {};
  if (htmlUrl && local.html) download(htmlUrl, local.html);
  if (screenshotUrl && local.stitchPng) download(screenshotUrl, local.stitchPng);

  screen.screenId = nextScreenId;
  screen.screenName = nextScreenName;
  screen.htmlCodeName = nextScreen.htmlCode?.name || null;
  screen.screenshotName = nextScreen.screenshot?.name || null;
  screen.htmlDownloadUrl = htmlUrl;
  screen.screenshotDownloadUrl = screenshotUrl;
  screen.generatedAt = new Date().toISOString();
  screen.editedForCleanV1 = true;

  fs.writeFileSync(screen.localFiles.meta, `${JSON.stringify(screen, null, 2)}\n`);
  fs.writeFileSync(SUMMARY_FILE, `${JSON.stringify(summary, null, 2)}\n`);
  console.log(`Edited ${key}`);
}
