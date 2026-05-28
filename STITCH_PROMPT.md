# EnergyOS Dashboard — Prompt for Stitch

## Project Context

**EnergyOS Pro** is a B2B energy management platform for property professionals in Spain:

### Dual Market:
1. **🏢 Fincas (Communities)** — Expense splitting, coefficient calculations, shared facility monitoring
2. **🏠 Apartments (Rentals)** — Per-unit tracking, tenant alerts, multi-contract management

### Shared Features:
3. **⚡ AI Energy Advisor** — Recommends optimal tariffs, calculates exact savings
4. **🔋 Battery Arbitrage Simulator** — Real-time OMIE market data + AI battery sizing

## Design System

### Colors
- Background: #0f172a (dark slate)
- Cards: #1e293b (slate-800)
- Primary: #10b981 (emerald)
- Fincas accent: #3b82f6 (blue)
- Apartments accent: #f59e0b (amber)
- Arbitrage accent: #8b5cf6 (violet)
- Text: #e2e8f0 (slate-200)

### Typography
- Font: Inter
- Metrics/numbers: JetBrains Mono
- Headings: 600-700 weight
- Body: 400 weight, 14-16px

## Request

Create a premium dark-mode dashboard UI for EnergyOS Pro. The user should feel like they're using Linear.app or a Bloomberg terminal — data-dense, professional, and immediately actionable.

### Structure:

**Top Navigation:**
- Logo left, Module tabs center (Fincas | Apartments | Arbitrage | Advisor), User avatar right
- Active tab has colored underline

**Sidebar (collapsible):**
- Fincas section: Dashboard, Communities, Expense Split, Reports
- Apartments section: Dashboard, Properties, Tenants, Alerts
- Shared: Arbitrage, Advisor, Settings

### 1. Fincas Dashboard
- **Hero metrics row:** Total Communities, Monthly kWh, Monthly Cost, Alerts
- **Consumption chart:** Area chart showing kWh over time for all communities
- **AI Advisor card:** "3 communities could save €8,500/year" with Review button
- **Arbitrage opportunity card:** "Community Calle Mayor 15 | Potential: €245/month"
- **Communities table:** Name, Units, kWh, Cost, Status, Actions

### 2. Apartments Dashboard
- **Hero metrics row:** Total Properties, Occupancy Rate, Monthly Cost, Active Alerts
- **Consumption by unit chart:** Bar chart per property with average line
- **Alerts panel:** Priority list (red/yellow/green) with unit and issue
- **Properties grid:** Cards with photo placeholder, address, tenant count, status badge, quick metrics

### 3. Arbitrage View
- **Split panel:** Market prices left, battery config right
- **Price ticker:** Real-time OMIE prices with color coding (green=low, red=high)
- **Battery visualization:** Charge level with gradient, capacity slider
- **Simulation results:** Before/After cards, profit projection chart, ROI calculator

### 4. Advisor View
- **Upload area:** CSV drag-and-drop for consumption data
- **Tariff comparison:** Table showing Current vs Recommended vs Difference
- **Recommendation card:** Large savings amount, explanation, Apply/Details buttons
- **Chart:** Bar chart comparing 3 tariff options

### Global Components:
- **Metric cards:** Large number with trend arrow, module-colored icon
- **Status badges:** Normal (emerald), Warning (amber), Alert (rose)
- **Buttons:** Primary (filled emerald), Secondary (outline), Ghost
- **Tables:** Sortable, with status dots and action icons
- **Modals:** For detailed views, centered with backdrop blur

### Style Notes:
- Premium dark theme (0f172a background)
- Cards with subtle borders (1px slate-700) and 12px radius
- Hover effects: border glow, slight lift (-2px)
- Numbers in monospace font for financial feel
- Icons from Lucide set
- Responsive: 4→2→1 columns, sidebar becomes bottom nav on mobile
- Feel: Financial trading platform meets property management tool

### Key Interactions:
- Module switch with smooth content transition
- Metric cards animate on load (countUp)
- Chart tooltips on hover
- Table rows highlight on hover
- Buttons glow on hover
