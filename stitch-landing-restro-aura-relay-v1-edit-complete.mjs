import https from "https";
import fs from "fs";
import { execFileSync } from "child_process";

const PREFIX = "stitch-landing-restro-aura-relay-v1";
const MODEL_ID = "GEMINI_3_1_PRO";

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

const meta = JSON.parse(fs.readFileSync(`${PREFIX}-meta.json`, "utf8"));

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

function download(url, target) {
  if (!url) return false;
  execFileSync("curl", ["-L", "-sS", "-o", target, url], { stdio: "inherit" });
  return fs.existsSync(target) && fs.statSync(target).size > 0;
}

const prompt = `
Extend the current EnergyOS screen into a complete public landing page.

Keep the existing hero direction:
- Restro base style.
- Green Aura palette.
- RelayEstate-style premium diagnostic concept.
- Generated hero image stays as the command-screen product visual.

Critical fix:
The current screen is only a hero. Add the missing sections below the hero. Do not remove the hero. Do not add the footer until every required section exists.

Required sections, in this order:

1. Existing header and hero.

2. Diagnostic rail, headline "Donde hoy se pierde margen".
Use a vertical rail with these five stages: Reserva, Consumo, Tarifa, Bateria, Informe.

3. Platform loop, headline "Detecta, decide, automatiza y reporta."
Four compact cards:
- Detecta: Cruza reservas, CUPS, facturas y curvas horarias.
- Decide: Prioriza fugas, potencia, tramos y oportunidades de arbitraje.
- Automatiza: Activa reglas para aparatos conectados cuando existe integracion.
- Reporta: Convierte decisiones tecnicas en informes claros para propietarios.

4. Modules, headline "Una capa para toda la operacion energetica".
Six Restro cards:
- Control inteligente de aparatos.
- Datadis, CUPS y facturas.
- Optimizacion de tarifa y potencia.
- Arbitraje solar/bateria.
- Alertas operativas.
- Informes para propietarios.

5. FAQ / objections, headline "Preguntas que una gestora se hace antes del piloto".
Four rows:
- Necesito hardware para empezar?
- Datadis controla los aparatos en tiempo real?
- Esto sirve si no tengo bateria?
- Que recibe una gestora en el piloto?

6. Final CTA, headline "Audita una muestra de tu cartera."
Add a lead form with fields: Nombre, Email, Numero de alojamientos, Principal dolor.
Button: Solicitar diagnostico gratuito.

7. Footer.

Style:
- Keep Restro modular cards, 24-32px radii, calm spacing.
- Keep green-toned background and deep forest hero.
- Use light green editorial sections after the hero.
- No fake metrics, no ROI garantizado, no social proof logos.
- No horizontal overflow, no text overlap.
- Spanish copy only.
`;

console.log(`Editing ${meta.screenId} in ${meta.projectUrl}`);
const response = await callStitch("edit_screens", {
  projectId: meta.projectId,
  selectedScreenIds: [meta.screenId],
  prompt,
  deviceType: "DESKTOP",
  modelId: MODEL_ID,
});

fs.writeFileSync(`${PREFIX}-complete-edit-response.json`, `${JSON.stringify(response, null, 2)}\n`);

if (response?.error || response?.result?.isError) {
  throw new Error(JSON.stringify(response?.error || response?.result?.content, null, 2).slice(0, 1000));
}

const screen = extractBestScreen(response);
if (!screen) throw new Error("Could not extract edited screen");

const screenName = screen.name || (screen.id ? `projects/${meta.projectId}/screens/${screen.id}` : null);
const screenId = screen.id || screenName?.split("/").pop() || meta.screenId;
const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
const screenshotUrl = screen.screenshot?.downloadUrl || null;

if (htmlUrl) download(htmlUrl, `${PREFIX}.html`);
if (screenshotUrl) download(screenshotUrl, `${PREFIX}-stitch.png`);

const nextMeta = {
  ...meta,
  screenId,
  screenName,
  width: screen.width || meta.width || null,
  height: screen.height || meta.height || null,
  htmlCodeName: screen.htmlCode?.name || meta.htmlCodeName || null,
  screenshotName: screen.screenshot?.name || meta.screenshotName || null,
  htmlDownloadUrl: htmlUrl || meta.htmlDownloadUrl || null,
  screenshotDownloadUrl: screenshotUrl || meta.screenshotDownloadUrl || null,
  completedEditAt: new Date().toISOString(),
};

fs.writeFileSync(`${PREFIX}-meta.json`, `${JSON.stringify(nextMeta, null, 2)}\n`);
console.log(JSON.stringify(nextMeta, null, 2));
