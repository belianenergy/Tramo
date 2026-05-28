# Loop 3 Corrections

## Cambios aplicados

- Actualizada la API de leads para aceptar los valores actuales del formulario de Tramo:
  - `consumo-fuera-reserva`
  - `aparatos`
  - `propietarios`
  - `tarifa`
  - `bateria`
- Conservada compatibilidad con valores anteriores seguros:
  - `climatizacion`
  - `consumos`
- Actualizados los intereses aceptados por la API:
  - `Control inteligente de aparatos`
  - `Alertas de consumo fuera de reserva`
  - `Informes mensuales para propietarios`
  - `Optimización de tarifas y potencia`
  - `Baterías y arbitraje`
- Ajustada la puntuación de `qualifyLead()` para los nuevos dolores e intereses.
- Renombradas ocurrencias públicas de `EnergyOS` a `Tramo` en metadata, JSON-LD, navegación y shell móvil.
- Añadido el texto de privacidad visible antes del botón de envío del formulario de leads.
- Eliminada la mención interna a `Precision Operations` y reemplazada por copy público.
- Sustituido texto visible en inglés de la landing por alternativas en español.
- Añadido guard contra overflow horizontal móvil en `body`.

## Verificación

- `npm run build`: OK
- `npm run build 2>&1 | tail -5`: OK
- `npx tsc --noEmit`: OK
- `grep -rn "EnergyOS" app/ --include="*.tsx" --include="*.ts" | grep -v node_modules | grep -v "\.next"`: sin resultados
- Búsqueda de términos internos en `app/page.tsx`: sin resultados para `Precision Operations`, `Sourceful`, `Seline`, `Pirsch`, `Orderful`, `check-in`, `check-out`, `reporting`, `premium` o `hardware`.
