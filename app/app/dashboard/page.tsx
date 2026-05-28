'use client'

import { CheckCircle2, FileText, ShieldAlert, Zap } from 'lucide-react'
import AppShell from '../components/AppShell'
import { actions, dailyLoad, tariffBands, units } from '../components/platform-data'
import { ContextPanel, MetricTile, MiniBars, PageHeader, StatusBadge } from '../components/platform-ui'

export default function DashboardPage() {
  const outside = units.reduce((sum, unit) => sum + unit.outsideKwh, 0)
  const forecast = units.reduce((sum, unit) => sum + unit.cost, 0)
  const impact = actions.reduce((sum, action) => sum + action.impact, 0)

  return (
    <AppShell>
      <PageHeader
        eyebrow="Command Center · Mayo 2026"
        title="Sala de control para decidir que coste energetico se aprueba hoy."
        description="Cartera profesional de apartamentos turisticos: reservas, CUPS, facturas, periodos P1/P2/P3 y reglas operativas en una cola diaria de decisiones."
        action={<button className="min-h-11 rounded-lg bg-[var(--color-ink)] px-5 text-sm font-semibold text-[var(--color-lime)]">Iniciar review diario</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Ahorro pendiente" value={`${impact}`} unit="EUR/mes" note="Acciones aprobables con evidencia." />
            <MetricTile label="Fuera de reserva" value={`${outside}`} unit="kWh" note="Separado de estancia y limpieza." />
            <MetricTile label="Coste previsto" value={`${Math.round(forecast)}`} unit="EUR" note="Lecturas hasta las 19:10." />
            <MetricTile label="Propietarios" value="12/14" unit="listos" note="Informes con desglose defendible." />
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-semibold">Carga de la cartera</h2>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">Pregunta: que dias concentran coste accionable?</p>
                </div>
                <span className="font-mono text-xs text-[var(--color-soft)]">24 dias</span>
              </div>
              <div className="mt-6">
                <MiniBars values={dailyLoad} color="var(--color-ink)" />
              </div>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {tariffBands.map((band) => (
                  <div key={band.label} className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3">
                    <p className="text-xs font-semibold text-[var(--color-muted)]">{band.label}</p>
                    <p className="mt-2 font-mono text-lg font-semibold">{band.kwh} kWh</p>
                    <p className="font-mono text-[0.68rem] text-[var(--color-soft)]">{band.price}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-[var(--color-border)] bg-[var(--color-ink)] p-5 text-[var(--color-paper)]">
              <div className="flex items-center gap-2 text-[var(--color-lime)]">
                <ShieldAlert className="h-5 w-5" />
                <h2 className="font-display text-xl font-semibold">Review diario</h2>
              </div>
              <p className="mt-2 text-sm leading-6 text-white/62">Cola priorizada por impacto economico, no por ruido de sensores.</p>
              <div className="mt-5 space-y-3">
                {actions.slice(0, 3).map((action) => (
                  <div key={action.id} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[0.68rem] text-[var(--color-lime)]">{action.id} · {action.unit}</p>
                        <p className="mt-1 text-sm font-semibold">{action.title}</p>
                      </div>
                      <span className="font-mono text-sm text-[var(--color-lime)]">{action.impact} EUR</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-white/50">{action.evidence}</p>
                    <button className="mt-3 min-h-9 rounded-md bg-[var(--color-lime)] px-3 text-xs font-semibold text-[var(--color-ink)]">{action.approval}</button>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="grid grid-cols-[110px_1.1fr_1fr_1.35fr_90px_90px_100px] gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)] max-lg:hidden">
              <span>Codigo</span><span>Unidad</span><span>Propietario</span><span>CUPS / contrato</span><span>Total</span><span>Fuera</span><span>Estado</span>
            </div>
            {units.map((unit) => (
              <div key={unit.code} className="grid gap-3 border-b border-[var(--color-border)] px-4 py-4 last:border-b-0 lg:grid-cols-[110px_1.1fr_1fr_1.35fr_90px_90px_100px] lg:items-center">
                <span className="font-mono text-sm font-semibold">{unit.code}</span>
                <span className="text-sm font-semibold">{unit.name}<span className="block text-xs font-normal text-[var(--color-muted)]">{unit.city} · {unit.pms}</span></span>
                <span className="text-sm text-[var(--color-muted)]">{unit.owner}</span>
                <span className="font-mono text-xs text-[var(--color-muted)]">{unit.cups}<span className="block">{unit.tariff}</span></span>
                <span className="font-mono text-sm">{unit.totalKwh} kWh</span>
                <span className="font-mono text-sm text-[var(--color-warning)]">{unit.outsideKwh} kWh</span>
                <StatusBadge status={unit.status} />
              </div>
            ))}
          </section>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
