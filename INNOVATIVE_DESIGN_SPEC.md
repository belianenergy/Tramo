# EnergyOS Pro — Deseño Innovador v2

## Concepto: "Bento Dashboard" — Como Raycast + Linear + Notion

### Filosofía:
Non é un grid estándar de 4 columnas. É un **bento layout** asimétrico que prioriza a información máis importante e crea xerarquía visual mediante tamaño e posición.

### Layout (Bento Grid Asimétrico):

```
┌─────────────────────────────────────────────────────────────────┐
│  Logo          Buscador              Notif    Usuario   [+Nuevo]│  Header 56px
├────────┬────────────────────────────────────────────────────────┤
│        │ ┌──────────────────────────────────────────────────┐   │
│  📊   │ │  HERO METRIC (Full width)                        │   │
│ Panel  │ │  "8.420€" — Coste Mensual                       │   │  Grande,
│        │ │  ↓ -1.5% vs mes anterior                        │   │  chamativo
│  🏢   │ └──────────────────────────────────────────────────┘   │
│ Fincas │ ┌─────────────────────┐ ┌─────────────────────────┐   │
│        │ │  KPI 1              │ │  KPI 2                  │   │
│  🏠   │ │  "12 Comunidades"   │ │  "45.2k kWh"            │   │  Medio,
│ Apart. │ │  +1 este mes        │ │  ↑ 4.2%                 │   │  informativo
│        │ └─────────────────────┘ └─────────────────────────┘   │
│  ⚡   │ ┌──────────────────────────────────────────────────┐   │
│ Arbit. │ │  CHART (Wide)                                   │   │  Visual,
│        │ │  Consumo Agregado — Area chart con gradiente    │   │  tendencia
│  🤖   │ │  [24H] [7D] [30D]                               │   │
│ Asesor │ └──────────────────────────────────────────────────┘   │
│        │ ┌──────────────────────┐ ┌────────────────────────┐   │
│───     │ │  ASSESOR IA          │ │  LEADS SHELLY          │   │  Acción,
│ ⚙️    │ │  "8.500€/año ahorro" │ │  "Monitorización"      │   │  conversión
│ Config │ │  [Ver Estrategia]    │ │  [Solicitar Presupuesto]│   │
│ ❓    │ └──────────────────────┘ └────────────────────────┘   │
│ Ayuda  │ ┌──────────────────────────────────────────────────┐   │
│ 🚪    │ │  TABLA DE COMUNIDADES                           │   │  Datos,
│ Salir  │ │  Nome | Unidades | kWh | Coste | Estado        │   │  detalle
│        │ │  ─────────────────────────────────────────────  │   │
│        │ │  Vigo Centro  | 124 | 12.450 | 2.150€ | ✅    │   │
│        │ │  Camiño Real  | 45  | 4.210  | 845€   | 🔄    │   │
│        │ │  Os Tilos     | 210 | 28.900 | 5.424€ | ⚠️    │   │
│        │ └──────────────────────────────────────────────────┘   │
└────────┴────────────────────────────────────────────────────────┘
```

### Cores (Warm Premium 2026):

```
Background:     #F8F7F4  (warm off-white, NOT cold gray)
Card:           #FFFFFF  (pure white)
Card hover:     #FFFFFF  (with shadow increase)
Shadow:         0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)
Shadow hover:   0 4px 12px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)
Border:         #F0EFEF  (almost invisible)

Primary:        #1B4332  (deep forest green — sophisticated)
Primary light:  #F0F7F4  (green tint for active states)
Secondary:      #D4A574  (warm amber — premium accent)
Text:           #1A1A2E  (rich charcoal)
Text secondary: #6B7280  (warm gray)
Text muted:     #9CA3AF  (light gray)

Success:        #059669  (emerald)
Warning:        #D97706  (amber)
Error:          #DC2626  (coral red)
Info:           #2563EB  (blue)
```

### Tipografía:

```
Font family:    'Plus Jakarta Sans', sans-serif
Weights:        400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

Hero KPI:       56px / Bold / -0.02em tracking
H1:             28px / SemiBold / -0.01em
H2:             22px / SemiBold
H3:             18px / Medium
Body:           15px / Regular / 1.6 line-height
Small:          13px / Regular
Caption:        11px / Medium / 0.08em tracking / uppercase

Numbers:        Tabular figures (NOT monospace font)
```

### Sidebar (280px):

```
Background:     #FAFAF8  (slightly warmer than main bg)
NO hard border  — separated by shadow only
Width:          280px expanded, 72px collapsed

Logo:           EnergyOS mark + wordmark
Nav items:      48px height, 12px radius, 16px padding
Active:         #F0F7F4 background, #1B4332 text, left 3px accent bar
Hover:          #F5F4F2 background
Icons:          Phosphor Icons, 20px, 1.5px stroke
Labels:         14px / Medium

Sections:       Separated by 1px line (#F0EFEF)
Bottom:         User avatar (32px circle) + name + role
```

### Cards (Bento):

```
Border-radius:  16px
Padding:        24px
Background:     #FFFFFF
Shadow:         0 1px 3px rgba(0,0,0,0.04)
Hover:          translateY(-2px), shadow increase
Transition:     200ms ease

Hero card:      Full width, 120px height, gradient accent bar left
KPI cards:      Half width, 100px height
Chart card:     Full width, 300px height
Action cards:   Half width, 140px height
Table card:     Full width, auto height
```

### Micro-interacciones:

```
Page load:      Cards fade in + slide up, stagger 50ms
KPI numbers:    CountUp animation (1s ease-out)
Hover cards:    translateY(-2px) + shadow increase (200ms)
Hover table:    Row background fade (150ms)
Hover sidebar:  Background fade (150ms)
Button press:   scale(0.98) (100ms)
Chart hover:    Tooltip fade in (150ms)
Module switch:  Crossfade (200ms)
```

### Innovacións vs Layout Estándar:

1. **Hero Metric** — Un KPI grande ocupa todo o ancho, non 4 iguais
2. **Bento Grid** — Asimétrico, non todo do mesmo tamaño
3. **Shadow-based depth** — Non bordes, senón sombras para separar
4. **Warm palette** — Non frío/IA, senón cálido e humano
5. **Contextual actions** — Botóns aparecen en hover, non sempre visibles
6. **Staggered animations** — Carga con efecto cascada
7. **Collapsed sidebar** — Colapsa a iconas en pantallas pequenas
8. **Smart spacing** — Máis espazo onde importa, menos onde non
