'use client'

import type { Listing } from '@/lib/types'

interface PropertyCardProps {
  listing: Listing
  onView?: () => void
}

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  optimized: { label: 'Optimizado', bg: 'var(--color-status-success-bg)', text: 'var(--color-status-success)', border: 'var(--color-status-success-border)', dot: 'var(--color-status-success)' },
  warning: { label: 'Atención', bg: 'var(--color-status-warning-bg)', text: 'var(--color-status-warning)', border: 'var(--color-status-warning-border)', dot: 'var(--color-status-warning)' },
  alert: { label: 'Alerta', bg: 'var(--color-status-danger-bg)', text: 'var(--color-canopy)', border: 'var(--color-status-danger-border)', dot: 'var(--color-canopy)' },
}

export default function PropertyCard({ listing, onView }: PropertyCardProps) {
  const config = statusConfig[listing.status] ?? statusConfig.warning

  return (
    <div
      className="rounded-[16px] p-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-canopy)]"
      role="button"
      tabIndex={0}
      style={{
        border: '1px solid var(--color-sage-mist)',
        background: 'var(--color-cream-paper)',
        borderRadius: 12,
        transition: 'transform var(--dur-short) var(--ease-out), background-color var(--dur-short) var(--ease-out)',
      }}
      onClick={onView}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onView?.() } }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--color-ink)' }}>{listing.name}</h3>
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--color-slate)' }}>{listing.location}</p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2"
          style={{ background: config.bg, color: config.text, border: `1px solid ${config.border}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.dot }} />
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-muted-slate)' }}>Consumo</p>
          <p className="font-mono text-xl font-light tabular-nums" style={{ color: 'var(--color-canopy)' }}>{listing.monthlyKwh}</p>
          <p className="text-[10px]" style={{ color: 'var(--color-muted-slate)' }}>kWh/mes</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--color-muted-slate)' }}>Coste</p>
          <p className="font-mono text-xl font-light tabular-nums" style={{ color: 'var(--color-ink)' }}>{listing.monthlyCost.toFixed(2)}</p>
          <p className="text-[10px]" style={{ color: 'var(--color-muted-slate)' }}>€/mes</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-sage-mist)' }}>
        <div className="flex items-center gap-2">
          {listing.tenant ? (
            <>
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--color-cream-paper)' }}>
                <span className="text-[8px] font-bold" style={{ color: 'var(--color-muted-slate)' }}>{listing.tenant.charAt(0)}</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--color-muted-slate)' }}>{listing.tenant}</span>
            </>
          ) : (
            <span className="text-xs" style={{ color: 'var(--color-muted-slate)' }}>Sin inquilino</span>
          )}
        </div>
        <span className="text-xs font-medium" style={{
          color: listing.contractStatus === 'active' ? 'var(--color-status-success)' :
                 listing.contractStatus === 'pending' ? 'var(--color-status-warning)' :
                 'var(--color-muted-slate)'
        }}>
          {listing.contractStatus === 'active' ? 'Activo' :
           listing.contractStatus === 'pending' ? 'Pendiente' :
           'Inactivo'}
        </span>
      </div>
    </div>
  )
}
