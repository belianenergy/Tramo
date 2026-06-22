'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface ChartDataPoint {
  label: string
  value: number
}

interface ConsumptionChartProps {
  data: ChartDataPoint[]
  height?: number
  color?: string
  label?: string
}

const CHART_GRID = 'var(--color-sage-mist)'
const CHART_TICK = 'var(--color-muted-slate)'

// Need a stable gradient ID that doesn't collide across instances
let gradientCounter = 0
function nextGradientId(): string {
  gradientCounter += 1
  return `colorGrad-${gradientCounter}`
}

export default function ConsumptionChart({ data, height = 300, color = 'var(--color-canopy)', label = 'kWh' }: ConsumptionChartProps) {
  const gradientId = nextGradientId()
  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: CHART_TICK }}
            axisLine={{ stroke: CHART_GRID }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: CHART_TICK, fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-sheet-white)',
              border: '1px solid var(--color-sage-mist)',
              borderRadius: 8,
              fontSize: 13,
              boxShadow: '0 2px 8px color-mix(in oklch, var(--color-ink) 8%, transparent)',
            }}
            formatter={(value: number) => [`${value.toLocaleString('es-ES')} ${label}`, label]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, stroke: 'var(--color-sheet-white)', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
