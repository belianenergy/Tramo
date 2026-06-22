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
        action={<button className="min-h-11 rounded-[8px] px-5 text-sm font-semibold" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', color: 'var(--color-slate)' }}>Importar CUPS / facturas</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Unidades" value={`${units.length}`} unit="activas" note="PMS, CUPS y propietario." />
            <MetricTile label="Ocupacion media" value="76" unit="%" note="Reservas actuales y futuras." />
            <MetricTile label="Coste trazado" value="384" unit="EUR" note="Mayo hasta ultima lectura." />
            <MetricTile label="Sensores" value="68" unit="%" note="Sensor opcional por unidad." />
          </section>

          <div className="flex flex-wrap gap-2 rounded-[8px] p-2" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            {views.map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`min-h-10 rounded-[8px] px-3 text-sm font-semibold transition ${view === item ? 'bg-[var(--color-bark)] text-[var(--color-sheet-white)]' : 'text-[var(--color-muted-slate)] hover:bg-[var(--color-sheet-white)]'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <section className="overflow-hidden rounded-[16px]" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <div className="grid grid-cols-[36px_110px_1.2fr_1fr_1.35fr_90px_110px] gap-4 px-4 py-3 text-xs font-semibold uppercase max-lg:hidden" style={{ borderBottom: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', color: 'var(--color-muted-slate)' }}>
              <span></span><span>Codigo</span><span>Unidad</span><span>Propietario</span><span>CUPS</span><span>Lectura</span><span>Estado</span>
            </div>
            {filtered.map((unit) => (
              <div key={unit.code} className="grid gap-3 px-4 py-4 last:border-b-0 lg:grid-cols-[36px_110px_1.2fr_1fr_1.35fr_90px_110px] lg:items-center" style={{ borderBottom: '1px solid var(--color-sage-mist)' }}>
                <input type="checkbox" aria-label={`Seleccionar ${unit.code}`} className="h-4 w-4 accent-[var(--color-canopy)]" />
                <span className="font-mono text-sm font-semibold" style={{ color: 'var(--color-bark)' }}>{unit.code}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-bark)' }}>{unit.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted-slate)' }}>{unit.city} · {unit.occupancy}% ocupacion · {unit.pms}</p>
                </div>
                <span className="text-sm" style={{ color: 'var(--color-slate)' }}>{unit.owner}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--color-muted-slate)' }}>{unit.cups}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--color-muted-slate)' }}>{unit.reading}</span>
                <StatusBadge status={unit.status} />
              </div>
            ))}
          </section>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] p-4" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <p className="text-sm" style={{ color: 'var(--color-muted-slate)' }}>Bulk actions para {filtered.length} unidades visibles: asignar responsable, pedir factura, cambiar vista, exportar CSV.</p>
            <button className="min-h-10 rounded-[8px] px-4 text-sm font-semibold" style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>Aplicar accion masiva</button>
          </div>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
