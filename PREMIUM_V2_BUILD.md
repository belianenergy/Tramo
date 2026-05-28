# Tramo Premium V2

## What was built

- Rewrote `app/page.tsx` as a premium Spanish landing page for Tramo.
- Added the required monoline bracket SVG logo and replaced text-logo usage in header and footer.
- Preserved the existing lead form state, interest toggles, estimated fit logic, and submit flow to `/api/leads`.
- Built all requested sections: sticky glass header, hero with product panel, pain triptych, system flow, modules, battery/arbitrage, trust section, lead form, and footer.

## Build/TS status

- `npx tsc --noEmit`: passed with zero errors.
- `npm run build`: passed.

## Visual improvements

- Applied warm cream and white section alternation with subtle borders.
- Added rounded premium cards with layered borders, shadows, hover lift, and interactive depth.
- Used orange sparingly for alerts, CTAs, highlights, and energy chart elements.
- Used JetBrains Mono styling for KPI values, metrics, evidence strings, and price badges.
- Added richer dashboard visuals: KPI pills, alert card, P1/P2 bars, sparkline, OMIE chart, and hover battery animation.
