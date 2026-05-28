import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PROJECT_ID = "11820050226044719534";
const SUMMARY_PATH = "stitch-mvp-restro-style-v1-summary.json";
const PREFIX = "stitch-mvp-restro-style-v1";
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

if (!process.env.STITCH_API_KEY) {
  throw new Error("Missing STITCH_API_KEY. Add it to energyos/.env or export it before running.");
}

const commonPrompt = `
Edita esta pantalla existente de EnergyOS. Mantén el layout, estructura visual, paleta Restro, jerarquía, navegación y densidad de UI. No rediseñes desde cero.

Objetivo estratégico:
EnergyOS debe percibirse como el sistema operativo energético para gestoras de apartamentos turísticos y carteras inmobiliarias: consumo, contratos/tarifas, reservas/PMS, operaciones, informes a propietarios, alertas, oportunidades de ahorro, preparación para solar/baterías/arbitraje y escalabilidad multi-activo.
Tras revisión de mercado, el wedge inicial debe ser claro: gestoras profesionales de apartamentos turísticos en España. Mantén fincas, hardware, solar, batería y arbitraje como expansión o módulos futuros, pero no diluyas el mensaje principal.

Tono:
- SaaS B2B premium, claro y operativo.
- Hero/cabecera corta y directa: debe explicar la idea completa sin parecer una campaña genérica.
- Claims prudentes: nada de ROI garantizado ni porcentajes agresivos sin contexto.
- Mantén español profesional.
- Mensaje de negocio: proteger margen, reducir fugas operativas y dar reporting defendible a propietarios, no vender sostenibilidad genérica.

Elimina o sustituye todo enfoque estrecho de climatización. Prohibido usar estos textos o conceptos como eje:
climatización, A/C, temperatura, confort, ROI garantizado, trading, "48 monitorizados", "7 alertas", "-12%", "3,8 kW".

Sustituye incidentes tipo "A/C activo sin reserva" por acciones energéticas más amplias:
- consumo fuera de reserva
- pico de potencia
- contrato/tarifa desalineado
- anomalía de consumo
- oportunidad de ahorro
- informe pendiente para propietario
- simulación solar/batería/arbitraje, siempre como oportunidad futura prudente
`.trim();

