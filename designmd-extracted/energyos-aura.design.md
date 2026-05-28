<!-- Extracted from stitch-landing-aura-v5-5-loop2-edit-response.json -->
---
name: EnergyOS Aura
colors:
  surface: '#0f1412'
  surface-dim: '#0f1412'
  surface-bright: '#353a37'
  surface-container-lowest: '#0a0f0c'
  surface-container-low: '#181d1a'
  surface-container: '#1c211e'
  surface-container-high: '#262b28'
  surface-container-highest: '#313632'
  on-surface: '#dfe4de'
  on-surface-variant: '#c1cab1'
  inverse-surface: '#dfe4de'
  inverse-on-surface: '#2c322e'
  outline: '#8c947d'
  outline-variant: '#424937'
  surface-tint: '#94da3a'
  primary: '#ffffff'
  on-primary: '#1f3700'
  primary-container: '#aff755'
  on-primary-container: '#447000'
  inverse-primary: '#406900'
  secondary: '#54d8e8'
  on-secondary: '#00363c'
  secondary-container: '#02aebe'
  on-secondary-container: '#003b42'
  tertiary: '#ffffff'
  on-tertiary: '#402d00'
  tertiary-container: '#ffdf9f'
  on-tertiary-container: '#815f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#aff755'
  primary-fixed-dim: '#94da3a'
  on-primary-fixed: '#102000'
  on-primary-fixed-variant: '#2f4f00'
  secondary-fixed: '#91f1ff'
  secondary-fixed-dim: '#54d8e8'
  on-secondary-fixed: '#001f23'
  on-secondary-fixed-variant: '#004f57'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f9bd22'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5c4300'
  background: '#0f1412'
  on-background: '#dfe4de'
  surface-variant: '#313632'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  mono-metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 32px
  mono-metric-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 20px
  mono-label:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 24px
  panel-gap: 12px
  density-tight: 4px
  density-comfy: 12px
---

## Brand & Style

The design system is engineered for the high-stakes environment of professional accommodation management. It embodies a "Command Center" aesthetic: dense, hyper-functional, and unapologetically technical. The brand personality is authoritative and precise, prioritizing rapid data legibility over decorative flair.

Drawing from **Technical Minimalism**, the UI utilizes a "mobile-flow" panel architecture even on desktop, creating a modular interface that feels like a sophisticated instrument cluster. The emotional response is one of total control and reliability—an "autopilot" for energy that remains transparent and auditable at every pixel. There are no decorative gradients or soft blurs; every element serves a functional purpose in the monitoring and optimization of energy assets.

## Colors

The palette is anchored in deep "Ink" and "Graphite" tones to reduce eye strain during prolonged monitoring sessions. 

- **Primary (Electric Green):** Reserved exclusively for active states, successful automation, and "Live" energy flow indicators.
- **Secondary (Cyan):** Used for technical data visualizations and cooling-related metrics.
- **Tertiary (Amber):** Dedicated to cautionary states, pending optimizations, and heating metrics.
- **Alert (Red):** Used sparingly for critical hardware failures or budget overruns.

Surface colors follow a tiered hierarchy: the base level is `#101512`, while interactive panels and cards use `#17201B` and `#202A24` to create subtle depth without relying on heavy shadows. High-contrast off-whites are used for primary legibility to maintain a premium, crisp feel.

## Typography

This design system employs a dual-font strategy to distinguish between UI navigation and technical data. 

**Inter** handles all standard UI elements, including headers, body text, and button labels. It is chosen for its neutrality and exceptional legibility at small sizes.

**JetBrains Mono** is utilized for all numerical values, timestamps, and technical status labels. This monospaced font ensures that fluctuating metrics (like kWh or temperature) do not cause layout shifts and conveys a sense of engineering-grade precision. 

Large display sizes are tightened with negative letter-spacing, while mono labels use uppercase styling for a compact, "tag-like" appearance.

## Layout & Spacing

The layout philosophy is built on a **High-Density Fluid Grid**. The UI is composed of "Mobile-flow" panels—vertical stacks that behave like mobile views even on large displays, allowing for massive information density without visual clutter.

A strict 4px baseline grid ensures alignment. On desktop, the system uses a 12-column grid with narrow 16px gutters to maximize usable space. Components are packed tightly, using `density-tight` (4px) for related data points and `density-comfy` (12px) for separating logical sections within a panel.

Bottom-sheet logic is applied to mobile interactions, where secondary controls slide up over the main dashboard to maintain the user's context in the "command center."

## Elevation & Depth

In this design system, depth is communicated through **Low-Contrast Outlines** and **Tonal Layering** rather than traditional shadows. 

1. **Borders:** Every card, input, and panel features a crisp 1px border. On dark surfaces, these are subtly lighter than the background (e.g., `#202A24`).
2. **Surfaces:** Depth is indicated by "stepping up" the background color. The further "forward" an element is in the user's focus, the lighter its graphite tone becomes.
3. **Shadows:** When used (primarily for floating bottom sheets or dropdowns), shadows are sharp and localized, with high opacity and 0px spread to mimic a physical layer hovering just millimeters above the base.
4. **Active State:** Focus and active states are indicated by the 1px border switching to the Primary Electric Green or Secondary Cyan, rather than using glows.

## Shapes

The shape language is disciplined and professional. A maximum border radius of **8px** (Level 2) is enforced across all primary containers and cards. 

Smaller components like buttons, input fields, and tags should use a **4px** radius to maintain a sharp, technical appearance. This slight rounding prevents the UI from feeling "aggressive" while remaining firmly rooted in a structured, grid-based aesthetic. Circular shapes are reserved strictly for status indicators (LED pips) and avatars.

## Components

### Buttons
Primary buttons use a solid Electric Green background with dark text. Secondary buttons are "Ghost" style: 1px Graphite borders with JetBrains Mono text. All buttons have a fixed height of 36px or 44px to maintain density.

### Cards & Panels
Cards are the primary container. They must feature a 1px border and use the Surface Graphite color. Headers within cards should use the `mono-label` typography for a "readout" feel.

### Input Fields
Inputs are dark-themed with inset 1px borders. The focus state is a 1px Electric Green border. Labels should be placed inside the input container using `mono-label` for a compact footprint.

### Metrics & Chips
Metrics are the hero of the system. Large values use `mono-metric-lg`. Chips (Status Tags) are rectangular with a 2px radius and use low-opacity versions of the accent colors (e.g., 10% Green background with 100% Green text).

### Lists
Lists are high-density with 1px dividers. Each row should utilize JetBrains Mono for time-series data or numerical values to ensure perfect vertical alignment across columns.

### Bottom Sheets
On mobile and tablet, all complex configurations or detailed "drill-downs" occur in bottom sheets with an 8px top-corner radius, sliding over the main dashboard.
