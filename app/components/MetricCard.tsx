'use client'

interface MetricCardProps {
  title: string
  value: string
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  icon: string
  color: string
}

export default function MetricCard({ title, value, unit, trend, trendValue, icon, color }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl border p-5 transition-all hover:shadow-sm" style={{ borderColor: 'var(--border)' }}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>{title}</p>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-3xl font-bold" style={{ color }}>{value}</span>
        {unit && <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
      {trend && trendValue && (
        <div className="flex items-center gap-1 mt-2">
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-emerald-600' :
            trend === 'down' ? 'text-red-500' :
            'text-gray-500'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
          </span>
        </div>
      )}
    </div>
  )
}
