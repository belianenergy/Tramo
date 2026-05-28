<!-- Extracted from stitch-configuracion.json -->
---
name: EnergyOS Premium B2B SaaS
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#2b6954'
  on-secondary: '#ffffff'
  secondary-container: '#adedd3'
  on-secondary-container: '#306d58'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
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
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: -0.01em
  data-lg-mono:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  sidebar-width: 240px
  container-max-width: 1440px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-unit: 4px
---

## Brand & Style

This design system is built on the principles of **Precision, Transparency, and Efficiency**. Inspired by the high-performance aesthetics of Stripe and Linear, it utilizes a rigorous "Utility-First" approach to B2B SaaS. The brand personality is authoritative yet unobtrusive, acting as a high-fidelity instrument for energy data management.

The aesthetic follows a **Modern Corporate** style with a focus on high-contrast clarity. It prioritizes information density without sacrificing whitespace, ensuring that complex data sets remain legible and actionable. The interface remains strictly in light mode to maintain a "paper-white" professional environment that mimics high-end financial reporting tools.

## Colors

The palette is engineered for professional focus. The primary **Emerald (#10B981)** is used sparingly for primary actions, success states, and key data indicators, symbolizing growth and renewable energy. 

- **Canvas:** The global background uses a subtle off-white (#FAFAFA) to reduce eye strain while providing a distinct contrast against component surfaces.
- **Surface:** All interactive containers, cards, and modals use pure white (#FFFFFF).
- **Borders:** A consistent, hairline-thin border (#E5E5E5) is the primary method of separation, moving away from heavy shadows toward a more architectural, "blueprint" feel.
- **Typography Colors:** Primary text utilizes a deep slate (#0F172A) for maximum contrast, while secondary metadata uses a muted slate (#64748B).

## Typography

The typographic system uses a dual-font approach to distinguish between narrative UI and quantitative data:

1.  **Plus Jakarta Sans:** Used for all headings, navigation, and body copy. It provides a modern, geometric clarity that feels premium and approachable.
2.  **JetBrains Mono:** Applied to all numeric values, timestamps, and energy metrics. This ensures tabular data aligns perfectly and evokes a sense of technical precision.

**Scalability:** For mobile devices, `headline-xl` should scale down to `28px` with a `34px` line-height. All `data-mono` styles remain constant to ensure readability of technical figures across all viewports.

## Layout & Spacing

This design system utilizes a **Fixed Left Sidebar** layout model. The navigation remains anchored to the left to provide immediate access to global modules, while the main content area utilizes a fluid-width container with a maximum cap for readability.

- **Grid System:** A 12-column grid is used for dashboard layouts. Gutters are fixed at `24px`.
- **Sidebar:** Fixed at `240px`. On tablet devices, this collapses into a condensed icon-only rail (`64px`). On mobile, it transitions to a hidden drawer.
- **Rhythm:** All spacing is based on a `4px` baseline grid. Vertical rhythm between sections should follow a `32px` or `48px` increment to maintain a sense of openness.
- **Margins:** Page content is padded with `32px` on desktop and `16px` on mobile to ensure content does not touch the edges of the viewport or sidebar.

## Elevation & Depth

To maintain a "Precision" aesthetic, this design system avoids heavy shadows. Depth is achieved through **Low-Contrast Outlines** and subtle tonal stacking.

- **Level 0 (Base):** The #FAFAFA background.
- **Level 1 (Card):** White surfaces with a #E5E5E5 border. No shadow.
- **Level 2 (Dropdowns/Modals):** White surfaces with a #E5E5E5 border and a very subtle, diffused shadow: `0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Level 3 (Active Overlays):** Used for tooltips and floating alerts, utilizing a slightly darker border and a `0px 8px 24px rgba(0, 0, 0, 0.08)` shadow.

Interactive elements do not "lift" on hover; instead, they change border color or background tint to signify state, maintaining a flat, high-end print feel.

## Shapes

The shape language is strictly controlled to appear professional and structured. 

- **Standard Radius:** A `4px` (soft) radius is the default for buttons, input fields, and small components. 
- **Large Radius:** A `8px` radius is reserved for cards and main layout containers.
- **Exceptions:** Pills or fully rounded shapes are only permitted for status badges (e.g., "Active" or "Offline" indicators).

The subtle rounding balances the technicality of the monospace fonts with a touch of modern approachability, without becoming "bubbly" or informal.

## Components

### Buttons
- **Primary:** Solid Emerald (#10B981) with white text. No gradient. `4px` radius.
- **Secondary:** White background with #E5E5E5 border and Slate text. Hover state shifts background to #F8FAFC.
- **Ghost:** No border or background. Only Slate text. Used for secondary actions in toolbars.

### Input Fields
- **Default:** White background, #E5E5E5 border, `4px` radius. Focus state uses a `1px` Emerald border and a subtle `2px` Emerald outer glow at 10% opacity.
- **Labels:** Use `label-sm` (Plus Jakarta Sans) in Slate-500, positioned above the field.

### Cards
- Always use a white background and the `8px` radius. Borders are mandatory. Use `headline-md` for card titles to ensure clear sectioning of data.

### Data Tables
- Header cells use `label-sm` with a light grey background tint (#F1F5F9).
- Body cells use `data-mono` for all numeric output. Rows are separated by a `1px` #E5E5E5 bottom border.

### Status Chips
- Small, pill-shaped indicators. "Success" uses a light emerald tint with dark emerald text. "Warning" uses a light amber tint with dark amber text.

### Sidebar Items
- Active state uses a vertical `2px` Emerald line on the far left of the item and a subtle background tint of #F1F5F9. Icons should be stroke-based (2px weight) for a clean look.
