'use client'

import { CheckCircle2, FileText, ShieldAlert, Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import AppShell from '../components/AppShell'
import { actions, dailyLoad, tariffBands, units } from '../components/platform-data'
import { ContextPanel, MetricTile, PageHeader, StatusBadge } from '../components/platform-ui'

export default function DashboardPage() {
  const outside = units.reduce((sum, unit) => sum + unit.outsideKwh, 0)
  const forecast = units.reduce((sum, unit) => sum + unit.cost, 0)
  const impact = actions.reduce((sum, action) => sum + action.impact, 0)

  // Chart data
  const barData = dailyLoad.map((v, i) => ({ day: i + 1, kwh: v }))

  const pieData = [
    { name: 'P1 Punta', value: 612, fill: '#fa3d1d' },
    { name: 'P2 Llano', value: 784, fill: '#ffb005' },
    { name: 'P3 Valle', value: 451, fill: '#0358f7' },
  ]

  return (
    <AppShell>
      <PageHeader
        eyebrow="Command Center · Mayo 2026"
        title="Sala de control para decidir qué coste energético se aprueba hoy."
        description="Cartera profesional de apartamentos turísticos: reservas, CUPS, facturas, periodos P1/P2/P3 y reglas operativas en una cola diaria de decisiones."
        action={<button className="min-h-11 rounded-[30px] bg-[var(--pebble)] px-5 text-sm font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--snow)]">Iniciar review diario</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          {/* Metrics */}
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Ahorro pendiente" value={`${impact}`} unit="EUR/mes" note="Acciones aprobables con evidencia." accent="var(--color-blue)" />
            <MetricTile label="Fuera de reserva" value={`${outside}`} unit="kWh" note="Separado de estancia y limpieza." accent="var(--color-amber)" />
            <MetricTile label="Coste previsto" value={`${Math.round(forecast)}`} unit="EUR" note="Lecturas hasta las 19:10." accent="var(--color-crimson)" />
            <MetricTile label="Propietarios" value="12/14" unit="listos" note="Informes con desglose defendible." accent="var(--color-rose)" />
          </section>

          {/* Charts row */}
          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Bar chart: Carga de la cartera */}
            <article className="rounded-[20px] p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(24px)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>Carga de la cartera</h2>
                  <p className="mt-1 text-sm" style={{ color: 'var(--graphite)' }}>¿Qué días concentran coste accionable?</p>
                </div>
                <span className="font-mono text-xs" style={{ color: 'var(--slate)' }}>24 días</span>
              </div>
              <div className="mt-6 h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barGap={2}>
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#959595' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#959595' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(12px)', boxShadow: 'rgba(0,0,0,0.08) 0px 0px 8px 0px', fontSize: 12 }}
                      labelStyle={{ fontWeight: 500, color: '#000' }}
                      itemStyle={{ color: '#000' }}
                    />
                    <Bar dataKey="kwh" radius={[4, 4, 0, 0]}>
                      {barData.map((entry, index) => {
                        const max = Math.max(...dailyLoad)
                        const intensityIdx = entry.kwh >= max * 0.85 ? 7 : entry.kwh >= max * 0.7 ? 6 : entry.kwh >= max * 0.55 ? 5 : entry.kwh >= max * 0.4 ? 3 : entry.kwh >= max * 0.25 ? 1 : 0
                        const colors = ['#c679c4', '#c679c4', '#fa3d1d', '#fa3d1d', '#ffb005', '#ffb005', '#e1e1fe', '#0358f7']
                        return <Cell key={index} fill={colors[intensityIdx]} opacity={0.85} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Tariff bands */}
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {tariffBands.map((band) => (
                  <div key={band.label} className="rounded-[16px] p-3 transition-all duration-200 hover:bg-[var(--fog)]" style={{ background: 'var(--fog)' }}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: band.color }} />
                      <p className="text-xs font-medium" style={{ color: 'var(--graphite)' }}>{band.label}</p>
                    </div>
                    <p className="mt-2 font-display text-lg font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>{band.kwh} kWh</p>
                    <p className="font-mono text-[0.68rem]" style={{ color: 'var(--slate)' }}>{band.price}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Pie chart + Review diario */}
            <article className="space-y-5">
              {/* Distribución tarifa */}
              <div className="rounded-[20px] p-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(24px)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
                <h2 className="font-display text-base font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>Distribución por periodo</h2>
                <div className="mx-auto mt-2 h-[140px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: 'none', background: 'rgba(255,255,255,0.95)', boxShadow: 'rgba(0,0,0,0.08) 0px 0px 8px 0px', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-center gap-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: item.fill }} />
                      <span className="text-[10px] font-medium" style={{ color: 'var(--graphite)' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review diario */}
              <div className="rounded-[20px] p-5" style={{ backgroundColor: 'var(--snow)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
                <div className="flex items-center gap-2" style={{ color: 'var(--color-crimson)' }}>
                  <ShieldAlert className="h-4 w-4" />
                  <h2 className="font-display text-base font-light text-[var(--ink)]" style={{ letterSpacing: '-0.02em' }}>Review diario</h2>
                </div>
                <div className="mt-3 space-y-3">
                  {actions.slice(0, 3).map((action) => (
                    <div key={action.id} className="rounded-[16px] p-3 transition-all duration-200 hover:bg-[var(--fog)]" style={{ background: 'var(--fog)' }}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[0.62rem]" style={{ color: 'var(--slate)' }}>{action.id} · {action.unit}</p>
                          <p className="mt-0.5 text-[13px] font-medium text-[var(--ink)]">{action.title}</p>
                        </div>
                        <span className="font-mono text-xs font-medium" style={{ color: 'var(--color-crimson)' }}>{action.impact} €</span>
                      </div>
                      <button className="mt-2 min-h-8 rounded-[30px] bg-[var(--pebble)] px-3 text-[11px] font-medium text-[var(--ink)] transition-all duration-200 hover:bg-[var(--ink)] hover:text-[var(--snow)]">{action.approval}</button>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          {/* Units table */}
          <section className="overflow-hidden rounded-[20px]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(24px)', boxShadow: 'rgba(0, 0, 0, 0.08) 0px 0px 8px 0px' }}>
            <div className="grid grid-cols-[110px_1.1fr_1fr_1.35fr_90px_90px_100px] gap-4 px-5 py-4 text-xs font-medium uppercase tracking-[0.08em]" style={{ background: 'var(--fog)', color: 'var(--slate)' }}>
              <span>Código</span><span>Unidad</span><span>Propietario</span><span>CUPS / contrato</span><span>Total</span><span>Fuera</span><span>Estado</span>
            </div>
            {units.map((unit) => (
              <div key={unit.code} className="grid gap-3 px-5 py-4 transition-colors duration-200 hover:bg-[var(--fog)]" style={{ borderTop: '1px solid var(--fog)' }}>
                <span className="font-mono text-sm font-medium">{unit.code}</span>
                <span className="text-sm font-medium">{unit.name}<span className="block text-xs font-normal" style={{ color: 'var(--graphite)' }}>{unit.city} · {unit.pms}</span></span>
                <span className="text-sm" style={{ color: 'var(--graphite)' }}>{unit.owner}</span>
                <span className="font-mono text-xs" style={{ color: 'var(--graphite)' }}>{unit.cups}<span className="block text-[0.68rem]">{unit.tariff}</span></span>
                <span className="font-mono text-sm text-[var(--ink)]">{unit.totalKwh} kWh</span>
                <span className="font-mono text-sm font-medium" style={{ color: unit.outsideKwh > 30 ? 'var(--color-amber)' : 'var(--color-rose)' }}>{unit.outsideKwh} kWh</span>
                <StatusBadge status={unit.status} />
              </div>
            ))}
          </section>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
