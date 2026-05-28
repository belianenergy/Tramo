# Tramo Landing Page — Design Specification

Macrostructure: **Workbench** (Hallmark 05)
Visual DNA: **ReflexAI** (reflexai.com — beige paper, dark ink, teal accent, Clean B2B editorial)
Theme tokens: as defined in `app/globals.css` under `:root`

---

## Color Tokens (from globals.css — DO NOT change these)

```
--color-paper: #edede1          /* main background */
--color-surface: #ffffff        /* cards, frames */
--color-surface-alt: #f6f6ee    /* alternate surface */
--color-ink: #1a1a2e            /* primary text */
--color-muted: #5f665e          /* body/sub text */
--color-soft: #7a8078           /* lighter muted */
--color-border: #d9d9ca         /* hairline borders */
--color-border-strong: #c6c8b8  /* stronger borders */
--color-accent: #0d9488         /* teal accent — LINKS, BUTTONS, HIGHLIGHTS */
--color-accent-ink: #0f766e     /* darker teal for hover */
--color-accent-soft: #d7ece6    /* light teal tint for bg */
--color-warning: #b45309        /* amber — ONLY for warning/status badges, never brand */
--color-success: #059669        /* green — healthy/connected states */
--color-danger: #dc2626         /* red — error states */
```

## Typography

- **Display:** Cabinet Grotesk (headings, nav labels, button text) → via `var(--font-display)`
- **Body:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Mono:** JetBrains Mono (metrics, timestamps, CUPS codes, property codes)
- **Button text:** Display font, medium/semibold, 0.01em tracking, 14px
- **H1:** Display, 3.5rem–5rem clamp, leading 1.08, tracking -0.015em, weight 600-700
- **H2:** Display, 1.75rem–2.5rem clamp, leading 1.15, tracking -0.01em
- **H3:** Display, 1.25rem–1.75rem, leading 1.2
- **Body:** 1rem–1.1rem, leading 1.6, muted color
- **Labels:** Mono or Display uppercase, 0.15em tracking, 12px, semibold
- **Metrics large:** Mono, 3.5rem–5rem, tabular-nums, semibold, ink color

## Spacing & Layout

- **Max width container:** max-w-7xl (1280px) for wide sections, max-w-5xl for content sections
- **Section vertical padding:** py-24 md:py-32 for major sections
- **Section horizontal padding:** px-5
- **Card radius:** 12px–16px (rounded-xl or rounded-2xl)
- **Border style:** 1px solid var(--color-border), hairline
- **Gap between cards:** 1rem–1.5rem (gap-4 to gap-6)
- **Page gutters:** px-5 (20px mobile), max-w-7xl mx-auto

## UI Components (Reusable)

### ScaleBarBtn
- ReflexAI DNA: teal solid bg with scale-bar animation on group-hover
- Solid variant: bg accent, white text, no border
- Outline variant: transparent bg, ink text, accent border
- 18 vertical bars, 3-4px each, delays 20-220ms, origin-bottom scale-y-0 → group-hover:scale-y-100
- Text z-indexed above bars, relative positioning
- Padding: 10px 24px, min-height 44px, rounded-lg

### TextCta
- Inline text link with accent color + ArrowSwap on hover
- Display font, 14px, medium, tracking 0.01em
- ArrowSwap: two overlapping SVGs, one slides right+fades, other slides in from left
- Transition: 500ms cubic-bezier(0.36,0,0.114,0.92)

### Counter (GSAP)
- Animated number from 0 to target on scroll trigger
- Mono font, tabular-nums
- ScrollTrigger start: 'top 85%', duration 2s, ease power1.out
- Show final value immediately (NO zero state visible before animation)
- Snap textContent to integers

### ProductPanel (frame)
- White background card with hairline border
- Contains: property row, alert detail, metric, timestamp, action button
- Rounded-2xl, shadow-sm
- Fonts: Mono for codes/timestamps, Display for headings, system for body

### TabGroup
- Horizontal pill/underline tabs
- Active tab: accent color underline or fill
- Inactive: muted text, transparent/hairline border
- Framer-motion AnimatePresence for content swap

### PillFilter
- Rounded-full buttons for capability filters
- Active: accent bg, white text
- Inactive: transparent bg, ink text, hairline border

## Section Specifications

---

### 0. HTML/body setup
- html: overflow-x:clip, antialiased
- body: min-h-screen, bg paper, overflow-x:clip
- CSS reveal animation: .rv class with @keyframes rv (opacity 0→1, translate 0 28px→0) using animation-timeline:view()

---

