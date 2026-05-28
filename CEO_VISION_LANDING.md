# CEO Vision Landing - Tramo

Date: 2026-05-17  
Mode: SELECTIVE EXPANSION  
Scope: content vision only. No code changes.

## Executive Verdict

The landing is moving in the right direction visually, but the content is not yet sharp enough to sell Tramo to professional tourist-apartment managers.

The main problem is not length by itself. The problem is that the page does not yet dramatize the core pain:

> A manager sees the electricity bill weeks later, cannot attribute the cost to a stay, cannot tell an owner what happened, and cannot act while the waste is happening.

Tramo wins when it feels like an operational truth layer: every kWh is tied to a reservation window, idle period, tariff/power decision, or owner report.

The current landing has credible nouns: sensores, reservas, CUPS, Datadis, tarifas, OMIE, propietarios. But the narrative treats them as a feature list. It must treat them as a decision system.

## Strongest Challenges

1. **The hero over-expands the promise too early.** It mentions sensors, CUPS, Datadis, tariffs, batteries, arbitrage and owner reports in one paragraph. That makes Tramo sound broad before it sounds necessary.
2. **Battery/arbitrage is too close to the core promise.** It is interesting, but for the 10+ tourist-apartment wedge it should be a premium/qualification module, not the emotional center.
3. **The page does not create a clear "I need this" moment.** The visitor must immediately see a live alert: empty apartment, checkout at 11:00, 4.2 kWh after checkout, estimated cost, action.
4. **The current proof is not specific enough.** Tables and charts need timestamps, property codes, reservation state, CUPS/tariff evidence, and owner-ready language.
5. **The page lacks a strong system story.** It needs a visible chain: reservation + meter + CUPS/Datadis + tariff + rule + owner report.

## Central Promise

Current:

> Convierte la energía de tu cartera turística en margen operativo.

Verdict: keep the idea, tighten the execution.

Recommended H1:

> Convierte la energía de tu cartera turística en margen operativo.

Recommended supporting line:

> Tramo cruza consumo en tiempo real, reservas, CUPS/Datadis y tarifas para detectar kWh fuera de reserva, priorizar acciones y entregar informes claros a cada propietario.

Why this works:

- "Margen operativo" is correct for professional managers, not just owners.
- It avoids a weak "ahorra energía" commodity claim.
- It makes the wedge explicit: consumption attributed to reservation state.
- It leaves battery/arbitrage out of the first promise, where it currently dilutes the offer.

Alternative H1 if Mauro wants more direct pain:

> Sabe qué apartamentos gastan energía cuando no deberían.

Use this only if the landing is aimed at smaller managers/owners. For professional managers with 10+ units, "margen operativo" is stronger.

## Killer Feature Moment

The killer feature is not "dashboard", "Datadis", or "arbitraje".

The killer feature moment is:

> "VGO-014 está vacío desde las 11:00. A las 13:10 empezó un consumo de 1.2 kW constante. Ya van 4.2 kWh fuera de reserva. Acción: revisar termo/AC y enviar aviso."

This is the instant the visitor understands:

- Tramo sees what they cannot see.
- The alert is tied to occupancy/reservation state, not just a meter spike.
- The data is actionable now, before the invoice arrives.
- The same evidence can later be explained to an owner.

Every major section should reinforce this moment.

## Minimum Landing Sections

### 1. Header

Must include:

- Tramo wordmark.
- Short nav: Problema, Sistema, Modulos, Dashboard, Diagnostico.
- Primary CTA: "Diagnosticar mi cartera".

Remove or avoid:

- Generic "Solicitar diagnóstico" as the only repeated action. It is fine, but "mi cartera" makes the user self-identify.

### 2. Hero With Interactive Dashboard Mock

Must include:

- H1 with the central promise.
- Subcopy with the attribution layer: consumo + reservas + CUPS/Datadis + tarifas + propietarios.
- Primary CTA: "Diagnosticar mi cartera".
- Secondary CTA: "Ver dashboard demo".
- Product mock dashboard, not decorative.

Hero dashboard must show:

- Portfolio KPI: "32 alojamientos monitorizados".
- Live consumption: "18.4 kW ahora".
- Alert: "VGO-014 · vacío · 4.2 kWh fuera de reserva".
- Reservation state: "checkout 11:00 · consumo 13:10-16:40".
- Estimated impact: "42 EUR estimados".
- Tariff/power hint: "P2 actual 4.6 kW · recomendado 3.3 kW".
- Owner report status: "Informe Abril listo".

