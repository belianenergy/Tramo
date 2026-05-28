'use client'

import type { Listing } from '@/lib/types'

interface PropertyCardProps {
  listing: Listing
  onView?: () => void
}

export default function PropertyCard({ listing, onView }: PropertyCardProps) {
  const statusConfig = {
    optimized: { label: 'Optimizado', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
    warning: { label: 'Atención', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    alert: { label: 'Alerta', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  }
  const config = statusConfig[listing.status]

  return (
    <div
      className="bg-white rounded-xl border p-5 transition-all hover:shadow-md cursor-pointer"
      style={{ borderColor: 'var(--border)', borderRadius: 12 }}
      onClick={onView}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{listing.name}</h3>
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>{listing.location}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0 ml-2 ${config.bg} ${config.text} border ${config.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
          {config.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>Consumo</p>
          <p className="font-mono text-xl font-bold" style={{ color: 'var(--primary)' }}>{listing.monthlyKwh}</p>
          <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>kWh/mes</p>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider mb-1" style={{ color: 'var(--text-secondary)' }}>Coste</p>
          <p className="font-mono text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{listing.monthlyCost.toFixed(2)}</p>
          <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>€/mes</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: '#F0F0F0' }}>
        <div className="flex items-center gap-2">
          {listing.tenant ? (
            <>
              <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-[8px] font-bold" style={{ color: 'var(--text-secondary)' }}>{listing.tenant.charAt(0)}</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{listing.tenant}</span>
            </>
          ) : (
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Sin inquilino</span>
          )}
        </div>
        <span className={`text-xs font-medium ${
          listing.contractStatus === 'active' ? 'text-emerald-600' :
          listing.contractStatus === 'pending' ? 'text-amber-600' :
          'text-gray-400'
        }`}>
          {listing.contractStatus === 'active' ? 'Activo' :
           listing.contractStatus === 'pending' ? 'Pendiente' :
           'Inactivo'}
        </span>
      </div>
    </div>
  )
}
