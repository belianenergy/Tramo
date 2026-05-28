<!-- Extracted from stitch-landing-aura-v4-response.json -->
---
name: Iberian Resource Management
colors:
  surface: '#fbf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#fbf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f1'
  surface-container: '#efedec'
  surface-container-high: '#eae8e6'
  surface-container-highest: '#e4e2e0'
  on-surface: '#1b1c1b'
  on-surface-variant: '#434844'
  inverse-surface: '#30302f'
  inverse-on-surface: '#f2f0ee'
  outline: '#737873'
  outline-variant: '#c3c8c2'
  surface-tint: '#526257'
  primary: '#17251c'
  on-primary: '#ffffff'
  primary-container: '#2c3b31'
  on-primary-container: '#94a598'
  inverse-primary: '#bacbbd'
  secondary: '#44664a'
  on-secondary: '#ffffff'
  secondary-container: '#c3e9c5'
  on-secondary-container: '#486a4e'
  tertiary: '#1d2421'
  on-tertiary: '#ffffff'
  tertiary-container: '#333936'
  on-tertiary-container: '#9ca29f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e7d8'
  primary-fixed-dim: '#bacbbd'
  on-primary-fixed: '#101f16'
  on-primary-fixed-variant: '#3b4a40'
  secondary-fixed: '#c6ecc8'
  secondary-fixed-dim: '#aad0ad'
  on-secondary-fixed: '#00210b'
  on-secondary-fixed-variant: '#2d4e33'
  tertiary-fixed: '#dee4e0'
  tertiary-fixed-dim: '#c2c8c4'
  on-tertiary-fixed: '#171d1b'
  on-tertiary-fixed-variant: '#424845'
  background: '#fbf9f7'
  on-background: '#1b1c1b'
  surface-variant: '#e4e2e0'
typography:
  headline-xl:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
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
  data-display:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
  data-label:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-padding: 1.5rem
  section-gap: 5rem
  grid-gutter: 1.25rem
  inner-component-gap: 0.75rem
---

## Brand & Style
The design system embodies a "Restro" dashboard aesthetic—a sophisticated blend of high-end editorial elegance and technical industrial precision. It is designed for managers of premium tourist apartments in Spain, evoking a sense of calm authority, environmental stewardship, and effortless operational control.

The style leans into **Corporate Minimalism** with a **Tactile** edge. It avoids the fleeting trends of glassmorphism or neon accents, instead favoring a grounded palette of deep forest greens and warm paper-like neutrals. The interface should feel like a high-fidelity analog instrument digitized: clean, spacious, and extremely legible, with a focus on data storytelling through a structured Bento grid layout.

## Colors
The palette is rooted in the natural landscape of the Iberian peninsula, using deep greens and warm whites to create a professional yet inviting atmosphere.

- **Primary (#2C3B31):** A "Dark Forest Green" used for primary navigation, headings, and high-emphasis interactive elements. It provides the "authoritative" anchor of the brand.
- **Accent (#7A9E7E):** A "Sage Green" used for secondary actions, success states, and data visualizations. It represents efficiency and growth.
- **Background (#FBF9F7):** A "Warm White" that acts as the canvas, reducing eye strain and providing a more premium, "paper" feel than pure digital white.
- **Surface (#FFFFFF):** Reserved for card containers and inputs to create a clear "lift" from the background.
- **Data Gradients:** Visualizations should utilize a vertical fade from Primary or Accent colors to 0% opacity, ensuring charts feel integrated into the surface rather than sitting on top of it.

## Typography
The typographic hierarchy is a critical differentiator for the design system, balancing editorial grace with technical utility.

1.  **Playfair Display** is used for high-level page titles and section headers. It communicates luxury and prestige.
2.  **Inter** handles all long-form reading, UI labels, and instructions, ensuring maximum clarity and a modern functional feel.
3.  **JetBrains Mono** is strictly reserved for numerical data, metrics, and units. The monospaced nature allows for easy comparison of consumption figures and costs across rows, emphasizing the "OS" aspect of the product.

## Layout & Spacing
This design system utilizes a **Bento Grid** structure—a collection of modular cards of varying sizes that snap together to form a cohesive dashboard.

- **Grid Model:** A 12-column fluid grid on desktop, shifting to a 1-column layout on mobile. 
- **Section Spacing:** Large 80px (5rem) gaps between major functional blocks to allow the design to "breathe."
- **Internal Padding:** Cards and containers use a consistent 24px (1.5rem) internal padding.
- **Rhythm:** Spacing should be increments of 8px to maintain a strict mathematical harmony across the dashboard.

## Elevation & Depth
The design system avoids heavy drop shadows in favor of a **Tonal Layering** approach with soft, ambient occlusion.

- **Layer 0 (Background):** #FBF9F7 (Warm White).
- **Layer 1 (Cards/Surface):** #FFFFFF (Pure White) with a very soft, diffused shadow: `0px 4px 20px rgba(44, 59, 49, 0.05)`.
- **Interactions:** When a user hovers over a card, the elevation should subtly increase by shifting the shadow to `0px 10px 30px rgba(44, 59, 49, 0.08)`.
- **Depth:** No heavy borders are used; depth is created entirely through the contrast between the warm background and the white surfaces.

## Shapes
The shape language is friendly yet structured. All primary containers and dashboard cards utilize a **20px (1.25rem)** corner radius, creating a soft, approachable frame for the technical data within.

Small components like buttons and input fields should follow a slightly tighter radius (8px) to maintain a professional look, while the large "Bento" blocks carry the signature 20px curve.

## Components
Consistent component styling ensures the design system remains cohesive across complex data views:

- **Buttons:** Primary buttons use the Dark Forest Green (#2C3B31) with white Inter typography. Secondary buttons use a Sage Green outline. All buttons have a subtle 8px radius.
- **Cards (Bento Units):** The core of the UI. White background, 20px radius, 24px padding. They must always have a `Playfair Display` header in the top-left and a `JetBrains Mono` metric in the center or bottom-right.
- **Input Fields:** Soft warm-gray borders (#E2E8E4) that turn Sage Green on focus. Labels use `Inter` (Small, Bold).
- **Chips/Status Tags:** Use low-saturation background tints of the primary colors (e.g., a very light sage for 'Active') with dark text to maintain the "Restro" aesthetic.
- **Data Visualizations:** Line charts should use a 2px stroke width in Primary Green with a soft gradient fill beneath the line. Avoid grid lines where possible, or use very faint #E2E8E4 lines to keep the UI clean.
- **Lists:** Clean rows with 1px horizontal separators in #E2E8E4. Use `JetBrains Mono` for all right-aligned numerical values.
