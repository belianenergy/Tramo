# EnergyOS Design System v4.0 — "Aurora Glass"

## 🎯 Concepto Visual

Estilo **MSN Weather / Windows 11 Aurora** — fondo dinámico con gradientes morado-azul, tarxetas con glassmorphism (transparencia + blur), bordes arredondados xenerosos, e iconografía grande e expresiva. Inspirado na fluidez e calidez do tempo de Windows, aplicado a xestión enerxética.

---

## 🎨 Paleta de Cores

### Fondos (Gradientes Dinámicos)
```css
/* Aurora Principal — transición suave */
--bg-aurora: linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #2d1b4e 100%);

/* Fondo base para tarxetas */
--bg-card: rgba(255, 255, 255, 0.08);
--bg-card-hover: rgba(255, 255, 255, 0.12);
--bg-card-active: rgba(255, 255, 255, 0.15);

/* Fondos semitransparentes por módulo */
--bg-fincas: rgba(59, 130, 246, 0.12);
--bg-apartments: rgba(245, 158, 11, 0.12);
--bg-arbitrage: rgba(139, 92, 246, 0.12);
--bg-advisor: rgba(16, 185, 129, 0.12);
```

### Cores Principais
| Token | Hex | Uso |
|-------|-----|-----|
| `--primary` | `#e8913a` | Ámbar cálido — enerxía, principal CTA |
| `--primary-light` | `#f0a050` | Hover states |
| `--primary-soft` | `rgba(232, 145, 58, 0.15)` | Fondos de acento |
| `--secondary` | `#8b5cf6` | Violeta — arbitraxe, tecnoloxía |
| `--success` | `#10b981` | Verde esmeralda — aforro, éxito |
| `--warning` | `#f59e0b` | Ámbar — alertas suaves |
| `--danger` | `#ef4444` | Vermello — erros, alertas críticas |
| `--info` | `#3b82f6` | Azul — información, fincas |

### Cores de Texto
| Token | Hex | Uso |
|-------|-----|-----|
| `--text-primary` | `#f0e6d3` | Texto principal (branco cálido) |
| `--text-secondary` | `#b8b0a4` | Texto secundario |
| `--text-muted` | `#7a756d` | Texto subtle |
| `--text-inverse` | `#1a1a2e` | Texto sobre fondos claros |

### Bordes e Glows
```css
--border-glass: rgba(255, 255, 255, 0.1);
--border-glass-hover: rgba(255, 255, 255, 0.2);
--glow-primary: 0 0 20px rgba(232, 145, 58, 0.3);
--glow-success: 0 0 20px rgba(16, 185, 129, 0.3);
--glow-secondary: 0 0 20px rgba(139, 92, 246, 0.3);
```

---

## 📝 Tipografía

### Familia
- **Primaria**: `Inter` (Google Fonts) — limpo, moderno, legible
- **Números/Metrics**: `JetBrains Mono` — para datos e moneda
- **Fallback**: system-ui, -apple-system, sans-serif

### Escala Tipográfica
| Estilo | Tamaño | Peso | Altura de liña | Tracking | Uso |
|--------|--------|------|----------------|----------|-----|
| Display | 56px | 700 | 1.1 | -0.02em | Hero KPIs |
| H1 | 32px | 600 | 1.2 | -0.01em | Títulos de páxina |
| H2 | 24px | 600 | 1.3 | 0 | Títulos de sección |
| H3 | 20px | 600 | 1.4 | 0 | Títulos de tarxeta |
| H4 | 16px | 600 | 1.4 | 0 | Subtítulos |
| Body Large | 16px | 400 | 1.6 | 0 | Texto principal |
| Body | 14px | 400 | 1.5 | 0 | Texto secundario |
| Caption | 12px | 500 | 1.4 | 0.01em | Etiquetas, badges |
| Metric Large | 48px | 700 | 1 | -0.02em | Números grandes |
| Metric | 32px | 600 | 1 | -0.01em | Números medianos |

---

## 🃏 Tarxetas (Glassmorphism)

```css
.card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Variantes por módulo */
.card-fincas {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.05));
}

.card-apartments {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05));
}

.card-arbitrage {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05));
}

.card-advisor {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(16, 185, 129, 0.05));
}
```

---

## 📐 Layout (Bento Grid)