Interaction requirement:

- On hover over the alert, the related chart segment lights up.
- On hover over a property row, the reservation timeline and kWh chart highlight the same time window.
- On hover over tariff/power, P1/P2 bars light up.

This is the visual moment the current landing is missing.

### 3. Pain Triptych

Must include three concrete pains:

1. **Consumo fuera de reserva.** "No sabes que un piso vacío sigue consumiendo hasta que llega la factura."
2. **Tarifa/potencia heredada.** "Cada propiedad arrastra CUPS, potencia y tarifa que nadie revisa sistemáticamente."
3. **Propietarios sin explicación.** "El propietario ve coste; la gestora necesita evidencia y acciones defendibles."

Current issue:

- The existing "Soluciones operativas para gestores de activos" section is correct in topic, but too generic in title and too late emotionally. It should become the first narrative proof after the hero.

### 4. System Flow

Must include a diagram-like section:

```text
Reservas/PMS
    +
Sensores / consumo real
    +
CUPS / Datadis / facturas
    +
Tarifas / potencia / OMIE
    ↓
Tramo atribuye cada kWh
    ↓
Alertas operativas + decisiones + informes propietarios
```

This section is essential because it explains why Tramo is not another tariff comparator or dashboard.

### 5. Product Modules

Must show 4 primary modules, not 5 equal modules:

1. **Consumo en tiempo real y alertas fuera de reserva.** Core.
2. **Tarifa y potencia por CUPS.** Core economic lever.
3. **Reglas operativas por reserva.** Core action layer.
4. **Informes a propietarios.** Core trust/reporting layer.

Battery/arbitrage should be shown as a premium evaluation module, not one of the first four unless the target account has solar/batteries.

### 6. Product Proof Dashboard

Must include:

- Property list with state: empty, occupied, cleaning, maintenance.
- Consumption by reservation state chart: occupied vs idle vs anomaly.
- Active alerts queue.
- Tariff/power recommendation card.
- Owner report preview.
- Date range control.

Current issue:

- The current "Tramo en acción" table is too thin. It lists properties, but does not show the decision loop: evidence -> action -> report.

### 7. Evidence / Trust Section

Must include proof language even if there are no production case studies yet:

- "Datos que usamos": PMS/reservas, CUPS/Datadis, facturas, sensores, tarifas.
- "Datos que no pedimos en público": credentials, invoices, private documents through the form.
- "Estimaciones prudentes": no guaranteed savings.
- "Pilot-safe": start with a portfolio diagnosis and limited pilot.

Do not invent fake testimonials. If "12 pilotos activos en España" is not true, remove it or change to "Pilotos privados en preparación".

### 8. Qualification CTA / Form

Must be at the end, with a shorter CTA earlier.

CTA copy:

> Solicita un diagnóstico de cartera

Supporting copy:

> Revisamos cuántas propiedades tienes, qué datos están disponibles y dónde puede haber kWh sin explicación antes de plantear un piloto.

### 9. Footer

Must include:

- Tramo descriptor: "consumo atribuido por reserva y propietario".
- Contact/legal basics.
- Privacy helper copy.

## Sections That Can Be Cut Or Demoted

Cut or demote:

- **Battery/arbitrage as a main section.** Keep it as "Evaluación batería/arbitraje" after the core modules or inside advanced modules.
- **Generic benefits cards that repeat module copy.** Merge pain and benefit into sharper before/after cards.
- **Unsupported traction badges.** "12 pilotos activos" is strong only if true.
- **Vague "control total" claims.** Replace with data: kWh, timestamp, property code, reservation state, EUR estimate.

Keep:

- Hero product panel.
- Pain cards.
- Module detail.
- Dashboard proof table, but expand it.
- Qualification form.

## Ideal Narrative Sequence

```text
1. HERO IMPACT
   "Convierte la energía de tu cartera turística en margen operativo"
   + interactive dashboard showing one live outside-reservation alert.

2. THE PAIN
   Bills arrive late. Managers cannot attribute consumption to stays, idle periods or owners.

3. THE SYSTEM
   PMS/reservations + sensors + CUPS/Datadis + tariffs -> attributed kWh.

4. THE CORE ACTION LOOP
   Detect -> decide -> automate -> report.

5. MODULES
   Real-time consumption, tariff/power, reservation rules, owner reports.

6. PRODUCT PROOF
   Portfolio dashboard with real-looking metrics, charts and alert queue.

7. TRUST / PILOT SAFETY
   What data is used, what is not requested publicly, prudent estimates, pilot path.

8. LEAD FORM
   Diagnose my portfolio.
```

