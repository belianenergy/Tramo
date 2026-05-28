# Context for Codex - EnergyOS MVP Build
## Build completo do proxecto EnergyOS

---

## 🎯 OBXECTIVO

Construír o MVP completo de EnergyOS - plataforma B2B de xestión enerxética para profesionais inmobiliarios en España.

**Data de entrega:** 2026-05-11 (hoxe)
**Stack:** Next.js 13.5 (App Router) + TypeScript + Tailwind CSS + JSON Storage
**Porto:** 3001

---

## 🏢 DESCRICIÓN DO PROXECTO

EnergyOS Pro é unha plataforma para xestión de propiedades cunhas-modules:

### Módulo 1: Fincas (Comunidades)
- Dashboard con métricas de comunidades
- Lista de comunidades con estado (Optimizado/Analizando/Alerta)
- Reparto de gastos con coeficientes
- Informes de consumo

### Módulo 2: Apartamentos (Alquileres)
- Grid de propiedades con estado
- Alertas de consumo anómalo
- Seguimiento de inquilinos
- Datos de consumo por CUPS

### Módulo 3: Arbitraxe de Baterías
- Simulador de instalación de baterías
- Datos de prezos OMIE en tempo real
- Cálculo de ROI e recuperación de investimento
- Captación de leads para hardware Shelly EM

### Módulo 4: Asesor IA
- Recomendación de tarifas óptimas
- Integración con Datadis API
- Comparativa de tarifas
- Estimación de aforros

---

## 🎨 SISTEMA DE DISEÑO

### Estilo Visual
**MODO CLARO** (non dark mode)
- Background principal: `#FAFAFA`
- Background tarxetas: `#FFFFFF`
- Bordes: `#E0E0E0`
- Sombras: suaves (shadow-sm, shadow-md)

### Paleta de Cores
```css
/* Neutros */
--bg-primary: #FAFAFA
--bg-card: #FFFFFF
--border: #E0E0E0
--text-primary: #212121
--text-secondary: #757575

/* Primario (Enerxía/Sustainability) */
--emerald-500: #10b981
--emerald-600: #059669
--emerald-700: #047857

/* Module Colors */
--fincas: #1565C0 (azul corporativo)
--apartments: #F57C00 (naranja cálido)
--arbitraxe: #7B1FA2 (violeta suave)
--asesor: #2E7D32 (verde bosque)

/* Semantic */
--success: #4CAF50
--warning: #FFB300
--error: #E53935
--info: #00ACC1
```

### Tipografía
- **Títulos:** Plus Jakarta Sans (SemiBold 600, Bold 700)
- **Corpo:** Inter (Regular 400, Medium 500)
- **Números/Datos:** JetBrains Mono ou tabular figures
- **Fallback:** system-ui, -apple-system, sans-serif

### Espaciado e Shapes
- Container: max-w-7xl (1280px) centrado
- Padding base: 24px
- Gap tarxetas: 16px
- Border radius: 12px (tarxetas), 8px (botóns)
- Icones: Phosphor ou Lucide React

### Animacións
- Card hover: translateY(-2px) + sombra
- Botón hover: background lighten + glow
- Metric update: countUp animation (1.5s)
- Chart hover: crosshair + tooltip fade in
- Loading: skeleton + pulse

---

## 📐 LAYOUT

### Navegación Superior (64px)
```
[Logo EnergyOS]  [Buscador global...]  [Notificacións 🔔] [Avatar 👤]
```

### Sidebar (260px, colapsable)
```
📊 Panel (activo)
🏢 Fincas
  ├── Panel fincas
  ├── Comunidades  
  ├── Reparto gastos
  └── Informes
🏠 Apartamentos
  ├── Panel apartamentos
  ├── Propiedades
  ├── Inquilinos
  └── Alertas
⚡ Arbitraxe
🤖 Asesor
---
⚙️ Configuración
❓ Axuda
🚪 pechar sesión
```

### Dashboard Principal
```
[KPI: Total Comunidades] [KPI: kWh Mensual] [KPI: Coste] [KPI: Alertas]

[Gráfico Consumo Agregado - selector 24H|7D|30D]

[Panel IA Asesor]              [Panel Arbitraxe]
"Ahorro: 8.500€/ano"           "Activo - 75%"

[Listado Comunidades - táboa]
```

---

## 📁 ESTRUTURA DE FICHEIROS

