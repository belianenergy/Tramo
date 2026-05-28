<!-- Extracted from stitch-mvp-v4-alerts-response.json -->
---
name: EnergyOS Premium
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
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
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
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
  body-base:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  data-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is rooted in the "Precision Minimalist" aesthetic, blending the hyper-functional utility of developer tools (Linear) with the polished, premium feel of high-end financial platforms (Stripe). The brand personality is authoritative yet transparent, designed to instill confidence in technical operators managing complex energy infrastructure.

The visual direction prioritizes clarity and information density without sacrificing whitespace. It utilizes a rigorous alignment to a technical grid, high-contrast data visualization, and a disciplined color application to ensure that critical energy alerts and consumption metrics remain the focal point. The emotional response is one of controlled efficiency—users should feel like they are operating a sophisticated, well-tuned machine.

## Colors

The palette is anchored by a stark white-on-grey foundation to provide maximum legibility for data. **#FAFAFA** serves as the canvas, creating a subtle separation from the **#FFFFFF** cards. 

The primary **Emerald Green (#10B981)** is used purposefully for "Active" states, positive trends, and primary actions, reinforcing the "green energy" narrative. **#0F172A** (Slate 900) is used for primary text to ensure high-contrast readability. Warning and Danger colors are reserved strictly for system alerts and critical threshold breaches, ensuring they command immediate attention through high-saturation against the neutral backdrop.

## Typography

The typographic system uses a dual-font approach to distinguish between interface controls and technical data. **Inter** handles all UI labels, navigation, and instructional text, providing a neutral, highly readable corporate voice. 

**JetBrains Mono** is utilized for all numerical values, consumption metrics, and timestamps. The monospaced nature of JetBrains Mono ensures that numbers align perfectly in tables and dashboards, preventing "jitter" when data updates in real-time. Use `label-caps` for table headers and section overlines to provide clear structural grouping.

## Layout & Spacing

This design system employs a rigorous **8px grid system** for spacing and a **12-column fixed-fluid hybrid grid** for layout. On desktop, the main content area is capped at 1440px width. Gutters are fixed at 20px to maintain a dense, technical feel.

**Breakpoints:**
- **Mobile (up to 768px):** 4-column grid, 16px side margins. Cards stack vertically.
- **Tablet (769px - 1024px):** 8-column grid, 24px side margins.
- **Desktop (1025px+):** 12-column grid, 32px side margins.

Horizontal spacing between data points in tables should use the `sm` (8px) unit, while vertical section spacing should utilize `xl` (48px) to provide "breathing room" between disparate monitoring modules.

## Elevation & Depth

The design system avoids heavy drop shadows in favor of **low-contrast outlines** and **subtle ambient shadows**. Depth is used to signify interactivity and layering, not decoration.

- **Level 0 (Canvas):** #FAFAFA. No shadow.
- **Level 1 (Cards/Surface):** #FFFFFF background, 1px solid #E5E5E5 border.
- **Level 2 (Dropdowns/Modals):** #FFFFFF background, 1px solid #E5E5E5 border, with a 10% opacity black shadow (Y: 4px, Blur: 12px).
- **Active State:** Elements like buttons or selected cards may feature a 2px offset "focus" ring in the primary color to indicate selection.

Use backdrop blurs (12px) for sticky headers to allow the energy data to scroll underneath while maintaining legibility.

## Shapes

The shape language is "Soft" (0.25rem/4px) to maintain a modern, professional appearance that feels precise but not aggressive. 

- **Small Components:** Buttons, inputs, and chips use a 4px radius.
- **Large Components:** Dashboard cards and modal containers use a 8px (rounded-lg) radius.
- **Data Points:** Graph nodes and status indicators should remain sharp or use a minimal 2px radius to preserve the technical accuracy of the visual representation.

## Components

### Buttons
- **Primary:** Background #10B981, Text #FFFFFF. No gradient. 1px inset top border for subtle highlight.
- **Secondary:** Background #FFFFFF, Border #E5E5E5, Text #0F172A.
- **Ghost:** No background or border. Text #64748B. Use for low-priority actions.

### Cards
Cards are the primary container for data modules. They must feature a 1px border (#E5E5E5) and a padding of 24px (lg). Titles within cards should always be accompanied by a trailing icon or a JetBrains Mono "Last updated" timestamp.

### Inputs & Selects
Field labels use `body-sm` in Slate 900. Input backgrounds are #FFFFFF with a 1px border. On focus, the border transitions to #10B981 with a 2px soft outer glow.

### Data Chips
Small indicators for status (e.g., "Online", "Grid Active"). Use a light tint of the status color for the background (10% opacity) and the full-saturation color for the text.

### Monitoring Charts
Lines in charts should have a 2px stroke width. Primary data uses #10B981. Grid lines within charts must be #F1F5F9 (even lighter than the main border) to remain unobtrusive.
