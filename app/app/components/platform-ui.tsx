import type { ReactNode } from 'react'

// ── Page Header ──

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <header className="mb-5 grid gap-4 pb-5 lg:grid-cols-[1fr_auto] lg:items-end" style={{ borderBottom: '1px solid var(--color-sage-mist)' }}>
      <div>
        <p className="font-display text-[13px] font-bold uppercase tracking-[0.07em]" style={{ color: 'var(--color-mint-dark)' }}>{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl font-display text-3xl font-light leading-[1.1] md:text-[clamp(2rem,4vw,3rem)]" style={{ letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>{description}</p>
      </div>
      {action}
    </header>
  )
}

// ── Metric Tile ──

export function MetricTile({ label, value, unit, note, accent = 'var(--ink)' }: { label: string; value: string; unit: string; note: string; accent?: string }) {
  return (
    <div className="min-w-0 rounded-[12px] p-4 transition-[border-color,box-shadow] duration-200" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
      <div className="flex min-w-0 items-center gap-2">
        <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <p className="min-w-0 text-xs font-medium leading-snug" style={{ color: 'var(--color-muted-slate)' }}>{label}</p>
      </div>
      <div className="mt-2 flex min-w-0 flex-wrap items-end gap-x-2 gap-y-1">
        <span className="font-display text-2xl font-light" style={{ letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>{value}</span>
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.08em]" style={{ color: accent }}>{unit}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--color-muted-slate)' }}>{note}</p>
    </div>
  )
}

// ── Status Badge ──

export function StatusBadge({ status }: { status: string }) {
  const critical = status === 'Crítica' || status === 'Alta'
  const ok = status === 'Correcta'
  const colors = critical
    ? { bg: 'var(--color-status-danger-bg)', color: 'var(--color-canopy)', border: 'var(--color-status-danger-border)' }
    : ok
      ? { bg: 'var(--color-status-info-bg)', color: 'var(--color-canopy)', border: 'var(--color-status-info-border)' }
      : { bg: 'var(--color-status-warning-bg)', color: 'var(--color-mint-dark)', border: 'var(--color-status-warning-border)' }

  return (
    <span
      className="inline-flex w-fit items-center rounded-[9999px] px-2.5 py-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.08em]"
      style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
    >
      {status}
    </span>
  )
}

// ── Mini Bars ──

export function MiniBars({ values, color = 'var(--ink)' }: { values: number[]; color?: string }) {
  const max = Math.max(...values)
  return (
    <div className="flex h-24 items-end gap-1">
      {values.map((value, index) => (
        <div key={`${value}-${index}`} className="flex-1 rounded-t-sm">
          <div className="rounded-t-sm" style={{ height: `${(value / max) * 96}px`, background: color, opacity: 0.7 }} />
        </div>
      ))}
    </div>
  )
}

// ── Context Panel ──

export function ContextPanel() {
  return (
    <aside className="rounded-[16px] p-4 lg:sticky lg:top-20" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
      <div>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Contexto activo</p>
        <h2 className="mt-2 font-display text-lg font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>VGO-014 · Vigo Centro</h2>
        <p className="mt-1 font-mono text-xs" style={{ color: 'var(--color-slate)' }}>ES0021000009347621TR</p>
      </div>
      {[
        ['Ocupación', 'Vacío · salida 11:00'],
        ['Última lectura', '19:10 · Datadis + sensores'],
        ['Responsable', 'Operaciones Norte'],
        ['Contrato', '2.0TD · P1/P2/P3'],
      ].map(([label, value]) => (
        <div key={label} className="pt-3" style={{ borderTop: '1px solid var(--color-sage-mist)' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>{label}</p>
          <p className="mt-1 text-sm font-medium" style={{ color: 'var(--color-bark)' }}>{value}</p>
        </div>
      ))}
      <button className="mt-4 min-h-10 w-full rounded-[8px] px-4 text-sm font-medium transition-[background-color] duration-200" style={{ border: '1px solid var(--color-sage-mist)', color: 'var(--color-slate)' }}>
        Abrir ficha de unidad
      </button>
    </aside>
  )
}
