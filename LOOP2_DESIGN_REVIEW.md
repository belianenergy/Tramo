# Design Review — Loop 2

**Date:** 2026-05-17  
**Reviewer:** Design Review Subagent (Tramo/EnergyOS, Loop 2)  
**Sources:** `TRAMO_BLUEPRINT.md`, `STITCH_PROMPT_TRAMO_V1.md`, `LOOP1_DESIGN_REVIEW.md`, `stitch-tramo-v2-landing.html`, `app/page.tsx`

---

## Veredicto: **CAMBIOS REQUERIDOS ANTES DE LOOP 3**

Loop 2 moveu Tramo cara unha dirección máis profesional: warm paper, ink, orange signal, datos reais, paneis de produto e ton operativo. A dirección xa encaixa mellor co brief que un SaaS verde xenérico.

Pero aínda non está listo para Stitch como especificación estable. O prototipo real (`app/page.tsx`) é máis forte ca saída Stitch (`stitch-tramo-v2-landing.html`), e iso é un sinal importante: Stitch aínda necesita restricións máis concretas para non producir unha landing xenérica, bilingüe, con assets falsos e compoñentes pouco fiables.

---

## Visual / Copy Fit

### Headline profesional

**Headline actual:**

> Control energético por reserva para carteras de apartamentos turísticos.

**Fit:** bo. É claro, profesional e específico. Non soa a eco-SaaS nin a "AI dashboard". Explica o wedge correcto: enerxía atribuída por reserva e carteira. Debe manterse para Loop 3.

**Axuste recomendado:** o headline funciona mellor cando o heroe o apoia con evidencia inmediatamente visible. En `app/page.tsx` isto pasa mellor grazas a `P1/P2`, `CUPS`, `kWh por reserva`, timeline e panel operativo. En `stitch-tramo-v2-landing.html`, o panel é unha imaxe externa xenérica, polo que o headline perde credibilidade.

### Dirección visual

**O que xa funciona:**

- Warm paper + ink + orange está confirmado como identidade principal.
- Inter para body, Plus Jakarta Sans para display e JetBrains Mono para datos xa é unha decisión estable no código.
- O prototipo Next usa datos concretos: CUPS/Datadis, P1/P2, kWh, reserva, propietarios.
- A estrutura de `app/page.tsx` dá sensación de produto B2B real, non de landing decorativa.

**O que non funciona aínda:**

- O logo segue sen cumprir a dirección de marca. `app/page.tsx` usa un bolt de Lucide e `stitch-tramo-v2-landing.html` usa un PNG base64 opaco. O brief pedía explicitamente evitar lightning como identidade principal e crear un monoline segmented mark.
- A saída Stitch usa Material Symbols, moitas clases redundantes, texto en inglés no formulario e imaxes remotas non controladas. Iso non é Stitch-ready para implementación seria.
- `app/page.tsx` introduce unha sección escura en ink black. Pode funcionar como contraste editorial, pero debe ser unha excepción controlada; se Stitch a interpreta como base visual, rompe o mandato de "cream/paper as main identity".
- O texto "Aquí entra la parte Precision Operations..." en `app/page.tsx` fala do proceso de deseño, non do produto. Debe desaparecer antes de producir unha peza comercial.

---

## Estado dos gaps de Loop 1

| Gap Loop 1 | Estado Loop 2 | Nota |
|---|---:|---|
| Confirmar orange como accent principal | **Resolto** | Tanto Stitch como Next usan orange/deep orange como sinal principal. |
| Fixar warm vs cool surface | **Parcial** | `app/page.tsx` é consistente con `#fcf9f8`; Stitch introduce `#fdf8f8`, `#f7f2f2`, `#f1edec` sen disciplina. |
| Contraste de orange | **Parcial** | CTAs usan white text on `#e6813a`, aceptable visualmente pero aínda debería especificarse deep orange para hover/active e evitar orange text sobre warm backgrounds. |
| Fixar tipografía body | **Resolto no código** | Inter body, Plus Jakarta display, JetBrains Mono metrics. |
| Letter spacing explícito | **Non resolto** | Stitch usa negative tracking en headline/display malia o prompt dicir "Do not use negative letter spacing". Hai que reconciliar regra ou eliminala. |
| Scale tipográfico completo | **Parcial** | Stitch xerou tokens, pero non están no prompt como fonte de verdade e `app/page.tsx` usa Tailwind sizes ad hoc. |
| Shadow recipe | **Parcial** | `app/page.tsx` ten unha sombra forte no hero panel; Stitch usa `shadow-sm`/`shadow-md` xenérico. Falta escala oficial. |
| Radius ladder | **Parcial** | Os dous usan 24-32px abundantemente. Falta reservar 8-12px para filas/forms/tables e 16px para app panels. |
| Error color exacta | **Resolto parcialmente** | Stitch define `#ba1a1a`; Next usa `text-red-700`. Debe unificarse. |
| Breakpoints mobile 375/390 | **Non verificado / Non garantido** | O prompt pide stack, pero nin Stitch nin Next deixan unha especificación suficientemente testable. |
| Hover border state | **Non resolto** | Non hai recipe clara para hover/focus por tipo de componente. |

