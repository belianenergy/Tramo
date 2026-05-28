# QA/Build Handoff Review - Loop 2 (Tramo)

Date: 2026-05-17  
Reviewer: Subagent QA/build handoff  
Scope: Read `LOOP1_QA_REVIEW.md`, `TRAMO_BLUEPRINT.md`, `app/page.tsx`, `app/globals.css`, `package.json`; verify current public naming/headline state after the update; identify remaining blockers before Codex `/goal`; run lightweight safe checks.

## Verdict: RED - fix lead API mismatch before Codex `/goal`

The landing headline/public hero has been updated to Tramo and the current build/type gates pass. Do not hand this to Codex yet: the default lead form still submits values that the API rejects, so the Blueprint acceptance criterion "Default lead form state submits without API enum mismatch" currently fails.

## Checks run

- `npm run build` - PASS
  - Next.js 15.5.15 compiled successfully.
  - Generated 19 routes: landing, 7 app pages, and 12 API routes.
- `npx tsc --noEmit` - PASS
- Static inspection:
  - `rg -n "EnergyOS|Tramo|privacy|privacidad|Tus datos|legal|politica|política" app TRAMO_BLUEPRINT.md package.json`
  - `find . -maxdepth 2 -name 'playwright.config.*' -o -path './tests/*'`

## Current public naming/headline state

PASS on the landing hero:

- `app/page.tsx:165` shows `Tramo` in the public landing header.
- `app/page.tsx:193-197` uses the approved H1: `Control energetico por reserva para carteras de apartamentos turisticos.` and Tramo subcopy.
- `app/page.tsx:379` says `Valida Tramo con tu cartera.`

Still failing on other public/customer-visible surfaces:

- `app/layout.tsx:5`, `app/layout.tsx:21`, `app/layout.tsx:43`, `app/layout.tsx:55` still expose `EnergyOS` in metadata, OpenGraph, JSON-LD software name, and JSON-LD provider.
- `app/components/Navigation.tsx:61`, `app/app/components/Navigation.tsx:53`, `app/app/components/AppShell.tsx:40`, and `app/app/dashboard/components/Navigation.tsx:61` still expose `EnergyOS` in the app shell/nav.
- The repo/package name can remain `energyos` per Blueprint, but user-facing title/meta/app shell should be Tramo.

## Remaining blockers

### 1. Lead form default submit fails API validation

Evidence:

- `app/page.tsx:95-100` defines interest labels such as `Control inteligente de aparatos` and `Alertas de consumo fuera de reserva`.
- `app/page.tsx:106-109` selects those two interest labels by default.
- `app/page.tsx:117` defaults `mainPain` to `consumo-fuera-reserva`.
- `app/api/leads/route.ts:32-38` only allows older values: `climatizacion`, `consumos`, etc. and older interest labels like `Climatizacion automatica por reservas`.
- `app/api/leads/route.ts:155-157` rejects mismatched `mainPain` with HTTP 400.

Impact: the default form state can pass client-side required fields but fail server-side because `mainPain` is not in `allowedMainPains`. This is a launch blocker for lead capture and directly violates Blueprint technical QA.

### 2. Privacy/legal helper copy is still missing

Blueprint required copy:

> No envies credenciales ni facturas por este formulario. En la llamada revisamos que datos tienes disponibles y como preparar un piloto seguro.

`app/page.tsx:393-534` renders the form and submit states, but no privacy/legal helper text is visible near the form.

### 3. Public Tramo rename is incomplete

The landing body is mostly fixed, but metadata, JSON-LD, and app navigation still say `EnergyOS`. This matters because browser title, share previews, structured data, and demo app shell are still public/demo-facing.

### 4. Playwright QA remains unconfigured

`@playwright/test` and `playwright` are installed in `package.json`, but there is no `playwright.config.*` and no smoke tests under the checked paths. Blueprint requires desktop/mobile screenshots and 375px/390px no-horizontal-scroll checks.

### 5. Mobile overflow guard remains unproven

`app/globals.css:33-36` sets body min-height/background only. There is still no explicit horizontal overflow guard, and no screenshot/browser check has been configured to prove 375px/390px behavior.

## Exact pre-Codex action list

1. Fix `app/api/leads/route.ts` to accept the current Tramo qualification schema:
   - Add `consumo-fuera-reserva`, `aparatos`, `propietarios`, `tarifa`, `bateria` to `allowedMainPains` or replace old values cleanly.
   - Add current interest labels from `app/page.tsx:95-100` to `allowedInterests`.
   - Update `qualifyLead()` scoring branches so Tramo values score correctly.
   - Re-run a real POST or focused route test with the default form payload.

2. Add privacy helper copy near the lead form submit:
   - Use the Blueprint wording.
   - Keep it visible before/near the submit button.
   - Do not request CUPS/Datadis credentials or invoice uploads in the public form.

3. Finish public rename from EnergyOS to Tramo:
   - `app/layout.tsx` metadata/OpenGraph/JSON-LD.
   - `app/components/Navigation.tsx`.
   - `app/app/components/Navigation.tsx`.
   - `app/app/components/AppShell.tsx`.
   - `app/app/dashboard/components/Navigation.tsx`.
   - Keep internal repo/package naming as EnergyOS unless Mauro explicitly approves deeper rename.

4. Add lightweight Playwright smoke QA before final `/goal` completion:
   - `playwright.config.ts`.
   - Landing and `/app/dashboard` smoke screenshots at desktop plus 375px and 390px mobile widths.
   - Assert no horizontal scroll and no mobile header overlap.

5. Add a minimal global overflow/layout guard only after checking it does not hide legitimate app tables:
   - Candidate: `html, body { max-width: 100%; overflow-x: clip; }`
   - Prefer fixing specific overflowing components if screenshots identify a concrete offender.

6. Re-run gates:
   - `npx tsc --noEmit`
   - `npm run build`
   - Playwright smoke screenshots

## Handoff note

Build health is good. The highest-risk remaining issue is not visual polish; it is that the CTA can reject a qualified lead by default. Fix that first, then finish naming/copy/test coverage before asking Codex to expand implementation.
