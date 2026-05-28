# EnergyOS 2.0 - Plan de Desenvolvemento

## 🎯 Visión Estratéxica

EnergyOS é un **axente intelixente de xestión enerxética** para propiedades de aluguer temporal (Airbnb, Vrbo). Non é un dashboard pasivo — é un asesor proactivo que:

1. **Analiza** patróns de consumo
2. **Recomenda** tarifas óptimas con cálculo exacto de aforro
3. **Simula** oportunidades de arbitraxe con baterías usando datos reais de mercado
4. **Actúa** (futuro: integración con APIs de fornecedores)

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     ENERGYOS 2.0                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   DASHBOARD  │  │   ADVISOR    │  │  ARBITRAGE   │     │
│  │              │  │              │  │              │     │
│  │ · Métricas   │  │ · Upload CSV │  │ · Prezos OMIE│     │
│  │ · Gráficos   │  │ · Análise    │  │ · Simulador  │     │
│  │ · Alertas    │  │ · Recomenda  │  │ · ROI Calc   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              AI CORE (Frontend)                      │   │
│  │  · Análise de patróns                               │   │
│  │  · Cálculo de tarifas                               │   │
│  │  · Sizing de baterías                               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DATA LAYER                              │   │
│  │  · localStorage (config)                            │   │
│  │  · CSV uploads (consumo)                            │   │
│  │  · Mock APIs (OMIE, REE)                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Fases de Implementación

### Fase 1: Foundation (Días 1-3)
**Obxectivo:** Setup e estrutura base

- [ ] Setup Next.js 15 + Tailwind 4 + shadcn/ui
- [ ] Configurar Stitch con prompt
- [ ] Xerar dashboard base (layout + sistema de deseño)
- [ ] Implementar navegación (Dashboard, Advisor, Arbitrage)
- [ ] Crear sistema de cores e tipografía

**Entregable:** App base con navegación e layout

---

### Fase 2: Dashboard Core (Días 4-6)
**Obxectivo:** Pantalla principal con datos

- [ ] Crear compoñentes de métricas (4 cards)
- [ ] Implementar gráfico de consumo (area chart)
- [ ] Crear listado de propiedades (grid)
- [ ] Engadir estados e alertas visuais
- [ ] Mock data realista (propiedades, consumo)

**Entregable:** Dashboard funcional con datos de exemplo

---

### Fase 3: AI Advisor (Días 7-10)
**Obxectivo:** Sistema de recomendación de tarifas

- [ ] Crear pantalla de upload CSV
- [ ] Parser de datos horarios
- [ ] Algoritmo de cálculo de tarifas:
  - Tarifa PVPC (variable)
  - Tarifa Fixa
  - Tarifa Time-of-Use (2/3 periodos)
- [ ] Visualización comparativa (gráfico)
- [ ] Mostrar aforro exacto (€/mes, €/ano)
- [ ] Recomendación final con explicación

**Entregable:** Usuario pode subir CSV e recibir recomendación

---

### Fase 4: Arbitrage Simulator (Días 11-14)
**Obxectivo:** Simulador de arbitraxe con baterías

- [ ] Integrar datos OMIE (mock realista)
- [ ] Visualización de prezos (gráfico temporal)
- [ ] Panel de configuración de batería:
  - Capacidade (kWh)
  - Potencia máxima (kW)
  - Rendemento (%)
- [ ] Algoritmo de sizing (IA simple):
  - Input: consumo histórico
  - Output: capacidade óptima recomendada
- [ ] Simulación de ciclos carga/descarga
- [ ] Cálculo de profit (€/mes, ROI)

**Entregable:** Simulador completo con datos realistas

---

### Fase 5: Polish & Deploy (Días 15-17)
**Obxectivo:** Refinamento e lanzamento

- [ ] Animacións e transicións
- [ ] Responsive design (mobile)
- [ ] Testing manual
- [ ] Optimización de performance
- [ ] Deploy en Vercel

**Entregable:** MVP público

---

## 🛠️ Stack Tecnolóxico

### Core
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Components:** shadcn/ui + compoñentes custom
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod

### Herramientas
- **TypeScript:** 100% type safety
- **ESLint + Prettier:** Code quality
- **Git:** Version control
- **Vercel:** Hosting

### Datos (MVP)
- **localStorage:** Configuración e estado
- **CSV:** Datos de consumo (upload)
- **Mock APIs:** OMIE, REE (simulación)

---

## 📊 Especificación de Features

### 1. Dashboard

**Métricas Principais:**
| Métrica | Cálculo | Fonte |
|---------|---------|-------|
| Total Savings | Suma de aforros por propiedade | Calculado |
| Avg Consumption | Media kWh/día | CSV/Mock |
| Active Properties | Conteo | Configuración |
| Market Price | Prezo actual €/MWh | OMIE Mock |

**Gráfico de Consumo:**
- Tipo: Area chart (liña + gradiente)
- X: Tempo (días/semanas)
- Y: Consumo (kWh)
- Datos: Agregado de todas as propiedades

