'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Clock, Euro, ShieldAlert } from 'lucide-react'
import AppShell from '../components/AppShell'
import { actions } from '../components/platform-data'
import { ContextPanel, MetricTile, PageHeader, StatusBadge } from '../components/platform-ui'

const tabs = ['Todas', 'Fuera de reserva', 'Tarifa/Potencia', 'Regla', 'Informe'] as const

export default function OperationsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Todas')
  const filtered = useMemo(() => (tab === 'Todas' ? actions : actions.filter((action) => action.type === tab)), [tab])

  return (
    <AppShell>
      <PageHeader
        eyebrow="Optimization · alertas"
        title="De anomalía energética a decisión aprobable con impacto económico."
        description="La cola diaria convierte lecturas, reservas, facturas y reglas fallidas en acciones que operaciones puede aprobar sin abrir cinco herramientas."
        action={<button className="min-h-11 rounded-[8px] px-5 text-sm font-medium" style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>Aprobar lote seguro</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricTile label="Acciones abiertas" value={`${actions.length}`} unit="hoy" note="Priorizadas por euros." />
            <MetricTile label="Impacto estimado" value={`${actions.reduce((s, a) => s + a.impact, 0)}`} unit="EUR" note="Mensual recurrente." />
            <MetricTile label="Fuera reserva" value="2" unit="alertas" note="Con ventana PMS validada." />
            <MetricTile label="SLA lectura" value="96" unit="%" note="Datadis y sensores frescos." />
          </section>

          <div className="flex flex-wrap gap-2 rounded-[8px] p-2" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className={`min-h-10 rounded-[8px] px-3 text-sm font-semibold ${tab === item ? 'bg-[var(--color-bark)] text-[var(--color-sheet-white)]' : 'text-[var(--color-muted-slate)] hover:bg-[var(--color-sheet-white)]'}`}>
                {item}
              </button>
            ))}
          </div>

          <section className="space-y-3">
            {filtered.map((action) => (
              <article key={action.id} className="rounded-[16px] p-4" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                <div className="grid gap-4 xl:grid-cols-[1fr_150px_150px] xl:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold" style={{ color: 'var(--color-canopy)' }}>{action.id} · {action.unit}</span>
                      <StatusBadge status={action.priority} />
                    </div>
                    <h2 className="mt-2 font-display text-xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-bark)' }}>{action.title}</h2>
                    <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-muted-slate)' }}>{action.evidence}</p>
                  </div>
                  <div className="rounded-[8px] p-3" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-sheet-white)' }}>
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}><Euro className="h-3.5 w-3.5" /> Impacto</p>
                    <p className="mt-2 font-mono text-2xl font-semibold" style={{ color: 'var(--color-bark)' }}>{action.impact} EUR</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="min-h-10 rounded-[8px] px-3 text-sm font-semibold" style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>Aprobar</button>
                    <button className="min-h-10 rounded-[8px] px-3 text-sm font-semibold" style={{ border: '1px solid var(--color-sage-mist)', color: 'var(--color-slate)' }}>Asignar</button>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 pt-3 text-xs sm:grid-cols-3" style={{ borderTop: '1px solid var(--color-sage-mist)', color: 'var(--color-muted-slate)' }}>
                  <span className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5" /> {action.type}</span>
                  <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" /> Review diario</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5" /> {action.approval}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
