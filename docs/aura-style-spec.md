# EnergyOS — Design Spec: Aura Mobile Flow 4 Style

**Fecha:** 2026-05-16
**Autor:** UI Designer Subagent
**Versión:** 1.0
**Lingua:** Español

---

## 1. Resumen Ejecutivo

El objetivo es recrear el estilo visual de **Aura Mobile Flow 4** para la landing page de EnergyOS, adaptándolo a contexto web/desktop manteniendo los principios de diseño "mobile-first" que caracterizan a Aura.

**Lo que NO es Aura Mobile Flow 4:** No es glassmorphism oscuro (Aurora Prime v4.2). Es un estilo más limpio, con enfoque en **fluidez mobile-first**, transiciones suaves, gradientes sutiles, y componentes bem-style (bottom sheet, step flows, cards apiladas).

**Referencias visuales:**
- Aura.build (AI Website Builder): https://aura.build
- Aura Mobile Flow 4: https://www.aura.build/design-systems/aura-mobile-flow-4
- Estilo general: App-like con gestos, flows lineales, bordes suaves y colores vibrantes pero profesionales.

---

## 2. Estilo Visual Aura Mobile Flow 4 — Análisis

### 2.1 Características Principales

**Paleta de colores**
- Fondo principal: `#FAFAFA` a `#F5F5F7` (blanco cálido, estilo Apple)
- Fondos de secciones alternas: `#F0F0F5` (gris muy claro)
- Acento primario: `#FF6B35` (naranja coral vibrante)
- Acento secundario: `#5B5BD6` (azul-violeta)
- Acento terciario: `#6B8E23` (verde olive, para estados positivos)
- Texto principal: `#1A1A2E` (casi negro azulado)
- Texto secundario: `#6B7280` (gris medio)
- Sombras: muy suaves, `0 2px 12px rgba(0,0,0,0.06)`

**Tipografía**
- Headlines: `Inter` o `Public Sans` — peso 800 (Extra Bold), tracking -0.03em
- Body: `Inter` — peso 400-500, tracking 0
- Números/métricas: `JetBrains Mono` — peso 700
- Escala: Display 56px, H1 40px, H2 28px, H3 20px, Body 16px, Caption 12px

**Spatial system (8px base)**
- Padding cards: 20px-24px
- Gaps entre elementos: 12px, 16px, 24px, 32px
- Border-radius: 16px (cards), 12px (botones), 8px (inputs), 24px (modales)
- Máximo ancho contenido: 1200px centrado

**Cards — Estilo "Elevated Surface"**
```
background: #FFFFFF
border: 1px solid rgba(0,0,0,0.06)
border-radius: 20px
box-shadow: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)
```
— NO glassmorphism oscuro. Fondo sólido blanco con sombras suaves.
— Hover: elevación adicional (translateY(-2px) + shadow increase)

**Gráficos y datos**
- Área charts con gradiente: fill transparente → color acento al 20%
- Barras con esquinas redondeadas (4px radius)
- Tooltips: fondo blanco, borde suave, sombra elevada
- Colores de datos: naranja primario, azul secundario, verde para positivos

**Navegación**
- Header sticky con blur backdrop (glass suave)
- Nav items: texto + icono, activo con underline o background suave
- Mobile: bottom nav bar con iconos grandes (64px touch target)
- Progress indicators para flows (step dots o barra de progreso)

**Patrón Mobile Flow 4 específico**
- Step-based layouts (wizard style) para onboarding/configuración
- Bottom sheets para acciones secundarias
- Cards que se apilan verticalmente en mobile, en grid 2-3 columnas en desktop
- Transiciones: slide-up para modales, fade para cambios de contenido

### 2.2 Componentes Clave de Aura Mobile Flow 4

**1. Flow Step Card**
```css
/* Contenedor de cada paso en un flow */
.step-card {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
}
```

**2. Bottom Sheet**
```css
/* Panel deslizante desde abajo */
.bottom-sheet {
  background: #FFFFFF;
  border-radius: 24px 24px 0 0;
  box-shadow: 0 -4px 24px rgba(0,0,0,0.1);
  backdrop-filter: blur(20px);
}
```

