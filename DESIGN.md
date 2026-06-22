# Tramo — Design System

A clean B2B visual system. White canvas + charcoal data + single green accent. ReflexAI/Linear-inspired editorial-industrial.

## Colours

### Core palette
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FAFAFA` | Page background |
| `--color-white` | `#FFFFFF` | Card surface |
| `--color-dark` | `#1A1A2E` | Headlines, body text |
| `--color-gray` | `#6B7280` | Secondary text |
| `--color-gray-light` | `#9CA3AF` | Tertiary / muted text |
| `--color-border` | `#E5E7EB` | Main border |
| `--color-border-light` | `#F3F4F6` | Subtle border |

### Primary accent
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | `#0F7B5A` | Primary green |
| `--color-primary-hover` | `#0C6348` | Button hover |
| `--color-primary-active` | `#0A5238` | Active state |
| `--color-primary-subtle` | `#EBF5F0` | Subtle background |

### Status
| Token | Value |
|-------|-------|
| Success | `oklch(58% 0.16 155)` |
| Warning | `oklch(52% 0.13 64)` |
| Danger | `oklch(58% 0.22 29)` |
| Info | `oklch(58% 0.16 260)` |
| Teal | `oklch(66% 0.13 190)` |

### Gradients
- Hero wash: `linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)`
- Isometric: same wash

## Typography

| Role | Font |
|------|------|
| Display | `DM Sans`, ui-sans-serif, system-ui |
| Body | `system-ui`, "Segoe UI", "Aptos", sans-serif |
| Mono / data | `JetBrains Mono`, "Cascadia Mono", ui-monospace |

**DO NOT USE:** Inter, Plus Jakarta Sans, Poppins, or any decorative display font outside DM Sans.

### Type scale
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `--text-display` | `clamp(2.75rem, 5vw+1rem, 4.75rem)` | 700 | Hero heading |
| `--text-4xl` | 3.75rem | 700 | Section headings |
| `--text-3xl` | 3rem | 600 | Sub-sections |
| `--text-2xl` | 2.25rem | 600 | Feature titles |
| `--text-xl` | 1.5rem | 600 | Card headings |
| `--text-lg` | 1.25rem | 500 | Sub-headings |
| `--text-base` | 1rem | 400 | Body |
| `--text-sm` | 0.875rem | 400 | Caption |
| `--text-xs` | 0.8125rem | 500 | Labels |
| `--text-md` | 1.125rem | 400 | Lead body |

## Radii

| Token | Value |
|-------|-------|
| `--radius-sm` | 4px |
| `--radius-md` | 8px |
| `--radius-lg` | 16px |
| `--radius-pill` | 9999px |

All radii are tight and industrial. No decorative border-radius > 16px.

## Shadows
All shadows are explicitly `none`. Tramo does not use box-shadows. Elevation is communicated through border weight and background tint.

## Spacing scale
| Token | Rem |
|-------|-----|
| `--space-3xs` | 0.5rem |
| `--space-2xs` | 1rem |
| `--space-xs` | 1.5rem |
| `--space-sm` | 2rem |
| `--space-md` | 2.5rem |
| `--space-lg` | 3rem |
| `--space-xl` | 4rem |
| `--space-2xl` | 5.5rem |
| `--space-3xl` | 7.5rem |

## Motion
| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in` | `cubic-bezier(0.7, 0, 0.84, 0)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-micro` | 120ms |
| `--dur-short` | 220ms |
| `--dur-long` | 420ms |

## Layout
- Page max width: 1200px (`--page-max`)
- No box-shadows on cards; use 1px solid `--color-border`
- Narrow gutters, dense data presentation when appropriate
- Tabular numbers for all KPI/metric displays

## Components (tokens only — see code for implementation)
- **Status badges**: Soft background + coloured border + text, small radius
- **CTA buttons**: Primary `#0F7B5A` fill, white text, `--radius-sm`
- **Metric cards**: White surface, 1px border, DM Sans heading
- **Charts**: Grid lines in `oklch(88% 0.005 30)`, tick labels in `oklch(55% 0.005 30)`
