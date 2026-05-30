import type { ReactNode } from 'react'

// ── Page Header ──

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return (
    <header className="mb-5 grid gap-4 pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--color-rose)' }}>{eyebrow}</p>
        <h1 className="mt-2 max-w-4xl font-display text-3xl font-light leading-[1.1] text-[var(--ink)] md:text-[clamp(2rem,4vw,3rem)]" style={{ letterSpacing: '-0.04em' }}>{title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed" style={{ color: 'var(--graphite)' }}>{description}</p>
      </div>
      {action}
    </header>
  )
}

// ── Metric Tile ──

export function MetricTile({ label, value, unit, note, accent = 'var(--ink)' }: { label: string; value: string; unit: string; note: string; accent?: string }) {
  return (
    <div className="rounded-[20px] p-4 transition-all duration-200" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(24px)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full" style={{ background: accent }} />
        <p className="text-xs font-medium" style={{ color: 'var(--slate)' }}>{label}</p>
      </div>
      <div className="mt-2 flex items-end gap-2">
        <span className="font-display text-2xl font-light text-[var(--ink)]" style={{ letterSpacing: '-0.03em' }}>{value}</span>
        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.10em]" style={{ color: accent }}>{unit}</span>
      </div>
      <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--slate)' }}>{note}</p>
    </div>
  )
}

// ── Status Badge ──

export function StatusBadge({ status }: { status: string }) {
  const critical = status === 'Critica' || status === 'Alta'
  const ok = status === 'Correcta'
  const colors = critical
    ? { bg: 'rgba(250, 61, 29, 0.08)', color: '#fa3d1d', border: 'rgba(250, 61, 29, 0.2)' }
    : ok
      ? { bg: 'rgba(3, 88, 247, 0.08)', color: '#0358f7', border: 'rgba(3, 88, 247, 0.2)' }
      : { bg: 'rgba(255, 176, 5, 0.08)', color: '#ffb005', border: 'rgba(255, 176, 5, 0.2)' }

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
    <aside className="rounded-[20px] p-4 lg:sticky lg:top-20" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(24px)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
      <div>
        <p className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--slate)' }}>Contexto activo</p>
        <h2 className="mt-2 font-display text-lg font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>VGO-014 · Vigo Centro</h2>
        <p className="mt-1 font-mono text-xs" style={{ color: 'var(--graphite)' }}>ES0021000009347621TR</p>
      </div>
      {[
        ['Ocupación', 'Vacío · checkout 11:00'],
        ['Última lectura', '19:10 · Datadis + Shelly'],
        ['Responsable', 'Operaciones Norte'],
        ['Contrato', '2.0TD · P1/P2/P3'],
      ].map(([label, value]) => (
        <div key={label} className="pt-3" style={{ borderTop: '1px solid var(--fog)' }}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--slate)' }}>{label}</p>
          <p className="mt-1 text-sm font-medium text-[var(--ink)]">{value}</p>
        </div>
      ))}
      <button className="mt-4 min-h-10 w-full rounded-[30px] bg-[var(--pebble)] px-4 text-sm font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--snow)]">
        Abrir ficha de unidad
      </button>
    </aside>
  )
}