**3. Metric Tile**
```css
/* Tile pequeño para métricas/estadísticas */
.metric-tile {
  background: #F8F8FA;
  border: 1px solid rgba(0,0,0,0.04);
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-value {
  font-family: 'JetBrains Mono';
  font-size: 28px;
  font-weight: 700;
  color: #1A1A2E;
}

.metric-label {
  font-size: 13px;
  color: #6B7280;
  font-weight: 500;
}
```

**4. Action Button (CTA principal)**
```css
.btn-primary {
  background: #FF6B35;
  color: #FFFFFF;
  border-radius: 14px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(255, 107, 53, 0.35);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.45);
}

.btn-primary:active {
  transform: scale(0.98);
}
```

**5. Secondary Button**
```css
.btn-secondary {
  background: #FFFFFF;
  color: #1A1A2E;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 14px;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #F5F5F7;
  border-color: rgba(0,0,0,0.15);
}
```

**6. Feature Card**
```css
.feature-card {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 28px;
  transition: all 0.25s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
  border-color: rgba(255, 107, 53, 0.2);
}

.feature-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 107, 53, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
```

**7. Navigation Header**
```css
.header-glass {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}
```

**8. Badge/Tag**
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
}

.badge-primary {
  background: rgba(255, 107, 53, 0.1);
  color: #FF6B35;
}

.badge-success {
  background: rgba(107, 142, 35, 0.1);
  color: #6B8E23;
}

.badge-info {
  background: rgba(91, 91, 214, 0.1);
  color: #5B5BD6;
}
```

---

## 3. Adaptación Aura Mobile Flow 4 → EnergyOS Landing Page

### 3.1 Arquitectura de la Landing Page

**Estructura de secciones (top → bottom):**

```
┌─────────────────────────────────────────┐
│  HEADER (glass sticky)                  │
│  Logo | Nav: Producto Operac. Informes  │
│              Piloto | [CTA: Demo]       │
├─────────────────────────────────────────┤
│  HERO SECTION                           │
│  ┌──────────────────┬──────────────────┐ │
│  │ Headline + body  │ Dashboard mockup│ │
│  │ [CTA] [CTA sec]  │ (rounded card)  │ │
│  └──────────────────┴──────────────────┘ │
├─────────────────────────────────────────┤
│  PROOF BAR (4 metric tiles)             │
│  [Props] [Ahorro] [Facturas] [Sync]     │
├─────────────────────────────────────────┤
│  PROBLEMA/SOLUCIÓN (3 feature cards)    │
│  Flow automático | Facturas | Informes  │
├─────────────────────────────────────────┤
│  CÓMO FUNCIONA (4-step flow horizontal) │
│  01 Conecta → 02 Cruza → 03 Prioriza →  │
│  04 Informe                               │
├─────────────────────────────────────────┤
│  PRICING / CTA FORM (2 columns)         │
│  Benefits list | Lead capture form      │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

**Breakpoints:**
- Mobile (<768px): Stack vertical, bottom nav, buttons full-width
- Tablet (768-1024px): 2 columnas, nav colapsado
- Desktop (>1024px): Grid completo, nav expandido

### 3.2 Especificaciones de Color para EnergyOS (Aura Style)

```css
/* Fondos */
--bg-page: #FAFAFA;
--bg-section-alt: #F0F0F5;
--bg-surface: #FFFFFF;
--bg-surface-hover: #F8F8FA;

/* Acentos EnergyOS (basados en paleta existente) */
--energy-primary: #e8913a;       /* Ámbar — CTAs principales */
--energy-primary-hover: #d4823a;
--energy-secondary: #8b5cf6;    /* Violeta — arbitraje, IA */
--energy-success: #10b981;       /* Verde — positivo, ahorro */
--energy-info: #3b82f6;         /* Azul — información */

/* Compatibilidad con estilo Aura */
--aura-accent: #e8913a;         /* Mapeo: Energy primary → Aura accent */
--aura-violet: #8b5cf6;
--aura-olive: #10b981;

/* Texto */
--text-primary: #1A1A2E;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;
--text-inverse: #FFFFFF;

/* Bordes y sombras */
--border-light: rgba(0,0,0,0.06);
--border-medium: rgba(0,0,0,0.1);
--shadow-card: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
--shadow-card-hover: 0 8px 30px rgba(0,0,0,0.08);
--shadow-btn: 0 4px 14px rgba(232,145,58,0.35);
--shadow-btn-hover: 0 6px 20px rgba(232,145,58,0.45);

/* Gradientes de fondo para secciones */
--gradient-warm: linear-gradient(180deg, #FAFAFA 0%, #F5F0EA 100%);
--gradient-section: linear-gradient(180deg, #FFFFFF 0%, #F8F8FA 100%);
```

