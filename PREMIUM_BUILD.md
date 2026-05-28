# Tramo Premium Landing Build

## Construido

- Reescrita completa de `app/page.tsx` como landing premium en React puro con Tailwind.
- Paleta clara Tramo aplicada: `#fcf9f8`, `#fffaf5`, `#1c1b1b`, `#554338`, `#755c4f`, `#e6813a`, `#984700`.
- Header sticky con glass, wordmark Tramo, navegación Producto/Demo/Blog y CTA.
- Hero de dos columnas con copy solicitado, CTAs y panel de producto con KPIs, alerta VGO-014, barras P1/P2 y sparkline SVG.
- Secciones añadidas: pain triptych, system flow, módulos 2x2, batería/arbitraje con SVG animado en hover, lead form y footer.
- Formulario conectado a `/api/leads`, conservando validación y envío existente; campos adicionales se envían dentro de `message`.

## Verificación

- `npx tsc --noEmit`: pasa.
- `npm run build`: pasa.

## Estado

Build correcto sin errores.
