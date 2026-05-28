# Stitch Prompt — Tramo ReflexAI V1

Create a complete web landing page for **Tramo**, a B2B energy operations platform for professional tourist-property managers in Spain.

## Design Reference: ReflexAI

Use reflexai.com as the primary design DNA:
- **Dark green primary accent: #061F00** — used for buttons, key accents, and brand marks. This is NOT a background color.
- **Cream/paper backgrounds: #f9f8f5 (paper), #f4f2ed (surface), #ffffff (cards)**
- **Clean B2B editorial style:** high-contrast typography, generous white space, data-forward layouts
- **Professional, precise, technical trust** — no decorative fluff, no generic SaaS templates
- **One accent color only:** forest dark green (#061F00) for CTAs and brand elements. Lime (#A5E119) reserved for data viz only.

## Public Brand

Name: Tramo
Tagline: Cada kWh, en su tramo correcto.
Landing H1: Control energético por reserva para carteras de apartamentos turísticos.
Subcopy: Tramo cruza reservas, CUPS, facturas y tarifas para que cada decisión energética tenga evidencia y cada propietario reciba un informe claro del impacto operativo sobre su factura.

## Visual Tokens

Colors:
- Background: #f9f8f5 (paper)
- Surface: #f4f2ed
- Card: #ffffff
- Border: #d8d5cc
- Strong border: #c4c0b6
- Ink: #061F00
- Muted: #4a5a3e
- Secondary: #687a5a
- Primary/Accent forest: #061F00
- Forest light: #0D3B06
- Lime (data viz only): #A5E119
- Mint (data viz only): #5ee8c2
- Orange (alerts only): #e6813a
- Error: #e74c3c
- Success: #2ecc71

Typography:
- Display/Headlines: Plus Jakarta Sans, weight 600-700
- Body: Inter, weight 400-500
- Metrics/Data: JetBrains Mono, weight 500-600

Shapes:
- Buttons: full pill radius (9999px)
- Cards: 22px radius
- Smaller elements: 14px radius
- Inputs: 14px radius

Buttons:
- Primary: dark green background (#061F00), white text, pill shape, hover lifts 2px with subtle shadow
- Secondary: transparent, forest green border, forest green text
- Ghost: subtle surface background, forest green text

## Landing Structure

Header:
- Fixed top, cream background with blur, subtle border-bottom
- Tramo logo left, nav links right (Producto, Dashboard, Confianza, Contacto)
- CTA button: "Diagnosticar mi cartera" in dark green pill

Hero:
- Cream (#f9f8f5) background
- Left column: headline + subtext + CTAs
- Badge: "Inteligencia Operativa Energética" (mono font, forest green)
- Primary CTA: "Diagnosticar mi cartera" (dark green button)
- Secondary CTA: "Ver ejemplo"
- Email link: hola@tramo.energy below CTAs
- Right column: interactive dashboard preview panel (white card, subtle border, light shadow)
  - Panel header: "Panel de Control · Cartera Activa" with date
  - 3 KPI cards: kWh Totales, Alerta fuera reserva, Ahorro Est.
  - Bar chart: "Consumo por estado de reserva · 7 días" with "Vista previa" label
  - Alert row: "VGO-014 · 4.2 kWh fuera de reserva · checkout 11:00 · detectado 13:10-16:40" with "Revisar" action
  - Bars: booked (lime), alert (orange), idle (gray)
  - Hover effect: bars glow in their respective colors

Pain Section (LO QUE TE CUESTA):
- 3 cards: Consumo fuera de reserva, Potencia y tarifa heredadas, Propietarios sin explicación
- Each with icon, evidence box with concrete data

System Flow (CÓMO FUNCIONA TRAMO):
- Horizontal flow diagram: Reservas/PMS → CUPS/Datadis → Atribución kWh → Fuera reserva → Propietarios
- Nodes with icons, arrows between them
- Clean white cards on surface background

Modules:
- 2-column grid: Reglas operativas, Tarifas/Potencia, Informes propietarios, Evaluación batería
- Each with badge, title, description, mini graphic

Dashboard Preview (VISTA PREVIA):
- Full-width card with metrics table, chart, and controls
- Monospace data, clean table rows

Trust Section:
- GDPR compliant, zero-data pilot, no credentials needed
- "Piloto Seguro" banner: "Diagnostica sin instalación"

CTA + Form:
- Surface background (#f4f2ed)
- "Solicita un diagnóstico de cartera"
- Form fields: Nombre, Empresa, Email, Nº Alojamientos, Ciudad/Región, PMS, Acceso Datadis, Baterías, Mensaje
- Submit button: dark green, full width, pill shape
- Privacy note below form

Footer:
- Surface-low background (#edebe4)
- Tramo logo, tagline, links, copyright

## Hard Restrictions

- NO dark backgrounds on hero, header, CTA, or footer
- NO generic green-energy look
- NO "En vivo" badges — use "Vista previa" instead
- NO decorative orbs, blobs or gradients
- NO phone mockup hero
- NO text overflow
- NO horizontal scroll at mobile 375px
- NO "AI" as primary claim
- NO "ahorro garantizado"
- NO "hasta 30%" claims
- DO use dark green (#061F00) for buttons and CTAs only
- DO use lime (#A5E119) for data visualization only (charts, bars)
- DO use cream/paper backgrounds throughout
- DO use monospace fonts for all data/metrics
- DO include interactive/live elements in the hero panel

## Tone

Spanish, direct, premium, operational.
Use concrete words: kWh, CUPS, Datadis, P1/P2, potencia, reserva, factura, propietario
Avoid buzzwords.
