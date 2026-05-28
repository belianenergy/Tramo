<!-- Extracted from stitch-v5-response.json -->
---
name: Organic Efficiency
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#40493d'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#707a6c'
  outline-variant: '#bfcaba'
  surface-tint: '#1b6d24'
  primary: '#0d631b'
  on-primary: '#ffffff'
  primary-container: '#2e7d32'
  on-primary-container: '#cbffc2'
  inverse-primary: '#88d982'
  secondary: '#8f4e00'
  on-secondary: '#ffffff'
  secondary-container: '#ff8f00'
  on-secondary-container: '#623400'
  tertiary: '#005e6b'
  on-tertiary: '#ffffff'
  tertiary-container: '#007988'
  on-tertiary-container: '#d4f7ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a3f69c'
  primary-fixed-dim: '#88d982'
  on-primary-fixed: '#002204'
  on-primary-fixed-variant: '#005312'
  secondary-fixed: '#ffdcc2'
  secondary-fixed-dim: '#ffb77a'
  on-secondary-fixed: '#2e1500'
  on-secondary-fixed-variant: '#6d3a00'
  tertiary-fixed: '#9eefff'
  tertiary-fixed-dim: '#55d7ed'
  on-tertiary-fixed: '#001f24'
  on-tertiary-fixed-variant: '#004e59'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  data-mono:
    fontFamily: Inter
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
---

## Brand & Style

The brand personality is rooted in **Reliable Stewardship**. This design system balances the high-density requirements of B2B energy management with an approachable, human-centric aesthetic. It departs from the typical cold, dark-mode "control center" tropes of the energy sector, favoring a "Light & Airy" Corporate Modern style that feels like an extension of the natural environment we aim to protect.

The visual language uses soft lighting, generous whitespace, and a high-fidelity information hierarchy. The emotional response should be one of calm control—transforming complex grid data into legible, actionable insights without overwhelming the professional user.

## Colors

The palette is anchored by **Forest Green**, representing growth and sustainability. It is supported by a functional spectrum of amber and cyan to denote energy flow and technical precision. 

The background is a soft, non-clinical grey (#FAFAFA) to reduce eye strain during long-form data analysis, while interactive surfaces use pure white (#FFFFFF) to create a clear "object-based" hierarchy. Specific semantic colors are reserved for categorization: Corporate Blue for Fincas, Warm Orange for Apartamentos, and Soft Purple for Arbitrage, ensuring users can orient themselves across different asset classes at a glance.

## Typography

This system employs a dual-typeface strategy. **Plus Jakarta Sans** provides a friendly, contemporary feel for headers, using its slightly rounded terminals to soften the professional interface. **Inter** is used for all functional body text and interface elements due to its high legibility at small sizes.

For all financial and energy metrics, Inter's **tabular figures** (monospace numeric variant) must be used. This ensures that columns of numbers in data tables align perfectly, allowing for easier vertical scanning and comparison of consumption values.

## Layout & Spacing

The layout follows a **Fixed Grid** model with a maximum width of 1280px to ensure optimal readability on widescreen enterprise monitors. Content is centered within the viewport, utilizing a consistent 24px outer margin.

A strict 8px spatial rhythm governs the design. Components are separated by a standard 16px gap, which increases to 24px between major logical sections or card groups. This "breathable" approach prevents the data-rich dashboards from feeling cluttered, maintaining the "warm and accessible" brand promise.

## Elevation & Depth

Visual hierarchy is achieved through **Ambient Shadows** and **Tonal Layering**. Unlike harsh tech aesthetics, our shadows are diffused and low-opacity, intended to lift white cards subtly off the light grey background.

- **Level 0 (Background):** #FAFAFA.
- **Level 1 (Cards):** Pure White with a subtle 4px blur, 2% opacity black shadow.
- **Level 2 (Dropdowns/Modals):** Pure White with a 12px blur, 6% opacity black shadow.

Interactive elements do not use heavy shadows but instead rely on 1px borders (#E0E0E0) for definition. When a user interacts with a card, a slight increase in shadow depth and a primary-colored border-top can be used to indicate focus.

## Shapes

The shape language is purposefully **Rounded** to evoke friendliness and approachability. 

- **Cards:** 12px radius creates a soft container for complex data.
- **Interactive Elements:** Buttons and Input fields use an 8px radius, providing enough roundness to feel modern while maintaining a professional "tool-like" structure.
- **Chips/Badges:** These are fully pill-shaped (100px) to distinguish them clearly from interactive buttons.

## Components

### Buttons & Inputs
Buttons feature 8px corners and use the Primary (Forest Green) color for main actions. Secondary actions should use an outlined style with #E0E0E0 borders. Input fields follow the same radius and use #757575 for placeholders to ensure accessible contrast.

### Cards
Cards are the primary container. They must have a 12px radius, a #FFFFFF background, and a subtle 1px border of #E0E0E0. Padding inside cards should be a consistent 24px.

### Data Chips
Used for asset tagging (Fincas, Apartamentos). Chips should have a light tinted background (10% opacity of the brand color) with high-contrast text of the same hue to ensure legibility without visual noise.

### Data Tables
Tables should use Inter (14px) with tabular figures for all numbers. Use alternating row highlights (Zebra striping) using #FAFAFA for long data sets to assist horizontal eye tracking.

### Energy Visualization
Charts should utilize the full semantic palette. Arbitrage flows use Soft Purple, while energy generation peaks use Amber. All chart lines should have a 2px stroke width with rounded caps to match the system's shape language.
