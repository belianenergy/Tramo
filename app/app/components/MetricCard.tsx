'use client'

import type { ReactNode } from 'react'

interface MetricCardProps {
  title: string
  value: string
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon: ReactNode
  color: string
}

export default function MetricCard({ title, value, unit, trend, trendValue, icon, color }: MetricCardProps) {
  return (
    <div
      className="rounded-[16px] p-5"
      style={{
        border: '1px solid var(--color-sage-mist)',
        background: 'var(--color-cream-paper)',
        transition: 'transform var(--dur-short) var(--ease-out)',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-slate)' }}>{title}</p>
        <span className="inline-grid h-8 w-8 place-items-center rounded-[8px]" style={{ background: 'var(--color-sheet-white)', color }} aria-hidden="true">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-light tabular-nums" style={{ color }}>{value}</span>
        {unit && <span className="text-sm font-medium" style={{ color: 'var(--color-slate)' }}>{unit}</span>}
      </div>
      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs font-medium" style={{
            color: trend === 'up' ? 'var(--color-status-success)' :
                   trend === 'down' ? 'var(--color-canopy)' :
                   'var(--color-muted-slate)',
          }}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        </div>
      )}
    </div>
  )
}
