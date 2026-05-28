/**
 * EnergyOS - Landing Aura v5.5
 *
 * New Stitch project, advanced visual direction, corrected market message.
 */

import { existsSync, statSync, writeFileSync } from "fs";
import { execFileSync } from "child_process";
import https from "https";

const PREFIX = "stitch-landing-aura-v5-5";

const API_KEY = process.env.STITCH_API_KEY;
if (!API_KEY) {
  console.error("Missing STITCH_API_KEY");
  process.exit(1);
}

const LANDING_PROMPT = `Create a visually advanced landing page for EnergyOS.

PRODUCT:
EnergyOS is an energy autopilot for professional accommodation portfolios in Spain. It helps tourist-apartment managers and serviced-apartment operators control high-consumption devices, optimize tariffs/contracted power, use Datadis/CUPS/factura data, and manage solar/battery arbitrage opportunities.

CRITICAL STRATEGY:
This must NOT feel like a generic SaaS energy dashboard.
It must feel like an advanced control layer: detect -> decide -> automate -> report.
The first viewport must clearly communicate:
1. intelligent control of appliances/devices based on reservations,
2. tariff and contracted-power optimization,
3. advanced solar/battery arbitrage,
4. Datadis/CUPS/invoice intelligence,
5. owner-ready reporting.

VISUAL STYLE:
Use a sophisticated Aura mobile-flow / premium product-system aesthetic:
- Dark graphite/ink base: #101512, #17201B, #202A24
- Surfaces: #F7F8F4, #FFFFFF, #E9EEE7
- Accents: electric green #B6FF5C, cyan #67E8F9, warm amber #FBBF24, alert red #F87171
- Dense product UI, mobile-flow panels, command center, segmented controls, timeline cards, bottom-sheet style surfaces
- Crisp 1px borders, subtle shadows, no decorative orbs, no purple gradients, no beige/orange dominance
- Cards max radius 8px unless a phone/device mockup naturally needs more
- Use Material Symbols or clean line icons
- Typography: Inter for all text, JetBrains Mono for metrics
- No oversized hero. First viewport around 680-740px tall on desktop and it must reveal the next section.

COPY, SPANISH ONLY:

Header:
- EnergyOS
- Producto, Tarifas, Arbitraje, Informes
- CTA: Solicitar diagnóstico

Hero badge:
"Energy autopilot para carteras de alojamientos"

H1:
"Controla aparatos, tarifas y baterías desde una sola capa inteligente."

Subhead:
"EnergyOS cruza reservas, Datadis/CUPS, facturas, precios horarios y dispositivos conectados para decidir cuándo consumir, cortar, cargar o reportar. Menos coste, más control y explicaciones claras para cada propietario."

Primary CTA:
"Solicitar diagnóstico gratuito"

Support line near CTA:
"Sin hardware obligatorio para empezar. Integraciones avanzadas cuando ya hay dispositivos, solar o batería."

Hero proof chips:
- "Reservas -> reglas de consumo"
- "Datadis/CUPS -> diagnóstico"
- "Tarifas -> potencia y horarios"
- "Baterías -> arbitraje avanzado"

RIGHT HERO VISUAL:
Create an advanced command-center mockup, not a simple chart.
It should show:
- Top bar: "Cartera Costa Norte", status "Modo ahorro activo"
- A central flow: Detecta -> Decide -> Automatiza -> Reporta
- Four compact modules:
  1. "Aparatos" with a rule: "OFF si no hay reserva"
  2. "Tarifa" with: "mover consumo a horas valle"
  3. "Batería" with: "cargar 13:00 / descargar 20:00"
  4. "Propietario" with: "informe listo"
- A mini timeline of 24h prices with colored slots
- A small alert: "Consumo fuera de estancia detectado"
Use realistic labels, not fake huge metrics. You may use small illustrative values labeled "ejemplo".

SECTION 2 - Pain:
Headline: "La factura sube, pero nadie sabe qué la causó."
Three compact cards:
- "Aparatos encendidos fuera de reserva" - "Detecta consumo cuando no hay huéspedes y crea reglas de corte o aviso."
- "Potencia y tarifa mal ajustadas" - "Cruza CUPS, facturas y curva horaria para priorizar cambios defendibles."
- "Solar y batería sin estrategia" - "Convierte excedentes, precios horarios y ciclos de batería en decisiones operativas."

SECTION 3 - Control loop:
Headline: "Del dato a la acción, sin perseguir hojas de cálculo."
Four horizontal steps:
Detecta, Decide, Automatiza, Reporta.
Each step must explain the mechanism in one sentence.

SECTION 4 - Platform modules:
Use a refined bento grid with six modules:
- Control por reservas
- Datadis, CUPS y facturas
- Optimización de tarifa y potencia
- Arbitraje solar/batería
- Alertas operativas
- Informes para propietarios

SECTION 5 - Diagnostic offer:
Headline: "Empieza con un diagnóstico de tu cartera."
Text: "En el piloto revisamos una muestra de alojamientos, detectamos fugas y priorizamos las primeras automatizaciones."
Form with exactly four fields:
- Nombre
- Email
- Nº de alojamientos
- Principal dolor (select-like visual)
Button: "Solicitar diagnóstico gratuito"

FOOTER:
Small, minimal.

STRICT REQUIREMENTS:
- No unsupported social proof numbers like 120+, 24%, 85%, 1.400+.
- No "ROI garantizado".
- No "IA" buzzword as main promise.
- Do not say Datadis is real-time control. Datadis is diagnostic/consumption intelligence.
- Make battery/arbitrage visible in first viewport, but not the only hero concept.
- Desktop and mobile responsive.
- No text overlap. No horizontal overflow.
- Do not place cards inside cards except inside the intentional command-center mockup.
- Output a complete HTML screen.`;

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

