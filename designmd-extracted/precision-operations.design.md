<!-- Extracted from stitch-energyos-str-clean-v1-apartment-detail-clean-edit-response.json -->
---
name: Precision Operations
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#3e4947'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6e7977'
  outline-variant: '#bdc9c6'
  surface-tint: '#006a63'
  primary: '#005c55'
  on-primary: '#ffffff'
  primary-container: '#0f766e'
  on-primary-container: '#a3faef'
  inverse-primary: '#80d5cb'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#425268'
  on-tertiary: '#ffffff'
  tertiary-container: '#5a6a81'
  on-tertiary-container: '#deeaff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9cf2e8'
  primary-fixed-dim: '#80d5cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#00504a'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#d3e4fe'
  tertiary-fixed-dim: '#b7c8e1'
  on-tertiary-fixed: '#0b1c30'
  on-tertiary-fixed-variant: '#38485d'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.03em
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 40px
  gutter: 20px
---

## Brand & Style
The design system is engineered for high-stakes B2B energy management, prioritizing operational efficiency over decorative flair. It targets short-term rental managers who require a calm, "mission control" environment to manage complex utility data across multiple properties. 

The aesthetic is **Corporate Modern** with a lean toward **Minimalism**, emphasizing high data density without inducing cognitive load. It avoids common "green energy" clichés, opting instead for a technical, software-first visual language that evokes credibility and architectural precision. The interface feels like a professional tool—sharp, responsive, and reliable.

## Colors
The palette is rooted in a professional "Slate & Teal" foundation. 
- **Primary (#0F766E):** A deep Emerald/Teal used for primary actions and brand presence. It signals stability and efficiency.
- **Surface (#F8FAFC):** An off-white, cool-toned neutral that reduces screen glare during long operational sessions.
- **Text & Contrast (#0F172A):** A high-contrast navy-slate for maximum legibility in complex data tables.
- **Status Colors:** Use standard semantic reds (error), ambers (warning), and blues (info), but desaturate them slightly to maintain the premium, calm atmosphere.

## Typography
The typographic hierarchy uses three distinct typefaces to separate intent:
1.  **Plus Jakarta Sans** is reserved for structural headlines and page titles, providing a modern, approachable geometric feel.
2.  **Inter** handles all UI labels, body text, and instructional content, chosen for its exceptional readability at small sizes.
3.  **JetBrains Mono** is used exclusively for numeric data, consumption metrics, and timestamps. This monospaced choice ensures that columns of numbers align perfectly in tables and dashboard widgets, facilitating quick comparison.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** for main dashboard views, allowing content to scale from tablet to ultra-wide monitors. 

A strict **4px/8px incremental spacing system** ensures vertical rhythm. Given the operational nature of the product, "Compact" layouts are preferred.
- **Dashboards:** Use 24px padding within cards.
- **Data Grids:** Use 8px vertical padding for rows to maximize information density.
- **Sidebars:** Fixed at 280px to provide a consistent navigation anchor.

## Elevation & Depth
Depth is created through **Tonal Layers** and subtle 1px outlines rather than heavy shadows.
- **Level 0 (Background):** #F8FAFC.
- **Level 1 (Cards/Panels):** White (#FFFFFF) background with a 1px #E2E8F0 border.
- **Subtle Shadow:** Use a singular, highly diffused shadow for active cards or dropdowns: `0px 4px 12px rgba(15, 23, 42, 0.04)`.
- **Interactive States:** On hover, a card should not lift significantly; instead, the border color should shift to the Primary Teal or a slightly darker gray to signal focus.

## Shapes
A consistent **8px (0.5rem)** corner radius is applied to all primary UI elements, including cards, input fields, and buttons. This "Rounded" approach softens the technical density of the data without appearing overly consumer-focused or "bubbly." 

Small components like tags or status indicators may use a fully rounded (pill) shape to distinguish them from interactive buttons.

## Components
- **Buttons:** Primary buttons use the Teal background with white text. Secondary buttons use a white background with a 1px border (#E2E8F0). Active states should be a 10% darken of the base color.
- **Data Cards:** The workhorse of the system. They must feature a white background, 8px radius, 1px border, and a title bar with a 1px bottom divider.
- **Inputs:** Fields should have a subtle #F8FAFC background to differentiate from the white card surface. Focus states use a 2px Primary Teal ring with 0% offset.
- **Status Chips:** Use a "Light Fill" style. For example, a "Healthy" status uses a very light teal background with the deep #0F766E text.
- **Tables:** No vertical lines. Use 1px horizontal dividers (#E2E8F0). Header cells use `label-caps` typography with a subtle gray background.
- **Metric Widgets:** Large numeric values in `metric-lg` paired with a small `metric-md` trend indicator (up/down arrow).