const pagePrompts = {
  landing: `
Landing pública.
Hero recomendado:
"Controla el coste energético de tu cartera turística."
Subcopy:
"EnergyOS cruza consumos, reservas/PMS, CUPS, Datadis, facturas y tarifas para detectar fugas, priorizar operaciones y generar informes claros para propietarios."
Debe quedar claro que el producto inicial cubre operación diaria, reporting propietario, Datadis/CUPS, tarifas y potencia contratada. Solar/batería/arbitraje deben aparecer como simulación u oportunidad futura, no como promesa central.
Añade una señal visible de mercado español: "Datadis, CUPS y PMS en un flujo operativo".
Incluye SEO en el head si el export lo permite: title "EnergyOS para gestoras de apartamentos turísticos" y meta description sobre consumo, reservas, tarifas, Datadis e informes de propietarios.
Revisa especialmente la sección final y el formulario: no puede quedar "climatización", "confort" ni "ROI garantizado". Sustituye por:
- "Reduce fugas operativas con datos de consumo y reservas"
- "Ahorro estimado validable con factura"
- "Informes a propietarios"
- "Coste eléctrico fuera de reserva"
No uses iconos de HVAC como ac_unit ni thermostat; usa bolt, receipt_long, description, analytics, sync o account_balance_wallet.
Evita claims agresivos como "hasta un 30%" si no están condicionados. Sustituye por "prioriza oportunidades desde el primer mes" o "ahorro estimado validable con factura".
En "Cómo funciona", cada paso debe tener texto distinto:
1 Conecta PMS y Datadis/CUPS.
2 Cruza reservas, consumo y facturas.
3 Prioriza alertas operativas.
4 Envía informes a propietarios.
`,
  dashboard: `
Dashboard operativo.
La pantalla debe comunicar visión global de cartera turística: coste estimado, consumo fuera de reserva, próximos check-ins con riesgo energético, contratos/CUPS a revisar y acciones priorizadas.
Reemplaza tarjetas centradas en A/C por "consumo fuera de reserva", "picos de potencia", "tarifa a revisar" y "acciones abiertas".
Debe tener exactamente un H1 visible, corto y directo:
"Control energético de cartera"
No uses varios H1 ni dejes la pantalla sin H1.
`,
  apartments: `
Apartamentos / cartera.
Cada activo debe mostrar estado energético integral: consumo reciente, reserva próxima, contrato/tarifa, prioridad y oportunidad detectada.
Reemplaza botones de confort por validación energética o revisión operativa.
`,
  operations: `
Operaciones.
La cola debe mezclar acciones reales de gestoría energética: validar consumo fuera de reserva, revisar potencia contratada, preparar informe de propietario, contactar lead piloto, analizar oportunidad batería/solar.
El detalle lateral debe resolver una acción energética, no una incidencia de A/C.
`,
  "apartment-detail": `
Detalle de apartamento.
Debe contar la historia completa del activo: reservas, consumo, contrato, potencia, eventos, acciones recomendadas e informe.
Reemplaza cualquier estado de A/C por "consumo fuera de reserva" o "anomalía de consumo".
`,
  "tariff-power": `
Optimización tarifa/potencia.
Mantén el módulo como asesor prudente. Evita porcentajes absolutos agresivos. Usa "ahorro estimado", "potencia a revisar", "validación con factura" y "recomendación pendiente de confirmar".
`,
  leads: `
Leads / solicitudes piloto.
Los intereses deben cubrir cartera, Datadis/CUPS/facturas, reservas/PMS, informes a propietarios, tarifas, potencia contratada, operaciones y futuro hardware/solar/baterías.
Elimina interés exclusivo en automatización de A/C.
Incluye de forma natural conceptos de alcance completo: consumo, reservas, tarifa, potencia, contrato, operaciones, propietario, informe, cartera, solar, batería y arbitraje.
La pantalla debe dejar claro que EnergyOS cualifica pilotos para conectar datos energéticos, reservas y reporting operativo.
Añade o refuerza una sección visible "Alcance del piloto" con chips o bullets breves que contengan estos ámbitos:
consumo, reservas, tarifa, potencia, contrato, operaciones, propietario, informe, cartera, solar, batería, arbitraje.
No los ocultes en metadata ni en texto no visible: deben aparecer en la pantalla exportada.
Añade criterios de cualificación visibles: numero de unidades, PMS usado, acceso a Datadis/CUPS, facturas disponibles y dolor de reporting a propietarios.
`,
  "pilot-settings": `
Configuración piloto.
Debe configurar conexiones PMS/calendario, Datadis/CUPS/facturas, importación CSV/manual como fallback, reglas de consumo, umbrales de potencia, notificaciones, informes y módulos futuros.
Reemplaza reglas de climatización/temperatura por reglas energéticas integrales.
Incluye de forma natural conceptos de alcance completo: consumo, reservas, tarifa, potencia, contrato, operaciones, propietario, informe, cartera, solar, batería y arbitraje.
Debe sentirse como una consola de configuración del sistema operativo energético, no como un panel de termostatos.
`,
  "owner-report": `
Informe mensual propietario.
Debe sonar como informe financiero-operativo defendible para propietario: coste, consumo fuera de estancia/reserva, acciones realizadas, contrato/CUPS revisado, tarifa/potencia, recomendaciones prudentes.
Elimina A/C, temperatura y confort como eje.
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

async function callWithRetry(toolName, args) {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await callStitch(toolName, args);
      if (response?.error || response?.result?.isError) {
        const text =
          response?.error?.message ||
          response?.result?.content?.map((item) => item.text).join("\n") ||
          "Unknown Stitch error";
        throw new Error(text);
      }
      return response;
    } catch (error) {
      lastError = error;
      console.log(`Retryable Stitch error on attempt ${attempt}: ${error.message}`);
      await new Promise((resolve) => setTimeout(resolve, attempt * 8000));
    }
  }
  throw lastError;
}

function parseEmbeddedPayload(response) {
  for (const item of response?.result?.content || []) {
    const text = item?.text?.trim();
    if (text?.startsWith("{")) {
      try {
        return JSON.parse(text);
      } catch {}
    }
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

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

function backupFile(file) {
  if (!fs.existsSync(file)) return;
  const backup = `${file}.before-platform-copy-20260515`;
  if (!fs.existsSync(backup)) fs.copyFileSync(file, backup);
}

const summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, "utf8"));
const results = [];

for (const [key, screen] of Object.entries(summary.screens)) {
  if (ONLY_PAGES.length && !ONLY_PAGES.includes(key)) continue;

  const screenId = screen.screenId;
  const local = screen.localFiles || {};
  const prompt = `${commonPrompt}\n\n${pagePrompts[key] || ""}`.trim();
  const filePrefix = `${PREFIX}-${key}`;

  console.log(`Editing ${key} (${screenId})`);
  backupFile(local.html);
  backupFile(local.meta);

  const response = await callWithRetry("edit_screens", {
    projectId: PROJECT_ID,
    selectedScreenIds: [screenId],
    prompt,
    deviceType: "DESKTOP",
    modelId: MODEL_ID,
  });

  fs.writeFileSync(`${filePrefix}-platform-copy-response.json`, `${JSON.stringify(response, null, 2)}\n`);
  const nextScreen = extractBestScreen(response);
  if (!nextScreen) throw new Error(`Could not extract edited screen for ${key}`);

  const nextScreenName = nextScreen.name || (nextScreen.id ? `projects/${PROJECT_ID}/screens/${nextScreen.id}` : null);
  const nextScreenId = nextScreen.id || nextScreenName?.split("/").pop() || screenId;
  const htmlUrl = nextScreen.htmlCode?.downloadUrl || null;
  const screenshotUrl = nextScreen.screenshot?.downloadUrl || null;

  if (htmlUrl && local.html) download(htmlUrl, local.html);
  if (screenshotUrl && local.stitchPng) download(screenshotUrl, local.stitchPng);

  const metaPath = local.meta || `${filePrefix}-meta.json`;
  const currentMeta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {};
  const nextMeta = {
    ...currentMeta,
    screenId: nextScreenId,
    screenName: nextScreenName,
    htmlCodeName: nextScreen.htmlCode?.name || null,
    screenshotName: nextScreen.screenshot?.name || null,
    htmlDownloadUrl: htmlUrl,
    screenshotDownloadUrl: screenshotUrl,
    generatedAt: new Date().toISOString(),
    editedFromScreenId: screenId,
    note: "Remote Stitch platform-copy edit: broadened EnergyOS from narrow A/C/climate copy to full energy operations OS.",
  };
  fs.writeFileSync(metaPath, `${JSON.stringify(nextMeta, null, 2)}\n`);

  screen.screenId = nextScreenId;
  screen.screenName = nextScreenName;
  screen.htmlCodeName = nextMeta.htmlCodeName;
  screen.screenshotName = nextMeta.screenshotName;
  screen.htmlDownloadUrl = htmlUrl;
  screen.screenshotDownloadUrl = screenshotUrl;
  screen.generatedAt = nextMeta.generatedAt;
  screen.editedFromScreenId = nextMeta.editedFromScreenId;

  results.push({ key, from: screenId, to: nextScreenId, html: local.html, screenshot: local.stitchPng });
}

summary.generatedAt = new Date().toISOString();
summary.note = ONLY_PAGES.length
  ? `Partially updated by stitch-mvp-restro-style-v1-edit-platform-copy.mjs on 2026-05-15 for: ${ONLY_PAGES.join(", ")}.`
  : "Updated by stitch-mvp-restro-style-v1-edit-platform-copy.mjs on 2026-05-15.";
fs.writeFileSync(SUMMARY_PATH, `${JSON.stringify(summary, null, 2)}\n`);
fs.writeFileSync(`${PREFIX}-platform-copy-summary.json`, `${JSON.stringify({ projectId: PROJECT_ID, results, completedAt: new Date().toISOString() }, null, 2)}\n`);
console.log(`Edited ${results.length} screens.`);
