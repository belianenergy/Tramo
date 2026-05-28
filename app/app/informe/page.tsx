'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, Download, Euro, FileText, Send, Zap } from 'lucide-react'
import AppShell from '../components/AppShell'
import { PageHeader } from '../components/platform-ui'

const owners = [
  { name: 'Martínez Family', unit: 'VGO-014 · Vigo Centro', cups: 'ES0021000009347621TR', kwh: '428', outside: '42', actions: '5', eur: '31,80' },
  { name: 'López Gestión', unit: 'COR-007 · A Coruña Marina', cups: 'ES0022000001187309YA', kwh: '386', outside: '21', actions: '3', eur: '46,20' },
  { name: 'Costa Rentals', unit: 'BCN-055 · Barcelona Eixample', cups: 'ES0031400005589034QB', kwh: '512', outside: '58', actions: '7', eur: '84,70' },
  { name: 'Iberhome Partners', unit: 'MDR-003 · Madrid Letras', cups: 'ES0021000017721033KV', kwh: '501', outside: '12', actions: '2', eur: '19,40' },
]

const actions = [
  'Separación de consumo por estancia, operativo y fuera de reserva.',
  'Revisión de potencia P1/P2 con recomendación prudente basada en picos reales.',
  'Aplicación de regla post-checkout para termo y climatización.',
  'Validación de CUPS/Datadis frente a reservas PMS del mes.',
]

export default function InformePage() {
  const [ownerName, setOwnerName] = useState(owners[0].name)
  const [month, setMonth] = useState('Mayo 2026')
  const owner = useMemo(() => owners.find((item) => item.name === ownerName) ?? owners[0], [ownerName])
  const metrics = [
    ['kWh totales', owner.kwh, 'kWh', Zap],
    ['kWh fuera reserva', owner.outside, 'kWh', CalendarDays],
    ['Acciones', owner.actions, 'ejecutadas', FileText],
    ['EUR estimados', owner.eur, 'EUR', Euro],
  ] as const

  return (
    <AppShell>
      <div className="min-h-screen bg-[var(--color-paper)]">
        <div className="mx-auto max-w-7xl px-0 py-2 md:py-4">
          <PageHeader
            eyebrow="Reports · owners"
            title="Informes defendibles para propietarios, no dashboards exportados."
            description="Cada resumen separa estancia, operativo y fuera de reserva con CUPS, acciones ejecutadas e impacto estimado."
          />

          <section className="mb-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="grid gap-4 md:grid-cols-[1fr_220px_auto] md:items-end">
              <label className="text-sm font-semibold text-[var(--color-ink)]">
                Propietario
                <select value={ownerName} onChange={(event) => setOwnerName(event.target.value)} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-ink)]">
                  {owners.map((item) => <option key={item.name}>{item.name}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-[var(--color-ink)]">
                Mes
                <select value={month} onChange={(event) => setMonth(event.target.value)} className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-ink)]">
                  {['Mayo 2026', 'Abril 2026', 'Marzo 2026'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-ink)] px-4 py-2 text-sm font-semibold text-[var(--color-surface)] hover:opacity-90">
                <Send className="h-4 w-4" /> Enviar
              </button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {metrics.map(([label, value, unit, Icon]) => (
              <div key={label} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <Icon className="h-5 w-5 text-[var(--color-accent-ink)]" />
                <p className="mt-4 text-sm font-medium text-[var(--color-muted)]">{label}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-semibold text-[var(--color-ink)]">{value}</span>
                  <span className="text-xs font-semibold uppercase text-[var(--color-accent-ink)]">{unit}</span>
                </div>
              </div>
            ))}
          </section>

          <section className="mt-5 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="text-xs font-semibold uppercase text-[var(--color-accent-ink)]">Informe listo para propietario</p>
              <h2 className="mt-2 font-display text-2xl font-semibold text-[var(--color-ink)]">{owner.name}</h2>
              <p className="mt-1 text-sm text-[var(--color-muted)]">{owner.unit} · {owner.cups}</p>
              <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                <p className="text-sm leading-6 text-[var(--color-muted)]">
                  En {month} se registraron <strong className="text-[var(--color-ink)]">{owner.kwh} kWh</strong>. Tramo separó <strong className="text-[var(--color-ink)]">{owner.outside} kWh</strong> fuera de reserva y documentó <strong className="text-[var(--color-ink)]">{owner.actions} acciones</strong> con impacto estimado de <strong className="text-[var(--color-ink)]">{owner.eur} EUR</strong>.
                </p>
              </div>
              <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]">
                <Download className="h-4 w-4" /> Descargar PDF
              </button>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <h3 className="font-display text-lg font-semibold text-[var(--color-ink)]">Detalle incluido</h3>
              <div className="mt-4 space-y-3">
                {actions.map((action, index) => (
                  <div key={action} className="flex gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] font-mono text-xs font-semibold text-[var(--color-accent)]">{index + 1}</span>
                    <p className="text-sm leading-6 text-[var(--color-muted)]">{action}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  )
}
