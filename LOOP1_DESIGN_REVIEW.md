# Design Review — Loop 1

**Date:** 2026-05-17  
**Reviewer:** Design Review Subagent (Tramo/EnergyOS, Loop 1)  
**Sources:** TRAMO_BLUEPRINT.md, iberia-precision.design.md, precision-operations.design.md

---

## Veredicto: **CAMBIOS REQUERIDOS**

O sistema visual proposto é implementable en liñas xerais, pero hai inconsistencias internas e lagoas críticas nas instrucións que poden producir implementación incorrecta ou disparidades entre marketing e product.

---

### Análise de paleta

**Proposto (TRAMO):**
- Paper `#fcf9f8` · Warm surface `#fffaf5` · Card `#ffffff`
- Ink `#1c1b1b` · Muted brown `#554338` · Secondary `#755c4f`
- Signal orange `#e6813a` · Deep orange `#984700`
- Teal `#0f766e` · Error: desaturated

**Referencia principal (iberia-precision):**
- Background `#faf9f6` · Primary `#012d1d` (forest green)
- Accent: `#7c572d` / `#fecb97` (amber)

**Referencia secundaria (precision-operations):**
- Surface `#f7f9fb` · Primary `#0f766e` (teal)
- Background: cool-toned off-white

**Veredicto de paleta:**
- ✅ Cream/warm base é implementable e distintivo (non é "green energy" cliché)
- ✅ Contraste ink `#1c1b1b` vs paper `#fcf9f8` ≈ **15.7:1** (WCAG AAA) — excelente
- ⚠️ Signal orange `#e6813a` vs warm surface `#fffaf5` ≈ **3.2:1** (WCAG AA fail) — require revisión ou cambio de cor de suporte para botóns primarios
- ✅ Teal `#0f766e` funciona para health/success state
- ⚠️ **Conflicto de branco:** precision-operations usa surface `#f7f9fb` (cool) mentres TRAMO especifica `#fcf9f8` (warm). Se se mestura con compoñentes de precision-operations, haberá inconsistencias visibles
- ⚠️ **Faltaba cor de error explícita** — "desaturated, not loud" é insuficiente para Stitch

**gap:** TRAMO prescinde de verde corporativo/forest green en favor de orange; isto é un cambio forte vs iberia-precision que precisa confirmación de que non é un erro de transcripción do brief.

---

### Análise de tipografía

**Proposto (TRAMO):**
- Headlines: Plus Jakarta Sans
- Body: Inter
- Metrics: JetBrains Mono
- "No negative letter spacing in implementation"

**Referencia (iberia-precision):**
- Display metrics: Plus Jakarta Sans 48px / 700 / -0.02em (letterSpacing)
- All body: Plus Jakarta Sans (non Inter)
- Plus Jakarta Sans xeral para case todo

**Referencia (precision-operations):**
- Headlines: Plus Jakarta Sans
- Body: Inter
- Metrics: JetBrains Mono

**Veredicto de tipografía:**
- ✅ Plus Jakarta Sans — dispoñible en Google Fonts, cobre todo o set de caracteres galegos/españoles
- ✅ Inter — dispoñible en Google Fonts
- ✅ JetBrains Mono — dispoñible en Google Fonts
- ⚠️ **Inconsistencia interna:** iberia-precision usa Plus Jakarta Sans tamén para body; precision-operations usa Inter para body. TRAMO mixto (Plus Jakarta + Inter). Hai que fixar unha soa decisión en lugar de deixar elección
- ❌ **Contras dicotomía:** Blueprint di "no negative letter spacing" pero iberia-precision usa `letterSpacing: -0.02em` para display metrics. Stitch necesita instrución clara: **"Use -0.02em only for display/large metric numbers; never for body or labels"**

**gap:** Scale completo de tamaños non está definido (non hai px/rem para h1, h2, body-lg, body-sm, etc.). Sen isto, Stitch debe improvisar.

---

### Análise de compoñentes

**Cards (TRAMO):**
- Marketing/product proof: 24-32px radius
- App panels: 16-24px radius
- White bg, border `#ead8cd`
- Fine SVG line charts

**Cards (precision-operations):**
- 8px radius consistente
- White bg, 1px border `#e2e8f0`
- 4px diffused shadow (green-tinted)

**Cards (iberia-precision):**
- 16px radius
- Ambient shadow con tinguiz verde/ámbar

