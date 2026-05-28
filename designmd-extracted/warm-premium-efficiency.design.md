<!-- Extracted from stitch-bento-response.json -->
---
name: Warm Premium Efficiency
colors:
  surface: '#f9faf6'
  surface-dim: '#dadad7'
  surface-bright: '#f9faf6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f1'
  surface-container: '#eeeeeb'
  surface-container-high: '#e8e8e5'
  surface-container-highest: '#e2e3e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f0f1ee'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#7c572d'
  on-secondary: '#ffffff'
  secondary-container: '#fecb97'
  on-secondary-container: '#79542a'
  tertiary: '#401b1b'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a302f'
  on-tertiary-container: '#d29895'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdcbc'
  secondary-fixed-dim: '#efbd8a'
  on-secondary-fixed: '#2c1700'
  on-secondary-fixed-variant: '#614018'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#f5b7b4'
  on-tertiary-fixed: '#331111'
  on-tertiary-fixed-variant: '#673a39'
  background: '#f9faf6'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3e0'
typography:
  hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.3'
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  body:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-padding: 32px
  gutter: 20px
  card-gap: 16px
  section-margin: 48px
---

## Brand & Style
The design system embodies a "Warm Premium" aesthetic, merging the high-performance utility of developer-centric tools like Linear with the approachable organic texture of Notion. It is designed specifically for Spanish property managers, evoking a sense of calm authority, ecological responsibility, and modern sophistication.

The visual style is **Minimalist-Tactile**. It relies on generous whitespace and a sophisticated "Bento Grid" layout to organize complex energy data into digestible, high-priority modules. By avoiding harsh borders and opting for soft, light-based depth, the interface feels less like a spreadsheet and more like a curated executive dashboard.

## Colors
The palette is rooted in nature and stability. The background uses a warm off-white to reduce eye strain and differentiate from generic "SaaS white" platforms. 

- **Primary (Forest Green):** Used for primary actions, navigation states, and brand presence. It signifies sustainability and growth.
- **Accent (Warm Amber):** Reserved for highlights, critical notifications, or active energy-flow indicators.
- **Neutrals:** Text uses a deep navy-black rather than pure black to maintain the warmth of the composition. 
- **Functional Colors:** Success and error states are slightly desaturated to remain harmonious with the warm ecosystem while ensuring accessibility for energy monitoring alerts.

## Typography
This design system utilizes **Plus Jakarta Sans** for its friendly yet modern geometric proportions. The type scale is optimized for high information density without sacrificing legibility.

- **Hero & Headings:** Use tight letter-spacing and bold weights to establish clear hierarchy in the Bento modules.
- **Body:** Set at 15px to feel precise and professional, reflecting the "Pro" nature of the tool.
- **Labels:** Small-caps are used for metadata, units of measurement (kWh, €, etc.), and section headers to provide a distinct "utility" feel.

## Layout & Spacing
The layout follows an **Asymmetric Bento Grid** model. Content is organized into modular containers of varying sizes that snap to a 12-column underlying structure. 

- **Grid Logic:** Use 20px gutters between modules to allow the "warm off-white" background to act as a natural separator.
- **Asymmetry:** Primary data (like real-time consumption) should occupy larger spans (e.g., 8 columns), while secondary controls or historical logs occupy smaller adjacent spans (e.g., 4 columns).
- **Rhythm:** Spacing units are based on a 4px baseline, ensuring all elements—from buttons to charts—align with a consistent vertical and horizontal cadence.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Ambient Shadows** rather than traditional borders.

- **Surface Treatment:** Cards are pure white (#FFFFFF) against the warm off-white background (#F8F7F4).
- **Shadow Profile:** Use a single, very soft, diffused shadow for cards: `0px 4px 20px rgba(26, 26, 46, 0.04)`. The shadow should have a slight warm tint to integrate with the background.
- **Interaction Depth:** On hover, a card should subtly lift using a slightly more pronounced shadow and a 1% scale increase to provide tactile feedback.
- **No Hard Borders:** Avoid 1px solid strokes unless they are within high-density data tables, where they should be used at 5% opacity.

## Shapes
The shape language is defined by a consistent **16px (1rem) radius** for all primary containers and cards. This large radius contributes to the approachable, modern "Warm Premium" feel.

- **Small Elements:** Buttons and input fields should follow a 12px radius to feel nested comfortably within the 16px card containers.
- **Tags/Chips:** Should be fully rounded (pill-shaped) to distinguish them from interactive buttons.
- **Charts:** Bar charts and progress indicators should use rounded caps to maintain the soft aesthetic.

## Components
Consistent implementation of these components ensures a unified user experience across the energy management suite.

- **Bento Cards (Tarjetas):** The core building block. Every card must have a `label-caps` title in the top-left and an optional icon in the top-right.
- **Primary Buttons (Botones):** Forest green background with white text. Use 12px padding (vertical) and 24px (horizontal). Labels should be "Guardar Cambios" or "Ver Detalles."
- **Energy Chips (Indicadores):** Used to show status like "Eficiente" (Green) or "Consumo Elevado" (Amber). Pill-shaped with 10% opacity backgrounds of the status color.
- **Inputs (Campos de Entrada):** White background with a very subtle 1px border (#E5E7EB) that disappears on focus in favor of a 2px Forest Green ring.
- **Segmented Controls:** Used for time-period switching (Día, Mes, Año). These should have a subtle grey background and a white "floating" card for the active state, mimicking Raycast-style interactions.
- **Data Visualizations:** Charts should utilize the Forest Green for primary data and Warm Amber for "Current Peak" or "Warning" thresholds.
