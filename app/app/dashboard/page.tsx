'use client'

import { ShieldAlert, Activity, TrendingUp, DollarSign, Users, Building2, PlugZap, ArrowUpRight, ArrowDownRight, CheckCircle2, ZapOff, FileText } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'
import AppShell from '../components/AppShell'
import { actions, dailyLoad, tariffBands, units } from '../components/platform-data'
import { ContextPanel, PageHeader, StatusBadge } from '../components/platform-ui'

export default function DashboardPage() {
  const outside = units.reduce((sum, unit) => sum + unit.outsideKwh, 0)
  const forecast = units.reduce((sum, unit) => sum + unit.cost, 0)
  const impact = actions.reduce((sum, action) => sum + action.impact, 0)
  const isEmpty = !units || units.length === 0

  const barData = dailyLoad.map((v, i) => ({ day: i + 1, kwh: v }))

  const pieData = [
    { name: 'P1 Punta', value: 612, fill: '#ea580c' },
    { name: 'P2 Llano', value: 784, fill: '#f59e0b' },
    { name: 'P3 Valle', value: 451, fill: '#0F7B5A' },
  ]

  const maxDay = Math.max(...dailyLoad)
  const barColors = ['var(--color-orb-violet)', 'var(--color-orb-violet)', 'var(--color-canopy)', 'var(--color-canopy)', 'var(--color-mint-dark)', 'var(--color-mint-dark)', 'var(--color-orb-violet)', 'var(--color-canopy)']
  const recommendedAction = (status: string) => {
    if (status === 'Crítica') return { label: 'Aprobar corte ACS', tone: '#ea580c' }
    if (status === 'Potencia') return { label: 'Revisar contrato', tone: '#f59e0b' }
    if (status === 'Regla') return { label: 'Activar regla tarifa', tone: '#0F7B5A' }
    if (status === 'Informe') return { label: 'Enviar PDF', tone: '#2563eb' }
    return { label: 'Sin acción urgente', tone: 'var(--color-muted-slate)' }
  }

  return (
    <AppShell>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[16px]" style={{ background: 'var(--color-cream-paper)' }}>
            <Building2 className="h-8 w-8" style={{ color: 'var(--color-canopy)' }} />
          </div>
          <h2 className="font-display text-2xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>
            Aún no hay propiedades configuradas
          </h2>
          <p className="mt-3 max-w-md text-[15px]" style={{ color: 'var(--color-slate)' }}>
            Conecta tu primer CUPS desde Datadis o solicita el diagnóstico gratuito para que configuremos tu cartera.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="/app/config"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] px-6 text-[14px] font-medium transition-[background-color,color,transform] duration-200 active:translate-y-px"
              style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}
            >
              <PlugZap className="h-4 w-4" />
              Conectar CUPS
            </a>
            <a
              href="/#diagnostico"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[8px] px-6 text-[14px] font-medium transition-[border-color,color] duration-200"
              style={{ border: '1px solid var(--color-sage-mist)', color: 'var(--color-slate)' }}
            >
              Solicitar diagnóstico
            </a>
          </div>
        </div>
      ) : (
        <>
      <PageHeader
        eyebrow="Sala de control · Mayo 2026"
        title="Sala de control para decidir qué coste energético se aprueba hoy."
        description="Cartera profesional: cruce de reservas, CUPS, tarifa y reglas en una cola diaria de decisiones."
        action={
          <a href="/#diagnostico" className="min-h-11 rounded-[8px] px-5 text-[13px] font-medium inline-flex items-center gap-2 transition-[background-color,transform] duration-200 active:translate-y-px"
            style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>
            <TrendingUp className="h-3.5 w-3.5" /> Revisar ahora (demo)
          </a>
        }
      />

      {/* Decision strip */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {[ 
          { icon: CheckCircle2, label: 'Aprobar hoy', count: '3 acciones', impact: '+322 €/mes', color: 'var(--color-primary)', bg: 'var(--color-primary-subtle)' },
          { icon: ZapOff, label: 'Revisar potencia', count: '2 contratos', impact: 'Posible sobrecoste', color: '#ea580c', bg: '#fff7ed' },
          { icon: FileText, label: 'Enviar informe', count: '4 propietarios', impact: 'PDF listo', color: '#2563eb', bg: '#eff6ff' },
        ].map((d) => { const Icon = d.icon; return (
          <button key={d.label} className="flex items-center gap-3 rounded-[14px] p-4 text-left transition-all duration-200 hover:scale-[1.01] border-0" style={{ background: d.bg }}>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-white">
              <Icon className="h-5 w-5" style={{ color: d.color }} />
            </div>
            <div className="min-w-0">
              <p className="font-display text-[13px] font-medium text-[var(--color-dark)]">{d.label}</p>
              <p className="text-[11px] text-[var(--color-gray)]">{d.count}<span className="mx-1.5">·</span><span style={{ color: d.color }}>{d.impact}</span></p>
            </div>
            <ArrowUpRight className="ml-auto h-4 w-4 shrink-0" style={{ color: d.color }} />
          </button>
        ); })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          {/* Metrics: 4 operational tiles with accent labels */}
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[12px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4" style={{ color: 'var(--color-canopy)' }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Ahorro pendiente</span>
              </div>
              <p className="font-display text-2xl font-light tabular-nums" style={{ color: 'var(--color-ink)' }}>{impact} €</p>
              <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: 'var(--color-canopy)' }}><ArrowUpRight className="h-3 w-3" /> +12% vs mes anterior</p>
            </div>
            <div className="rounded-[12px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4" style={{ color: '#ea580c' }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Fuera de reserva</span>
              </div>
              <p className="font-display text-2xl font-light tabular-nums" style={{ color: 'var(--color-ink)' }}>{outside} kWh</p>
              <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: '#ea580c' }}><ArrowDownRight className="h-3 w-3" /> -8% vs mes anterior</p>
            </div>
            <div className="rounded-[12px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4" style={{ color: '#2563eb' }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Coste previsto</span>
              </div>
              <p className="font-display text-2xl font-light tabular-nums" style={{ color: 'var(--color-ink)' }}>{Math.round(forecast)} €</p>
              <p className="flex items-center gap-1 text-[11px] mt-1" style={{ color: '#2563eb' }}><ArrowUpRight className="h-3 w-3" /> +5% vs mes anterior</p>
            </div>
            <div className="rounded-[12px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4" style={{ color: '#7c3aed' }} />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>Propietarios</span>
              </div>
              <p className="font-display text-2xl font-light tabular-nums" style={{ color: 'var(--color-ink)' }}>12/14</p>
              <p className="text-[11px] mt-1 text-[var(--color-muted-slate)]">informes listos para enviar</p>
            </div>
          </section>

          {/* Charts row */}
          <section className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
            {/* Bar chart: Carga de la cartera */}
            <article className="rounded-[16px] p-6" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-display text-lg font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Carga de la cartera (kWh)</h2>
                  <p className="mt-1 text-[13px]" style={{ color: 'var(--color-slate)' }}>¿Qué días concentran coste accionable?</p>
                </div>
                <span className="font-mono text-[11px] tabular-nums" style={{ color: 'var(--color-muted-slate)' }}>24 días</span>
              </div>
              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} barGap={2}>
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: 'var(--color-muted-slate)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: 'var(--color-muted-slate)' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', fontSize: 12 }}
                      labelStyle={{ fontWeight: 500, color: 'var(--color-bark)' }}
                      itemStyle={{ color: 'var(--color-bark)' }}
                    />
                    <Bar dataKey="kwh" radius={[2, 2, 0, 0]}>
                      {barData.map((entry, index) => {
                        const idx = entry.kwh >= maxDay * 0.85 ? 7 : entry.kwh >= maxDay * 0.7 ? 6 : entry.kwh >= maxDay * 0.55 ? 5 : entry.kwh >= maxDay * 0.4 ? 3 : entry.kwh >= maxDay * 0.25 ? 1 : 0
                        return <Cell key={index} fill={barColors[idx]} opacity={0.8} />
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Tariff bands */}
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                {tariffBands.map((band) => (
                  <div key={band.label} className="rounded-[12px] p-3" style={{ border: '1px solid var(--color-sage-mist)' }}>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: band.label.includes('P1') ? '#ea580c' : band.label.includes('P2') ? '#f59e0b' : '#0F7B5A' }} />
                      <p className="text-[11px] font-medium" style={{ color: 'var(--color-slate)' }}>{band.label}</p>
                    </div>
                    <p className="mt-2 font-display text-base font-light tabular-nums" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>{band.kwh} kWh</p>
                    <p className="font-mono text-[10px]" style={{ color: 'var(--color-muted-slate)' }}>{band.price}</p>
                  </div>
                ))}
              </div>
            </article>

            {/* Right column: pie chart + review column */}
            <article className="space-y-5">
              {/* Distribución por período */}
              <div className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                <h2 className="font-display text-sm font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Distribución P1/P2/P3</h2>
                <div className="mx-auto mt-2 h-[130px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} innerRadius={36} outerRadius={58} paddingAngle={4} dataKey="value" stroke="none">
                        {pieData.map((entry, index) => <Cell key={index} fill={entry.fill} />)}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 flex justify-center gap-4">
                  {pieData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full" style={{ background: item.fill }} />
                      <span className="text-[10px] font-medium" style={{ color: 'var(--color-slate)' }}>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review diario */}
              <div className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-4 w-4" style={{ color: 'var(--color-canopy)' }} />
                  <h2 className="font-display text-sm font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Qué hacer hoy</h2>
                </div>
                <div className="space-y-3">
                  {actions.slice(0, 3).map((action) => (
                    <div key={action.id} className="rounded-[8px] p-3 transition-colors duration-200 hover:bg-[var(--color-sheet-white)]" style={{ border: '1px solid var(--color-sage-mist)' }}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-mono text-[9px]" style={{ color: 'var(--color-muted-slate)' }}>{action.id} · {action.unit}</p>
                          <p className="mt-0.5 text-[13px] font-medium" style={{ color: 'var(--color-bark)' }}>{action.title}</p>
                        </div>
                        <span className="font-mono text-[11px] font-medium tabular-nums" style={{ color: 'var(--color-canopy)' }}>{action.impact} €</span>
                      </div>
                      <button
                        className="mt-2 min-h-8 rounded-[8px] px-4 text-[10px] font-medium transition-[background-color] duration-200"
                        style={{ border: '1px solid var(--color-sage-mist)', color: 'var(--color-slate)' }}
                        aria-label={`Aprobar acción: ${action.title}`}
                      >
                        {action.approval} (demo)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </section>

          {/* Units table — industrial spec-sheet style */}
          <section className="overflow-x-auto rounded-[16px]" style={{ border: '1px solid var(--color-sage-mist)' }} aria-label="Unidades de la cartera">
            <table className="min-w-[860px] w-full border-collapse">
            <thead>
            <tr
              className="text-[10px] font-semibold uppercase tracking-[0.08em]"
              style={{ borderBottom: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', color: 'var(--color-muted-slate)' }}
            >
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">Código</th>
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">Unidad</th>
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">Propietario</th>
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">CUPS / Contrato</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">Total</th>
              <th scope="col" className="px-5 py-3.5 text-right font-semibold">Fuera</th>
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">Estado</th>
              <th scope="col" className="px-5 py-3.5 text-left font-semibold">Acción recomendada</th>
            </tr>
            </thead>
            <tbody>
            {units.map((unit, i) => (
              <tr
                key={unit.code}
                className="text-[13px] transition-[background-color] duration-150"
                style={{ borderBottom: i < units.length - 1 ? '1px solid var(--color-sage-mist)' : 'none', color: 'var(--color-bark)' }}
              >
                <td className="px-5 py-3.5 font-mono text-[12px] font-medium">{unit.code}</td>
                <td className="px-5 py-3.5">
                  <span>{unit.name}</span>
                  <span className="block text-[11px]" style={{ color: 'var(--color-muted-slate)' }}>{unit.city} · {unit.pms}</span>
                </td>
                <td className="px-5 py-3.5 text-[13px]" style={{ color: 'var(--color-slate)' }}>{unit.owner}</td>
                <td className="px-5 py-3.5">
                  <span className="font-mono text-[11px]">{unit.cups}</span>
                  <span className="block text-[10px]" style={{ color: 'var(--color-muted-slate)' }}>{unit.tariff}</span>
                </td>
                <td className="px-5 py-3.5 text-right font-mono text-[13px] tabular-nums font-medium">{unit.totalKwh} kWh</td>
                <td
                  className="px-5 py-3.5 text-right font-mono text-[13px] tabular-nums font-medium"
                  style={{ color: unit.outsideKwh > 30 ? 'var(--color-mint-dark)' : 'var(--color-orb-violet)' }}
                >
                  {unit.outsideKwh} kWh
                </td>
                <td className="px-5 py-3.5"><StatusBadge status={unit.status} /></td>
                <td className="px-5 py-3.5">
                  {(() => {
                    const action = recommendedAction(unit.status)
                    return (
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium" style={{ background: 'var(--color-cream-paper)', color: action.tone, border: '1px solid var(--color-sage-mist)' }}>
                        {action.label}
                      </span>
                    )
                  })()}
                </td>
              </tr>
            ))}
            </tbody>
            </table>
          </section>
        </div>

        {/* Context panel — operational insights */}
        <ContextPanel />
      </div>
      </>
      )}
    </AppShell>
  )
}
