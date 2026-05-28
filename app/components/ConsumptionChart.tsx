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

export default function ConsumptionChart({ data, height = 300, color = '#10b981', label = 'kWh' }: ConsumptionChartProps) {
  return (
    <div className="bg-white rounded-xl border p-5" style={{ borderColor: 'var(--border)' }}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12, fill: '#757575' }}
            axisLine={{ stroke: '#E0E0E0' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#757575', fontFamily: 'JetBrains Mono' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              background: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: 8,
              fontSize: 13,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
            formatter={(value: number) => [`${value.toLocaleString('es-ES')} ${label}`, label]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fill="url(#colorValue)"
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