**Veredicto de compoñentes:**
- ✅ Radio 24-32px para marketing é implementable con Tailwind (`rounded-3xl` = 24px, `rounded-[32px]`)
- ✅ App panels 16-24px — rango amplo pero diferenciable (`rounded-2xl` = 16px, `rounded-3xl` = 24px)
- ⚠️ **Ritmo de radio inconsistente:** Marketing 24-32px vs App 16-24px vs Form 8-12px — a diferenza é grande (24px → 16px → 8px). Require instrución de "transition zone" entre marketing e app
- ✅ SVG charts con Tailwind/SVG inline — totalmente implementable
- ❌ **Shadow recipe falta:** TRAMO non describe shadow nin elevation. precision-operations especifica `rgba(15, 23, 42, 0.04)` 4px blur. iberia-precision describe "green-tinted" e "warm-tinted". Para unificar: precisa receita explícita

**gap:** Non hai especificación de shadow nin de cómo separar elevation levels (background vs card vs modal vs dropdown).

---

### Gap vs Referencia (Sourceful Energy vs Seline/Pirsch)

| Elemento | TRAMO proposto | Referencia (iberia/precision-ops) | Status |
|----------|----------------|-----------------------------------|--------|
| Background | Warm cream `#fcf9f8` | Cool `#f7f9fb` / Warm `#faf9f6` | ⚠️ Warm vs cool |
| Primary accent | Orange `#e6813a` | Forest green / Teal | ⚠️ Cambio forte de identity |
| Body font | Inter + Plus Jakarta | Plus Jakarta Sans | ⚠️ Inconsistencia interna |
| Card radius | 8-32px (fragmentado) | 8px ou 16px (consistente) | ⚠️ Necesita simplificación |
| Elevation | Non especificado | 1px border + subtle shadow | ❌ Lagoa crítica |
| Error color | "desaturated, not loud" | `#ba1a1a` (desaturated) | ⚠️ Necesita valor exacto |

**Observación:** TRAMO prescinde do verde teal/orange como secondary accent e usa orange como cor de sinal única. Isto é distintivo pero require instrución de "onde usa orange" e "onde usa teal" para non mesturalos.

---

### Cambios requeridos para o prompt de Stitch

1. **Confirmar cor de primary accent:** ¿Orange `#e6813a` é correcta como accent principal enfront de verde/teal? É un cambio significativo vs iberia-precision.

2. **Fixar warm vs cool surface:** Definir se o background é `#fcf9f8` (warm) ou `#f7f9fb` (cool). Non se poden mesturar as dúas referencias sen unificar.

3. **Engadir contraste mínimo para orange:** Se `#e6813a` se usa sobre `#fffaf5`, o contraste é < 4:1. Especifique fondo blanco `#ffffff` para botóns primarios ou cambiar a `#c05621`.

4. **Fixar tipografía body:** Escoller: Plus Jakarta Sans para todo OU Inter para body. Non deixar ambas como opción.

5. **Letter spacing explícito:** Engadir regra: "-0.02em só para display metrics (28px+), nunca para body ou labels".

6. **Engadir scale tipográfico completo:** Definir px/rem para: display-metrics, h1, h2, h3, body-lg, body-md, body-sm, label-caps, button.

7. **Engadir recipe de shadow:**
   - Card (default): `0 1px 3px rgba(28, 27, 27, 0.06)`
   - Card hover: `0 4px 12px rgba(28, 27, 27, 0.10)`
   - Modal/dropdown: `0 8px 24px rgba(28, 27, 27, 0.14)`
   - Teñir con brown/amber segundo o tipo de card

8. **Simplificar radio ladder:** Reducir de 4 categorías (24-32 / 16-24 / 8-12 / full) a 3: Marketing 24px | App 12px | Form 8px. Engadir "transition zone 16px" entre marketing e app.

9. **Definir cor de erro exacta:** Cambiar "desaturated, not loud" por `#dc2626` ou similar con muestra de contrast ratio.

10. **Engadir breakpoints mobile:** Para 375px e 390px — especificar columnas (4-col?), tipografía mínima (14px?), e gap/spacing.

11. **Engadir especificación de border color para hover state:** ¿Cambia a `#dbc1b3`? ¿Ou usa orange com accent?

---

### Nota

Orixinalmente había preocupación sobre Google Fonts availability (todas dispoñibles), pero o verdadeiro problema é interno: **TRAMO mistura referencias warm/cool e non fixa unha soa decisión de tipografía body**. O cambio a orange como accent principal é distintivo pero precisa confirmación explícita para non xerar dúbidos en Stitch. As lagoas máis críticas son shadow recipe, tipografía scale, e contraste de orange — estas tres sen resposta poden producir implementación inconsistent.

**Recomendación:** Engadir un anexo "Visual Spec Cheatsheet" de 15-20 liñas que sexa a referencia única para Stitch, en lugar de rely on cross-referencing tres ficheiros.

---

*Gardado:* `/home/mauro/.openclaw/workspace-local/energyos/LOOP1_DESIGN_REVIEW.md`