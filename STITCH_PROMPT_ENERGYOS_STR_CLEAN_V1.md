# EnergyOS STR Clean V1 - Stitch Source Prompt

## Product Strategy

EnergyOS is a software-first energy operations platform for professional tourist-apartment and short-term rental managers in Spain.

Initial wedge:

- PMS/reservation calendar
- Datadis/CUPS/facturas
- tariff and contracted-power review
- owner reporting
- operations queue for anomalies and off-reservation consumption

Expansion modules:

- Shelly/hardware pilot
- solar/battery/arbitrage simulation
- fincas/community management

Do not make expansion modules the main promise. They can appear as roadmap/future modules or pilot qualification.

## Landing Hero

Hero must be short, direct and easy to understand in one glance.

Use this H1 exactly:

`Control energético para carteras turísticas.`

Use this subcopy:

`Cruza reservas, Datadis/CUPS, facturas y tarifas para detectar fugas, priorizar operaciones y entregar informes claros a propietarios.`

Avoid long hero sentences. Avoid multiple clauses in H1. H1 max 52 characters.

## Tone

- Spanish UI.
- Premium B2B SaaS.
- Calm, operational, credible.
- No generic sustainability marketing.
- No HVAC/climate positioning.
- No "ROI garantizado".
- No aggressive unqualified savings claims.
- Do not use visible percentage claims anywhere in this prototype: no 30%, 24%, 14%, 12%, 8%, 100% as business/marketing metrics. Use counts, euros, kWh, statuses, "estimado" or "pendiente de validar" instead.
- Brand must always be EnergyOS. Never use EnergyOps, EnergyManager, EnergiCore or any other brand.
- Avoid English UI strings unless they are product names like Datadis, PMS or CUPS. Use "Panel", "Añadir propiedad", "Informe propietario", "Estado energético", "Carga actual".
- Use "ahorro estimado", "validable con factura", "priorizar oportunidades", "pendiente de confirmar".

## Visual Direction

- Light mode.
- Professional SaaS, dense but calm.
- White/near-white cards, subtle gray background.
- Emerald/teal as primary, amber only for warnings.
- Avoid beige-heavy Restro styling in the hero; keep warmth but make it sharper and more modern.
- Use restrained cards, 8px radius, compact nav, data-rich panels.
- Use real app-like interface immediately; no marketing-only decorative hero.

## Design System Hints

- Headline font: Plus Jakarta Sans or Google Sans.
- Body font: Inter or Google Sans Text.
- Numeric font: JetBrains Mono or Google Sans Mono.
- Cards: white, 1px border, subtle shadow only where useful.
- Background: #F8FAFC or #FAFAFA.
- Primary: #0F766E or #10B981.
- Text: #0F172A.
- Muted: #64748B.
- Border: #E2E8F0.
- Radius: 8px.

## Navigation For App Screens

Use one consistent app shell:

- Dashboard
- Apartamentos
- Operaciones
- Detalle
- Tarifa/Potencia
- Leads
- Configuración
- Informe propietario

## Pages

### 1. Landing

Goal: explain and convert.

Must include:

- Short H1 exactly as specified.
- Subcopy exactly as specified.
- CTA primary: "Solicitar demo"
- CTA secondary: "Ver flujo operativo"
- Proof bar: Datadis/CUPS, PMS/reservas, facturas/tarifas, informes propietario
- Product preview above the fold or immediately visible after hero
- Problem section focused on off-reservation consumption, bill opacity, tariff/power drift, owner reporting
- No climatización, no HVAC, no comfort. The first problem card should say "Consumo activo fuera de reserva", not climate or AC.
- No visible percentages in landing metrics. Use "Fuga detectada", "Validable con factura", "Informe listo", "Pendiente de validar".
- How it works: connect PMS + Datadis, cross reservations/consumption/facturas, prioritize alerts, send owner report
- Lead form qualifying: units, PMS, Datadis/CUPS access, invoice availability, owner-reporting pain

### 2. Dashboard

Goal: portfolio command center.

Must include:

- H1: "Control energético de cartera"
- KPIs: off-reservation cost, CUPS connected, invoices processed, actions open, owner reports pending
- Priority now card
- Chart: non-operational consumption trend
- City/property split
- Next best actions

### 3. Apartments

Goal: manage individual units.

Must include:

- Cards/table with unit, city, owner, reservation status, current load, tariff/contract status, priority
- Actions: validate consumption, review tariff, prepare report, inspect anomaly

### 4. Operations

Goal: actionable queue.

Must include:

- Queue items: off-reservation consumption, power peak, tariff mismatch, owner report pending, future solar/battery simulation
- Detail panel with evidence, threshold and recommended action

### 5. Apartment Detail

Goal: explain one asset.

Must include:

- Reservation timeline
- Energy state
- Datadis/CUPS/invoice references
- Recommended actions
- Tariff/power summary
- Owner report CTA

### 6. Tariff/Power

Goal: prudent optimization.

Must include:

- Current vs recommended tariff/power
- Breakdown: fixed, power, energy, taxes/regulated charges
- Validation with invoice
- "Recommendation pending confirmation"

### 7. Leads

Goal: qualify pilots.

Must include:

- Leads table with units, PMS, Datadis/CUPS status, invoices available, pain, priority
- Visible "Alcance del piloto" chips: consumo, reservas, tarifa, potencia, contrato, operaciones, propietario, informe, cartera, solar, batería, arbitraje

### 8. Pilot Settings

Goal: configure pilot.

Must include:

- PMS/iCal/calendar integration
- Datadis/CUPS authorization
- CSV/manual invoice fallback
- Alert rules
- Owner report settings
- Future modules toggles: Shelly, solar, battery, arbitrage

### 9. Owner Report

Goal: owner-facing proof.

Must include:

- Executive summary
- Monthly cost and non-operational consumption
- Actions performed
- Tariff/power validation
- Recommendations
- Export/send CTA
