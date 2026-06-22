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

const TOKEN_GRID = 'var(--color-chart-grid)'
const TOKEN_TICK = 'var(--color-chart-tick)'
const TOKEN_PAPER = 'var(--color-cream-paper)'
const TOKEN_RULE = 'var(--color-sage-mist)'
const TOKEN_INK = 'var(--color-ink)'

export default function ConsumptionChart({ data, height = 300, color = 'var(--color-canopy)', label = 'kWh' }: ConsumptionChartProps) {
  return (
    <div className="rounded-xl p-5" style={{ borderColor: TOKEN_RULE, background: TOKEN_PAPER, border: `1px solid ${TOKEN_RULE}` }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={TOKEN_GRID} />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: TOKEN_TICK }}
            axisLine={{ stroke: TOKEN_GRID }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: TOKEN_TICK, fontFamily: 'var(--font-mono)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: TOKEN_PAPER,
              border: `1px solid ${TOKEN_RULE}`,
              borderRadius: 8,
              fontSize: 13,
              color: TOKEN_INK,
            }}
            formatter={(value: number) => [`${value.toLocaleString('es-ES')} ${label}`, label]}
            labelStyle={{ fontWeight: 500, color: TOKEN_INK }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, stroke: TOKEN_PAPER, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