This sequence follows the requested hierarchy:

- 60% Sourceful Energy: editorial infrastructure story, physical data, cream/ink/orange.
- 25% Seline/Pirsch: clear product panels, metrics, charts, live dashboard.
- 15% Orderful: conversion rhythm from hero to pain to system to proof to form.

## Priority Modules

### 1. Consumo en tiempo real y alertas fuera de reserva

Why it is primary:

- It is the strongest HW + software differentiator.
- It creates immediate operational value.
- It is hardest to replace with Excel or tariff comparison.

Visible proof:

- "VGO-014 · vacío · 4.2 kWh fuera de reserva".
- "Checkout 11:00 · consumo detectado 13:10-16:40".
- "Acción: revisar termo / AC / regla post-checkout".

### 2. Tarifas y potencia por CUPS

Why it is primary:

- It creates structural savings and shows analytical credibility.
- It uses Spanish-specific language: CUPS, Datadis, P1/P2, potencia.

Visible proof:

- "P2 actual 4.6 kW".
- "P2 recomendada 3.3 kW".
- "Revisión recomendada, no ahorro garantizado".

### 3. Domótica / reglas operativas por reserva

Why it is primary:

- It turns alerts into automated operational control.
- It connects with PMS/reservation windows.

Visible proof:

- "Checkout 11:00 -> modo ahorro 11:45".
- "Pre-check-in -> confort activo 60 min antes".
- "Sin reserva activa -> aviso si consumo >0.8 kW durante 45 min".

Important:

- Do not call this "smart home". Call it "reglas operativas por reserva".

### 4. Informes a propietarios

Why it is primary:

- Managers sell trust to owners.
- It turns technical data into defensible monthly reporting.

Visible proof:

- "Informe Abril · 412 kWh".
- "18% consumo fuera de reserva".
- "3 acciones ejecutadas".
- "Resumen listo para liquidación".

### Premium / Secondary: Batería y arbitraje OMIE

Why secondary:

- Valuable for a subset of portfolios.
- Too advanced for the initial buyer promise.
- Can make Tramo sound like an energy trading product instead of an operations product.

How to show it:

- "Evaluación avanzada: batería/arbitraje cuando los datos lo justifican".
- Use one compact card after core modules, not a full hero-level promise.

## Hero Dashboard Data Spec

The hero mock should use a realistic portfolio snapshot:

- **Portfolio:** 32 alojamientos · 3 ciudades · 74% ocupación semanal.
- **Live power:** 18.4 kW ahora across portfolio.
- **Anomaly:** VGO-014 · empty · 4.2 kWh outside reservation · started 13:10.
- **Reservation timeline:** checkout 11:00, cleaning 11:30-12:20, no reservation active after 12:20.
- **Estimated impact:** 42 EUR estimated if repeated weekly, labelled as estimate.
- **Action queue:** "Revisar termo", "Aplicar regla post-checkout", "Notificar equipo".
- **Tariff card:** P2 actual 4.6 kW, recommended 3.3 kW, evidence from CUPS/Datadis.
- **Owner report:** "Abril listo · 3 acciones · 412 kWh".
- **OMIE card:** small, secondary: "OMIE 0.08 EUR/kWh now", only if battery section remains.

Chart types:

- Reservation energy timeline: occupied, cleaning, idle, anomaly.
- 24h consumption line with highlighted alert window.
- P1/P2 bar comparison.
- Owner report mini breakdown.

Chart rules:

- Every chart needs units.
- Every highlighted point needs a timestamp.
- Orange is the signal/action color.
- Grey is baseline/comparison.
- Green only for healthy/connected states.

## Form Fields

### Required

- Nombre.
- Empresa / gestora.
- Email corporativo.
- Numero de alojamientos.
- Ciudad / region principal.
- PMS utilizado.
- Acceso a Datadis/CUPS: si / no / no lo se.
- Facturas recientes disponibles: si / no / no lo se.
- Quien paga la factura energetica: propietario / gestora / huesped / varia.
- Dolor principal: consumo fuera de reserva / tarifa-potencia / informes propietarios / reglas por reserva / no lo se.

### Optional

- Telefono.
- Modulos de interes.
- Mensaje.
- Tiene sensores instalados: si / no / no lo se.
- Tiene solar/bateria: si / no / no lo se.

