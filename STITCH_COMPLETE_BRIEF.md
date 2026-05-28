# EnergyOS — Stitch Complete Product Brief

## Source of truth
This brief consolidates the validated EnergyOS product scope from CEO Review v3 and the design system in `DESIGN.md`.

## Product positioning
EnergyOS is a professional B2B energy management platform for Spain. It serves two primary markets:

1. **Administradores de fincas / comunidades**
   - Community energy expense splitting
   - Coefficient-based billing
   - Shared facility monitoring
   - CUPS management

2. **Gestores de apartamentos / alquiler turístico**
   - Per-unit consumption visibility
   - Tenant/guest alerts
   - Multi-contract energy management
   - Property portfolio operations

## Strategic validated functions
The full product surface must include:

- Fincas module
- Apartments module
- CUPS management
- Datadis connection/import
- Full tariff calculation including taxes and regulated costs
- OMIE market price visualization
- Battery arbitrage simulator in MVP
- AI energy advisor
- Shelly EM / Shelly Pro EM lead capture for hardware pilot
- Roadmap messaging: MVP software now, hardware pilot as Phase 2

## Visual direction
- Premium B2B, not generic AI startup
- Linear.app + Stripe + Guesty + Bloomberg-lite
- Light mode only
- Data-dense but clear
- Serious enough for professional property managers
- Spanish language by default

## Pages to generate in Stitch

### 1. Landing page
Goal: convert property managers into demos/leads.
Must include:
- Hero: “Reduce el coste energético de tus fincas y apartamentos con datos reales”
- Subhero: “CUPS, Datadis, tarifas con impuestos, OMIE, arbitraje de baterías y alertas por unidad en un solo panel.”
- CTA: “Solicitar demo” and secondary “Ver simulación”
- Segmented value props: Fincas / Apartamentos / Hardware Pilot
- Product screenshot mockup area
- Problem section: invoices opaque, tariff complexity, lack of CUPS visibility, shared costs disputes
- Feature grid: Datadis, CUPS, tarifas, OMIE, baterías, Shelly EM
- Hardware pilot section: “Fase 2: medición real con Shelly EM”
- Pricing teaser: Software MVP + hardware pilot later
- Lead form: name, company, portfolio size, email, interest (Fincas/Apartamentos/Hardware)

### 2. Dashboard / Panel
Goal: executive portfolio overview.
Must include:
- KPIs: comunidades, apartamentos, CUPS activos, ahorro estimado, coste mensual, alertas
- OMIE price strip today/tomorrow
- Consumption and cost chart
- Portfolio split: fincas vs apartamentos
- Advisor card with next best action
- Alerts summary

### 3. Fincas
Goal: manage communities and shared expenses.
Must include:
- Community list/table
- Coefficient expense split
- Common areas consumption
- Elevator/garage/lighting tags
- Monthly billing allocation
- Alert badges
- CTA: “Calcular reparto”

### 4. Apartamentos
Goal: manage rental units and per-unit consumption.
Must include:
- Unit cards/table
- Tenant/guest status
- Consumption per apartment
- Contract/tariff status
- High consumption alerts
- Remote message/notification concept

### 5. CUPS + Datadis
Goal: connect official meter data.
Must include:
- CUPS list
- Datadis authorization status
- Last sync time
- Missing/failed connections
- Add CUPS modal preview
- Monthly kWh imported from Datadis

### 6. Tarifas + Advisor IA
Goal: calculate real tariff savings.
Must include:
- Full tariff comparison including taxes
- Current tariff vs recommended tariff
- Fixed/power/energy/taxes breakdown
- AI explanation card
- Confidence score
- CTA: “Generar recomendación”

### 7. OMIE + Arbitraje de Baterías
Goal: simulate battery arbitrage.
Must include:
- OMIE hourly price chart
- Battery capacity selector
- Charge/discharge windows
- Simulated daily/monthly/yearly savings
- Battery brands in context: Pylontech, BYD, Huawei, Victron
- MVP wording: simulation now, hardware pilot later

### 8. Hardware Leads / Shelly Pilot
Goal: capture interest in hardware phase 2.
Must include:
- Shelly EM / Shelly Pro EM explanation
- Non-intrusive clamp measurement
- Pilot package cards
- Lead capture form
- Roadmap: audit → install → connect → optimize

### 9. Configuración
Goal: professional admin settings.
Must include:
- Organization profile
- Team users
- API/data connections (Datadis, OMIE, Shelly)
- Billing plan
- Alert rules

## Navigation
Persistent sidebar for app pages:
- Panel
- Fincas
- Apartamentos
- CUPS / Datadis
- Tarifas / Asesor IA
- OMIE / Arbitraje
- Hardware Pilot
- Configuración

## Design constraints
- Background: #FAFAFA
- Cards: #FFFFFF
- Borders: #E5E5E5
- Primary: #10B981
- Fincas: #1565C0
- Apartments: #F57C00
- Arbitrage: #7B1FA2
- Advisor: #2E7D32
- Danger: #EF4444
- Fonts: Plus Jakarta Sans for headings, Inter for body, JetBrains Mono for numbers
- Rounded cards, subtle shadows, no glassmorphism, no dark mode, no neon
