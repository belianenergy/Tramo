<!-- Extracted from stitch-landing-restro-aura-relay-v1-complete-edit-response.json -->
---
name: Restro Aura
colors:
  surface: '#f8faf3'
  surface-dim: '#d9dbd4'
  surface-bright: '#f8faf3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4ed'
  surface-container: '#edefe8'
  surface-container-high: '#e7e9e2'
  surface-container-highest: '#e1e3dc'
  on-surface: '#191c18'
  on-surface-variant: '#434843'
  inverse-surface: '#2e312d'
  inverse-on-surface: '#eff2eb'
  outline: '#737873'
  outline-variant: '#c3c8c1'
  surface-tint: '#4f6355'
  primary: '#010f06'
  on-primary: '#ffffff'
  primary-container: '#14261b'
  on-primary-container: '#7a8e7f'
  inverse-primary: '#b6ccbb'
  secondary: '#436833'
  on-secondary: '#ffffff'
  secondary-container: '#c1eca9'
  on-secondary-container: '#476c37'
  tertiary: '#070f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#172700'
  on-tertiary-container: '#6b9721'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e8d6'
  primary-fixed-dim: '#b6ccbb'
  on-primary-fixed: '#0d1f15'
  on-primary-fixed-variant: '#384b3e'
  secondary-fixed: '#c4efac'
  secondary-fixed-dim: '#a8d292'
  on-secondary-fixed: '#052100'
  on-secondary-fixed-variant: '#2c4f1d'
  tertiary-fixed: '#c1f273'
  tertiary-fixed-dim: '#a6d65a'
  on-tertiary-fixed: '#121f00'
  on-tertiary-fixed-variant: '#334f00'
  background: '#f8faf3'
  on-background: '#191c18'
  surface-variant: '#e1e3dc'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-mono:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-mono-sm:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
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
  lg: 48px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

The design system is a sophisticated fusion of mid-century operational aesthetics and modern environmental technology. It evokes the feeling of a high-end, tactile dashboard—reliable, calm, and architectural. The aesthetic moves away from digital weightlessness toward a "Restro" approach: modularity, structural integrity, and warm, paper-like surfaces. 

The target audience consists of energy professionals and conscious consumers who value precision without the stress of typical "tech" interfaces. The emotional response is one of controlled efficiency and environmental stewardship. The style is **Corporate / Modern** with a **Tactile** emphasis, utilizing large-scale geometry and generous whitespace to create a sense of breathing room within complex data environments.

## Colors

The palette is rooted in "Aura-inspired" greens, prioritizing low-strain observation.
- **Surface Strategy:** The primary interface lives on `Soft Green Paper` (#F5F7F0). Use `Sage Tones` (#E8EFE5) for secondary containers and `Deep Forest` (#1F3A2A) for high-impact cinematic sections or dark-mode hero components.
- **Action & Data:** The `Primary Ink` (#14261B) provides maximum legibility for text. `Sage Green` (#7EA66A) acts as the primary brand accent, while `Lime Green` (#B7E86A) is reserved for small, high-priority functional triggers (e.g., "Active" states).
- **Technical Layers:** Use `Secondary Blue-Green` (#5DAA9B) exclusively for data visualization and energy flow charts to differentiate from UI chrome. `Warning Amber` (#F59E0B) is used sparingly for alerts, ensuring it commands immediate attention against the green-heavy environment.

## Typography

This design system employs a dual-typeface system to balance modern friendliness with technical precision.
- **Plus Jakarta Sans:** Used for all primary communication, headlines, and body copy. It provides a geometric, approachable feel that aligns with the "Restro" architectural vibe.
- **Space Mono:** Used for all technical labels, energy values, timestamps, and data-heavy readouts. This creates a clear visual distinction between "instructional" text and "data" text, mimicking the look of physical dashboard readouts.
- **Scale:** Maintain large margins around headlines. Use uppercase for `label-mono` to enhance the "operational" aesthetic.

## Layout & Spacing

The layout philosophy is a **Fixed Grid** system that emphasizes structural hierarchy and modular containers. 
- **Grid:** A 12-column grid for desktop with 24px gutters. On mobile, transition to a 4-column grid with 16px margins.
- **Rhythm:** All spacing must be a multiple of 8px. Use 48px or 64px gaps between major sections to reinforce the "calm" brand pillar.
- **Modular Cards:** Content should be grouped into large, distinct cards. Avoid cramming information; if a card feels crowded, increase its size or move secondary data to a sub-tab.

## Elevation & Depth

This design system rejects digital trends like glassmorphism and soft shadows in favor of **Tonal Layers** and **Low-Contrast Outlines**.
- **Depth Hierarchy:** Level 0 is the `Soft Green Paper` background. Level 1 consists of large modular cards using `Sage Tones` or white with a 1px border (#D2DED0).
- **Borders:** Depth is defined by clean lines rather than shadows. Use the primary border color (#D2DED0) to define all interactive and container boundaries.
- **Dark Mode Depth:** In dark sections, use shifts in green saturation (Deep Forest to Sage) to show stacking, rather than using gray scales or black.

## Shapes

The shape language is a defining characteristic of this design system, using a "nested radius" logic.
- **Primary Containers (Cards):** Use a large, generous radius of **24px to 32px**. This creates the signature "Restro" modular look.
- **UI Components:** Buttons, input fields, and selection chips use a tighter radius of **10px to 12px**.
- **Outer vs. Inner:** When an element sits inside a container, its corner radius should be roughly half that of the container to maintain visual harmony. 
- **Strict Adherence:** No sharp 0px corners are permitted; every element must feel approachable and "machined."

## Components

- **Buttons:** Solid fills using #7EA66A (Sage) for primary actions. Text should be high-contrast (Primary Ink). For secondary actions, use an outlined style with #D2DED0.
- **Inputs:** Backgrounds should be slightly lighter than the surrounding card. Use #14261B for the cursor and typed text. 12px corner radius.
- **Cards:** The workhorse of the system. Large (24px-32px radius), with 24px-32px internal padding. Labels inside cards should always use the Monospace font.
- **Status Chips:** Use small, pill-shaped indicators. An "Active" state uses the #B7E86A (Lime) fill with #14261B text.
- **Data Visuals:** Charts should use the #5DAA9B (Blue-Green) as the primary data line. Avoid multi-color rainbows; use shades and tints of the core green/teal palette for differentiation.
- **Toggle Switches:** Tactile, rounded switches that mimic physical dashboard toggles, using high-contrast green for the "on" position.
