<!-- Extracted from stitch-arbitrage-response.json -->
---
name: Iberia Precision
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#414844'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#717973'
  outline-variant: '#c1c8c2'
  surface-tint: '#3f6653'
  primary: '#012d1d'
  on-primary: '#ffffff'
  primary-container: '#1b4332'
  on-primary-container: '#86af99'
  inverse-primary: '#a5d0b9'
  secondary: '#7c572d'
  on-secondary: '#ffffff'
  secondary-container: '#fecb97'
  on-secondary-container: '#79542a'
  tertiary: '#242439'
  on-tertiary: '#ffffff'
  tertiary-container: '#3a3a50'
  on-tertiary-container: '#a5a4be'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c1ecd4'
  primary-fixed-dim: '#a5d0b9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#274e3d'
  secondary-fixed: '#ffdcbc'
  secondary-fixed-dim: '#efbd8a'
  on-secondary-fixed: '#2c1700'
  on-secondary-fixed-variant: '#614018'
  tertiary-fixed: '#e2e0fc'
  tertiary-fixed-dim: '#c6c4df'
  on-tertiary-fixed: '#1a1a2e'
  on-tertiary-fixed-variant: '#45455b'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2df'
typography:
  display-metrics:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
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
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  button:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is engineered for the sophisticated Spanish B2B energy sector, blending the reliability of high-end financial institutions with the forward-thinking nature of sustainable energy management. The brand personality is authoritative yet approachable, utilizing a **Modern Corporate** style that emphasizes clarity, efficiency, and premium craftsmanship. 

The aesthetic avoids common SaaS tropes in favor of a "Physicality in Digital" approach—where elements feel like high-quality stationary or physical dashboard hardware. The target audience includes energy managers and C-suite executives who require rapid data interpretation without sacrificing elegance. The emotional response should be one of "Controlled Power": the feeling that complex energy grids are being managed with surgical precision and absolute transparency.

## Colors

The palette is anchored in a deep forest green (*Verde Bosque*), conveying stability and environmental stewardship. This is contrasted by a warm amber (*Ámbar Solar*) used sparingly for accents, call-to-actions, and highlights to evoke a sense of value and energy. 

The background uses a warm off-white/sand tone to reduce eye strain and provide a more "organic" feel than pure white or cold grays. All data-heavy text utilizes a deep navy-charcoal to ensure maximum contrast and legibility. Semantic colors for success and warning are slightly desaturated to maintain the professional, sophisticated tone of the platform.

## Typography

This design system leverages **Plus Jakarta Sans** for its exceptional balance between geometric modernism and humanist warmth. 

A specific "Display Metrics" style is established for numerical data (kWh, Costs, Efficiency ratings), using bold weights and tight letter-spacing to command attention. Hierarchy is strictly maintained through clear scale differences. Long-form reports should use `body-md` for optimal readability, while `label-caps` is reserved for table headers (*Cabeceras*) and small metadata. All Spanish character sets, including tildes and the "ñ," are rendered with generous vertical line height to ensure clarity in technical descriptions.

## Layout & Spacing

The layout utilizes a **12-column fixed grid** for desktop environments to maintain a "contained" and organized feel, typical of financial terminals. On larger screens, the content remains centered with a max-width of 1440px.

Spacing is generous, following an 8px linear scale. We prioritize "breathable" layouts where information density is managed through white space rather than lines. Groupings of related data (e.g., *Consumo Mensual*) are separated by `lg` spacing, while internal card padding is strictly set to `md` (24px) to ensure content never feels cramped.

## Elevation & Depth

Depth is achieved through **Ambient Shadows** and tonal layering. Since the background is a warm off-white (#F8F7F4), elevation is signaled by pure white (#FFFFFF) cards that appear to lift slightly off the surface.

Shadows are never pure black; they are tinted with a hint of the primary forest green and the warm amber to create a "glow" effect rather than a "drop" effect. 
- **Low Elevation:** Used for cards and secondary inputs. 4px blur, 2% opacity green-tinted shadow.
- **High Elevation:** Used for modals (*Ventanas emergentes*) and dropdowns. 20px blur, 8% opacity warm-tinted shadow.
- **Interactions:** Hover states on interactive cards should see an increase in shadow spread and a subtle upward shift, simulating a physical lift.

## Shapes

The shape language is defined by a consistent **16px radius** (`rounded-lg`) for all primary containers, cards, and large buttons. This curvature provides a sophisticated, modern feel that softens the "industrial" nature of energy data.

Smaller elements like chips (*Etiquetas*) and checkboxes utilize a 4px or 8px radius to maintain structural integrity at scale. High-priority action buttons may occasionally use a pill-shape (3) to distinguish them from data-entry fields, but the core identity remains rooted in the 16px soft-rectangle.

## Components

### Buttons (Botones)
- **Primary:** Solid `#1B4332` with white text. 16px radius. High-end, authoritative.
- **Secondary:** Outlined with `#1B4332` or solid `#D4A574` for high-conversion moments.
- **Ghost:** No border, text-only, used for "Cancelar" or "Volver."

### Input Fields (Campos de Entrada)
- Background: `#FFFFFF`.
- Border: 1px solid `#E5E7EB`.
- Focus State: 2px solid `#D4A574` (Amber) to clearly indicate activity.
- Labels: Always visible, never just placeholders, using `body-sm` weight 600.

### Cards (Tarjetas de Datos)
- Background: `#FFFFFF`.
- Padding: 24px.
- Radius: 16px.
- Content: Large bold metrics at the top-left, followed by descriptive labels in Spanish.

### Data Visualization
- **Charts:** Use a palette of Forest Green, Amber, and Emerald for positive trends. Use the Navy for axes and grid lines.
- **Status Chips:** Small, rounded-md backgrounds with low-opacity fills of Success/Warning colors and dark text (e.g., "Activo", "Pendiente").

### Additional Components
- **Metric Tiles:** Large-format cards specifically for "Ahorro Total" or "Consumo Actual," featuring the `display-metrics` typography.
- **Date Range Picker:** A premium, custom-styled calendar component for selecting fiscal periods.
