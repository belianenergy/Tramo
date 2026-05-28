# EnergyOS Design System v4.2 — "Aurora Prime"

## 🎯 Concepto Visual

Fusión de estilos de referencia para dashboards B2B de alto rendemento:
- **Glassmorphism 2.0** — Transparencia con profundidade
- **Neumorphism suave** — Sombras interiores para elementos "presionables"
- **Bento Grid** — Layout asimétrico e densidade de datos
- **Data-dense** — Estilo Linear.app / Vercel Dashboard
- **Aurora gradients** — Fondos dinámicos con movemento sutil

---

## 🎨 Paleta de Cores

### Fondos
```css
--bg-deep: #0a0a12;
--bg-base: #0f0f1a;
--bg-elevated: rgba(255, 255, 255, 0.04);
--bg-card: rgba(255, 255, 255, 0.06);
--bg-hover: rgba(255, 255, 255, 0.10);
--bg-active: rgba(255, 255, 255, 0.14);
```

### Cores Principais
| Token | Hex | Uso |
|-------|-----|-----|
| `--energy` | `#e8913a` | Primario — CTAs, acentos, hero metrics |
| `--energy-soft` | `rgba(232, 145, 58, 0.15)` | Glows, fondos de acento |
| `--success` | `#34d399` | Positivo, aforro, conectado |
| `--warning` | `#fbbf24` | Alerta, pendente, atención |
| `--danger` | `#f87171` | Erro, consumo alto, crítico |
| `--info` | `#60a5fa` | Información, fincas, OMIE |
| `--violet` | `#a78bfa` | Arbitraxe, tecnoloxía |

### Gradientes Aurora
```css
--aurora-main: radial-gradient(ellipse at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
               radial-gradient(ellipse at 80% 70%, rgba(232, 145, 58, 0.10) 0%, transparent 50%),
               linear-gradient(180deg, #0a0a12 0%, #0f0f1a 50%, #0a0a12 100%);
```

---

## 🃏 Sistemas de Tarxetas

### 1. Glass Card (Default)
```css
glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2),
              inset 0 1px 1px rgba(255, 255, 255, 0.05);
}
```

### 2. Neumorphic Card (Stats pequenos)
```css
neumorphic-card {
  background: linear-gradient(145deg, #12121f, #0e0e17);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 16px;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.3),
              inset -2px -2px 5px rgba(255, 255, 255, 0.02),
              4px 4px 10px rgba(0, 0, 0, 0.3);
}
```

### 3. Glow Card (Módulos destacados)
```css
glow-card-energy {
  background: linear-gradient(135deg, rgba(232, 145, 58, 0.10), rgba(232, 145, 58, 0.03));
  border: 1px solid rgba(232, 145, 58, 0.20);
  box-shadow: 0 0 40px rgba(232, 145, 58, 0.08);
}

glow-card-violet {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.10), rgba(139, 92, 246, 0.03));
  border: 1px solid rgba(139, 92, 246, 0.20);
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.08);
}
```

### 4. Flat Card (Datos densos, táboas)
```css
flat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}
```

---

## 📐 Layout Bento Avanzado

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (sticky, glass)                                     │
├──────────┬──────────────────────────────────────────────────┤
│          │ ┌──────────────────────────────────────────────┐ │
│ SIDEBAR  │ │  HERO METRIC — Consumo Total (glass + glow)  │ │
│ (72px)   │ │  "2,450 kWh" + sparkline + trend             │ │
│          │ └──────────────────────────────────────────────┘ │
│  Iconos  │ ┌──────────────┐ ┌──────────────┐ ┌────────────┐│
│  con     │ │  KPI Neumorph│ │  KPI Neumorph│ │ KPI Neumorph││
│  glow    │ │  "€340/mes"  │ │  "12 props"  │ │ "62€/MWh"  ││
│          │ └──────────────┘ └──────────────┘ └────────────┘│
│          │ ┌──────────────────────────────────────────────┐ │
│          │ │  CHART (glass, area gradient)                │ │
│          │ │  [24H][7D][30D][90D]                         │ │
│          │ └──────────────────────────────────────────────┘ │
│          │ ┌─────────────────────┐ ┌──────────────────────┐│
│          │ │  ASESOR IA          │ │  ARBITRAJE           ││
│          │ │  (glow-card-green)  │ │  (glow-card-violet)  ││
│          │ └─────────────────────┘ └──────────────────────┘│
│          │ ┌──────────────────────────────────────────────┐ │
│          │ │  ALERTAS (flat-card, lista densa)            │ │
│          │ └──────────────────────────────────────────────┘ │
└──────────┴──────────────────────────────────────────────────┘
```

---

## 🎭 Micro-interaccións

### Hover States
```css
/* Cards */
.card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