function extractJsonObjects(response) {
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

function extractScreen(response) {
  for (const parsed of extractJsonObjects(response)) {
    if (parsed.screen) return parsed.screen;
    if (Array.isArray(parsed.screens)) return parsed.screens[parsed.screens.length - 1];
    for (const component of parsed?.outputComponents || []) {
      const screens = component?.design?.screens;
      if (!Array.isArray(screens)) continue;
      const designScreen = [...screens].reverse().find((screen) => screen.screenType === "DESIGN");
      return designScreen || screens[screens.length - 1];
    }
  }
  return null;
}

function extractProjectId(response) {
  for (const parsed of extractJsonObjects(response)) {
    if (parsed.name) return parsed.name.replace(/^projects\//, "");
    if (parsed.project?.name) return parsed.project.name.replace(/^projects\//, "");
    if (parsed.project_id) return parsed.project_id;
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
  console.log("Creating new Stitch project for EnergyOS landing v5.5...");
  const projectResponse = await callStitch("create_project", {
    title: "EnergyOS Landing Aura v5.5",
  });
  writeFileSync(`${PREFIX}-project-response.json`, JSON.stringify(projectResponse, null, 2));

  const projectId = extractProjectId(projectResponse);
  if (!projectId) {
    console.error("Could not extract project id");
    process.exit(1);
  }
  writeFileSync(`${PREFIX}.project-id`, `${projectId}\n`);

  console.log(`Project: ${projectId}`);
  console.log("Generating desktop landing screen...");

  const response = await callStitch("generate_screen_from_text", {
    project_id: projectId,
    prompt: LANDING_PROMPT,
    device_type: "DESKTOP",
  });

  writeFileSync(`${PREFIX}-response.json`, JSON.stringify(response, null, 2));

  if (response?.error || response?.result?.isError) {
    console.error(
      "Error:",
      JSON.stringify(response?.error || response?.result?.content, null, 2).slice(0, 800),
    );
    process.exit(1);
  }

  const screen = extractScreen(response);
  if (!screen) {
    console.error("No screen found");
    process.exit(1);
  }

  console.log(`Screen: ${screen.id || screen.name} (${screen.width}x${screen.height})`);

  const htmlUrl = screen.htmlCode?.downloadUrl || screen.downloadUrl || null;
  const screenshotUrl = screen.screenshot?.downloadUrl || null;

  if (htmlUrl && download(htmlUrl, `${PREFIX}.html`)) console.log("HTML saved");
  if (screenshotUrl && download(screenshotUrl, `${PREFIX}-stitch.png`)) {
    console.log("Stitch screenshot saved");
  }

  console.log("Done");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
