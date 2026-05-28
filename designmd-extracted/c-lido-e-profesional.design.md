<!-- Extracted from stitch-friendly-response-2.json -->
---
name: Cálido e Profesional
colors:
  surface: '#19120a'
  surface-dim: '#19120a'
  surface-bright: '#40382e'
  surface-container-lowest: '#130d06'
  surface-container-low: '#211a12'
  surface-container: '#251e16'
  surface-container-high: '#302920'
  surface-container-highest: '#3c332a'
  on-surface: '#eee0d2'
  on-surface-variant: '#d7c3ae'
  inverse-surface: '#eee0d2'
  inverse-on-surface: '#372f26'
  outline: '#9f8e7a'
  outline-variant: '#524534'
  surface-tint: '#ffb955'
  primary: '#ffc880'
  on-primary: '#452b00'
  primary-container: '#f5a623'
  on-primary-container: '#644000'
  inverse-primary: '#835500'
  secondary: '#a2c9ff'
  on-secondary: '#00315b'
  secondary-container: '#036ab8'
  on-secondary-container: '#dce9ff'
  tertiary: '#9bd9ff'
  on-tertiary: '#00344a'
  tertiary-container: '#3ac2ff'
  on-tertiary-container: '#004d6a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffddb4'
  primary-fixed-dim: '#ffb955'
  on-primary-fixed: '#291800'
  on-primary-fixed-variant: '#633f00'
  secondary-fixed: '#d3e4ff'
  secondary-fixed-dim: '#a2c9ff'
  on-secondary-fixed: '#001c38'
  on-secondary-fixed-variant: '#004881'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7cd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#19120a'
  on-background: '#eee0d2'
  surface-variant: '#3c332a'
typography:
  greeting:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '300'
    lineHeight: '1.2'
  h1:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: '1.4'
  h2:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.5'
  body:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  metrics:
    fontFamily: IBM Plex Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.1'
  label-mono:
    fontFamily: IBM Plex Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  grid_columns: '12'
  gutter: 24px
  margin: 32px
---

## Brand & Style

The design system is anchored in the concept of "Humanizing Energy." It balances the technical precision required for energy management with a welcoming, approachable aesthetic tailored for property managers in the Spanish market. By moving away from cold, clinical blues and stark blacks, the system employs a warm dark mode that feels more like a premium lounge than a traditional utility dashboard.

The visual style is a blend of **Modern Corporate** and **Tactile Minimalism**. It prioritizes clarity and density of information while using soft geometry and conversational language to reduce the cognitive load often associated with complex data. Native emojis are used intentionally as icons to reinforce a friendly, non-corporate atmosphere, making the software feel like a helpful assistant rather than a rigid tool.

## Colors

The color palette is built on a foundation of "Warm Obsidian." The primary background surfaces use deep charcoals with subtle brown and violet undertones to prevent eye strain and create a sophisticated atmosphere. 

**Solar Amber** serves as the primary action color, symbolizing energy and vitality. It is supported by a spectrum of semantic colors: **Trust Blue** for stability, **Arbitrage Violet** for specialized financial energy moves, and a soft, desaturated set of status colors (Success, Warning, Error) that harmonize with the dark background without appearing overly aggressive. All text follows a warm-white to taupe-grey scale to ensure high legibility while maintaining the "Cálido" brand promise.

## Typography

The typographic system utilizes a dual-font approach. **Inter** handles the majority of the interface, chosen for its exceptional readability in digital environments and its neutral yet modern character. 

For all numerical data, energy readings, and financial metrics, **IBM Plex Mono** is employed. This creates a clear visual distinction between descriptive text and hard data, lending an air of technical precision to the property manager's workflow. The type scale features a light "Greeting" style for personalized dashboard headers and a bold "Metrics" style to highlight the most critical energy consumption figures.

## Layout & Spacing

This design system utilizes a **Fluid Grid** model with a 12-column structure for main dashboard views. The spacing rhythm is based on a 4px baseline, ensuring all elements align to a consistent vertical and horizontal cadence.

- **Margins & Gutters:** Large 32px outer margins provide breathable space around the main content container, while 24px gutters separate dashboard cards.
- **Content Density:** While the overall layout is spacious, internal card padding should remain tight (16px to 24px) to allow for the display of complex energy charts and lists without excessive scrolling.
- **Information Hierarchy:** Use `spacing-lg` (24px) to separate distinct sections of the dashboard and `spacing-sm` (12px) for grouping related inputs or labels.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than traditional drop shadows. By using a series of progressively lighter background fills, the system creates a sense of physical stacking:

1.  **Level 0 (Main Background):** The furthest back layer (#1A1B23).
2.  **Level 1 (Sidebar/Navigation):** Slightly darker (#16171E) to recede and anchor the screen.
3.  **Level 2 (Cards/Modules):** The primary interactive surface (#22232E), appearing closer to the user.
4.  **Level 3 (Hover/Active):** Subtle lift through color shifts (#292A37).

Borders are used sparingly and with low contrast (#2E3040) to define boundaries without adding visual noise. Shadows, when used for modals, should be extra-diffused with a slight amber tint to maintain the "warm" theme.

## Shapes

The shape language is "Friendly & Organic." High corner radii are applied across all UI elements to soften the interface and make the data feel more accessible.

- **Cards:** The 16px radius is the signature of the system, providing a distinct, containerized look for data modules.
- **Interactive Elements:** Buttons (12px) and Inputs (10px) use slightly smaller radii to maintain a crisp feel while remaining cohesive with the larger containers.
- **Badges:** Always pill-shaped (fully rounded) to differentiate status indicators from buttons or other interactive components.

## Components

### Buttons
Primary buttons utilize the **Solar Amber** fill with dark text. Secondary buttons use a soft border (#2E3040) with warm-white text. All buttons have a height of 44px for a comfortable touch target and a 12px radius.

### Cards
Cards are the primary organizational unit. They should always have a 16px radius, a background color of #22232E, and no border unless in a hover state (#3D3F52). 

### Inputs & Selects
Inputs use a darker background (#2A2B38) with a 10px radius. The placeholder text uses the `Muted` color (#6B6873). On focus, the border should transition to **Primary Light** (#FFD180).

### Badges & Status
Badges are used for grid status (e.g., "Active", "Feeding to Grid"). Use the pill shape with a low-opacity background tint of the semantic color (Success, Warning, etc.) and a full-opacity text label.

### Icons (Emoji Integration)
Instead of a custom icon set, use native system emojis. They should be placed at the start of headers or inside badges to add a conversational, human touch (e.g., ☀️ for Solar, 🔋 for Battery, 📉 for Savings).

### Metric Displays
Combine an emoji icon, a `label-mono` title, and a large `metrics` value (IBM Plex Mono). This creates a "Data Tile" that is the hallmark of the property management view.