### 3.3 Tipografía

```css
/* Familia */
font-family: 'Inter', system-ui, -apple-system, sans-serif;
font-display: 'Public Sans', sans-serif;
font-mono: 'JetBrains Mono', monospace;

/* Escala */
--text-display: 56px / 1.1 / -0.03em / 800;
--text-h1: 40px / 1.2 / -0.02em / 700;
--text-h2: 28px / 1.3 / -0.01em / 700;
--text-h3: 20px / 1.4 / 0 / 600;
--text-body: 16px / 1.6 / 0 / 400;
--text-body-sm: 14px / 1.5 / 0 / 400;
--text-caption: 12px / 1.4 / 0.01em / 500;

/* Metric numbers */
--text-metric-lg: 48px / 1 / -0.02em / 700;
--text-metric-md: 32px / 1 / -0.01em / 600;
--text-metric-sm: 24px / 1 / 0 / 600;
```

### 3.4 Componentes de la Landing

**Header (Aura Glass)**
```css
.header {
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  height: 64px;
  position: sticky;
  top: 0;
  z-index: 50;
}
```

**Hero Card (Dashboard Mockup)**
```css
.hero-mockup {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.08);
  padding: 16px;
  position: relative;
}

.hero-mockup::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(232,145,58,0.08) 0%, transparent 70%);
  z-index: -1;
  border-radius: 40px;
}
```

**Metric Tile (Proof Bar)**
```css
.metric-tile {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 24px;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;
}

.metric-tile:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-card-hover);
}

.metric-tile .label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-secondary);
}

.metric-tile .value {
  font-family: 'JetBrains Mono', monospace;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
}

.metric-tile .value.primary {
  color: var(--energy-primary);
}
```

**Feature Card (Problemas/Solución)**
```css
.feature-card {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 20px;
  padding: 28px;
  box-shadow: var(--shadow-card);
  transition: all 0.25s ease;
  cursor: pointer;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-card-hover);
  border-color: rgba(232,145,58,0.25);
}

.feature-card .icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(232,145,58,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.feature-card p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

**Step Card (Cómo funciona)**
```css
.step-card {
  background: #FFFFFF;
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 32px 24px;
  box-shadow: var(--shadow-card);
  position: relative;
}

.step-number {
  font-family: 'Public Sans', sans-serif;
  font-size: 56px;
  font-weight: 800;
  color: rgba(0,0,0,0.05);
  line-height: 1;
  margin-bottom: 16px;
}

.step-title {
  font-size: 17px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.step-desc {
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-secondary);
}
```

**CTA Button Primary**
```css
.btn-energy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  padding: 0 32px;
  background: var(--energy-primary);
  color: #FFFFFF;
  border-radius: 16px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: var(--shadow-btn);
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
}

.btn-energy:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-btn-hover);
  background: var(--energy-primary-hover);
}

.btn-energy:active {
  transform: scale(0.98);
}
```

**CTA Button Secondary**
```css
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  padding: 0 32px;
  background: #FFFFFF;
  color: var(--text-primary);
  border: 1.5px solid rgba(0,0,0,0.12);
  border-radius: 16px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  cursor: pointer;
}

.btn-outline:hover {
  background: #F5F5F7;
  border-color: rgba(0,0,0,0.18);
}
```

**Form Input**
```css
.form-input {
  width: 100%;
  height: 52px;
  padding: 0 16px;
  background: #F8F8FA;
  border: 1.5px solid rgba(0,0,0,0.08);
  border-radius: 14px;
  font-size: 15px;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  background: #FFFFFF;
  border-color: var(--energy-primary);
  box-shadow: 0 0 0 4px rgba(232,145,58,0.12);
}