### Remove From First-Step Form

- Any request for credentials.
- Any invoice upload.
- Long free-text operational questionnaires.
- Too many module checkboxes before the visitor understands the product.

The current form is close, but it lacks "facturas recientes", "quien paga la factura" and "dolor principal". Those three are important for qualification.

## What Must Not Be Missing

- A real-looking dashboard in the hero, not a generic card.
- Hover illumination between alert, chart and property row.
- The phrase "fuera de reserva" above the fold.
- Timestamped evidence: checkout time, consumption time window, kWh, EUR estimate.
- A system flow that explains why Tramo is not a generic analytics dashboard.
- Owner report preview.
- A module for rules by reservation.
- Privacy helper copy near the form.
- A clear distinction between core product and premium battery/arbitrage.
- Product panels with actual Spanish energy vocabulary: CUPS, Datadis, P1/P2, potencia, kWh, OMIE.

## Specific Current Landing Errors

1. **Hero copy is overloaded.** It says too many capabilities in one breath. Action: move battery/arbitrage out of the hero paragraph.
2. **The first hero dashboard alert is good but underused.** Action: make the "4.2 kWh fuera de reserva" alert the center of the visual story and link it to the chart hover state.
3. **Modules come before the buyer is emotionally anchored.** Action: place pain triptych and system flow before detailed modules.
4. **"Soluciones operativas para gestores de activos" is too abstract.** Action: rename to a pain-led headline like "La factura llega tarde; la fuga ocurre hoy."
5. **The product proof table is too static.** Action: add action queue, date range, reservation timeline, and owner report preview.
6. **Battery section feels like a core module.** Action: demote to premium/advanced evaluation.
7. **The form asks useful fields but misses qualification logic.** Action: add who pays the energy bill, recent invoices, and main pain.
8. **The CTA lacks a portfolio-specific self-identification.** Action: use "Diagnosticar mi cartera" in hero/header.

## Selective Expansion Proposals

These are optional improvements Mauro can accept or reject individually.

### Expansion A - Interactive Hero State

Add a dashboard where hover states connect property row, alert card and chart segment.

Recommendation: accept.

Reason: this directly solves the "not dynamic visually" problem and creates the killer feature moment.

### Expansion B - Owner Report Preview

Add a small owner-facing report preview as a dedicated section or dashboard panel.

Recommendation: accept.

Reason: owner reporting is a real buyer pain and differentiates Tramo from pure monitoring tools.

### Expansion C - Battery/OMIE Advanced Card

Keep battery/arbitrage, but as a premium evaluation card after core modules.

Recommendation: accept with demotion.

Reason: it adds ambition without diluting the wedge.

### Expansion D - Pilot Path Section

Add a short "Como empezamos" section:

```text
1. Diagnostico de cartera
2. Conexion de datos disponibles
3. Piloto en propiedades seleccionadas
4. Alertas e informes mensuales
```

Recommendation: accept if space allows.

Reason: it lowers friction for a buyer who worries about installation, data access and operational disruption.

### Expansion E - Fake Case Study

Add a testimonial or case study with invented numbers.

Recommendation: reject.

Reason: fake proof erodes trust. Use demo evidence instead until real pilots exist.

## Recommended Final Content Architecture

```text
HEADER
Tramo | Problema | Sistema | Modulos | Dashboard | Diagnostico

HERO
H1 + subcopy + CTA
Interactive portfolio dashboard with outside-reservation alert

PAIN
3 cards: fuera de reserva, tarifa/potencia heredada, propietario sin explicacion

SYSTEM
Reservations + sensors + CUPS/Datadis + tariffs -> attributed kWh -> actions/reports

ACTION LOOP
Detecta -> decide -> automatiza -> reporta

MODULES
1. Consumo en tiempo real
2. Tarifa y potencia
3. Reglas por reserva
4. Informes propietarios
Advanced: bateria/arbitraje

DASHBOARD PROOF
Portfolio KPIs + chart + alert queue + property table + owner report preview

PILOT/TRUST
Data used, privacy, prudent estimates, pilot path

FORM
Qualified portfolio diagnosis

FOOTER
Tramo descriptor + contact/legal
```

## Bottom Line

Tramo should not present itself as "energy management with many modules".

It should present itself as:

> The operational layer that tells a professional manager which kWh belong to which stay, which kWh should not exist, what action to take, and how to explain it to the owner.

That is the landing vision. Everything else should either support that sentence or be demoted.