---

## Blockers restantes

1. **Marca / logo bloqueante.** O bolt actual contradí o brief. Loop 3 debe forzar o mark: bracket/path monoline de tres segmentos + dot orange + optional ticks. Non usar lightning, leaf, app icon, base64 image logo.

2. **Stitch segue producindo landing xenérica.** `stitch-tramo-v2-landing.html` usa capturas remotas, módulos vagos ("Dashboard", "Operaciones", "Piloto"), copy en inglés no formulario e un produto visual que non demostra atribución por reserva. Debe pedirse "draw the product panel in HTML/CSS/SVG, not image placeholders".

3. **Formulario incompleto fronte ao brief.** `app/page.tsx` non pregunta city/region, PMS, Datadis/CUPS access, recent invoices ou who pays energy bill como campos separados. Stitch si inclúe algúns, pero en inglés. Loop 3 debe unificar o schema en español.

4. **Copy comercial contaminada por notas internas.** A frase "Aquí entra la parte Precision Operations..." debe eliminarse. O usuario final non debe ver referencias ás fontes de inspiración.

5. **Falta unha gramática visual de "tramo".** Hai datos e cards, pero poucos elementos expresan segmentos de tempo/reserva/tarifa como dispositivo visual propio. Loop 3 debe introducir interval bars, reservation windows, P1/P2 bands e evidence rows como patrón recorrente.

6. **Dark section needs constraint.** A sección escura pode quedar como banda puntual, pero o prompt debe dicir "one optional ink band maximum; never make the app/dashboard dark".

---

## Stitch Prompt Changes for Loop 3

Add this as a hard "Loop 3 correction" block:

```md
## Loop 3 Corrections

Keep the H1 exactly:
"Control energético por reserva para carteras de apartamentos turísticos."

The hero product panel must be built with HTML/CSS/SVG components, not a screenshot, stock image, remote image, base64 logo, phone mockup or decorative render.

Logo: create an inline SVG monoline segmented bracket/path with three interval segments, one orange signal dot and small optional tick marks. Do not use lightning, leaf, bolt, eco, AI or mobile-app symbols as the logo.

Use Spanish everywhere. No English form labels, no "Dashboard" module labels unless paired with concrete Spanish operational copy.

Visual grammar: every major screen must include at least one visible segmented-time device: reservation window, idle window, P1/P2 tariff band, checkout marker or evidence row.

Hero panel minimum data:
- "VGO-014 · checkout 11:00"
- "4,2 kWh entre 13:10-16:40 sin reserva activa"
- "Acción: revisar termo y regla post-checkout"
- P1/P2 power comparison
- owner report status

Lead form fields:
nombre, empresa, email, nº alojamientos, ciudad/región, PMS, acceso Datadis/CUPS, facturas recientes, quién paga la factura, dolor principal, módulos de interés.

Privacy helper copy:
"No envíes credenciales ni facturas por este formulario. En la llamada revisamos qué datos tienes disponibles."

Remove all references to Sourceful, Seline, Pirsch, Orderful, Precision Operations or design process from visible page copy.

Color discipline:
- Main background: #fcf9f8
- Surface: #fffaf5
- Card: #ffffff
- Border: #ead8cd
- Strong border: #dbc1b3
- Ink: #1c1b1b
- Muted: #554338
- Secondary: #755c4f
- Signal orange: #e6813a
- Deep orange: #984700
- Success only: #0f766e
- Error: #ba1a1a

Typography:
- Display/headlines: Plus Jakarta Sans
- Body/labels/forms: Inter
- Metrics/data: JetBrains Mono
- Use letter spacing 0 for body, labels and normal headings. If display metrics need optical tightening, max -0.01em only above 40px.

Radius:
- Marketing hero/proof containers: 24px
- App panels/cards: 16px
- Rows, filters, form fields: 10-12px
- Pills/buttons: full radius only when intentionally pill-shaped.

Elevation:
- Default cards: border only or 0 1px 3px rgba(28,27,27,.06)
- Hero/product proof: 0 16px 60px rgba(86,37,0,.08)
- Do not use generic colored glow, gradients, blobs or decorative orbs.

Dark section:
One optional ink band is allowed for editorial contrast. The product UI itself must remain paper/white, not dark dashboard.

Mobile:
At 375px and 390px, hero stacks text first, panel second, CTA visible before scroll depth gets excessive, no horizontal scroll, no squeezed H1, no clipped form fields.
```

---

## Recommendation

Use `app/page.tsx` as the design baseline, not `stitch-tramo-v2-landing.html`. The Next implementation already captures the professional direction better. For Loop 3, ask Stitch to regenerate only after the prompt is tightened around: inline SVG logo, no image placeholders, Spanish-only form, segmented interval grammar, and evidence-first hero panel.

The professional headline is not the problem. The remaining risk is that the visual system still depends on human correction instead of being sufficiently encoded for Stitch.
