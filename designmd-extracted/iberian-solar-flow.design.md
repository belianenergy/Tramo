<!-- Extracted from stitch-landing-aura-v1-landing-response.json -->
---
name: Iberian Solar Flow
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#534437'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#867465'
  outline-variant: '#d9c2b1'
  surface-tint: '#8e4e00'
  primary: '#8e4e00'
  on-primary: '#ffffff'
  primary-container: '#e8913a'
  on-primary-container: '#5b3000'
  inverse-primary: '#ffb778'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#00687b'
  on-tertiary: '#ffffff'
  tertiary-container: '#0fb5d4'
  on-tertiary-container: '#00424e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcc1'
  primary-fixed-dim: '#ffb778'
  on-primary-fixed: '#2e1500'
  on-primary-fixed-variant: '#6c3a00'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#adecff'
  tertiary-fixed-dim: '#4fd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5d'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Public Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
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
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding-mobile: 16px
  container-padding-desktop: 32px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system is engineered for the modern Spanish property manager, balancing the high-stakes nature of utility management with the warmth of Mediterranean hospitality. The aesthetic follows the **Corporate / Modern** movement, leaning heavily into a "Mobile-First Flow" that prioritizes rapid data ingestion and one-handed operation.

The emotional response should be one of "controlled efficiency"—the user should feel that their energy costs and carbon footprint are under total control without the UI feeling clinical or cold. By utilizing a warm-leaning neutral base and a vibrant, sun-drenched accent color, the system feels localized to the Spanish market while maintaining the rigors of an enterprise SaaS platform.

## Colors

The palette is anchored by a sophisticated **Amber Primary**, evoking the Spanish sun and the concept of "energy." This is contrasted against a **Warm Beige** background to reduce eye strain during frequent daily checks. 

Strict adherence to a "No-Purple" rule ensures the brand remains distinct from typical fintech or tech-heavy SaaS competitors. **Success Emerald** is used purposefully for "Green Energy" metrics and active status indicators. The neutral palette is deeply desaturated to ensure the primary amber and success green remain the functional focal points of the interface.

## Typography

This design system utilizes a dual-font strategy. **Public Sans** provides a sturdy, institutional authority for headings, ensuring that data points and section titles feel permanent and reliable. **Inter** is used for all functional body text and interface labels to ensure maximum legibility at small sizes, particularly for technical energy metrics (kWh, €, CO2).

Spanish language considerations: Line heights are slightly increased to accommodate the frequent use of ascenders/descenders and longer word lengths typical in Spanish translations. Display styles use an extra-bold weight (800) to create a clear visual hierarchy against dense data tables.

## Layout & Spacing

The layout follows a **Fluid Grid** model optimized for mobile viewport widths first. A strict 8px base unit (the "Aura Flow") governs all padding and margin decisions. 

- **Mobile:** A 4-column layout with 16px outer margins and 16px gutters.
- **Desktop:** A 12-column layout with a maximum container width of 1280px.
- **Vertical Rhythm:** Components are stacked using 8px increments. Large content blocks (cards) use 24px of vertical separation to maintain a sense of "air" and premium quality.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layering** combined with soft, ambient shadows. Because the background is a warm beige (#FAFAFA), pure white (#FFFFFF) surfaces naturally "pop" forward without requiring heavy borders.

Shadows are extremely subtle: `0 2px 12px rgba(0,0,0,0.06)`. This creates a sense of "soft elevation," where cards appear to be resting just millimeters above the surface. Avoid using shadows for smaller elements like buttons or chips; instead, use slight shifts in background brightness or 1px strokes in the primary accent color to indicate interactivity.

## Shapes

The shape language is "Organic Geometric." While the system is rooted in a logical grid, the corners are generous to evoke friendliness and modern SaaS sensibilities. 

There is a purposeful hierarchy in rounding:
- **Major Containers (Cards):** 16px radius to create a soft, framing effect for data.
- **Interactive Elements (Buttons):** 12px radius to provide a distinct "clicky" feel.
- **Form Elements (Inputs):** 8px radius to maintain a professional, structured look for data entry.

## Components

### Buttons
Primary buttons use the Amber (#E8913A) background with White text and a 12px radius. Secondary buttons should use a ghost style with a 1px border of `rgba(0,0,0,0.06)` or the Primary Accent color.

### Cards
All content modules must be housed in White (#FFFFFF) cards with a 16px radius and the signature soft shadow. Cards should never have a visible border unless they are in a "Selected" or "Active" state, in which case a 2px Amber stroke is applied internally.

### Input Fields
Inputs use the 8px radius and a light gray border. Focus states must transition the border to the Primary Amber with a subtle outer glow of the same color at 10% opacity.

### Chips & Badges
For status indicators (e.g., "Activo," "Ahorrando"), use highly rounded (pill-shaped) badges. Success badges use Emerald Green (#10B981) at 10% opacity for the background and 100% opacity for the text.

### Progress Bars
Energy usage bars should use a rounded track. Use the Amber Primary for standard consumption and the Success Emerald when usage is below the set threshold. Avoid red unless indicating a critical system failure.
