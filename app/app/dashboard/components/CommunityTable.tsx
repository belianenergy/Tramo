'use client'

import type { Community } from '@/lib/types'

interface CommunityTableProps {
  communities: Community[]
  onSelect?: (community: Community) => void
}

export default function CommunityTable({ communities, onSelect }: CommunityTableProps) {
  return (
    <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
      <table className="w-full">
        <thead>
          <tr className="border-b" style={{ borderColor: 'var(--border)', background: '#F5F5F5' }}>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Comunidad</th>
            <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Ciudad</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Unidades</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Consumo</th>
            <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Coste</th>
            <th className="text-center px-5 py-3 text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {communities.map((c) => (
            <tr
              key={c.id}
              className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
              style={{ borderColor: '#F0F0F0' }}
              onClick={() => onSelect?.(c)}
            >
              <td className="px-5 py-3.5">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{c.name}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{c.address}</p>
              </td>
              <td className="px-5 py-3.5 text-sm" style={{ color: 'var(--text-secondary)' }}>{c.city}</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono" style={{ color: 'var(--text-primary)' }}>{c.units}</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono" style={{ color: 'var(--text-primary)' }}>{c.totalKwh.toLocaleString('es-ES')} kWh</td>
              <td className="px-5 py-3.5 text-sm text-right font-mono" style={{ color: 'var(--text-primary)' }}>{c.totalCost.toLocaleString('es-ES', { minimumFractionDigits: 2 })} €</td>
              <td className="px-5 py-3.5 text-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  c.status === 'optimized' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                  c.status === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                  'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {c.status === 'optimized' ? 'Optimizado' : c.status === 'warning' ? 'Atención' : 'Alerta'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
