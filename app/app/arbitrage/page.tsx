'use client'

import { useMemo, useState } from 'react'
import { BatteryCharging, Factory, TrendingUp } from 'lucide-react'
import AppShell from '../components/AppShell'
import { ContextPanel, MetricTile, MiniBars, PageHeader, StatusBadge } from '../components/platform-ui'

const prices = [0.082, 0.078, 0.074, 0.079, 0.086, 0.091, 0.104, 0.132, 0.158, 0.181, 0.197, 0.184, 0.141, 0.128, 0.116, 0.122, 0.149, 0.192, 0.213, 0.205, 0.176, 0.142, 0.112, 0.094]

export default function ArbitragePage() {
  const [capacity, setCapacity] = useState(10)
  const [sharedUnits, setSharedUnits] = useState(18)

  const simulation = useMemo(() => {
    const low = Math.min(...prices)
    const high = Math.max(...prices)
    const spread = high - low
    const daily = spread * capacity * 0.88
    return {
      low,
      high,
      spread,
      daily,
      annual: Math.round(daily * 255),
      capex: 5500 + Math.max(0, capacity - 10) * 420,
    }
  }, [capacity])

  const roi = Math.round((simulation.capex / Math.max(1, simulation.annual)) * 10) / 10

  return (
    <AppShell>
      <PageHeader
        eyebrow="Arbitrage · premium line"
        title="Batería y OMIE como capa avanzada para edificios con masa crítica."
        description="Simulación prudente de una batería opcional de 10 kWh: cargar en valle, descargar en punta y repartir el beneficio entre unidades del mismo edificio."
        action={<button className="min-h-11 rounded-[8px] px-5 text-sm font-semibold" style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}>Crear escenario premium</button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <section className="grid gap-3 md:grid-cols-4">
            <MetricTile label="Spread OMIE" value={simulation.spread.toFixed(3)} unit="EUR/kWh" note="Diferencia valle-punta hoy." />
            <MetricTile label="Batería base" value={`${capacity}`} unit="kWh" note="Batería opcional como referencia." />
            <MetricTile label="Unidades servidas" value={`${sharedUnits}`} unit="apt" note="Edificio o cluster cercano." />
            <MetricTile label="Retorno prudente" value={`${roi}`} unit="años" note="Sin prometer ahorro garantizado." />
          </section>

          <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Curva OMIE 24h</h2>
                  <p className="mt-1 text-sm" style={{ color: 'var(--color-slate)' }}>Pregunta: hay spread suficiente para plantear arbitraje?</p>
                </div>
                <StatusBadge status="Premium" />
              </div>
              <div className="mt-6">
                <MiniBars values={prices.map((price) => Math.round(price * 1000))} color="var(--color-ink)" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['Valle', simulation.low.toFixed(3), 'EUR/kWh'],
                  ['Punta', simulation.high.toFixed(3), 'EUR/kWh'],
                  ['Dia', simulation.daily.toFixed(2), 'EUR margen'],
                ].map(([label, value, unit]) => (
                  <div key={label} className="rounded-[8px] p-3" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-sheet-white)' }}>
                    <p className="text-xs font-semibold" style={{ color: 'var(--color-muted-slate)' }}>{label}</p>
                    <p className="mt-2 font-mono text-xl font-semibold" style={{ color: 'var(--color-bark)' }}>{value}</p>
                    <p className="font-mono text-[0.68rem]" style={{ color: 'var(--color-muted-slate)' }}>{unit}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <h2 className="font-display text-xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Escenario</h2>
              <div className="mt-5 space-y-6">
                <label className="block">
                  <span className="flex justify-between text-sm font-semibold"><span>Capacidad</span><span className="font-mono">{capacity} kWh</span></span>
                  <input className="mt-3 w-full accent-[var(--color-canopy)]" type="range" min="10" max="40" value={capacity} onChange={(event) => setCapacity(Number(event.target.value))} />
                </label>
                <label className="block">
                  <span className="flex justify-between text-sm font-semibold"><span>Unidades compartidas</span><span className="font-mono">{sharedUnits}</span></span>
                  <input className="mt-3 w-full accent-[var(--color-canopy)]" type="range" min="8" max="60" value={sharedUnits} onChange={(event) => setSharedUnits(Number(event.target.value))} />
                </label>
              </div>
              <div className="mt-6 rounded-[8px] p-4" style={{ background: 'var(--color-bark)' }}>
                <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--color-mint-pulse)' }}>Capex estimado</p>
                <p className="mt-2 font-mono text-3xl font-semibold" style={{ color: 'var(--color-sheet-white)' }}>{simulation.capex.toLocaleString('es-ES')} EUR</p>
                <p className="mt-2 text-xs leading-5" style={{ color: 'var(--color-canopy-border)' }}>Incluye referencia genérica de batería 10 kWh desde 5.500 EUR, sin cerrar instalación real.</p>
              </div>
            </article>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {[
              [BatteryCharging, 'Regla de carga', 'Cargar en P3/OMIE valle cuando el spread supera umbral definido.'],
              [TrendingUp, 'Regla de descarga', 'Descargar en P1 para cubrir termo, climatizacion o cargas comunes.'],
              [Factory, 'Gobernanza', 'Solo edificios con datos estables, permisos y ROI defendible ante propietario.'],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="rounded-[16px] p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
                <Icon className="h-5 w-5" style={{ color: 'var(--color-canopy)' }} />
                <h2 className="mt-4 font-display text-lg font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-bark)' }}>{title as string}</h2>
                <p className="mt-2 text-sm leading-6" style={{ color: 'var(--color-slate)' }}>{copy as string}</p>
              </article>
            ))}
          </section>
        </div>
        <ContextPanel />
      </div>
    </AppShell>
  )
}
