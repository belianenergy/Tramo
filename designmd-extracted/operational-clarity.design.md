<!-- Extracted from stitch-mvp-completo-v1-landing-response.json -->
---
name: Operational Clarity
colors:
  surface: '#fdf7ff'
  surface-dim: '#ded8e0'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f2fa'
  surface-container: '#f2ecf4'
  surface-container-high: '#ece6ee'
  surface-container-highest: '#e6e0e9'
  on-surface: '#1d1b20'
  on-surface-variant: '#494551'
  inverse-surface: '#322f35'
  inverse-on-surface: '#f5eff7'
  outline: '#7a7582'
  outline-variant: '#cbc4d2'
  surface-tint: '#6750a4'
  primary: '#4f378a'
  on-primary: '#ffffff'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#cfbcff'
  secondary: '#63597c'
  on-secondary: '#ffffff'
  secondary-container: '#e1d4fd'
  on-secondary-container: '#645a7d'
  tertiary: '#765b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#fdf7ff'
  on-background: '#1d1b20'
  surface-variant: '#e6e0e9'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
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
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-default:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-bold:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mobile-headline:
    fontFamily: Inter
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
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system is engineered for high-stakes operational environments where clarity and professional trust are paramount. It adopts a **Corporate / Modern** aesthetic with heavy influence from **Linear** and **Stripe**, prioritizing a "utility-first" interface that feels both premium and invisible.

The system targets property managers and hospitality professionals who require a dependable tool for managing high volumes of data. The emotional response is one of calm efficiency; by using a restricted color palette and generous white space, the UI reduces cognitive load, allowing critical status updates (like check-in readiness) to command attention without overwhelming the user.

## Colors

The color strategy uses a base of **Slate 50** for the primary background to soften the interface, while white is reserved for high-priority "cards" and data surfaces. 

- **Primary Neutrals:** Contrast is achieved through Slate 900 for high-level hierarchy and Slate 500 for descriptive text and metadata.
- **Action & Status:** Blue 600 is used exclusively for secondary actions (buttons, links). Emerald, Amber, and Red are strictly reserved for operational statuses (Checked-in, Pending, or Issues) to ensure visual semantic consistency.
- **Borders:** A consistent #E5E7EB border defines the grid and separates content blocks without the need for heavy shadows.

## Typography

The design system utilizes **Inter** for its neutral, utilitarian character and exceptional legibility at small sizes. 

- **Hierarchical Contrast:** Headers use a semi-bold weight (600) with subtle negative letter-spacing to feel "tight" and professional.
- **Data Readability:** Body text utilizes a 14px default to allow for high data density without sacrificing comfort. 
- **Labels:** Small, uppercase labels with increased tracking are used for non-interactive categories and table headers to distinguish them clearly from interactive data points.

## Layout & Spacing

The design system follows a **Fixed Grid** philosophy for desktop to maintain structural integrity in data-heavy views, transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid with a 24px gutter. Content is typically housed in white cards that span 3, 4, 6, or 12 columns.
- **Rhythm:** A 4px baseline grid ensures vertical consistency. Margins between major sections are set at 40px (lg) to create "breathing room" that offsets the density of the property lists.
- **Mobile:** On mobile, side margins reduce to 16px, and multi-column cards reflow into a single-column stack.

## Elevation & Depth

This system avoids heavy shadows and skeuomorphism in favor of **Low-contrast outlines** and **Tonal layers**. 

1. **Flat Layers:** Most UI elements exist on a single flat plane, separated by 1px borders (#E5E7EB).
2. **Subtle Elevation:** For interactive elements like modals or dropdowns, a single, highly diffused shadow is used (e.g., `0px 4px 6px -1px rgba(0, 0, 0, 0.05)`).
3. **Active State:** Depth is communicated through color changes (e.g., a Slate 50 background shifting to White on hover) rather than physical lifting of the element.

## Shapes

The shape language is **Soft (0.25rem)**, reflecting a precise, professional tool. 

- **Standard Elements:** Buttons, input fields, and badges use a 4px (0.25rem) radius.
- **Large Containers:** Cards and modals use 8px (0.5rem) to provide a slightly softer frame for high-density content.
- **Badges:** Use a "Capsule" shape (999px) to distinguish status indicators from buttons or other square-ish interactive elements.

## Components

- **Buttons:** Primary buttons are solid Blue 600 with white text. They use a 4px corner radius. Secondary buttons are White with a Slate 200 border and Slate 900 text.
- **Badges/Chips:** Used for "Check-in Status." These are subtle: a light tinted background (e.g., Emerald 50) with saturated text (Emerald 600). No borders on badges.
- **Input Fields:** 1px border (#E5E7EB), Slate 50 background on focus to indicate activity, with a Blue 600 ring.
- **Lists/Tables:** Use a "Stripe" style with subtle dividers and no outer borders. Rows use a Slate 50 hover state.
- **Cards:** White background, 1px #E5E7EB border, no shadow. Used to group property details or booking information.
- **Timeline/Process:** A vertical or horizontal linear tracker (2px width) using the status colors to show the guest journey (Pre-check-in → Arrived → Checked-out).
