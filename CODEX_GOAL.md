# /goal — Tramo Platform Frontend Complete

## Context
Tramo is an energy management platform for tourist apartment managers with 10-20+ unit portfolios in Spain. NOT generic SaaS, NOT eco-green, NOT dark mode AI aesthetic.

## Design System: Industrial Precision (Material 3 Warm)
- Background: #fff8f5 (warm cream, never pure white)
- Surface: #fff8f5, surface-container-low: #fff1ea
- On-background: #231a14 (ink, never pure black)
- Primary: #984700, Primary Container/Signal: #e6813a (use SPARINGLY — only for primary CTAs, critical alerts, 1-2 data highlights)
- Tertiary: #00677f (use for integrations, telemetry, secondary states, system info)
- Borders: #ead8cd (thin, 1px)
- Error: #ba1a1a
- Fonts: Plus Jakarta Sans (headlines, weight 600-800), Inter (body, 400-500), JetBrains Mono (data, tabular-nums)
- Icons: Material Symbols Outlined (Google Fonts)
- Visual mix: 60% Sourceful clarity, 25% Pirsch precision, 15% Orderful conversion
- Logo: SVG monoline segmented bracket with 3 intervals, ONE orange (#e6813a) signal dot at the active segment, small tick marks at segment boundaries

## Key Discoveries from 3 Review Loops

### CEO/Strategy
- MUST convey in 10 seconds: "Tengo apartamentos → Entre reservas pierdo dinero → Tramo conecta ocupación+sensores+tarifas → Control y reporting por propiedad → Piloto sin cambiar operación"
- Battery arbitrage: mention as ADVANCED POTENTIAL for portfolios with volume. Language: "posibilidad", "potencial", "para carteras con volumen". NOT "control inteligente de carga".
- Core is kWh outside stays + comfort issues + reporting to owners
- NOT climate inspiration, NOT AI magic, NOT guaranteed ROI claims
- Form must qualify: who pays the bill, recent invoices, phone optional, Datadis with Si/No/No lo sé

### Design
- Orange #e6813a: primary CTAs + critical alerts ONLY. NOT everything.
- Teal #00677f: integrations, telemetry, system status. Use it.
- NO Tailwind colors outside the M3 system (no gray-400, no green-500 raw)
- Logo must be SVG inline, not PNG base64
- Avoid template-like copy

### QA (Blocker Fixes)
- Form must have action/method, validation, labels with for/id
- Navigation must use real hrefs, not #
- Claims need context ("según tarifa media", "estimación basada en"), not absolute numbers
- Responsive down to 375px mobile
- ARIA labels on interactive elements

## Deliverables
Generate in `/home/mauro/.openclaw/workspace-local/energyos/`:

1. **index.html** — Complete landing page with:
   - Hero with simulated dashboard preview
   - "Tengo apartamentos → pierdo dinero entre reservas → Tramo lo controla" pain flow
   - System flow diagram (PMS → sensores → CUPS → tarifas → control)
   - 4 core modules (Control entre reservas, Optimización tarifaria, Reporting propietarios, Alertas operativas)
   - Battery/arbitrage upsell section (as advanced potential)
   - Trust/safety section
   - Qualified lead form (validated, accessible)
   
2. **dashboard.html** — Operational dashboard with:
   - Property selector (tourist apartments: Casa Rural O Pino, Apartamentos Riazor, Villa Marosa)
   - KPI cards (consumo entre reservas, ahorro mensual, alertas activas, dispositivos)
   - Realistic mock data (Spain, EUR, DD/MM dates)
   - JetBrains Mono for all numeric data
   
3. **app.css** — Shared stylesheet with Industrial Precision M3 tokens

## Anti-patterns (DO NOT DO)
- Dark mode / glassmorphism
- "Galicia only" — this is Spain national
- Commercial/industrial/logistics properties — this is TOURIST apartments
- Green eco/climate positioning
- Overusing orange on every element
- Fake exact metrics without context
- Generic AI app-builder aesthetics
