<!-- Extracted from stitch-landing-v5-response.json -->
---
name: Retro-Modern Industrial SaaS
colors:
  surface: '#fff8f5'
  surface-dim: '#e0d8d5'
  surface-bright: '#fff8f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#faf2ee'
  surface-container: '#f4ece8'
  surface-container-high: '#eee7e3'
  surface-container-highest: '#e9e1dd'
  on-surface: '#1e1b19'
  on-surface-variant: '#534439'
  inverse-surface: '#33302d'
  inverse-on-surface: '#f7efeb'
  outline: '#867367'
  outline-variant: '#d9c2b4'
  surface-tint: '#904d09'
  primary: '#814300'
  on-primary: '#ffffff'
  primary-container: '#a05a18'
  on-primary-container: '#ffeadd'
  inverse-primary: '#ffb77f'
  secondary: '#964900'
  on-secondary: '#ffffff'
  secondary-container: '#fc984e'
  on-secondary-container: '#6d3400'
  tertiary: '#55534f'
  on-tertiary: '#ffffff'
  tertiary-container: '#6e6b67'
  on-tertiary-container: '#f2ede8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc4'
  primary-fixed-dim: '#ffb77f'
  on-primary-fixed: '#2f1500'
  on-primary-fixed-variant: '#6f3800'
  secondary-fixed: '#ffdcc6'
  secondary-fixed-dim: '#ffb786'
  on-secondary-fixed: '#311300'
  on-secondary-fixed-variant: '#723600'
  tertiary-fixed: '#e6e2dd'
  tertiary-fixed-dim: '#cac6c1'
  on-tertiary-fixed: '#1d1b19'
  on-tertiary-fixed-variant: '#484643'
  background: '#fff8f5'
  on-background: '#1e1b19'
  surface-variant: '#e9e1dd'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  metric-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.1'
  metric-md:
    fontFamily: JetBrains Mono
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.1'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding-mobile: 16px
  container-padding-desktop: 32px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system establishes a "Restro" aesthetic—a sophisticated intersection of mid-century industrial warmth and high-precision modern software. It is designed for professional energy management, evoking a sense of reliability and technical mastery.

The visual language rejects the common trends of depth and translucency in favor of a **Flat / Minimalist** approach. By utilizing a warm, organic color palette against a stark, high-contrast typography system, the interface feels both human and authoritative. The atmosphere is professional, clean, and intentionally spacious, prioritizing data clarity and calm monitoring over visual noise.

## Colors

The palette is anchored by a warm beige cream background that reduces eye strain and distinguishes the product from typical "cold" enterprise software. 

- **Primary & Secondary:** A duo of terracotta and rust tones provide a grounded, earth-toned brand presence used for primary actions and brand highlights.
- **Surface:** Pure white is reserved strictly for interactive cards and containers to create a "floating" paper-on-desk effect without needing shadows.
- **Alerts:** A high-visibility red is used sparingly for critical energy faults or system warnings.
- **Typography:** Deep stone grays replace pure black to maintain the soft, retro-inspired contrast levels.

## Typography

This system employs a dual-font strategy to separate narrative content from technical data.

- **Inter (Sans-Serif):** Used for all headlines and body copy. It provides a clean, modern, and highly legible foundation for the interface.
- **JetBrains Mono (Monospace):** Reserved for technical metrics, property names, and tabular data. The fixed-width character set evokes a "terminal" or "blueprints" feel, reinforcing the industrial nature of energy management.

Headlines use tight letter-spacing to feel more impactful, while body text remains standard for maximum readability. Use `label-caps` for table headers and small metadata tags.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with generous margins to emphasize the minimalist, clean aesthetic. 

- **Grid:** Use a 12-column grid for desktop views with 24px gutters.
- **White Space:** Information density should be kept moderate. Avoid crowding components; use `stack-lg` (32px) to separate distinct functional sections.
- **Margins:** On desktop, use a minimum of 32px page padding. On mobile, scale down to 16px. 
- **Alignment:** All technical data (monospaced) should be aligned to the left in columns to maintain a clean "ledger" look.

## Elevation & Depth

This design system strictly adheres to a **Flat Design** philosophy. 

- **No Shadows:** Do not use box-shadows, drop-shadows, or inner-shadows for any element.
- **Contrast-Based Depth:** Depth is communicated through color layering. The `#F5F0EB` background acts as the lowest plane. White (`#FFFFFF`) surfaces represent interactive or secondary planes.
- **Borders:** Use subtle, 1px borders in `#78716C` at 10-15% opacity to define card boundaries where necessary, though color contrast between the background and white cards is the primary method of separation.

## Shapes

The shape language is a mix of structured containers and organic interactive elements.

- **Cards & Containers:** Use a consistent 16px (`rounded-lg`) corner radius. This softens the industrial tone and makes the dashboard feel modern.
- **Interactive Elements:** Buttons, tags, chips, and badges must use a **Full Pill** radius.
- **Input Fields:** Follow the card radius (16px) or pill radius for consistency with the primary action buttons.

## Components

- **Buttons:** All buttons are pill-shaped. Primary buttons use the Terracotta background with White text. Secondary buttons use a Terracotta outline with no fill.
- **Cards:** White background, 16px border radius, no shadow. Content within cards should have a minimum of 24px internal padding.
- **Progress Bars:** Designed as thick, pill-shaped tracks. The "filled" portion should be a solid color (Terracotta or Alert Red) with a rounded cap.
- **Charts:** Line charts must use smooth (monotone/bezier) interpolation. Use a 2px stroke width. **No area fills** are permitted beneath the lines to maintain the flat, airy aesthetic.
- **Input Fields:** 16px radius, subtle border, with JetBrains Mono used for the input text and Inter for the labels.
- **Chips/Badges:** Small, pill-shaped containers with JetBrains Mono text in `label-caps` style.
- **Metrics:** Display large-scale numbers using JetBrains Mono, paired with a small `label-caps` description positioned above or to the right of the value.
