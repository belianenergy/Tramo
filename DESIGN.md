# EnergyOS Design System — Complete

## 🎯 Visión

**EnergyOS Pro** é unha plataforma B2B de xestión enerxética para profesionais inmobiliarios en España.

**Referencias visuais:** Linear.app + Bloomberg + Stripe + Guesty

**Filosofía:** Premium, denso en datos, inmediatamente accionable. NON parece startup IA xenérica. Profesión como Stripe.

---

## 🎨 Sistema de Cores

### Modo CLARO (OBRIGATORIO)

| Token | Hex | Uso |
|-------|-----|-----|
| **Background** | `#FAFAFA` | Fondo principal |
| **Card BG** | `#FFFFFF` | Tarxetas |
| **Border** | `#E5E5E5` | Bordes suaves |
| **Text Primary** | `#18181B` | Texto principal |
| **Text Secondary** | `#71717A` | Texto secundario |
| **Text Muted** | `#A1A1AA` | Labels |

### Cores de Módulo

| Módulo | Hex | Uso |
|--------|-----|-----|
| **Primary** | `#10B981` | Emerald — aforro, enerxía |
| **Primary Hover** | `#059669` | Botóns hover |
| **Fincas** | `#1565C0` | Azul corporativo |
| **Apartments** | `#F57C00` | Laranxa cálido |
| **Arbitraxe** | `#7B1FA2` | Violeta |
| **Advisor** | `#2E7D32` | Verde bosque |
| **Success** | `#4CAF50` | Éxito |
| **Warning** | `#F59E0B` | Alertas |
| **Danger** | `#EF4444` | Erros |
| **Info** | `#0EA5E9` | Información |

### Sombras

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.05);
```

---

## 📝 Tipografía

### Fontes

- **Display:** Plus Jakarta Sans (600, 700) — títulos
- **Body:** Inter (400, 500, 600) — corpo
- **Mono:** JetBrains Mono (400, 500) — números, métricas

### Escala

| Style | Size | Weight | Uso |
|-------|------|--------|-----|
| Display | 48px | 700 | Hero |
| H1 | 32px | 700 | Páxinas |
| H2 | 24px | 600 | Seccións |
| H3 | 18px | 600 | Subseccións |
| Body | 14px | 400 | Texto |
| Caption | 12px | 500 | Labels |
| Metric | 36px | 700 | Números grandes |
| Metric Small | 24px | 600 | Números medianos |

---

## 📐 Layout

### Navegación Lateral (260px)

```
┌─────────────────────────┐
│ 🦎 EnergyOS             │
├─────────────────────────┤
│ 📊 Panel                │ ← activo
│ 🏢 Fincas               │
│ 🏠 Apartamentos         │
│ ⚡ Arbitraxe            │
│ 🤖 Asesor IA            │
├─────────────────────────┤
│ ⚙️ Configuración        │
└─────────────────────────┘
```

### Navegación Superior (64px)

```
┌──────────────────────────────────────────────┐
│ [🔍 Buscar...]     [🔔 3] [Avatar MG]      │
└──────────────────────────────────────────────┘
```

### Contedor Principal

- Max-width: 1280px centrado
- Padding: 24px
- Gap tarxetas: 16px

---

## 🧩 Compoñentes

### MetricCard

```tsx
// Estado: default
bg: white, border: #E5E5E5, rounded-12px

// Estado: hover
shadow-md, border: primary/20

// Contido
- Label: caption, text-secondary
- Valor: metric, text-primary, font-mono
- Icon: emoji ou Lucide
- Trend: badge verde/vermello
```

### DataTable

```tsx
// Header
bg: #F4F4F5, text: caption, uppercase

// Row
border-bottom: #E5E5E5, hover: bg: #FAFAFA

// Cell
text: body, font-mono para números
```

### Button

```tsx
// Primary
bg: primary (#10B981), text: white, rounded-8px
hover: primary-hover (#059669)

// Secondary
bg: transparent, border: #E5E5E5, text: text-primary
hover: bg: #FAFAFA

// Ghost
bg: transparent, text: text-secondary
hover: bg: #F4F4F5
```

### Badge/Status

```tsx
// Optimized (verde)
bg: #ECFDF5, text: #059669, border: #A7F3D0

// Warning (ámbar)
bg: #FFFBEB, text: #B45309, border: #FDE68A

// Alert (vermello)
bg: #FEF2F2, text: #DC2626, border: #FECACA
```

---

## 📊 Dashboard

### KPIs (4 cards)

```
┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
│ Total      │ │ Consumo    │ │ Coste      │ │ Alertas    │
│ Comunidades│ │ Mensual    │ │ Mensual    │ │ Activas    │
│     12     │ │   45.2    │ │  8.420     │ │     3      │
│ 🏢        │ │   MWh ↑   │ │    € ↓     │ │    🔔     │
└────────────┘ └────────────┘ └────────────┘ └────────────┘
```

### Gráfico

- Tipo: Area chart con gradiente
- Datos: Consumo histórico 12 meses
- Selector: 24H | 7D | 30D
- Cor: Primary con opacidade

### Táboa

- Comunidades con datos
- Ordenable por columnas
- Semáforo de estado

---

## 🚨 Regras Críticas

1. **MODO CLARO** — nunca dark mode
2. **BORDES REAIS** — non glows de IA
3. **NÚMEROS CONTEXTUALIZADOS** — sempre con unidades (kWh, €)
4. **PREMIUM** — parece Stripe/Guesty, non startup xenérica
5. **TEXTOS** — en español/galego

---

## 📱 Responsive

| Breakpoint | Layout |
|------------|--------|
| Desktop (1280px+) | Sidebar visible, 4 KPIs |
| Tablet (768px-1279px) | Sidebar colapsable, 2 KPIs |
| Mobile (<768px) | Sidebar como drawer, 1 KPI |

---

**Versión:** 4.0  
**Última actualización:** 2026-05-11
