'use client'

import { useState, useEffect } from 'react'
import { Building2, Euro, Home, X, Zap } from 'lucide-react'
import AppShell from '../components/AppShell'
import MetricCard from '../components/MetricCard'
import CommunityTable from '../components/CommunityTable'
import type { Community } from '@/lib/types'

export default function FincasPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [selected, setSelected] = useState<Community | null>(null)

  useEffect(() => {
    fetch('/api/communities').then(r => r.json()).then(setCommunities)
  }, [])

  const totalUnits = communities.reduce((s, c) => s + c.units, 0)
  const totalKwh = communities.reduce((s, c) => s + c.totalKwh, 0)
  const totalCost = communities.reduce((s, c) => s + c.totalCost, 0)

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-2xl font-light" style={{ color: 'var(--color-ink)' }}>
            Fincas — Comunidades de Vecinos
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>
            Gestión energética de comunidades · {communities.length} comunidades activas
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Comunidades" value={communities.length.toString()} icon={<Building2 className="h-4 w-4" strokeWidth={1.8} />} color="var(--color-canopy)" />
          <MetricCard title="Total Unidades" value={totalUnits.toString()} icon={<Home className="h-4 w-4" strokeWidth={1.8} />} color="var(--color-canopy)" />
          <MetricCard title="Consumo Total" value={(totalKwh / 1000).toFixed(1)} unit="MWh" icon={<Zap className="h-4 w-4" strokeWidth={1.8} />} color="var(--color-mint-dark)" />
          <MetricCard title="Coste Total" value={totalCost.toLocaleString('es-ES')} unit="€" icon={<Euro className="h-4 w-4" strokeWidth={1.8} />} color="var(--color-orb-violet)" />
        </div>

        {/* Table */}
        <CommunityTable communities={communities} onSelect={setSelected} />

        {/* Detail Panel */}
        {selected && (
          <div className="rounded-[16px] border p-6" style={{ borderColor: 'var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-light" style={{ color: 'var(--color-ink)' }}>{selected.name}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--color-slate)' }}>{selected.address}, {selected.city} {selected.postalCode}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="grid h-9 w-9 place-items-center rounded-[8px] transition-[background-color,transform] duration-200 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)]"
                style={{ color: 'var(--color-slate)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-sheet-white)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                aria-label="Cerrar detalle de finca"
              >
                <X className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-slate)' }}>
                    Información General
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--color-slate)' }}>Administrador</span>
                      <span className="font-medium" style={{ color: 'var(--color-ink)' }}>{selected.administrator}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--color-slate)' }}>Unidades</span>
                      <span className="font-mono font-medium" style={{ color: 'var(--color-ink)' }}>{selected.units}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--color-slate)' }}>CUPS</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--color-ink)' }}>ES003140...{selected.id}AB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reparto */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-slate)' }}>
                  Reparto de Gastos
                </p>
                <div className="space-y-2">
                  {['Zona A (Planta 1-4)', 'Zona B (Planta 5-8)', 'Zonas Comunes'].map((zone, i) => {
                    const percentages = [45, 35, 20]
                    return (
                      <div key={zone}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: 'var(--color-slate)' }}>{zone}</span>
                          <span className="font-mono" style={{ color: 'var(--color-ink)' }}>
                            {percentages[i]}% · {(selected.totalCost * percentages[i] / 100).toFixed(2)} €
                          </span>
                        </div>
                        <div className="w-full rounded-full h-1.5" style={{ background: 'var(--color-cream-paper)' }}>
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${percentages[i]}%`,
                              background: i === 0 ? 'var(--color-mint-dark)' : i === 1 ? 'var(--color-canopy)' : 'var(--color-orb-violet)',
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Coeficientes */}
                <div className="mt-4 pt-4" style={{ borderTop: '1px solid var(--color-sage-mist)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-slate)' }}>Coeficientes de participación</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { coef: '0.125', label: 'Interior' },
                      { coef: '0.095', label: 'Exterior' },
                      { coef: '0.045', label: 'Local' },
                    ].map((item) => (
                      <div key={item.label} className="rounded-[8px] p-2" style={{ background: 'var(--color-cream-paper)' }}>
                        <p className="font-mono text-sm font-medium" style={{ color: 'var(--color-mint-dark)' }}>{item.coef}</p>
                        <p className="text-[10px]" style={{ color: 'var(--color-slate)' }}>{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
