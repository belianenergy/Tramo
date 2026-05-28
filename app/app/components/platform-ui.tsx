import type { ReactNode } from 'react'

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <header className="mb-5 grid gap-4 border-b border-[var(--color-border)] pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-ink)]">{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl text-pretty font-display text-3xl font-semibold text-[var(--color-ink)] md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--color-muted)] md:text-base">{description}</p>
      </div>
      {action}
    </header>
  )
}

export function MetricTile({ label, value, unit, note }: { label: string; value: string; unit: string; note: string }) {
  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <p className="text-sm font-medium text-[var(--color-muted)]">{label}</p>
      <div className="mt-3 flex items-end gap-2">
        <span className="font-mono text-3xl font-semibold leading-none text-[var(--color-ink)]">{value}</span>
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-soft)]">{unit}</span>
      </div>
      <p className="mt-3 text-xs leading-5 text-[var(--color-muted)]">{note}</p>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const critical = status === 'Critica' || status === 'Alta'
  const ok = status === 'Correcta'
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full border px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em] ${
        critical
          ? 'border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
          : ok
            ? 'border-[var(--color-success)]/35 bg-[var(--color-success)]/10 text-[var(--color-success)]'
            : 'border-[var(--color-border-strong)] bg-[var(--color-surface-alt)] text-[var(--color-muted)]'
      }`}
    >
      {status}
    </span>
  )
}

export function MiniBars({ values, color = 'var(--color-ink)' }: { values: number[]; color?: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex h-24 items-end gap-1">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex-1 rounded-t-sm bg-[var(--color-surface-alt)]">
          <div className="rounded-t-sm" style={{ height: `${(value / max) * 96}px`, background: color }} />
        </div>
      ))}
    </div>
  )
}

export function ContextPanel() {
  return (
    <aside className="space-y-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 lg:sticky lg:top-24">
      <div>
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--color-soft)]">Contexto activo</p>
        <h2 className="mt-2 font-display text-xl font-semibold">VGO-014 · Vigo Centro</h2>
        <p className="mt-1 font-mono text-xs text-[var(--color-muted)]">ES0021000009347621TR</p>
      </div>
      {[
        ['Ocupacion', 'Vacío · checkout 11:00'],
        ['Ultima lectura', '19:10 · Datadis + Shelly'],
        ['Responsable', 'Operaciones Norte'],
        ['Contrato', '2.0TD · P1/P2/P3'],
      ].map(([label, value]) => (
        <div key={label} className="border-t border-[var(--color-border)] pt-3">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-soft)]">{label}</p>
          <p className="mt-1 text-sm font-medium text-[var(--color-ink)]">{value}</p>
        </div>
      ))}
      <button className="min-h-10 w-full rounded-lg bg-[var(--color-ink)] px-3 text-sm font-semibold text-[var(--color-lime)]">Abrir ficha de unidad</button>
    </aside>
  )
}