### Estrutura Principal
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  EnergyOS        [🔍 Buscar]    [🔔] [👤] [+]      │  Header 64px
├────────┬────────────────────────────────────────────────────┤
│        │ ┌────────────────────────────────────────────────┐ │
│  📊   │ │  HERO METRIC — Consumo Total                    │ │
│ Panel  │ │  "2.450 kWh" — Este mes                        │ │
│        │ │  ↑ 12% vs mes anterior                          │ │
│  🏢   │ └────────────────────────────────────────────────┘ │
│ Fincas │ ┌──────────────────┐ ┌──────────────────────────┐ │
│        │ │  KPI: Aforro     │ │  KPI: Propiedades        │ │
│  🏠   │ │  "€340/mes"      │ │  "12 activas"            │ │
│ Apart. │ │  ↓ 8% vs antes   │ │  +2 este mes             │ │
│        │ └──────────────────┘ └──────────────────────────┘ │
│  ⚡   │ ┌────────────────────────────────────────────────┐ │
│ Arbit. │ │  CHART — Consumo Horario (Area + Gradient)     │ │
│        │ │  [24H] [7D] [30D] [90D]                        │ │
│  🤖   │ └────────────────────────────────────────────────┘ │
│ Asesor │ ┌──────────────────┐ ┌──────────────────────────┐ │
│        │ │  ASSESOR IA      │ │  ARBITRAJE               │ │
│───     │ │  "Aforra €500/ano"│ │  "Simular batería"       │ │
│ ⚙️    │ │  [Ver Estrategia] │ │  [Calcular ROI]          │ │
│ Config │ └──────────────────┘ └──────────────────────────┘ │
│        │ ┌────────────────────────────────────────────────┐ │
│        │ │  ALERTAS / NOTIFICACIONES                      │ │
│        │ │  ⚠️ Consumo alto en Vigo Centro                │ │
│        │ │  💡 Oportunidade de aforro detectada           │ │
│        │ └────────────────────────────────────────────────┘ │
└────────┴────────────────────────────────────────────────────┘
```

### Sidebar (80px colapsada / 280px expandida)
```css
.sidebar {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  width: 80px; /* colapsada */
  transition: width 0.3s ease;
}

.sidebar:hover {
  width: 280px;
}

.nav-item {
  height: 56px;
  border-radius: 16px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(232, 145, 58, 0.2), rgba(232, 145, 58, 0.1));
  color: var(--primary);
  border: 1px solid rgba(232, 145, 58, 0.3);
}
```

---

## 🎭 Iconografía

- **Estilo**: Phosphor Icons (outlined, stroke 1.5px)
- **Tamaños**: 20px (nav), 24px (cards), 32px (hero), 48px (features)
- **Cores**: Herdanza do contexto (texto ou acento)

### Iconos por Módulo
| Módulo | Icono Principal | Cor |
|--------|----------------|-----|
| Dashboard | `ChartLineUp` | `--primary` |
| Fincas | `Buildings` | `--info` |
| Apartments | `House` | `--warning` |
| Arbitraxe | `Lightning` | `--secondary` |
| Asesor IA | `Robot` | `--success` |
| Datadis | `Database` | `--text-secondary` |
| Alertas | `Bell` | `--danger` |

---

## 📊 Compoñentes Específicos

### Hero Metric Card
```css
.hero-metric {
  background: linear-gradient(135deg, rgba(232, 145, 58, 0.2), rgba(232, 145, 58, 0.05));
  border: 1px solid rgba(232, 145, 58, 0.3);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}

.hero-metric::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(232, 145, 58, 0.1) 0%, transparent 70%);
  animation: pulse-glow 4s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
```

### KPI Card
```css
.kpi-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.kpi-value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
}

.kpi-trend {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  font-weight: 500;
}

.kpi-trend.up { color: var(--success); }
.kpi-trend.down { color: var(--danger); }
```

### Chart Container
```css
.chart-container {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  height: 320px;
}

/* Area chart con gradiente */
.chart-area {
  fill: url(#gradient-area);
}

#gradient-area {
  stop-color-1: rgba(232, 145, 58, 0.3);
  stop-color-2: rgba(232, 145, 58, 0);
}
```

### Action Card (CTA)
```css
.action-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  border-color: var(--primary);
  box-shadow: var(--glow-primary);
}
```

### Alert Badge
```css
.alert-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.alert-badge.warning {
  background: rgba(245, 158, 11, 0.15);
  color: var(--warning);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.alert-badge.danger {
  background: rgba(239, 68, 68, 0.15);
  color: var(--danger);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.alert-badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: var(--success);
  border: 1px solid rgba(16, 185, 129, 0.3);
}
```

---

## 🔄 Micro-interaccións

```css
/* Staggered entrance */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: fade-in-up 0.5s ease-out forwards;
}

