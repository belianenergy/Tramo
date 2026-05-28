# Findings — Tramo / EnergyOS Mission

## Current State

- Existing repo has many Stitch generations and many uncommitted artifacts.
- Current public implementation was recently shifted from generic green SaaS toward cream/ink/caramel energy operations.
- Existing Stitch scripts can create new projects via `STITCH_API_KEY` from `.env/.env.local` and generate multiple screens.
- Prior `designMd` files were extracted to `designmd-extracted/`.

## Relevant Design Systems

- `energyos-restro.design.md`: warm paper, ink, caramel/orange, editorial modularity. Closest to desired identity.
- `precision-operations.design.md`: B2B energy management, operational data density, teal/slate. Useful for product surfaces.
- `lumina-grid.design.md`: dark monitoring/control-room concept. Use only for monitoring logic, not public visual identity.

## Brand Direction

Working public brand: **Tramo**.

Rationale:
- Refers to tariff time bands, reservation windows, operational intervals and consumption segments.
- Short, Spanish-friendly, sector-relevant.
- Allows tagline: "Cada kWh, en su tramo correcto."

## Strategic Wedge

Target wedge:
- Spanish tourist-apartment/property managers with 10+ units.
- Pain: consumption outside reservation, badly contracted power/tariffs, owner reporting friction.
- Differentiation: connects PMS/reservations + CUPS/Datadis/facturas + appliance control + tariff/power decisions.

## Implementation Target

Market-ready front/demo:
- Public landing.
- Product dashboard.
- Operations queue.
- Apartments portfolio.
- Tariff/power module.
- Owner report.
- Leads/pilot qualification.
- Settings/integrations.

Not promised overnight:
- Real Datadis OAuth/production integration.
- Full auth/billing/multi-tenant security.
- Production data migration.