**Alertas:**
- Consumo anómalo (>30% vs media)
- Oportunidade de aforro detectada
- Prezo de mercado favorable para arbitraxe

---

### 2. AI Advisor

**Input:**
- CSV con formato: `timestamp, consumption_kwh, property_id`
- Ou entrada manual de consumo mensual

**Procesamento:**
```
1. Parse CSV → array de readings
2. Agrupar por franxas horarias
3. Calcular custo para cada tarifa:
   - PVPC: Σ(consumo × prezo_horario)
   - Fixa: Σ(consumo) × prezo_fixo
   - ToU: Σ(consumo_punta × prezo_punta) + Σ(consumo_valle × prezo_valle)
4. Comparar e ordenar
5. Calcular aforro = custo_actual - custo_óptimo
```

**Output:**
- Tarifa recomendada (nome + explicación)
- Aforro mensual/anual en €
- Gráfico comparativo (3 barras)
- Payback period (se aplica)

---

### 3. Arbitrage Simulator

**Input:**
- Capacidade batería (kWh) — ou auto-sizing
- Potencia máxima (kW)
- Prezo compra batería (€)
- Fonte de datos: OMIE

**Algoritmo Sizing (IA simple):**
```
1. Analizar consumo histórico
2. Identificar peak hours (top 4h de consumo)
3. Calcular consumo en peak (kWh)
4. Recomendar: capacidade = peak_consumo × 1.5
5. Limitar a rangos prácticos: 5-20 kWh
```

**Simulación:**
```
Para cada día:
  1. Obter prezos horarios (OMIE)
  2. Identificar horas baratas (<percentil 25)
  3. Identificar horas caras (>percentil 75)
  4. Simular carga en baratas, descarga en caras
  5. Calcular profit = (prezo_venta - prezo_compra) × cantidade
  6. Aplicar perdas (rendemento 90%)
```

**Output:**
- Profit mensual/ano (€)
- ROI (anos)
- Gráfico de ciclos sobre prezos
- Break-even point

---

## 🎨 Design System

Ver arquivo completo: `DESIGN.md`

### Principais decisións:
- **Dark mode único** — Non wasting time en light mode
- **Emerald como primario** — Enerxía, verde, aforro
- **Violet para arbitraxe** — Diferenciar sección
- **Data-dense** — Información accesible sen clicks
- **Action-oriented** — CTA en cada sección

---

## 📁 Estrutura de Carpetas

```
energyos/
├── app/
│   ├── page.tsx              # Dashboard
│   ├── advisor/
│   │   └── page.tsx          # AI Advisor
│   ├── arbitrage/
│   │   └── page.tsx          # Arbitrage Simulator
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── metrics/
│   │   ├── MetricCard.tsx
│   │   └── MetricsGrid.tsx
│   ├── charts/
│   │   ├── ConsumptionChart.tsx
│   │   └── ArbitrageChart.tsx
│   ├── advisor/
│   │   ├── UploadCSV.tsx
│   │   ├── TariffComparison.tsx
│   │   └── RecommendationCard.tsx
│   ├── arbitrage/
│   │   ├── BatteryConfig.tsx
│   │   ├── MarketPrices.tsx
│   │   └── SimulationResults.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── PropertyCard.tsx
├── lib/
│   ├── data/
│   │   ├── mockData.ts       # Mock data
│   │   └── tariffs.ts        # Tariff definitions
│   ├── algorithms/
│   │   ├── tariffCalculator.ts
│   │   └── arbitrageSimulator.ts
│   └── utils/
│       ├── csvParser.ts
│       └── formatters.ts
├── types/
│   └── index.ts              # TypeScript types
├── public/
│   └── ...                   # Static assets
├── DESIGN.md                 # Design system
├── CEO_REVIEW.md             # Strategic decisions
├── STITCH_PROMPT.md          # Prompt for Stitch
└── PLAN.md                   # This file
```

---

## ✅ Estado Actual

| Fase | Estado | Progreso |
|------|--------|----------|
| CEO Review | ✅ Completado | 100% |
| Design System | ✅ Completado | 100% |
| Stitch Prompt | ✅ Completado | 100% |
| Foundation | ⏳ Pendente | 0% |
| Dashboard Core | ⏳ Pendente | 0% |
| AI Advisor | ⏳ Pendente | 0% |
| Arbitrage | ⏳ Pendente | 0% |
| Polish | ⏳ Pendente | 0% |

---

## 🚀 Seguintes Pasos

1. **Mauro revisa e aproba** CEO_REVIEW.md e PLAN.md
2. **Nécora setup novo proxecto** Next.js 15
3. **Subir STITCH_PROMPT.md a Stitch** e xerar dashboard
4. **Iterar** sobre o código xerado
5. **Implementar features** según fases

---

*Documento creado por: Nécora (AI Product Owner)*
*Data: 2026-04-26*
*Versión: 2.0*