.card-enter:nth-child(1) { animation-delay: 0ms; }
.card-enter:nth-child(2) { animation-delay: 50ms; }
.card-enter:nth-child(3) { animation-delay: 100ms; }
.card-enter:nth-child(4) { animation-delay: 150ms; }

/* Hover lift */
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

/* Pulse para alertas */
@keyframes pulse-alert {
  0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
}

.alert-pulse {
  animation: pulse-alert 2s ease-in-out infinite;
}

/* Gradient shift */
@keyframes gradient-shift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.aurora-bg {
  background-size: 200% 200%;
  animation: gradient-shift 15s ease infinite;
}
```

---

## 📱 Responsive

### Breakpoints
| Nome | Ancho | Layout |
|------|-------|--------|
| Mobile | < 640px | Single column, sidebar oculta |
| Tablet | 640-1024px | 2 columns, sidebar colapsada |
| Desktop | > 1024px | Full layout, sidebar expandida |

### Adaptacións
- **Mobile**: Sidebar converte en bottom nav (56px)
- **Tablet**: Sidebar colapsada (80px), tarxetas en 2 columnas
- **Desktop**: Sidebar expandida (280px), grid completo

---

## 🎯 Funcionalidades a Representar (CEO v3)

### 1. Dashboard Principal
- Hero Metric: Consumo total do mes
- KPIs: Aforro mensual, propiedades activas, alertas pendentes
- Gráfico de consumo horario (area chart)
- Previsualización de alertas recentes

### 2. Fincas (Comunidades)
- Lista de comunidades con estado
- Consumo agregado por finca
- Alertas de zonas comúns
- Cálculo de coeficientes

### 3. Apartments (Alugueres)
- Grid de propiedades con fotos
- Estado de ocupación (color-coded)
- Consumo por unidade
- Alertas por inquilino

### 4. Asesor IA
- Tarxeta con recomendación principal
- Comparativa de tarifas (3 barras)
- Aforro estimado (€/mes, €/ano)
- CTA: "Ver estratexia completa"

### 5. Arbitraxe
- Simulador de batería
- Prezos OMIE en tempo real (gráfico)
- ROI calculado
- CTA: "Solicitar orzamento"

### 6. Datadis
- Estado de conexión (CUPS)
- Datos históricos (até 2 anos)
- Gráfico de comparativa anual

### 7. Alertas
- Lista de alertas activas
- Filtros por tipo (consumo, prezos, hardware)
- Accións rápidas

---

## 🛠️ Implementación en Tailwind

```javascript
// tailwind.config.js estendido
module.exports = {
  theme: {
    extend: {
      colors: {
        aurora: {
          bg: '#1a1a2e',
          card: 'rgba(255, 255, 255, 0.08)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        energy: {
          primary: '#e8913a',
          secondary: '#8b5cf6',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
          info: '#3b82f6',
        }
      },
      backdropBlur: {
        glass: '20px',
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      },
      boxShadow: {
        'glass': '0 4px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'glass-hover': '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        'glow-primary': '0 0 20px rgba(232, 145, 58, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
```

---

## 📁 Estrutura de Compoñentes

```
components/
├── layout/
│   ├── Sidebar.tsx
│   ├── Header.tsx
│   └── DashboardLayout.tsx
├── cards/
│   ├── HeroMetric.tsx
│   ├── KpiCard.tsx
│   ├── ActionCard.tsx
│   ├── ChartCard.tsx
│   └── AlertCard.tsx
├── charts/
│   ├── AreaChart.tsx
│   ├── BarChart.tsx
│   └── LineChart.tsx
├── shared/
│   ├── GlassCard.tsx
│   ├── AlertBadge.tsx
│   ├── StatusDot.tsx
│   └── TrendIndicator.tsx
└── icons/
    └── ModuleIcons.tsx
```

---

*Documento creado por: Nécora (AI Product Owner)*
*Data: 2026-05-07*
*Versión: 4.0 — Aurora Glass*
*Inspiración: MSN Weather / Windows 11 Fluent Design*
