'use client'

import type { Community } from '@/lib/types'

interface CommunityTableProps {
  communities: Community[]
  onSelect?: (community: Community) => void
}

export default function CommunityTable({ communities, onSelect }: CommunityTableProps) {
  return (
    <div className="rounded-[8px] overflow-hidden" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Comunidad</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Ciudad</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Unidades</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Consumo</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Coste</th>
            <th className="text-center px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted-slate)' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((c, i) => (
            <tr
              key={c.id}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              style={{
                borderBottom: i < communities.length - 1 ? '1px solid var(--color-sage-mist)' : 'none',
                transition: 'background-color var(--dur-short) var(--ease-out)',
              }}
              onClick={() => onSelect?.(c)}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-cream-paper)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(c) } }}
            >
              <td className="px-5 py-3.5">
                <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-slate)' }}>{c.address}</p>
              </td>
              <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--color-slate)' }}>{c.city}</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono tabular-nums" style={{ color: 'var(--color-ink)' }}>{c.units}</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono tabular-nums" style={{ color: 'var(--color-ink)' }}>{c.totalKwh.toLocaleString('es-ES')} kWh</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono tabular-nums" style={{ color: 'var(--color-ink)' }}>{c.totalCost.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</td>
              <td className="px-5 py-3.5 text-center">
                <StatusBadge status={c.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const config = status === 'optimized'
    ? { bg: 'var(--color-status-success-bg)', text: 'var(--color-status-success)', border: 'var(--color-status-success-border)' }
    : status === 'warning'
      ? { bg: 'var(--color-status-warning-bg)', text: 'var(--color-status-warning)', border: 'var(--color-status-warning-border)' }
      : { bg: 'var(--color-status-danger-bg)', text: 'var(--color-canopy)', border: 'var(--color-status-danger-border)' }

  const label = status === 'optimized' ? 'Optimizado' : status === 'warning' ? 'Atención' : 'Alerta'

  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      style={{ background: config.bg, color: config.text, border: `1px solid ${config.border}` }}
    >
      {label}
    </span>
  )
}
