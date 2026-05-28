<!-- Extracted from stitch-response-2.json -->
---
name: Lumina Grid
colors:
  surface: '#0f1511'
  surface-dim: '#0f1511'
  surface-bright: '#343b37'
  surface-container-lowest: '#0a0f0c'
  surface-container-low: '#171d19'
  surface-container: '#1b211d'
  surface-container-high: '#252b28'
  surface-container-highest: '#303632'
  on-surface: '#dee4de'
  on-surface-variant: '#bccac0'
  inverse-surface: '#dee4de'
  inverse-on-surface: '#2c322e'
  outline: '#87948b'
  outline-variant: '#3d4a42'
  surface-tint: '#68dba9'
  primary: '#68dba9'
  on-primary: '#003825'
  primary-container: '#25a475'
  on-primary-container: '#00311f'
  inverse-primary: '#006c4a'
  secondary: '#b7c8e1'
  on-secondary: '#213145'
  secondary-container: '#3a4a5f'
  on-secondary-container: '#a9bad3'
  tertiary: '#ffb3ae'
  on-tertiary: '#601214'
  tertiary-container: '#dd706b'
  on-tertiary-container: '#570b0e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#85f8c4'
  primary-fixed-dim: '#68dba9'
  on-primary-fixed: '#002114'
  on-primary-fixed-variant: '#005137'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#7f2928'
  background: '#0f1511'
  on-background: '#dee4de'
  surface-variant: '#303632'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Inter
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
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  mono-metric:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.02em
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
  xl: 32px
  gutter: 20px
  margin: 24px
---

## Brand & Style

The design system is engineered for high-stakes energy monitoring environments where precision and speed of interpretation are paramount. The brand personality is authoritative, sophisticated, and technologically advanced, evoking the feeling of a modern mission control center. 

The aesthetic leans into a **Corporate Modern** style with subtle **Minimalist** influences. It prioritizes data density without sacrificing legibility. Visual weight is managed through a strict hierarchy of slate tones, ensuring that the emerald green accents act as beacons for critical information and system health. The overall interface should feel "engineered"—every pixel serves a functional purpose in the pursuit of energy efficiency.

## Colors

The palette for this design system is rooted in a deep slate foundation to reduce eye strain during extended monitoring periods. 

- **Primary Emerald (#059669):** Reserved for primary actions, active energy flow states, and positive performance metrics.
- **Surface & Background:** The background uses a dark slate (#0f172a), while component surfaces use a slightly lighter slate (#1e293b) to create subtle depth.
- **Functional Grays:** Supporting grays (Slate 400-600) manage secondary information and structural borders, ensuring the UI remains cohesive and professional.
- **Semantic States:** Use a muted amber for warnings and a crisp red for critical grid failures, though these should be used sparingly to maintain the primary green's dominance.

## Typography

This design system utilizes the **Inter** font family exclusively to leverage its exceptional readability on high-resolution screens. 

The typographic scale is designed for rapid data scanning. **Headline** styles are tight and bold to define clear section breaks. **Body** text remains neutral to facilitate long-form data reading. A specialized **Label-caps** style is used for table headers and metadata to provide contrast against numerical data. For primary energy metrics, use a medium weight with tighter letter spacing to create a "digital readout" feel without resorting to a monospaced font.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model to accommodate the varied screen sizes of control room monitors and tablets. It uses a 12-column grid with a consistent 20px gutter.

Spacing is governed by a 4px base unit. Internal card padding should default to 24px (lg) to give complex charts room to breathe. Use 16px (md) spacing between dashboard widgets. High-density data tables may drop to 8px (sm) vertical padding to maximize information density on the "Y" axis.

## Elevation & Depth

Hierarchy is established using **Tonal Layers** combined with **Low-contrast Outlines**. Rather than aggressive shadows, this design system uses color-based depth:

1.  **Level 0 (Background):** #0f172a - The base canvas.
2.  **Level 1 (Cards/Panels):** #1e293b - Main containers, slightly elevated visually by a 1px border (#334155).
3.  **Level 2 (Popovers/Modals):** #334155 - Floating elements that use a subtle, 15% opacity black shadow with a 20px blur to indicate focus.

Interaction states (hover/active) should be signaled by increasing the border brightness or adding a faint inner glow using the primary emerald green color.

## Shapes

The shape language is **Soft (Level 1)**. This subtle rounding (4px for base elements, 8px for cards) softens the technical aesthetic just enough to feel modern and accessible while maintaining a professional, rigid structure. 

Buttons and input fields should strictly adhere to the 4px radius. Larger containers like dashboard widgets or sidebar navigations should use 8px to clearly define their boundaries against the background.

## Components

- **Buttons:** Primary buttons use a solid Emerald (#059669) fill with white text. Secondary buttons are ghost-style with a Slate-400 border.
- **Cards:** Dashboard widgets must have a 1px border (#334155) and a title area separated by a subtle horizontal rule.
- **Inputs:** Dark fills (#0f172a) with a 1px slate border. On focus, the border transitions to Emerald with a 2px outer glow.
- **Chips:** Used for status (e.g., "Grid Online"). They should use a low-opacity emerald background with high-opacity emerald text for a "glass" look.
- **Metrics/KPIs:** Large numerical displays should be accompanied by a small sparkline chart or a percentage change indicator.
- **Data Tables:** Row-based with alternating subtle backgrounds; borders are horizontal only to emphasize the flow of data.
- **Toggle Switches:** Small and refined, using the emerald color for the "on" state to signify active energy flow.
