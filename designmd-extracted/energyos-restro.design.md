<!-- Extracted from stitch-mvp-restro-style-v1-apartment-detail-platform-copy-response.json -->
---
name: EnergyOS Restro
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#554338'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#887367'
  outline-variant: '#dbc1b3'
  surface-tint: '#984700'
  primary: '#984700'
  on-primary: '#ffffff'
  primary-container: '#e6813a'
  on-primary-container: '#562500'
  inverse-primary: '#ffb68a'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#00677f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00a9ce'
  on-tertiary-container: '#003846'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbc8'
  primary-fixed-dim: '#ffb68a'
  on-primary-fixed: '#321300'
  on-primary-fixed-variant: '#743500'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#b6ebff'
  tertiary-fixed-dim: '#57d5fc'
  on-tertiary-fixed: '#001f28'
  on-tertiary-fixed-variant: '#004e60'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  number-data:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.02em
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is centered on a "Restro" aesthetic—a sophisticated blend of mid-century modularity and contemporary precision. It targets high-level energy operators who require clarity and calm in complex data environments. The brand personality is professional and architectural, eschewing digital trends like glassmorphism or neon accents in favor of a timeless, tactile editorial feel. 

The style is defined by a warm, paper-like foundation, structured through precise geometric containers and generous negative space. It evokes a sense of "operational luxury," where the premium quality is derived from perfect alignment, subtle tonal shifts, and high-contrast typography rather than decorative effects.

## Colors

The color palette is grounded in warm, organic neutrals to reduce eye strain and provide a "stable" canvas for energy data. 

- **Primary & Secondary:** Caramel and warm orange are used sparingly as functional accents for critical actions, active states, and specific data points.
- **Neutrals:** The background uses a sequence of warm grays (#F4F1EA) to create depth without relying on shadows. Text is kept at a high-contrast near-black (#171717) for absolute legibility.
- **Surfaces:** Pure white and very light cream are used to distinguish modular "cards" from the page background.
- **Semantic Colors:** While not part of the core brand, status indicators (Success/Warning/Error) should be desaturated to maintain the sober, professional tone.

## Typography

This design system utilizes **Plus Jakarta Sans** for its balanced, modern geometric proportions that remain legible at small sizes. The hierarchy is sober and data-centric.

- **Numbers:** Data values are prioritized with larger font sizes and medium weights to ensure they are the first thing an operator sees.
- **Labels:** Small labels use a semi-bold weight and slight letter spacing for clarity in compact sidebar or chart environments.
- **Headlines:** Titles are kept to a medium weight; bolding is reserved for critical alerts or buttons.
- **Scaling:** On mobile devices, `display-lg` should scale down to `32px` to maintain layout integrity.

## Layout & Spacing

The layout follows a **modular fixed-grid** philosophy. Content is organized into distinct cards that act as independent modules within a flexible 12-column grid.

- **Rhythm:** A 4px baseline grid ensures consistent vertical rhythm.
- **Airiness:** Large internal padding (32px) within containers prevents data density from feeling overwhelming.
- **Sidebars:** The primary navigation is a narrow (72px - 80px) vertical bar with circular icon buttons, maximizing horizontal space for data visualization.
- **Breakpoints:** 
    - **Desktop (1440px+):** 12 columns, 40px margins.
    - **Tablet (768px - 1024px):** 6 columns, 24px margins, sidebars may collapse to icons-only.
    - **Mobile (<768px):** Single column fluid, 16px margins, cards stack vertically.

## Elevation & Depth

This design system avoids heavy drop shadows and 3D effects. Depth is communicated through:

- **Tonal Layering:** Main surfaces (#FFFFFF) sit on top of background layers (#F4F1EA).
- **Subtle Borders:** All main containers use a fine 1px border (#E8E2D8).
- **Micro-Shadows:** Only the top-level active cards or dropdowns utilize a very soft, highly diffused shadow (e.g., `0 4px 20px rgba(23, 23, 23, 0.03)`).
- **Interaction:** Hover states are indicated by subtle background shifts (from White to Light Cream) or a primary-colored border stroke rather than an increase in elevation.

## Shapes

The shape language is defined by "Oversized Softness." 

- **Main Containers:** Modular cards use a radius of 24px to 32px (`rounded-xl` or custom), creating a friendly but structured appearance.
- **UI Elements:** Buttons and input fields use a consistent 8px to 12px radius. 
- **Circular Elements:** Sidebar icons and status dots are always fully rounded (pills) to provide a geometric counterpoint to the large rectangular cards.
- **Charts:** Bar charts must have rounded caps; line charts should use a slight curve (interpolation) to match the overall softness of the system.

## Components

- **Buttons:** Primary buttons are solid caramel (#E6813A) with white text. Secondary buttons use a cream background with a subtle border. All buttons are compact with generous horizontal padding.
- **Cards:** The core of the system. Every card has a 1px #E8E2D8 border, 32px corner radius, and white background. Title areas in cards are clearly separated by whitespace rather than lines.
- **Inputs:** Clean, 1px bordered fields. Focus states use a caramel border ring. Labels sit above the field in `label-caps` style.
- **Pills/Chips:** Used in the topbar for status and filtering. These are small, fully rounded elements with light-gray backgrounds or primary-tinted backgrounds for active states.
- **Iconography:** Use 2px stroke-width linear icons. Icons should be strictly geometric and never filled unless they represent an active state.
- **Data Visuals:** Fine-line charts with no area fills. Use the caramel accent for the primary data series and neutral grays for secondary comparisons.
