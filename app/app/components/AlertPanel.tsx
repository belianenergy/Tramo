'use client'

import type { Alert } from '@/lib/types'
import { AlertTriangle, AlertCircle, CheckCircle, Info, FileText } from 'lucide-react'
import type { ComponentType } from 'react'

interface AlertPanelProps {
  alerts: Alert[]
}

const iconMap: Record<string, ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  warning: AlertTriangle,
  danger: AlertCircle,
  success: CheckCircle,
  info: Info,
}

const defaultIcon = FileText as ComponentType<{ className?: string; style?: React.CSSProperties }>

const colorTokens: Record<string, { bg: string; text: string; border: string }> = {
  warning: { bg: 'var(--color-status-warning-bg)', text: 'var(--color-status-warning)', border: 'var(--color-status-warning-border)' },
  danger: { bg: 'var(--color-status-danger-bg)', text: 'var(--color-canopy)', border: 'var(--color-status-danger-border)' },
  success: { bg: 'var(--color-status-success-bg)', text: 'var(--color-status-success)', border: 'var(--color-status-success-border)' },
  info: { bg: 'var(--color-status-info-bg)', text: 'var(--color-canopy)', border: 'var(--color-status-info-border)' },
}

const defaultColors = { bg: 'var(--color-cream-paper)', text: 'var(--color-slate)', border: 'var(--color-sage-mist)' }

export default function AlertPanel({ alerts }: AlertPanelProps) {
  const unread = alerts.filter(a => !a.read).length

  return (
    <div className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-base font-semibold" style={{ color: 'var(--color-ink)' }}>Alertas</h3>
        {unread > 0 && (
          <span
            className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            style={{
              background: 'var(--color-status-warning-bg)',
              color: 'var(--color-status-warning)',
              border: '1px solid var(--color-status-warning-border)',
            }}
          >
            {unread} nuevas
          </span>
        )}
      </div>
      <div className="space-y-2">
        {alerts.slice(0, 4).map((alert) => {
          const colors = colorTokens[alert.type] ?? defaultColors
          const Icon = iconMap[alert.type] ?? defaultIcon
          return (
            <div
              key={alert.id}
              className="p-3 rounded-lg cursor-pointer"
              role="button"
              tabIndex={0}
              style={{
                border: `1px solid ${colors.border}`,
                background: colors.bg,
                transition: 'background-color var(--dur-short) var(--ease-out)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-cream-paper)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.bg)}
            >
              <div className="flex items-start gap-2.5">
                <Icon className="h-4 w-4 shrink-0 mt-0.5" style={{ color: colors.text }} />
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-ink)' }}>{alert.message}</p>
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-muted-slate)' }}>{alert.property} · {new Date(alert.timestamp).toLocaleDateString('es-ES')}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
