<!-- Extracted from stitch-es-response-2.json -->
---
name: EnergyOS Pro
colors:
  surface: '#0e141a'
  surface-dim: '#0e141a'
  surface-bright: '#333a40'
  surface-container-lowest: '#080f14'
  surface-container-low: '#161c22'
  surface-container: '#1a2026'
  surface-container-high: '#242b31'
  surface-container-highest: '#2f353c'
  on-surface: '#dde3eb'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dde3eb'
  inverse-on-surface: '#2b3137'
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
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
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
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0e141a'
  on-background: '#dde3eb'
  surface-variant: '#2f353c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h2:
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
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  data-base:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  data-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
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
  unit: 4px
  container-padding: 24px
  stack-gap: 16px
  element-gap: 8px
  tight-gap: 4px
  grid-gutter: 12px
---

## Brand & Style

This design system is engineered for high-stakes decision-making and operational efficiency in the B2B energy sector. It prioritizes information density and technical precision, drawing inspiration from high-performance environments like financial terminals and developer tools. The aesthetic is "Technical Minimalist"—stripping away decorative elements in favor of functional clarity and structural integrity.

The UI should evoke a sense of absolute reliability and "live" data responsiveness. Every pixel serves a purpose, facilitating the rapid scanning of complex datasets. Visual hierarchy is maintained through subtle tonal shifts and sharp typography rather than aggressive shadows or large whitespace, ensuring that the platform remains performant even when displaying hundreds of concurrent data points.

## Colors

The color architecture of this design system utilizes a deep Slate foundation to minimize eye strain during long-duration monitoring. The primary Emerald green is reserved for critical actions and positive energy flow, while specific category hues (Blue, Amber, Violet) provide immediate semantic recognition for different asset types.

For UI borders, a consistent Slate-700 (#334155) is used to define structure without creating high-contrast visual noise. Text follows a strict hierarchy: Slate-200 for primary content to ensure readability, and Slate-400 for metadata. Hover states should utilize a subtle "inner glow" or increased border brightness to signal interactivity without shifting layout positions.

## Typography

This design system employs a dual-font strategy to separate interface logic from technical data. **Inter** handles all UI labels, navigation, and instructional text, providing a neutral and highly legible sans-serif base. 

For all numerical values, timestamps, and energy metrics, **JetBrains Mono** is required. Its monospaced nature ensures that columns of numbers align perfectly in tables and metric cards, preventing "jumping" during real-time data updates. Use a base size of 14px for primary UI elements to maintain high density, scaling down to 11px for utility labels.

## Layout & Spacing

The layout philosophy follows a rigid 4px baseline grid to achieve a high-density, Bloomberg-style interface. Content should be organized in a modular fluid grid that maximizes screen real estate, particularly on wide-aspect industrial monitors. 

Standard margins are set to 24px, but internal component spacing (such as within cards or tables) should be tightened to 8px or 12px to keep related information clusters cohesive. Components should use `flex` or `grid` alignments with explicit gap values rather than unpredictable margins to ensure a surgical level of precision across different dashboard views.

## Elevation & Depth

In this dark-mode environment, depth is established through tonal layering and borders rather than traditional drop shadows. The background sits at the lowest level (#0f172a). Card surfaces and primary UI containers are elevated once using a fill of #1e293b and a 1px #334155 border.

For interactive states and overlays:
- **Hover:** Increase the border brightness to Emerald (#10b981) at 40% opacity and apply a subtle 4px outer blur of the same color to create a "glow" effect.
- **Modals/Popovers:** Use a heavy backdrop blur (12px to 16px) with a semi-transparent Slate-900 overlay to maintain context while focusing the user.
- **Active States:** Use an inset 1px Emerald border for buttons or selected rows to indicate focus without changing the component's size.

## Shapes

The shape language is controlled and modern. A standard corner radius of 12px (0.75rem) is applied to all primary cards, containers, and modals to soften the technical density of the UI. Smaller components like buttons, input fields, and tags use a tighter 6px radius to maintain a crisp, professional appearance. 

Status indicators and icon containers may use a full pill radius (9999px) to distinguish them from structural UI elements. All borders must be exactly 1px to ensure the interface feels sharp and engineered.

## Components

### Metric Cards
Metric cards are the core of the dashboard. They feature a 12px radius, JetBrains Mono for the primary value, and Lucide icons for trend indication (Up/Down/Stable). Small sparklines should be embedded at the bottom of the card using the category color (e.g., Violet for Arbitrage).

### Tables
Tables are high-density with no cell padding on the horizontal edges of the container. Header rows use `label-caps` typography with a Slate-700 bottom border. Row hover states should trigger a subtle Slate-800 background shift and the 1px primary glow effect.

### Buttons
Primary buttons use a solid Emerald fill with Slate-900 text. Secondary buttons are ghost-style with a Slate-700 border. All buttons must have a height of 32px or 36px to support high-density layouts.

### Status Indicators
Status indicators are small, circular dots accompanied by `data-sm` text. Use Emerald for "Online," Amber for "Warning," and Red for "Fault."

### Form Inputs
Inputs use the Slate-800 surface color with a 1px Slate-700 border. On focus, the border transitions to Primary Emerald with a 2px outer glow. Labels always sit above the input in `body-sm` Slate-400.
