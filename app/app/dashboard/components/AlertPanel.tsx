'use client'

import type { Alert } from '@/lib/types'

interface AlertPanelProps {
  alerts: Alert[]
}

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️'
      case 'danger': return '🔴'
      case 'success': return '✅'
      case 'info': return 'ℹ️'
      default: return '📋'
    }
  }

  const getColors = (type: string) => {
    switch (type) {
      case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700' }
      case 'danger': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' }
      case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700' }
      case 'info': return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' }
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700' }
    }
  }

  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text-primary)' }}>Alertas</h3>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          {alerts.filter(a => !a.read).length} nuevas
        </span>
      </div>
      <div className="space-y-2">
        {alerts.slice(0, 4).map((alert) => {
          const colors = getColors(alert.type)
          return (
            <div
              key={alert.id}
              className={`p-3 rounded-lg border ${colors.bg} ${colors.border} transition-colors hover:brightness-95 cursor-pointer`}
            >
              <div className="flex items-start gap-2.5">
                <span className="text-sm shrink-0 mt-0.5">{getIcon(alert.type)}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>{alert.message}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--text-secondary)' }}>{alert.property} · {new Date(alert.timestamp).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