/* Buttons */
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 20px var(--glow-color);
}

/* Nav items */
.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

/* Table rows */
.tr:hover {
  background: rgba(255, 255, 255, 0.03);
}
```

### Focus States
```css
input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--energy-soft);
  border-color: var(--energy);
}
```

### Active States
```css
.btn:active {
  transform: scale(0.98);
}

.nav-item.active {
  background: linear-gradient(135deg, rgba(232, 145, 58, 0.15), rgba(232, 145, 58, 0.05));
  border: 1px solid rgba(232, 145, 58, 0.30);
  box-shadow: 0 0 20px rgba(232, 145, 58, 0.10);
}
```

---

## 📊 Data-Dense Patterns

### Sparklines
- Mini gráficos inline ao lado de números
- Sen eixes, sen labels
- Cor do módulo correspondente
- 60px de ancho, 24px de alto

### Badges de Estado
```
Conectado  →  🟢 + texto verde
Pendente   →  🟡 + texto ámbar
Erro       →  🔴 + texto vermello
Optimizado →  ✨ + texto verde
```

### Tendencias
```
↑ 12%  → verde (positivo para aforro, negativo para consumo)
↓ 8%   → vermello (negativo para aforro, positivo para consumo)
```

---

## 🌙 Modo Escuro (Único)

EnergyOS só ten modo escuro. O "modo claro" non existe.

Razóns:
- Dashboards de datos funcionan mellor en escuro
- Reduces fadiga visual para uso prolongado
- Glassmorphism brilla en fondos escuros
- Diferenciación visual do mercado

---

## 🛠️ Tokens de Deseño

### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `sm` | 8px | Botóns pequenos, tags |
| `md` | 12px | Inputs, selects |
| `lg` | 16px | Tarxetas pequenas, modais |
| `xl` | 20px | Tarxetas principais |
| `2xl` | 24px | Hero cards, contenedores |

### Sombras
```css
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.25);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
--shadow-glow-energy: 0 0 40px rgba(232, 145, 58, 0.12);
--shadow-glow-violet: 0 0 40px rgba(139, 92, 246, 0.12);
--shadow-glow-success: 0 0 40px rgba(52, 211, 153, 0.12);
```

### Espaciado
| Token | Valor | Uso |
|-------|-------|-----|
| `xs` | 4px | Icon gaps |
| `sm` | 8px | Inline spacing |
| `md` | 16px | Card padding |
| `lg` | 24px | Section gaps |
| `xl` | 32px | Page padding |
| `2xl` | 48px | Section separators |

---

## 📱 Responsive

### Breakpoints
| Nome | Ancho | Layout |
|------|-------|--------|
| Mobile | < 640px | Stack vertical, bottom nav |
| Tablet | 640-1024px | 2 columnas, sidebar colapsada |
| Desktop | 1024-1440px | Layout completo |
| Wide | > 1440px | Layout + padding extra |

---

*Documento actualizado: 2026-05-07*
*Versión: 4.2 — Aurora Prime*
*Inspiración: Glassmorphism 2.0 + Neumorphism + Bento + Data-dense SaaS*
