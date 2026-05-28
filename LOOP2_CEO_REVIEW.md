# CEO Review - Loop 2

**Date:** 2026-05-17  
**Scope:** Tramo hero positioning after Loop 2 implementation  
**Sources:** `TRAMO_BLUEPRINT.md`, `STITCH_PROMPT_TRAMO_V1.md`, `LOOP1_CEO_REVIEW.md`, `LOOP1_DESIGN_REVIEW.md`, `LOOP1_QA_REVIEW.md`, `app/page.tsx`

## Verdict: APROBADO CON CAMBIOS

The revised headline:

> Control energético por reserva para carteras de apartamentos turísticos.

is more professional and more instantly legible than the old Loop 1 line:

> Explica cada kWh de tu cartera turística por reserva, factura y propietario.

It should remain the primary H1 for Loop 3, but the surrounding hero copy needs a sharper evidence line and a stronger owner/reporting hook so the differentiation does not depend entirely on the subcopy.

## Headline Assessment

### Professionalism

The new line is clearly stronger. "Control energético" sounds like a serious operational category, not a clever marketing phrase. "Por reserva" introduces the wedge quickly, and "carteras de apartamentos turísticos" qualifies the buyer without sounding small.

The old "Explica cada kWh..." was differentiated, but it was slightly too internal and conceptual. It made the visitor ask, "What does explaining a kWh mean?" That is a good product idea but a weaker first impression.

### Clarity

The new line is clearer in the first 3 seconds. A property manager understands:

- This is about energy.
- It maps to reservations.
- It is for portfolios, not single homes.
- It is for tourist apartments, not generic buildings.

The risk is that "control energético" is a broad category. Without the phrase "por reserva", it would be generic. With "por reserva", it becomes specific enough.

### Differentiation

The new line differentiates better at market-category level, but slightly worse at proof level.

"Control energético por reserva" is a strong category claim. "Explica cada kWh..." is a stronger proof claim. The correct Loop 3 move is not to return to the old H1. It is to preserve the old promise as a supporting proof line in the hero/product panel.

### Sales Usefulness

The new H1 is better for sales conversations because it is easier to repeat out loud:

> "Somos control energético por reserva para carteras de apartamentos turísticos."

That sentence can open a call. The old line works better as a demo explanation:

> "Te enseñamos qué kWh pertenecen a cada reserva, factura y propietario."

Use the new line for positioning. Use the old idea as evidence.

## Issues

1. **The hero currently underuses the old "cada kWh" proof**

   The current subcopy says Tramo "atribuye consumo", but the page should keep one sentence that makes the old promise concrete. The old line had a useful emotional payload: turning a confusing bill into an explainable owner conversation.

2. **The current secondary CTA says "Ver producto"**

   The blueprint asks for "Ver dashboard demo". "Ver producto" is less specific and less useful. This matters because the page is selling a product panel, not a vague product tour.

3. **The hero product panel evidence is good but not killer enough**

   The Stitch prompt requested:

   > VGO-014 · checkout 11:00 · 4,2 kWh entre 13:10-16:40 sin reserva activa · acción: revisar termo y regla post-checkout.

   The current panel has related timeline rows, but it does not present this as a single high-signal evidence row. This row is the sales moment. It makes the product real.

4. **Battery/arbitrage is still too visible for the core wedge**

   It appears in benefits, system flow, lead text and form interests. It is labeled premium, which helps, but the landing still spends too much early attention on it. For Loop 3, battery/arbitrage should be a late qualification option only.

5. **"Ahorro" appears in system copy**

   The line "decisiones de ahorro" is not fatal, but the strategic copy rules are trying to avoid savings-first positioning. Prefer "decisiones operativas" or "decisiones defendibles". Tramo should sell attribution and action first; savings is downstream.

6. **Lead form is missing the full qualification schema from the prompt**

   The current form captures basic fit, but not all required fields: city/region, PMS, Datadis/CUPS access, recent invoices and who pays the energy bill. From a CEO/sales view, those fields determine whether a demo can be useful.

## Required Changes Before Loop 3

1. Keep the new H1 as the primary hero headline.

2. Add a short proof line under the subcopy or inside the product panel:

   > Cada kWh queda situado en su tramo: estancia, espera, tarifa, factura y propietario.

3. Change the secondary CTA from "Ver producto" to:

   > Ver dashboard demo

4. Add the exact killer evidence row to the hero panel:

   > VGO-014 · checkout 11:00 · 4,2 kWh entre 13:10-16:40 sin reserva activa · acción: revisar termo y regla post-checkout.

5. Replace "decisiones de ahorro" in major section copy with "decisiones operativas" or "decisiones defendibles".

6. Move battery/arbitrage out of early benefits. Keep it only as a late optional module or form interest:

   > Evaluación batería/arbitraje, solo si los datos lo justifican.

7. Expand the lead form to include the commercial qualification fields from the Stitch prompt:

   - ciudad/región
   - PMS
   - acceso Datadis/CUPS
   - facturas recientes
   - quién paga la factura eléctrica

## Final Recommended Hero Copy

**H1**

> Control energético por reserva para carteras de apartamentos turísticos.

**Subcopy**

> Tramo cruza reservas, CUPS/Datadis, facturas, tarifas y reglas operativas para atribuir consumo, detectar desvíos fuera de estancia y preparar informes defendibles para propietarios.

**Proof line**

> Cada kWh queda situado en su tramo: estancia, espera, tarifa, factura y propietario.

**Primary CTA**

> Diagnosticar mi cartera

**Secondary CTA**

> Ver dashboard demo

**Hero evidence row**

> VGO-014 · checkout 11:00 · 4,2 kWh entre 13:10-16:40 sin reserva activa · acción: revisar termo y regla post-checkout.

## Final Note

Loop 2 is directionally correct. The new H1 gives Tramo a more serious category and better sales language. The only concern is losing the sharpness of "Explica cada kWh"; solve that by turning it into a proof line, not by making it the headline again.
