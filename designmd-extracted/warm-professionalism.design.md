<!-- Extracted from stitch-v3-response.json -->
---
name: Warm Professionalism
colors:
  surface: '#f7fbf0'
  surface-dim: '#d7dbd2'
  surface-bright: '#f7fbf0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5eb'
  surface-container: '#ebefe5'
  surface-container-high: '#e5eadf'
  surface-container-highest: '#e0e4da'
  on-surface: '#181d17'
  on-surface-variant: '#40493d'
  inverse-surface: '#2d322b'
  inverse-on-surface: '#eef2e8'
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
  tertiary: '#923357'
  on-tertiary: '#ffffff'
  tertiary-container: '#b14b6f'
  on-tertiary-container: '#ffedf0'
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
  tertiary-fixed: '#ffd9e2'
  tertiary-fixed-dim: '#ffb1c7'
  on-tertiary-fixed: '#3f001c'
  on-tertiary-fixed-variant: '#7f2448'
  background: '#f7fbf0'
  on-background: '#181d17'
  surface-variant: '#e0e4da'
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  data-lg:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  data-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container_max: 1280px
  page_padding: 24px
  gap_md: 16px
  gap_lg: 24px
  stack_sm: 8px
  stack_xs: 4px
---

## Brand & Style

The design system is anchored in the concept of "Warm Professionalism." It moves away from the clinical, cold aesthetics often found in technical utility software, opting instead for a welcoming yet authoritative presence. The target audience includes energy managers, community administrators, and residential users who require high-density data visualization without the accompanying cognitive fatigue.

The style is a blend of **Modern Corporate** and **Minimalism**. It prioritizes clarity through generous white space and a soft color palette, ensuring the platform feels like a helpful assistant rather than a complex control panel. The emotional response is one of reliability, sustainability, and approachability.

## Colors

This design system utilizes a high-utility color palette designed for rapid categorization. 

- **Foundation:** A warm grey background (`#FAFAFA`) prevents screen glare, while pure white cards (`#FFFFFF`) create clear visual containment.
- **Brand Essence:** Forest Green serves as the primary driver, symbolizing sustainability and growth.
- **Functional Specificity:** Specific hues are reserved for entity types—Blue for Fincas, Warm Orange for Apartamentos, and Soft Purple for Arbitraxe—allowing users to orient themselves instantly within the data hierarchy.
- **Status:** Amber is used exclusively for alerts and secondary warnings, while traditional Green and Red handle success and error states respectively.

## Typography

The typography strategy employs a dual-font system to balance personality with utility. 

**Plus Jakarta Sans** is used for headings to provide a friendly, modern "voice." **Inter** is the workhorse for body copy and UI labels, chosen for its exceptional legibility at small sizes. For all numerical data, energy readings, and financial figures, **Space Grotesk** (or Inter with `tabular-nums` enabled) is mandated to ensure vertical alignment in tables and dashboards.

Maintain a strict hierarchy where headings use SemiBold or Bold weights to anchor the page, while body text stays within Regular and Medium weights to maintain a clean, airy feel.

## Layout & Spacing

The design system follows a **Fixed Grid** model centered within the viewport. The layout is structured around a 1280px maximum width container to ensure readability on wide monitors.

- **Grid:** A 12-column grid system is used for dashboard layouts.
- **Rhythm:** An 8px base unit drives all spacing. 
- **Gaps:** Use 24px (gap-lg) for major section spacing and 16px (gap-md) for internal card components. 
- **Padding:** Global page margins are set to 24px to provide a generous breathing room from the browser edge.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and subtle **Ambient Shadows**. This approach avoids the heaviness of traditional skueomorphism while providing clear "clickability" cues.

- **Level 0 (Background):** `#FAFAFA` — The lowest layer.
- **Level 1 (Cards/Surfaces):** `#FFFFFF` with `shadow-sm` (0 1px 3px rgba(0,0,0,0.05)). This is the primary container for content.
- **Level 2 (Interactive/Hover):** `#FFFFFF` with `shadow-md` (0 4px 6px rgba(0,0,0,0.07)). Used when a user interacts with a card or element.
- **Borders:** A 1px solid border of `#E0E0E0` is applied to all cards and input fields to ensure definition against the light background, even on lower-quality displays.

## Shapes

The shape language is "Rounded," striking a balance between the friendliness of organic curves and the precision of a professional tool. 

- **Primary Containers:** Large surfaces and dashboard cards use a 12px (`rounded-lg`) radius.
- **Interactive Elements:** Buttons, input fields, and checkboxes use a tighter 8px (`rounded-md`) radius to feel more precise and actionable.
- **Indicators:** Status badges and tags may use a fully rounded "pill" shape (999px) to distinguish them from interactive buttons.

## Components

The components within the design system prioritize ease of use and accessibility.

- **Buttons:**
  - *Primary:* Solid Forest Green (`#2E7D32`) with white text. 8px radius.
  - *Secondary:* Ghost style with Forest Green border and text.
- **Input Fields:** 1px `#E0E0E0` border, 8px radius, Inter Regular 14px text. Focus state uses a 2px Cyan (`#00ACC1`) ring.
- **Cards:** White background, 12px radius, 1px border, and `shadow-sm`. Content inside cards should follow the 16px gap rule.
- **Chips/Badges:** Small, 12px Inter Medium text. Use background tints (10% opacity of the category color) with 100% opacity text for the "Fincas", "Apartamentos", and "Arbitraxe" labels.
- **Icons:** Phosphor Icons used at 20px or 24px, maintaining a consistent 1.5px stroke weight to match the professional weight of the typography.
- **Data Visualizations:** Charts should utilize the Tech/Accent Cyan for single-line metrics and the category colors for multi-series comparisons.