.form-input::placeholder {
  color: var(--text-muted);
}
```

**Badge de estado**
```css
.badge-energy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(232,145,58,0.1);
  color: var(--energy-primary);
}

.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
```

---

## 4. Stitch — Cómo Crear un Nuevo Proyecto

### 4.1 Configuración Actual (EnergyOS ya tiene Stitch integrado)

**API Key:** `AQ.Ab8RN6Lme0K9SYkAekVH3l2evX1yMBz6QcH1zGR5eM1INTz0iw`
**Proyecto:** `energyos`

### 4.2 Comandos MCP disponibles

```bash
# Generar screen desde prompt
npx stitch-mcp generate_screen \
  --project energyos \
  --prompt "EnergyOS landing page with warm beige background, orange CTAs, glassmorphism cards, feature sections"

# Extraer contexto de diseño
npx stitch-mcp extract_design_context \
  --screen dashboard \
  --output design-context.json

# Obtener código de screen
npx stitch-mcp fetch_screen_code \
  --screen dashboard \
  --output dashboard.html
```

### 4.3 Flujo de Trabajo para Regenerar la Landing

1. **Generar nuevo screen con prompt Aura** (ver sección 5)
2. **Revisar preview** (`.png` generado)
3. **Si es correcto → obtener HTML** con `fetch_screen_code`
4. **Integrar en Next.js** — colocar en `app/page.tsx`
5. **Ajustar** si hay discrepancias con specs

### 4.4 Prompt Recomendado para Stitch (Landing Page Aura Style)

```
Create a landing page for EnergyOS — an energy management SaaS for tourist apartment managers in Spain.

