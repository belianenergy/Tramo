# Codex `/goal` Build Brief — Draft

Status: DRAFT. Do not execute until CEO final OK after Stitch loop 3.

## Goal

Implement the approved Tramo front in the EnergyOS Next.js repo.

Use `/goal` in Codex with this brief and the approved Stitch outputs as source of truth.

## Required Outcome

Create a market-ready front/demo for Tramo:

- Public landing.
- App shell.
- Portfolio dashboard.
- Operations queue.
- Owner report.
- Qualification lead form.
- Apartments portfolio as supporting view.
- Tariff & power module as supporting view.
- Leads / pilot CRM.
- Pilot settings.

## Source Files

- `TRAMO_BLUEPRINT.md`
- `STITCH_PROMPT_TRAMO_V1.md`
- Approved Stitch project summary: TBD.
- Approved Stitch HTML files: TBD.

## Build Rules

- Public brand is Tramo.
- Internal repo may remain EnergyOS.
- Implement reusable React components, not pasted unmaintainable HTML.
- Preserve or improve existing lead capture API.
- Update the lead capture API to the Tramo qualification schema:
  - name, company, email, units, city/region, PMS, Datadis/CUPS access, recent invoices, bill payer, main pain, optional phone, modules, message.
- Fix current enum mismatch risk: default form values must be accepted by `app/api/leads/route.ts`.
- Add privacy helper copy near public forms: do not submit credentials or invoices.
- Use primary CTA copy: "Diagnosticar mi cartera"; submit copy: "Solicitar diagnóstico privado".
- Demo data must match blueprint.
- Do not add new paid services.
- Do not implement fake real integrations.

## Verification

Run:

- `npx tsc --noEmit`
- `npm run build`
- Playwright desktop/mobile smoke screenshots for landing and key app pages.
- Explicitly test 375px and 390px mobile widths with no horizontal scroll.

## Fallback Model Note

If the primary GPT credits are exhausted and the environment supports DeepSeek v4 Pro, switch to it. If not available, continue with the best available configured coding model and record the limitation.
