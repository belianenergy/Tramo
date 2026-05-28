'use client'

import { useState, useEffect } from 'react'
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
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Fincas — Comunidades de Vecinos
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            Gestión energética de comunidades · {communities.length} comunidades activas
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard title="Comunidades" value={communities.length.toString()} icon="🏢" color="var(--fincas)" />
          <MetricCard title="Total Unidades" value={totalUnits.toString()} icon="🏠" color="var(--primary)" />
          <MetricCard title="Consumo Total" value={(totalKwh / 1000).toFixed(1)} unit="MWh" icon="⚡" color="var(--apartments)" />
          <MetricCard title="Coste Total" value={totalCost.toLocaleString('es-ES')} unit="€" icon="💰" color="var(--advisor)" />
        </div>

        {/* Table */}
        <CommunityTable communities={communities} onSelect={setSelected} />

        {/* Detail Panel */}
        {selected && (
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{selected.name}</h2>
                <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{selected.address}, {selected.city} {selected.postalCode}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Información General
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Administrador</span>
                      <span className="font-medium" style={{ color: 'var(--text-primary)' }}>{selected.administrator}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>Unidades</span>
                      <span className="font-mono font-medium" style={{ color: 'var(--text-primary)' }}>{selected.units}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: 'var(--text-secondary)' }}>CUPS</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--text-primary)' }}>ES003140...{selected.id}AB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reparto */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--text-secondary)' }}>
                  Reparto de Gastos
                </p>
                <div className="space-y-2">
                  {['Zona A (Planta 1-4)', 'Zona B (Planta 5-8)', 'Zonas Comunes'].map((zone, i) => {
                    const percentages = [45, 35, 20]
                    const costs = [selected.totalCost * percentages[i] / 100, 0, 0]
                    return (
                      <div key={zone}>
                        <div className="flex justify-between text-xs mb-1">
                          <span style={{ color: 'var(--text-secondary)' }}>{zone}</span>
                          <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                            {percentages[i]}% · {(selected.totalCost * percentages[i] / 100).toFixed(2)} €
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full"
                            style={{
                              width: `${percentages[i]}%`,
                              background: i === 0 ? 'var(--fincas)' : i === 1 ? 'var(--primary)' : 'var(--apartments)',
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Coeficientes */}
                <div className="mt-4 pt-4 border-t" style={{ borderColor: '#F0F0F0' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>Coeficientes de participación</p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {[
                      { coef: '0.125', label: 'Interior' },
                      { coef: '0.095', label: 'Exterior' },
                      { coef: '0.045', label: 'Local' },
                    ].map((item) => (
                      <div key={item.label} className="bg-gray-50 rounded-lg p-2">
                        <p className="font-mono text-sm font-bold" style={{ color: 'var(--fincas)' }}>{item.coef}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
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