Design style: Aura Mobile Flow 4 — clean, elevated surfaces, warm background (#F4F1EA), orange primary accent (#e8913a), white cards with soft shadows (no dark glassmorphism).

Sections:
1. Header: sticky, glass blur, logo "EnergyOS" with orange icon, nav links (Producto, Operaciones, Informes, Piloto), CTA "Solicitar demo"
2. Hero: Headline "Controla el coste energético de tu cartera turística.", subtext about energy management for tourist apartments, two CTAs ("Solicitar demo piloto" orange, "Ver demo" white outline), right side: dashboard mockup card with rounded corners and soft shadow
3. Proof bar: 4 metric tiles — "120+ Propiedades", "24% Ahorro", "1.4k Facturas procesadas", "Datadis Sync"
4. Problems section: 3 feature cards with icons — "Reduce fugas operativas", "Ahorro validable", "Informes a propietarios"
5. How it works: 4 steps — "01 Conecta PMS y Datadis/CUPS", "02 Cruza reservas y consumo", "03 Prioriza alertas", "04 Envía informes"
6. CTA form: left side benefits list, right side lead capture form (name, email, company, units count, pain point, submit)
7. Footer: logo, links, copyright

Colors:
- Background: #F4F1EA (warm beige)
- Primary accent: #e8913a (orange)
- Text: #1A1A2E (dark), #6B7280 (gray secondary)
- Surface: #FFFFFF
- Border: rgba(0,0,0,0.06)

Typography: Public Sans for headlines, Inter for body, JetBrains Mono for numbers.

Tailwind CSS. Material Symbols icons. Responsive (mobile-first).
```

---

## 5. Recomendaciones de Implementación

### 5.1 Estructura de la Nueva Landing

**Archivos a modificar:**
- `app/page.tsx` — Landing page principal
- `app/globals.css` — Actualizar con tokens Aura (opcional, mantener compatibilidad)
- `tailwind.config.js` — Añadir tokens de color EnergyOS

**Componentes a crear:**
```
app/
├── landing/
│   ├── LandingHeader.tsx
│   ├── HeroSection.tsx
│   ├── ProofBar.tsx
│   ├── ProblemsSection.tsx
│   ├── HowItWorks.tsx
│   ├── LeadForm.tsx
│   ├── LandingFooter.tsx
│   └── page.tsx (reemplaza app/page.tsx)
```

### 5.2 Diferencias Clave vs. Diseño Actual

| Aspecto | Restro Style (actual) | Aura Mobile Flow 4 |
|---------|----------------------|-------------------|
| Fondo | `#F4F1EA` beige | `#FAFAFA` más blanco |
| Cards | Sombras suaves | Shadows más elevadas + hover lift |
| CTAs | Naranja oscuro `#ec5b13` | Naranja `#e8913a` con glow |
| Iconos | Material Symbols filled | Material Symbols outlined |
| Navegación | Header simple | Glass sticky header |
| Títulos | Display muy bold | Font-weight 700, tracking ajustado |
| Formularios | Inputsbg-gray-50 | Inputs bg #F8F8FA, focus ring orange |
| Secciones | Bordes redondeados 1.5rem | Cards con 24px radius |

### 5.3 Animaciones Recomendadas

```css
/* Staggered entrance de cards */
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-enter {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}
.card-enter:nth-child(1) { animation-delay: 0ms; }
.card-enter:nth-child(2) { animation-delay: 80ms; }
.card-enter:nth-child(3) { animation-delay: 160ms; }
.card-enter:nth-child(4) { animation-delay: 240ms; }

/* Hover lift para todas las cards */
.hover-lift {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.hover-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.08);
}

/* CTA glow on hover */
.btn-energy {
  transition: all 0.2s ease;
}
.btn-energy:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(232,145,58,0.45);
}
```

### 5.4 Responsive Strategy

```
Mobile (<768px):
- Header: logo + hamburger (bottom sheet nav en mobile)
- Hero: stack vertical, image debajo del texto
- Proof bar: 2x2 grid
- Feature cards: stack vertical
- Steps: stack vertical con número grande a la izquierda
- Form: full width

Tablet (768-1024px):
- Header: nav colapsado (hamburger → drawer)
- Hero: 2 columnas
- Proof bar: 2x2 grid
- Feature cards: 2 columnas + 1
- Steps: 2x2 grid
- Form: 2 columnas

Desktop (>1024px):
- Header: nav completo + CTA
- Hero: 2 columnas (55/45)
- Proof bar: 4 columnas inline
- Feature cards: 3 columnas
- Steps: 4 columnas inline
- Form: 2 columnas (benefits / form)
```

---

## 6. Componentes Existentes de EnergyOS — Compatibilidad

### 6.1 Componentes que ya existen y cómo se mapean

| Componente Existente | Aura Equivalent | Notas |
|---------------------|-----------------|-------|
| `MetricCard.tsx` | `metric-tile` | Actualizar sombras y radius |
| `AlertPanel.tsx` | Feature card variant | Mantener, ajustar estilo |
| `AppShell.tsx` | Header glass | Mantener layout, actualizar blur |
| `PropertyCard.tsx` | Feature card | Actualizar con hover lift |
| `ConsumptionChart.tsx` | Chart card | Compatible con Aura |
| `CommunityTable.tsx` | Flat card | Compatible |

### 6.2 Variables CSS para usar (Tailwind tokens ya definidos en globals.css)

```css
/* Si ya tienes estas variables en globals.css, úsalas */
--energy: #e8913a;
--energy-soft: rgba(232, 145, 58, 0.15);
--success: #10b981;
--warning: #f59e0b;
--danger: #ef4444;
--info: #3b82f6;
--violet: #8b5cf6;

/* Añadir para Aura style */
--bg-page: #FAFAFA;
--bg-surface: #FFFFFF;
--shadow-card: 0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
--shadow-card-hover: 0 8px 30px rgba(0,0,0,0.08);
```

---

## 7. Próximos Pasos

1. **Regenerar landing page con Stitch** usando el prompt de sección 4.4
2. **Revisar preview** y ajustar si hay deviations
3. **Integrar HTML** en Next.js (`app/page.tsx`)
4. **Añadir animaciones** (sección 5.3)
5. **Testear responsive** en todos los breakpoints
6. **Actualizar componentes internos** (MetricCard, AlertPanel) para consistencia con nuevo estilo

---

*Documento generado por UI Designer Subagent — 2026-05-16*
*Basado en: Aura Mobile Flow 4 design system + EnergyOS existing components*