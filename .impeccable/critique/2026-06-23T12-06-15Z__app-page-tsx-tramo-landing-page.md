---
target: Tramo landing page (app/page.tsx) + precios + dashboard
total_score: 72
p0_count: 2
p1_count: 3
timestamp: 2026-06-23T12-06-15Z
slug: app-page-tsx-tramo-landing-page
---
# Tramo Landing Page — Critique (Commit 1dbdb32)

## Design Health Score: 72/100

## Nielsen Heuristics

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | GSAP animations reveal content but no loading indicators |
| 2 | Match System / Real World | 4 | Clear Spanish copy, domain-appropriate energy terminology |
| 3 | User Control and Freedom | 2 | No back-to-top; mobile CTA fixed overlaps content |
| 4 | Consistency and Standards | 3 | Card patterns consistent but eyebrow-on-every-section is the AI tell |
| 5 | Error Prevention | 2 | Form has no labels, only placeholders; no client-side validation shown |
| 6 | Recognition Rather Than Recall | 3 | Visual energy dashboard helps, but microtext requires squinting |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts; nav is limited to scroll-and-click |
| 8 | Aesthetic and Minimalist Design | 3 | Clean aesthetic but identical card grids reduce variety |
| 9 | Error Recovery | 2 | Diagnostic form has fallback mailto: but no inline field validation |
| 10 | Help and Documentation | 2 | No inline help; FAQ is generic |
| **Total** | | **26/40** | **Needs polish** |

## Anti-Patterns Verdict

**Does not scream "AI made this"** — the overall aesthetic is well-considered with intentional color choices, custom SVG, and genuine product differentiation. However, several second-order tells remain:
- Every section header uses the "eyebrow" pattern (uppercase tracked label above heading)
- Problem and decision cards are identical (icon + heading + body), color-only differentiation
- How-it-works steps use the numbered 01/02/03 pattern (legitimate here as it IS a sequence)

**Detector scan:** Clean — 0 findings on all scanned files.

## Priority Issues

### P0 — Form inputs lack `<label>` elements (accessibility violation)
- File: `app/page.tsx` lines 708-734, `<DiagnosticForm>` component
- 4 inputs use only placeholder attributes, no `<label>` elements
- Placeholders disappear on type; contrast is too low
- Fix: Add `<label htmlFor="...">` for each field, increase placeholder contrast

### P0 — Microtext illegibility in hero dashboard visual
- File: `app/page.tsx` lines 237-298
- Labels at 8-9px ("CLIMA", "TV", "COCINA", energy values) are too small
- On mobile these become completely unreadable
- Fix: increase minimum label size to 11px, simplify mobile version

### P1 — Eyebrow/kicker on every section heading
- File: `app/page.tsx` — SectionHeading component (line 37) with `eyebrow` prop
- "CÓMO FUNCIONA", "El problema", "Diagnóstico gratuito", "Flujo técnico · demo" — 4 separate eyebrow instances
- Per impeccable skill: "an eyebrow on every section is AI grammar"
- Fix: Keep only the most important one (e.g., "Diagnóstico gratuito" on the CTA form); remove or restyle the rest

### P1 — Identical card grids (icon + heading + body) reduce visual variety
- File: `app/page.tsx` — problems grid (lines 490-515) and decisions grid (lines 527-545)
- 4 problem cards and 3 decision cards follow the exact same template, only colors differ
- Per impeccable: "identical card grids with icon + heading + text, repeated endlessly"
- Fix: Vary card structure — some could be stat-focused, others testimonial or data-visual

### P1 — Body text contrast borderline
- File: `app/globals.css` — `--color-gray: #6B7280` on `--color-bg: #FAFAFA`
- Ratio ~4.5:1 which is the minimum AA threshold
- Many card descriptions use even lighter gray values
- Fix: Darken body text to #4B5563 or darker; ensure all secondary text passes 4.5:1

### P2 — Pricing cards lack CTA alignment
- File: `app/page.tsx` lines 560-641
- CTA buttons at different vertical positions due to varying feature list lengths
- Fix: Use flex-grow on feature list to push CTAs to same baseline

### P2 — letterSpacing below -0.04em floor on step numbers
- File: `app/page.tsx` line 423: `tracking-[-0.06em]` on step numbers (01, 02, 03)
- Per impeccable: "Display letter-spacing ≥ -0.04em. -0.06em makes letters touch"
- Fix: Change to -0.03em or -0.04em

### P2 — overflowWrap: 'anywhere' masks but doesn't fix overflow
- File: `app/page.tsx` lines 48, 328, 975 — overflowWrap pattern on headings
- This breaks word breaking at inappropriate points instead of fixing container width / font size
- Fix: Use `overflow-wrap: break-word` or reduce heading clamp max at smaller breakpoints

### P2 — Glassmorphism panels might feel dated on hardware section
- File: `app/page.tsx` lines 790, 801 — `backdrop-blur-sm` on decorative panels
- Per impeccable product register: "Glassmorphism as default" is banned
- Fix: Replace with solid light backgrounds or gradient fills
