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
        title="De anomalia energetica a decision aprobable con impacto economico."
        description="La cola diaria convierte lecturas, reservas, facturas y reglas fallidas en acciones que operaciones puede aprobar sin abrir cinco herramientas."
        action={<button className="min-h-11 rounded-lg bg-[var(--color-ink)] px-5 text-sm font-semibold text-[var(--color-lime)]">Aprobar lote seguro</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Acciones abiertas" value={`${actions.length}`} unit="hoy" note="Priorizadas por euros." />
            <MetricTile label="Impacto estimado" value={`${actions.reduce((s, a) => s + a.impact, 0)}`} unit="EUR" note="Mensual recurrente." />
            <MetricTile label="Fuera reserva" value="2" unit="alertas" note="Con ventana PMS validada." />
            <MetricTile label="SLA lectura" value="96" unit="%" note="Datadis y sensores frescos." />
          </section>

          <div className="flex flex-wrap gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
            {tabs.map((item) => (
              <button key={item} onClick={() => setTab(item)} className={`min-h-10 rounded-md px-3 text-sm font-semibold ${tab === item ? 'bg-[var(--color-ink)] text-[var(--color-lime)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-alt)]'}`}>
                {item}
              </button>
            ))}
          </div>

          <section className="space-y-3">
            {filtered.map((action) => (
              <article key={action.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <div className="grid gap-4 lg:grid-cols-[1fr_150px_150px] lg:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[var(--color-accent-ink)]">{action.id} · {action.unit}</span>
                      <StatusBadge status={action.priority} />
                    </div>
                    <h2 className="mt-2 font-display text-xl font-semibold">{action.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{action.evidence}</p>
                  </div>
                  <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
                    <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-soft)]"><Euro className="h-3.5 w-3.5" /> Impacto</p>
                    <p className="mt-2 font-mono text-2xl font-semibold">{action.impact} EUR</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="min-h-10 rounded-lg bg-[var(--color-ink)] px-3 text-sm font-semibold text-[var(--color-lime)]">Aprobar</button>
                    <button className="min-h-10 rounded-lg border border-[var(--color-border)] px-3 text-sm font-semibold text-[var(--color-muted)]">Asignar</button>
                  </div>
                </div>
                <div className="mt-4 grid gap-2 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-muted)] sm:grid-cols-3">
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
