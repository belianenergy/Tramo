# EnergyOS Product, Market and Competition Review

Date: 2026-05-16
Scope reviewed: Stitch suite `stitch-mvp-restro-style-v1`

## Verdict

EnergyOS is viable, but the winning wedge should stay narrower than the full long-term vision:

**Best initial product:** software-first energy operations layer for professional short-term rental and tourist-apartment managers in Spain.

Do not lead with a generic building energy platform, pure HVAC automation, or solar/battery arbitrage. Those markets are crowded or too capital-heavy. The strongest wedge is the intersection of:

- PMS/reservation calendar
- Datadis/CUPS/facturas
- tariff and contracted-power review
- owner reporting
- operations queue for anomalies and off-reservation consumption

## Market Signals

- Demand in short-stay rentals remains large despite regulatory pressure. Eurostat reported 398.1M EU guest nights booked via Airbnb/Booking/Expedia in Q3 2025, up 8.7% YoY, with Andalucia the top EU region in Q2 2025 at 13.3M nights.
- Spain has official monthly INE datasets for tourist dwellings, places and places per tourist dwelling, updated through 2026. This gives EnergyOS a public market-sizing base by province/autonomous community.
- Spain's short-term rental regulation is becoming more data-driven. RD 1312/2024 created the Registro Unico de Arrendamientos and Ventanilla Unica Digital, requiring registration numbers and platform data exchange for short-term rentals.
- Datadis is a practical data advantage in Spain: it centralizes consumption data across almost all electricity distributors and supports detailed downloads, including hourly data over several months.
- PVPC and tariff complexity remain a real pain point. REE publishes hourly PVPC prices, and the tariff contains fixed power, hourly consumption and taxes/charges. This supports the product claim that managers need a system, not spreadsheets.

## Competition

### Direct and Adjacent

- **Operto:** strong in hospitality automation, PMS/device integrations, energy/noise monitoring and HaaS. Weakness vs EnergyOS: energy is part of guest/device operations, not Spain-specific tariff, Datadis, CUPS and owner-reporting workflow.
- **SuiteOp / SuiteConnect:** strong hardware-agnostic IoT layer for locks, thermostats, sensors and energy devices. Weakness vs EnergyOS: emphasizes device operations more than Spanish energy contracts, invoices, tariff/power optimization and financial reporting.
- **Spacewell Energy / Dexma:** strong enterprise energy management, benchmarking, reporting, M&V and integrations. Weakness vs EnergyOS: enterprise/facility-manager product, not built around tourist-apartment reservations, PMS context and owner reporting.
- **Wattwin / tariff and solar sales tools:** strong around tariff concepts, SIPS/CUPS workflows and commercial energy opportunities. Weakness vs EnergyOS: sales/offer generation, not daily property operations for tourist portfolios.
- **PMS platforms like Guesty, Hostaway, Lodgify:** own the reservation and operations workflow. Weakness vs EnergyOS: energy is not their core analytical layer; they are likely integration partners before they are true competitors.

## Strategic Positioning

### Keep

- "EnergyOS for tourist-property portfolios" as the current front's primary narrative.
- Short, direct hero: portfolio energy management from one system.
- Reporting to owners as a first-class workflow, not a side feature.
- Datadis/CUPS/factura and PMS/reservation calendar as the core proof of uniqueness.
- Solar, battery and arbitrage as future opportunities and simulations, not the main promise.

### Change

- Add sharper Spanish-market proof: Datadis, CUPS, contracted power, owner reporting, and regulatory/data pressure.
- Reduce generic "save energy" language. The buyer is not buying sustainability; they are buying margin protection, fewer operational leaks and cleaner owner reporting.
- Avoid positioning against hotels/HVAC systems. Compete as the portfolio operating layer for tourist-property managers.
- Keep fincas as expansion path, not the headline for this Stitch version. Mixing fincas and tourist apartments in the first hero weakens the wedge.

## Product Viability

### Strongest buyer

Professional managers with roughly 20-300 tourist apartments, enough units for energy leakage and owner reporting to hurt, but not enough internal energy staff to build this themselves.

### Initial ICP pain

- Owner asks why expenses increased.
- Manager has PMS data and bills but no joined view.
- Consumption after checkout or before check-in is invisible until the bill arrives.
- Tariff/power review is manual, reactive and rarely unit-by-unit.
- Data regulation and platform compliance are pushing managers toward cleaner records.

### MVP must prove

1. Connect or import reservations.
2. Connect/import Datadis or invoice/CUPS data.
3. Detect off-reservation consumption and power anomalies.
4. Produce an owner-facing monthly report.
5. Recommend tariff/power checks without overclaiming guaranteed savings.

### Risks

- Datadis authorization friction can slow onboarding. Mitigation: support CSV/manual invoice import first.
- PMS integrations can become a long-tail trap. Mitigation: start with iCal/CSV/Hostaway/Guesty exports before deep integrations.
- Hardware is operationally heavy. Mitigation: keep Shelly/IoT as Phase 2 lead capture.
- If the copy over-expands to fincas, batteries and arbitrage, the user may not understand the first job-to-be-done.

## Changes To Apply In Stitch

- Landing: sharpen hero/subcopy around margin, Datadis/CUPS, PMS/reservations and owner reporting.
- Leads: qualify pilots by portfolio size, PMS, Datadis/CUPS access, invoice availability and owner-reporting pain.
- Pilot settings: make CSV/manual fallback and Datadis authorization explicit.
- Tariff/power: keep prudent language and avoid absolute ROI claims.
- Owner report: emphasize defensible owner communication, not just internal savings.

## Sources

- Eurostat, short-stay accommodation via online platforms, Q3 2025: https://ec.europa.eu/eurostat/web/products-eurostat-news/w/ddn-20260108-1
- INE/Data.gob.es tourist dwellings dataset: https://datos.gob.es/es/catalogo/ea0042823-viviendas-turisticas-plazas-y-plazas-por-vivienda-turistica-total-nacional-comunidades-autonomas-y-provincias-vte-identificador-api-39364
- BOE RD 1312/2024 Registro Unico/Ventanilla Unica Digital: https://www.boe.es/eli/es/rd/2024/12/23/1312
- Datadis overview via Iberdrola: https://www.iberdrolaespana.com/about-us/business-lines/smart-grids-spain/datadis
- REE PVPC methodology: https://www.ree.es/es/operacion/sistema-electrico/pvpc
- Operto energy/noise monitoring: https://operto.com/energy-noise-monitoring/
- SuiteOp SuiteConnect: https://suiteop.com/solutions/smart-devices
- Spacewell Energy management: https://spacewell.com/energy-management-software/
