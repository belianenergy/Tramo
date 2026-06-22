'use client'

import { useMemo, useState } from 'react'
import { ReceiptText } from 'lucide-react'
import AppShell from '../components/AppShell'
import { tariffBands, units } from '../components/platform-data'
import { ContextPanel, MetricTile, PageHeader } from '../components/platform-ui'

const recommendations = [
  ['COR-007', 'P2 4,6 kW -> 3,3 kW', 'Pico real P2 2,8 kW · margen prudente 0,5 kW', '138 EUR/año', 'Preparar cambio'],
  ['VGO-014', 'Mover termo a P3', 'Consumo recurrente 02:10-05:40 con apartamento vacio', '74 EUR/año', 'Crear regla'],
  ['BCN-055', 'Factura pendiente', 'CUPS con consumo validado pero factura sin adjuntar', 'Riesgo cierre', 'Pedir PDF'],
  ['MDR-003', 'Sin accion tarifaria', 'Contrato indexado y picos dentro de potencia', '0 EUR', 'Mantener'],
]

export default function AdvisorPage() {
  const [selected, setSelected] = useState(units[1].code)
  const unit = useMemo(() => units.find((item) => item.code === selected) ?? units[1], [selected])
  const annualSpend = Math.round(unit.totalKwh * 12 * 0.14)

  return (
    <AppShell>
      <PageHeader
        eyebrow="Contratos · CUPS"
        title="Contratos, facturas y periodos P1/P2/P3 revisados con datos reales."
        description="No es un asesor genérico: compara potencia contratada, curva horaria, reserva y factura para decidir qué cambio merece aprobación."
        action={<button className="min-h-11 rounded-[8px] bg-[var(--color-ink)] px-5 text-sm font-semibold text-[var(--color-mint-pulse)]">Generar paquete para comercializadora</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="CUPS auditados" value="124" unit="activos" note="Datadis + factura + PMS." />
            <MetricTile label="Ahorro tarifa" value="412" unit="EUR/mes" note="Cambios pendientes de aprobar." />
            <MetricTile label="Facturas faltantes" value="7" unit="PDF" note="Bloquean cierre propietario." />
            <MetricTile label="Potencia revisable" value="18" unit="CUPS" note="P1/P2 con margen prudente." />
          </section>

          <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
            <article className="rounded-[16px] border border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)] p-5">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-[var(--color-cream-paper)] text-[var(--color-canopy)]">
                  <ReceiptText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-semibold">Ficha contrato</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Selecciona un CUPS para revisar potencia y factura.</p>
                </div>
              </div>
              <label className="mt-5 block text-sm font-semibold">
                Unidad
                <select value={selected} onChange={(event) => setSelected(event.target.value)} className="mt-2 min-h-11 w-full max-w-full rounded-[4px] border border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)] px-3 font-mono text-xs sm:text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-[var(--color-canopy)]">
                  {units.map((item) => (
                    <option key={item.code} value={item.code}>{item.code} · {item.cups}</option>
                  ))}
                </select>
              </label>
              <div className="mt-5 space-y-3">
                {[
                  ['Contrato', unit.tariff],
                  ['Consumo mensual', `${unit.totalKwh} kWh`],
                  ['Coste anualizado', `${annualSpend} EUR`],
                  ['Lectura', unit.reading],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 border-t border-[var(--color-sage-mist)] pt-3 text-sm">
                    <span className="text-[var(--color-muted-slate)]">{label}</span>
                    <span className="text-right font-mono text-[var(--color-ink)]">{value}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[16px] border border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)] p-5">
              <h2 className="font-display text-xl font-semibold">Periodos tarifarios</h2>
              <p className="mt-1 text-sm text-[var(--color-muted-slate)]">Pregunta: ¿dónde se concentra el coste que sí se puede mover?</p>
              <div className="mt-6 space-y-4">
                {tariffBands.map((band) => (
                  <div key={band.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-semibold">{band.label}</span>
                      <span className="font-mono text-[var(--color-muted-slate)]">{band.price}</span>
                    </div>
                    <div className="h-7 rounded-md bg-[var(--color-cream-paper)]">
                      <div className="h-7 rounded-md" style={{ width: `${(band.kwh / 784) * 100}%`, background: band.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="overflow-hidden rounded-[16px] border border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)]">
            <div className="grid grid-cols-[110px_1fr_1.4fr_120px_130px] gap-4 border-b border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)] px-4 py-3 text-xs font-semibold uppercase text-[var(--color-muted-slate)] max-lg:hidden">
              <span>Unidad</span><span>Recomendación</span><span>Evidencia</span><span>Impacto</span><span>Acción</span>
            </div>
            {recommendations.map(([code, rec, evidence, impact, action]) => (
              <div key={code} className="grid gap-3 border-b border-[var(--color-sage-mist)] px-4 py-4 last:border-b-0 xl:grid-cols-[110px_1fr_1.4fr_120px_130px] xl:items-center">
                <span className="font-mono text-sm font-semibold">{code}</span>
                <span className="text-sm font-semibold">{rec}</span>
                <span className="text-sm text-[var(--color-muted-slate)]">{evidence}</span>
                <span className="font-mono text-sm">{impact}</span>
                <button className="min-h-9 w-fit rounded-[8px] border border-[var(--color-sage-mist)] px-3 text-xs font-semibold">{action}</button>
              </div>
            ))}
          </section>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
