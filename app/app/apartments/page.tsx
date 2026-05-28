'use client'

import { useMemo, useState } from 'react'
import AppShell from '../components/AppShell'
import { units } from '../components/platform-data'
import { ContextPanel, MetricTile, PageHeader, StatusBadge } from '../components/platform-ui'

const views = ['Todas', 'Costa alta ocupacion', 'Propietarios premium', 'Alertas >50 EUR', 'Sin lectura 24h'] as const

export default function ApartmentsPage() {
  const [view, setView] = useState<(typeof views)[number]>('Todas')
  const filtered = useMemo(() => {
    if (view === 'Todas') return units
    if (view === 'Alertas >50 EUR') return units.filter((unit) => unit.cost > 50 && unit.status !== 'Correcta')
    if (view === 'Sin lectura 24h') return units.filter((unit) => unit.reading.includes('hace'))
    return units.filter((unit) => unit.segment === view)
  }, [view])

  return (
    <AppShell>
      <PageHeader
        eyebrow="Portfolio · unidades"
        title="Una cartera navegable por ciudad, propietario, CUPS, reserva y riesgo."
        description="Vista densa para carteras grandes: filtros guardados, seleccion multiple, trazabilidad por propietario y estado de lectura."
        action={<button className="min-h-11 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-semibold">Importar CUPS / facturas</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Unidades" value={`${units.length}`} unit="activas" note="PMS, CUPS y propietario." />
            <MetricTile label="Ocupacion media" value="76" unit="%" note="Reservas actuales y futuras." />
            <MetricTile label="Coste trazado" value="384" unit="EUR" note="Mayo hasta ultima lectura." />
            <MetricTile label="Sensores" value="68" unit="%" note="Shelly opcional por unidad." />
          </section>

          <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            {views.map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`min-h-10 rounded-md px-3 text-sm font-semibold transition ${view === item ? 'bg-[var(--color-ink)] text-[var(--color-lime)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-alt)]'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <section className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="grid grid-cols-[36px_110px_1.2fr_1fr_1.35fr_90px_110px] gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-xs font-semibold uppercase text-[var(--color-muted)] max-lg:hidden">
              <span></span><span>Codigo</span><span>Unidad</span><span>Propietario</span><span>CUPS</span><span>Lectura</span><span>Estado</span>
            </div>
            {filtered.map((unit) => (
              <div key={unit.code} className="grid gap-3 border-b border-[var(--color-border)] px-4 py-4 last:border-b-0 lg:grid-cols-[36px_110px_1.2fr_1fr_1.35fr_90px_110px] lg:items-center">
                <input type="checkbox" aria-label={`Seleccionar ${unit.code}`} className="h-4 w-4 accent-[var(--color-ink)]" />
                <span className="font-mono text-sm font-semibold">{unit.code}</span>
                <div>
                  <p className="text-sm font-semibold">{unit.name}</p>
                  <p className="text-xs text-[var(--color-muted)]">{unit.city} · {unit.occupancy}% ocupacion · {unit.pms}</p>
                </div>
                <span className="text-sm text-[var(--color-muted)]">{unit.owner}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">{unit.cups}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">{unit.reading}</span>
                <StatusBadge status={unit.status} />
              </div>
            ))}
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <p className="text-sm text-[var(--color-muted)]">Bulk actions para {filtered.length} unidades visibles: asignar responsable, pedir factura, cambiar vista, exportar CSV.</p>
            <button className="min-h-10 rounded-lg bg-[var(--color-ink)] px-4 text-sm font-semibold text-[var(--color-lime)]">Aplicar accion masiva</button>
          </div>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