### 1. NAV HEADER
- Fixed top, z-40, bg paper, height 72px (→ shrinks to 56px on scroll)
- Border-bottom: 1px solid border color
- Brand: "Tramo" in Display, text-xl, ink color, semibold
- Desktop nav links: "Problema" | "Sistema" | "Módulos" | "Dashboard" | "Diagnóstico"
- CTAs: ScaleBarBtn "Diagnosticar mi cartera" (solid) + ScaleBarBtn "Dashboard demo" (outline)
- Mobile: hamburger → full-screen overlay with AnimatePresence

### 2. HERO SECTION
- Section: pt-24 pb-28 md:pt-36 md:pb-40, max-w-5xl mx-auto, text-center
- H1: "Convierte la energía de tu cartera turística en margen operativo."
- Support: "Tramo cruza reservas, CUPS/Datadis, facturas y tarifas para detectar consumo fuera de estancia, activar reglas operativas y preparar informes claros para cada propietario."
- CTAs: "Diagnosticar mi cartera" (solid) + "Ver dashboard demo" (outline)

### 3. HERO PRODUCT PANEL
- Below hero copy, max-w-4xl mx-auto, white card rounded-2xl
- Shows ONE operational scene:
  - VGO-014 · Vigo Centro — Fuera de reserva
  - Checkout 11:00 · Consumo 13:10 · 4.2 kWh acumulados
  - P2 contratada 4.6 kW · Recomendación 3.3 kW
  - 34.20 € estimados
  - Action buttons: Revisar termo/AC, Aplicar regla post-checkout

### 4. PAIN TRIPTYCH (id="problema")
- Three cards grid: "La factura llega tarde", "Potencia y tarifa heredadas", "Propietarios sin explicación"
- Numbered 01/02/03 in accent color

### 5. SYSTEM FLOW (id="sistema")
- Horizontal flow: [Reservas/PMS] + [CUPS/Datadis] + [Tarifas] → Tramo atribuye → [Detecta → Decide → Actúa → Informa]

### 6. CORE MODULES (id="modulos")
- Four tabs: Fuera de reserva | Tarifa y potencia | Reglas por reserva | Informes propietarios
- Each tab: H3, description, feature bullets, screenshot

### 7. ADVANCED MODULES
- Two cards: "Medición en tiempo real" + "Batería y arbitraje OMIE"

### 8. DASHBOARD PROOF (id="dashboard")
- Full dashboard mock: KPIs, chart, action queue, property table
- Browser frame (clean, no fake chrome dots)

### 9. METRICS / COUNTERS
- Three metric cards: 32 propiedades, 184 kWh, 180 €/año
- GSAP counter animation, NO zero-state flash

### 10. TRUST / PILOT SAFETY
- Three security cards: RGPD, Encriptación, Acceso granular
- Privacy helper note near form

### 11. TESTIMONIAL
- Only if real pilot testimonial exists, otherwise omit

### 12. QUALIFICATION CTA (id="diagnostico")
- H2: "¿Listo para controlar tu cartera?"
- "Solicitar diagnóstico" + "Hablar con ventas"

### 13. FOOTER
- 4-column grid: Brand, Producto, Empresa, Legal

---

## Anti-Patterns to AVOID

1. ❌ NO decorative gradients, orbs, or abstract blobs
2. ❌ NO fake browser chrome (URL bars, traffic light dots) on product frames
3. ❌ NO invented metrics or testimonials
4. ❌ NO amber/orange as brand accent — ONLY for warning status
5. ❌ NO guaranteed savings claims
6. ❌ NO "smart home" or "IA" as headline language
7. ❌ NO zero-state metric counters (must show final values)
8. ❌ NO heavy parallax or scroll-jacking
9. ❌ NO two-line buttons or overflowing text at any breakpoint
10. ❌ NO "Solicitar demo" as primary CTA — use "Diagnosticar mi cartera"

---

## Implementation Notes

### Files to modify
- `app/page.tsx` — complete landing page rewrite following this spec
- `app/globals.css` — existing tokens stay, minor animation additions

### Existing reusable patterns to KEEP
- ScaleBarBtn pattern (18 vertical bars with staggered delays)
- ArrowSwap pattern (twin SVG cross-fade)
- TextCta pattern
- useCounter hook
- useShrinkHeader hook
- .rv CSS reveal animation

### Verification
- `npm run build` must pass (Next.js 15.5.15, TypeScript strict)
- `npx tsc --noEmit` must pass
- No horizontal scroll at any breakpoint
- All sections render with real content, no lorem ipsum
