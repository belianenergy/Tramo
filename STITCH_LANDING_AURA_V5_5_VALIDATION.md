# EnergyOS Landing Aura v5.5 - Validation Loops

Date: 2026-05-16
Goal: rebuild the landing approach until the message and visual direction communicate the full EnergyOS platform at a high standard.

## Loop 1 - Market Reframe

Finding: the market does not need another energy dashboard. The strongest demand is for an automation layer that acts on energy data: tariff prices, smart-meter data, solar/battery state, connected appliances, EV and comfort constraints.

Implication: the landing must lead with action and control, not passive monitoring.

Rejected message:
- "Controla el coste energético de tu cartera turística"

Better message:
- "El piloto automático energético para carteras de alojamientos"

Why: it makes EnergyOS feel like an operating system that decides and acts, while still fitting the B2B lead target.

## Loop 2 - Wedge Discipline

Finding: a broad B2C "Spanish home autopilot" is attractive, but it weakens the current lead capture. Tourist-apartment managers have a sharper pain: bills rise, owners ask why, and the manager cannot prove what happened or act across many units.

Decision: keep the primary landing wedge as professional portfolios of tourist apartments and serviced accommodation in Spain. Show the full platform through modules:

- Reservation-aware appliance control
- Datadis/CUPS/factura analysis
- Tariff and contracted-power optimization
- Owner reporting
- Solar/battery arbitrage as an advanced module

## Loop 3 - Copy Integrity

Problems in v4:

- Feature-list hero: "Automatiza aparatos por reservas. Optimiza tarifas. Gestiona baterías."
- Unsupported proof numbers: "120+", "24%", "1.400+", "85%", "12 años"
- Battery arbitrage too prominent in the hero mockup
- Weak explanation of how control actually happens
- CTA fragmentation

Rules for v5.5:

- No naked stats unless labeled as example, diagnostic or pilot estimate.
- One primary CTA: "Solicitar diagnóstico gratuito".
- Show the control loop above the fold: detect, decide, automate, report.
- Use "sin hardware obligatorio" instead of overpromising "sin hardware" for every future control use case.
- Datadis is for billing/consumption intelligence; real-time appliance control depends on existing connected devices or optional integrations.

## Loop 4 - Visual Direction

Target: advanced product aesthetic inspired by Aura/mobile-flow systems, not a generic SaaS template.

Visual requirements:

- First viewport must be compact; the next section should be visible.
- Full-width editorial/product layout, not nested cards.
- A sophisticated command-center mockup with live-looking modules.
- Dark graphite/ink base with electric green, cyan and warm amber accents.
- Mobile-flow style panels, bottom sheets, segmented controls and timeline cards.
- No decorative gradient orbs, no purple SaaS palette, no beige/orange dominance.
- Dense but legible UI: product credibility over marketing decoration.

## Final v5.5 Landing Thesis

EnergyOS is the energy autopilot for accommodation portfolios in Spain. It connects reservation calendars, Datadis/CUPS, invoices, tariffs and connected devices so managers can detect waste, automate high-consumption equipment, optimize tariff/power decisions, turn solar/battery assets into savings opportunities, and explain every action to owners.

## Above-The-Fold Copy

Badge:
Energy autopilot para carteras de alojamientos

H1:
Controla aparatos, tarifas y baterías desde una sola capa inteligente.

Subhead:
EnergyOS cruza reservas, Datadis/CUPS, facturas, precios horarios y dispositivos conectados para decidir cuándo consumir, cortar, cargar o reportar. Menos coste, más control y explicaciones claras para cada propietario.

Primary CTA:
Solicitar diagnóstico gratuito

Secondary text, not button:
Sin hardware obligatorio para empezar. Integraciones avanzadas cuando ya hay dispositivos, solar o batería.

Hero proof chips:
- Reservas -> reglas de consumo
- Datadis/CUPS -> diagnóstico
- Tarifas -> potencia y horarios
- Baterías -> arbitraje avanzado

## Required Sections

1. Hero with command-center mockup and visible control-loop modules.
2. Pain section: "La factura sube, pero nadie sabe qué la causó."
3. Control loop: Detecta -> Decide -> Automatiza -> Reporta.
4. Platform modules: appliances, tariffs/power, Datadis/facturas, solar/battery arbitrage, owner reports.
5. Segment proof without fake metrics: "Diseñado para carteras de 10-100 alojamientos."
6. Diagnostic offer: short form with 4 fields.

## Validation Gate

The output must pass:

- One clear H1 under 95 chars.
- First viewport communicates appliances, tariffs and batteries.
- No unsupported percentages or large proof numbers.
- No horizontal overflow on desktop or mobile.
- Mobile view keeps CTA and product mockup readable.
- Visual style feels like an advanced product system, not a generic landing template.

## Loop 5 - v5.6 Advanced Visual Pass

Issue found after v5.5 QA: the page was strategically correct, but the hero relied on a remote screenshot-style image. That made the most important product proof feel slightly soft and less controllable than the rest of the system.

Change applied in `stitch-landing-aura-v5-6.html`:

- Replaced the hero screenshot with a native HTML/CSS command-center mockup.
- Added visible modules for appliances, tariff/power, solar/battery and owner reporting in the first viewport.
- Added an energy-grid background and scanline/control-room treatment without using decorative orbs or generic SaaS gradients.
- Tightened copy:
  - "explicación defendible" instead of generic "explicaciones claras"
  - no "tiempo real" claim tied to Datadis
  - automation copy now respects permissions and available integrations
  - battery/arbitrage copy is framed as simulation and advanced module, not guaranteed return

QA:

- Desktop 1440: PASS
- Mobile 375: PASS
- No horizontal overflow.
- H1 remains under 95 chars.
- First viewport covers appliances, tariffs, batteries, Datadis/CUPS and owner reporting.
- No unsupported percentage claims.

Current preferred candidate:

`stitch-landing-aura-v5-6.html`
