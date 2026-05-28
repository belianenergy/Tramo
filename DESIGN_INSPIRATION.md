# Inspiración de Deseño — EnergyOS V4

## Fontes consultadas
- saaspo.com (SaaS Websites)
- curated.design (Web Design)
- component.gallery (Design Systems)
- landing.love (Landing Pages)
- Referencia visual: MSN Weather / Windows 11 Fluent Design

---

## 1. Tendencias SaaS B2B 2025-2026

### Dashboards de referencia

#### Linear.app
- **Layout**: Sidebar minimalista + header limpo + conteido denso
- **Cores**: Dark mode puro, acentos violeta, texto gris azulado
- **Tipografía**: Inter + SF Mono, números grandes para métricas
- **Interaccións**: Hover states sutís, tooltips inline
- **O que copiar**: A densidade de información sen sentirse abafador

#### Vercel Dashboard
- **Layout**: Cards con bordes moi suaves, gradientes de fondo
- **Cores**: Gris escuro + acentos azuis/cianos
- **Tipografía**: Geist Sans + Geist Mono
- **Interaccións**: Skeleton loading, transicións suaves
- **O que copiar**: O equilibrio entre whitespace e datos

#### Stripe Dashboard
- **Layout**: Táboas densas con estados visuais claros
- **Cores**: Branco/azulado + verde para positivo, laranxa para pendente
- **Tipografía**: Inter + Stripe Mono
- **Interaccións**: Dropdowns accionables, filtros rápidos
- **O que copiar**: A claridade nas accións e estados

#### Notion Calendar / Cron
- **Layout**: Timeline horizontal, eventos como bloques
- **Cores**: Personalizables por usuario
- **Tipografía**: Inter + SF Pro
- **Interaccións**: Drag & drop, resize, context menus
- **O que copiar**: A interactividade dos datos temporais

#### Raycast
- **Layout**: Command palette + listados filtrables
- **Cores**: Dark vibrante, acentos de cor por acción
- **Tipografía**: Inter + JetBrains Mono
- **Interaccións**: Atallos de teclado, fuzzy search
- **O que copiar**: A velocidade de navegación e atallos

---

## 2. Patróns de deseño identificados

### 2.1 Glassmorphism avanzado (2026)
```
- backdrop-filter: blur(24px) saturate(180%)
- Bordes: 1px solid rgba(255,255,255,0.08)
- Inner shadow: inset 0 1px 1px rgba(255,255,255,0.05)
- Outer shadow: 0 8px 32px rgba(0,0,0,0.12)
- Border-radius: 20-24px para cards, 12-16px para botóns
```

### 2.2 Gradientes dinámicos
```
- Fondos: Non sólidos, senón gradientes suaves que cambian
- Auroras: Morados/azuis suaves (como Windows 11)
- Accento: Un punto de cor cálida (ámbar/laranxa) para contraste
- Semitransparencia: Deixar que o fondo brille a través
```

### 2.3 Tipografía para datos
```
- Números grandes: 48-64px para KPIs principais
- Monospace para datos: JetBrains Mono, tabular figures
- Font weight: 400 para texto, 600 para titulares, 700 para números
- Tracking: -0.02em para display, 0 para body
```

### 2.4 Micro-interaccións
```
- Entrada staggered: 50ms entre elementos
- Hover: translateY(-2px) + shadow increase (200ms ease)
- Active: scale(0.98) (100ms)
- Loading: Skeleton con shimmer
- Toast notifications: Slide in desde arriba
```

---

## 3. Ideas para EnergyOS

### 3.1 Layout Bento (prioridade ALTA)
```
┌─────────────────────────────────────────┐
│  HERO METRIC (consumo total)            │
├──────────────┬──────────────────────────┤
│  KPI Aforro  │  KPI Propiedades        │
├──────────────┴──────────────────────────┤
│  CHART (consumo horario)                │
├─────────────────────┬───────────────────┤
│  ASESOR IA          │  ARBITRAJE        │
├─────────────────────┴───────────────────┤
│  ALERTAS                                │
└─────────────────────────────────────────┘
```

### 3.2 Cards con "glow" de módulo
- Cada módulo (Fincas, Apartments, Arbitraxe) ten un "glow" sutil da súa cor
- Non bordes duros, senón sombras coloreadas difusas
- Hover: o glow intensifícase

### 3.3 Navegación tipo "Dock"
- Sidebar estilo macOS Dock: iconos grandes, expándense ao hover
- Indicador de activo: punto luminoso, non fondo completo
- Transición suave entre páxinas

### 3.4 Datos "vivos"
- Números con animación count-up ao cargar
- Sparklines (gráficos en liña mini) ao lado de cada métrica
- Indicadores de tendencia (fletchas con cor)
- Badges de estado con pulse animation

### 3.5 Accións contextuais
- Botóns aparecen en hover (non sempre visibles)
- Right-click menu para accións rápidas
- Atallos de teclado visibles en tooltips

---

## 4. Paleta refinada (Aurora Glass v4.1)

```css
/* Fondo */
--bg-primary: #0f0f1a;
--bg-secondary: rgba(255,255,255,0.04);
--bg-tertiary: rgba(255,255,255,0.08);

/* Auroras (gradientes de fondo) */
--aurora-1: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
--aurora-2: radial-gradient(ellipse at top, rgba(139,92,246,0.15), transparent 70%);
--aurora-3: radial-gradient(ellipse at bottom-right, rgba(232,145,58,0.1), transparent 60%);

/* Cores de módulo */
--energy: #e8913a;
--fincas: #3b82f6;
--apartments: #f59e0b;
--arbitrage: #8b5cf6;
--advisor: #10b981;
--datadis: #64748b;

/* Texto */
--text-primary: #f0f0f5;
--text-secondary: #a0a0b0;
--text-muted: #606070;

/* Estados */
--success: #34d399;
--warning: #fbbf24;
--danger: #f87171;
--info: #60a5fa;
```

---

## 5. Compoñentes específicos

### 5.1 Hero Metric Card
- Fondo con gradiente sutil da cor do módulo
- Número grande (56px) con font mono
- Sparkline mini ao lado
- Tendencia con cor e icono

### 5.2 Chart Card
- Header con título + selectores de tempo
- Gráfico con área fill (gradiente)
- Tooltip customizado (glassmorphism)
- Legend integrado

### 5.3 Alert Feed
- Lista compacta con iconos de estado
- Cores de severidade (verde/ámbar/vermello)
- Timestamp relativo ("hai 2h")
- Acción rápida en cada alerta

### 5.4 Property Card
- Miniatura ou icono grande
- Estado visual (verde/ámbar/vermello)
- Métricas clave (kWh, ocupación, aforro)
- Botón de acción principal

---

## 6. Animacións recomendadas

```css
/* Entrada */
@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Stagger */
.card:nth-child(1) { animation-delay: 0ms; }
.card:nth-child(2) { animation-delay: 50ms; }
...

/* Pulse para estados */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(var(--color), 0.4); }
  50% { box-shadow: 0 0 0 8px rgba(var(--color), 0); }
}

/* Shimmer para loading */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

---

## 7. Responsive breakpoints

```
Desktop: > 1280px — Layout completo, sidebar expandida
Laptop: 1024-1280px — Sidebar colapsada, 2 columnas
Tablet: 768-1024px — Bottom nav, 1-2 columnas
Mobile: < 768px — Stack vertical, bottom nav
```

---

*Documento creado: 2026-05-07*
*Fontes: saaspo.com, curated.design, component.gallery*
