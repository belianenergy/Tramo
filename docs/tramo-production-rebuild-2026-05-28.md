# Tramo production rebuild · 2026-05-28

## Que cambiou

- App shell B2B con sidebar escura, estados activos, command palette, vistas gardadas e contexto persistente.
- Command Center reconstruido arredor de aforro pendente, consumo fóra de reserva, coste previsto, review diario e táboa de unidades.
- Portfolio reconstruido con filtros gardados, bulk actions, CUPS, propietario, PMS, última lectura e status operacional.
- Optimization/Alerts reconstruido como cola aprobable con evidencia, impacto económico e acción recomendada.
- Settings reconstruido para integradores, roles, datos e automations con Datadis/PMS/Shelly/OMIE como pezas explícitas.
- Tipografías migradas de `@import` CSS a `next/font` para mellor rendemento e menos bloqueo de render.

## Validacións executadas

- `npm run build` — correcto.
- `npm run lint` — bloqueado polo asistente interactivo de migración de `next lint` en Next 15; non se modificou configuración ESLint.
- Playwright local en desktop/mobile con capturas en `validation-screenshots/*-20260528.png`.

## Revisión produto/deseño/QA

- Produto: a plataforma queda posicionada como control room enerxético para negocio inmobiliario turístico, non como smart-home nin SaaS xenérico.
- Deseño: paleta sobria paper/ink/lime, datos en mono, navegación densa, gráficos funcionais e alertas en cor de risco.
- QA de fluxo: detectar perda, aprobar acción, revisar carteira, ver CUPS/contrato e xestionar integradores son tarefas visibles desde a app.

## Riscos pendentes

- `next lint` require migración explícita a ESLint CLI.
- Landing e páxinas legacy seguen convivindo con prototipos antigos no repo; a plataforma principal está en `/app/*`.

## Continuación final · 2026-05-28

### Pechado agora

- Menú móbil completo no app shell con overlay accesible, peche por Escape, peche ao navegar, estados activos e ligazón a pricing.
- `Billing` (`/app/advisor`) reconstruído como `Tariffs & Billing`: CUPS, facturas, P1/P2/P3, recomendacións e paquete para comercializadora.
- `Arbitrage` (`/app/arbitrage`) reconstruído como liña premium: OMIE, Huawei Luna, capex, ROI prudente e gobernanza.
- `Reports` (`/app/informe`) axustado ao mesmo header e sistema visual da plataforma.
- Validouse que as rutas principais de navegación xa apuntan a pantallas coherentes co novo shell: Command Center, Portfolio, Optimization, Billing, Arbitrage, Reports e Settings.

### Legacy que queda

- `/app/fincas` e `/app/leads` seguen no repo con UI antiga porque non forman parte da navegación principal solicitada. Non se eliminaron para evitar borrar prototipos ou traballo previo sen aprobación.
- `/test/bklit` e múltiples HTML/Stitch legacy seguen como artefactos de exploración. Non impactan no fluxo principal.
- A landing pública (`/`) e pricing (`/precios`) seguen vivas; pricing está aliñada visualmente, a landing mantén a versión GSAP/editorial previa.

### Loop final

- CEO/product: a plataforma vende sala de control enerxética para carteiras turísticas: accións aprobables, CUPS, facturas, propietarios, P1/P2/P3 e arbitraxe premium. Non queda centrada en IoT doméstico.
- Design/taste: a app usa unha linguaxe técnica editorial sobria, con sidebar escura, paper/ink/lime, datos mono e densidade operacional. Evítase SaaS azul e template de cards xenérico nas rutas principais.
- QA/usabilidade: comprobadas as tarefas de detectar perda, aprobar acción, ir a owner report e revisar tarifa/CUPS/settings desde navegación desktop e móbil.

### Validación final

- `npm run build` correcto.
- `npm run lint` segue bloqueado polo prompt interactivo de `next lint` en Next 15; queda pendente migrar a ESLint CLI.
- Playwright xerou capturas desktop e mobile das rutas principais e probou navegación móbil cara a Reports.