```
energyos/
├── app/
│   ├── layout.tsx              # Layout global con nav + sidebar
│   ├── page.tsx                # Dashboard principal
│   ├── globals.css             # CSS global + variables
│   ├── fincas/
│   │   └── page.tsx            # Módulo Fincas completo
│   ├── apartments/
│   │   └── page.tsx            # Módulo Apartamentos completo
│   ├── arbitraje/
│   │   └── page.tsx            # Simulador Arbitraxe
│   ├── asesor/
│   │   └── page.tsx            # Asesor IA + Datadis
│   ├── configuracion/
│   │   └── page.tsx            # Configuración
│   ├── components/
│   │   ├── Navigation.tsx      # Navbar + module switcher
│   │   ├── Sidebar.tsx         # Sidebar navigation
│   │   ├── MetricCard.tsx      # KPI cards
│   │   ├── ConsumptionChart.tsx # Chart con Recharts
│   │   ├── CommunityTable.tsx  # Táboa comunidades
│   │   ├── PropertyCard.tsx    # Card propiedade
│   │   ├── AlertPanel.tsx      # Panel alertas
│   │   ├── TariffComparison.tsx # Comparativa tarifas
│   │   ├── ArbitrageSimulator.tsx # Simulador arbitraxe
│   │   └── LeadCaptureForm.tsx # Formulario captación
│   └── api/
│       ├── listings/route.ts           # CRUD propiedades
│       ├── listings/[id]/route.ts      # DELETE listing
│       ├── tariffs/route.ts            # GET/POST tarifas
│       ├── savings/route.ts            # POST calcular aforros
│       ├── forecasts/route.ts          # GET historial
│       ├── dashboard/route.ts          # GET resumo
│       ├── communities/route.ts        # GET/POST comunidades
│       ├── alerts/route.ts             # GET/POST alertas
│       ├── omie-prices/route.ts        # GET prezos OMIE
│       └── export/csv/route.ts        # POST exportar CSV
├── lib/
│   ├── storage.ts              # Utilidades JSON
│   ├── types.ts               # Interfaces TypeScript
│   └── utils.ts               # Funcións útiles
└── data/
    ├── listings.json          # Propiedades
    ├── tariffs.json           # Tarifas
    ├── communities.json      # Comunidades Fincas
    ├── forecasts.json         # Historial
    └── alerts.json            # Alertas
```

---

## 🔌 APIS

### GET /api/listings
Lista todas as propiedades.
```json
Response: [{ id, name, location, monthlyKwh, monthlyCost, status, units, owner }]
```

### POST /api/listings
Crea unha propiedade.
```json
Body: { name, location, monthlyKwh, monthlyCost, units, ownerContact }
```

### GET /api/communities
Lista todas as comunidades (Fincas).
```json
Response: [{ id, name, units, totalKwh, totalCost, status, city, administrator }]
```

### POST /api/communities
Crea unha comunidade.

### GET /api/tariffs
Lista todas as tarifas dispoñibles.

### POST /api/savings
Calcula aforros para unha propiedade.
```json
Body: { listingId, currentTariff }
Response: { monthlySavings, annualSavings, recommendedTariff, breakdown }
```

### GET /api/omie-prices
Devolve prezos actuais OMIE (simulado).
```json
Response: { price, trend, zone, timestamp }
```

### GET /api/dashboard
Resumo global con KPIs.
```json
Response: { totalCommunities, totalKwh, totalCost, activeAlerts, savings }
```

---

## 📊 COMPONENTES VISUAIS

### MetricCard
```
+------------------+
| [Icon]  Label    |  [Trend ↑ 4.2%]
|
| 45.2k           |
| kWh este mes    |
+------------------+
```
- Icon: 40x40px con fondo de cor do módulo
- Label: caption size, uppercase
- Value: 42px JetBrains Mono
- Trend: caption, verde (positivo) / rojo (negativo)

### CommunityTable
- Columnas: Nome, Unidades, Consumo, Coste, Estado, Accións
- Estados: 🟢 Optimizado | 🟡 Analizando | 🔴 Alerta
- Ordenable por todas as columnas
- Filtros: Estado, Cidade

### ConsumptionChart (Recharts)
- Gráfico de área con gradiente verde
- Selector período: 24H | 7D | 30D
- Tooltip personalizado
- Eixos con labels claros

### AlertPanel
```
⚠️ Alertas

🔴 Unit 3B — Consumo +45% vs media
🟡 Unit 5A — AC potencialmente activado
🟢 Unit 2C — Factura lista para enviar
```

---

## ✅ VALIDACIÓN

Para considerarche completado, o proxecto debe:

1. **Build completo:**
   ```bash
   cd /home/mauro/.openclaw/workspace-local/energyos
   npm run build
   ```
   Zero errores TypeScript

2. **Servidor arrinca:**
   ```bash
   npm run dev
   ```
   Accesible en http://localhost:3001

3. **Todas as páxinas renderizan:**
   - / (Dashboard)
   - /fincas
   - /apartments
   - /arbitraje
   - /asesor
   - /configuracion

4. **APIs responden:**
   - GET /api/dashboard
   - GET /api/listings
   - GET /api/communities

5. **Design match:**
   - Modo claro (#FAFAFA background)
   - Cards con border-radius 12px
   - Module switcher funcional
   - Gráficos con Recharts

---

## 🚨 NOTAS IMPORTANTES

1. **Non usar estilos "AI-generated":**
   - Evitar gradients excesivos
   - Usar bordes reais, non glows
   - Sensación professional, non startup default

2. **Datos realistas:**
   - Nomes de comunidades españolas reais
   - Prezos realistic (€/kWh español)
   - Estados coherentes

3. **Responsive:**
   - Mobile: cards en stack, sidebar colapsa
   - Tablet: 2 columnas
   - Desktop: layout completo

4. **Contexto de traballo:**
   - Working directory: `/home/mauro/.openclaw/workspace-local/energyos`
   - Porto: 3001
   - Already have Next.js instalado con node_modules

---

## 🎯 ENTREGABLE FINAL

Un proxecto Next.js completo e funcional que:
- Arrincable con `npm run dev`
- Con todas as páxinas implementadas
- Con APIs funcionando
- Con deseño profesional (non AI-style)
- Listo para demo

---

**Contexto preparado:** 2026-05-11 02:30
**Destinatario:** Codex coding agent