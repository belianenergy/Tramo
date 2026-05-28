<!-- Extracted from stitch-es-v2-response-2.json -->
---
name: Industrial Ether
colors:
  surface: '#0f1418'
  surface-dim: '#0f1418'
  surface-bright: '#353a3e'
  surface-container-lowest: '#0a0f13'
  surface-container-low: '#171c20'
  surface-container: '#1b2024'
  surface-container-high: '#262b2f'
  surface-container-highest: '#30353a'
  on-surface: '#dfe3e9'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe3e9'
  inverse-on-surface: '#2c3136'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#b090ff'
  on-tertiary-container: '#4600a7'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#0f1418'
  on-background: '#dfe3e9'
  surface-variant: '#30353a'
typography:
  display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h2:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
  metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1'
  metric-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 24px
  stack-gap: 16px
  inline-gap: 12px
  section-margin: 32px
---

## Brand & Style

The design system is engineered for **EnergyOS Pro**, a high-performance B2B energy management environment. The brand personality is authoritative, technical, and precise, targeting energy analysts and facility managers who require immediate clarity in complex data environments.

The visual style is **Corporate Modern with Tonal Layering**. It utilizes a deep charcoal and obsidian palette to reduce eye fatigue during extended monitoring sessions. The aesthetic avoids unnecessary decoration, instead using subtle border glows and intentional color coding (Emerald, Blue, Amber, Violet) to categorize energy sectors. The interface should feel like a high-end command center: responsive, dark, and exceptionally organized.

## Colors

The color architecture of this design system is built on a "Dark Slate" foundation to provide maximum contrast for critical data visualizations. 

- **Superficies:** Use a hierarchical layering approach where the background is darkest (#0F1117) and interactive elements like cards and inputs become progressively lighter to indicate elevation.
- **Acentos Funcionales:** Color is used strictly for categorization and status. *Esmeralda* represents active energy flow, *Azul* identifies "Fincas", *Ámbar* identifies "Apartamentos", and *Violeta* is reserved for "Arbitraje de Energía".
- **Estados:** Status colors use high-vibrancy tokens to ensure "Error" and "Advertencia" states are unmistakable against the dark canvases.

## Typography

This design system employs a dual-font strategy to balance readability with technical precision.

- **Inter:** The primary workhorse for all interface labels, paragraphs, and navigation elements. It provides a neutral, corporate tone that scales perfectly from "Display" down to "Caption".
- **JetBrains Mono:** Used exclusively for numerical data, energy metrics (kWh, MWh), currency, and timestamps. The monospaced nature ensures that columns of numbers align perfectly in tables and dashboards, facilitating rapid scanning of data fluctuations.
- **Localización:** All typography must support Spanish character sets (incluyendo tildes y la letra ñ).

## Layout & Spacing

The layout follows a **Fluid Grid** model with fixed outer margins. The workspace is divided into a persistent left-hand sidebar for navigation and a main content area that expands to fill the viewport.

- **Contenedores:** Use a standard padding of 24px for all main dashboard modules to maintain a consistent internal rhythm.
- **Reticula:** Implement a 12-column grid for complex data layouts, allowing widgets to span 3, 4, 6, or 12 columns depending on priority.
- **Ritmo Vertical:** Space elements using multiples of 4px to ensure alignment with the typography's line-height.

## Elevation & Depth

In this design system, depth is communicated through **Tonal Layers** and **Subtle Glows** rather than traditional shadows.

- **Capas de Fondo:** The base level is #0F1117. Floating panels and cards use #161922. 
- **Efecto de Resplandor:** To emphasize active or hovered states, use a 1px inner border glow with a 150ms transition. For example, a hovered card should transition its border from `#252A3A` to `#3A4055`, accompanied by a very faint outer glow using the primary accent color at 10% opacity.
- **Interactividad:** Elements should feel "tactile" through color shifts rather than physical movement, maintaining the professional, high-tech aesthetic.

## Shapes

The shape language balances modern approachability with industrial structure.

- **Cards (Tarjetas):** Use a 12px radius to soften the high-density data views and create a distinct "container" feel for different modules.
- **Interactive Elements:** Buttons and Input fields utilize a tighter 8px radius to feel more precise and tool-like.
- **Chips (Etiquetas):** Use a full pill-shape (100px) for status indicators and category tags to differentiate them clearly from rectangular interactive buttons.

## Components

### Botones (Buttons)
- **Primario:** Background #10B981, Text #0F1117 (High contrast), 8px radius.
- **Secundario:** Border #252A3A, Background transparent, Hover Background #1A1E2A.
- **Transición:** All hover states must trigger a 150ms color interpolation.

### Tarjetas de Datos (Data Cards)
- Background: #161922. Border: 1px solid #252A3A. Radius: 12px.
- Internal titles should use `H2` in `Primary Text`.
- Metrics within cards must use `JetBrains Mono`.

### Entradas de Datos (Inputs)
- Background: #1E2230. Border: 1px solid #252A3A.
- Active State: Border becomes #3B82F6 (Blue) with a 2px soft outer glow.
- Placeholders: Use `Muted Text` (#5A6275).

### Tablas (Tables)
- Headers: `Caption` style typography, #5A6275, with a bottom border #252A3A.
- Row Hover: Background #1A1E2A.
- Values: Always use `JetBrains Mono` for numerical columns.

### Selectores de Estado (Status Selectors)
- **Fincas:** Indicator dot or subtle border in #3B82F6.
- **Apartamentos:** Indicator dot or subtle border in #F59E0B.
- **Arbitraje:** Indicator dot or subtle border in #8B5CF6.

### Notificaciones
- Use a "Toast" style with a dark background (#161922) and a 4px left-border accent corresponding to the state (Success, Warning, Error).
