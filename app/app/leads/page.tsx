'use client'

import { useMemo, useState } from 'react'
import { Building2, Filter } from 'lucide-react'
import AppShell from '../components/AppShell'

const statuses = ['Todos', 'Nuevo', 'Cualificado', 'Llamada', 'Piloto'] as const

const leads = [
  ['Ana Martínez', 'Martínez Family', '18', 'Guesty', 'Sí', 'Consumo sin reserva', 'Nuevo'],
  ['Carlos López', 'López Gestión', '42', 'Avantio', 'Parcial', 'Potencia P1/P2', 'Cualificado'],
  ['Marta Costa', 'Costa Rentals', '67', 'Smoobu', 'Sí', 'Informes propietarios', 'Llamada'],
  ['Javier Ruiz', 'Iberhome Partners', '25', 'Hostaway', 'CSV factura', 'Datos dispersos', 'Piloto'],
  ['Laura Vidal', 'BCN Stays', '34', 'Rentals United', 'Sí', 'Reglas checkout', 'Cualificado'],
  ['Pablo Rivas', 'Rías Baixas Homes', '21', 'Icnea', 'No', 'Termos y clima', 'Nuevo'],
  ['Beatriz Alonso', 'Madrid Short Stay', '58', 'Guesty', 'Sí', 'Margen por factura', 'Llamada'],
  ['Nuria Soler', 'Mediterráneo Living', '73', 'Avantio', 'Parcial', 'Reporting mensual', 'Piloto'],
  ['Hugo Pardo', 'Compostela Suites', '16', 'Smoobu', 'CSV factura', 'CUPS sin ordenar', 'Nuevo'],
]

function pillClass(status: string): string {
  switch (status) {
    case 'Nuevo':
      return 'rounded-[9999px] border px-2 py-1 text-xs font-semibold border-[var(--color-sage-mist)] bg-[var(--color-cream-paper)] text-[var(--color-slate)]'
    case 'Cualificado':
      return 'rounded-[9999px] border px-2 py-1 text-xs font-semibold border-[var(--color-canopy)] bg-[var(--color-cream-paper)] text-[var(--color-canopy)]'
    case 'Llamada':
      return 'rounded-[9999px] border px-2 py-1 text-xs font-semibold border-[var(--color-mint-dark)] bg-[color-mix(in oklch, var(--color-mint-dark) 8%, transparent)] text-[var(--color-mint-dark)]'
    default:
      return 'rounded-[9999px] border px-2 py-1 text-xs font-semibold border-[var(--color-canopy)] bg-[color-mix(in oklch, var(--color-canopy) 8%, transparent)] text-[var(--color-canopy)]'
  }
}

export default function LeadsPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')
  const filtered = useMemo(() => (status === 'Todos' ? leads : leads.filter((lead) => lead[6] === status)), [status])

  return (
    <AppShell>
      <div className="min-h-screen" style={{ background: 'var(--color-cream-paper)' }}>
        <div className="max-w-7xl mx-auto px-0 py-2 md:py-4">
          <header className="mb-8">
            <h1 className="font-display text-2xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>CRM Piloto</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--color-muted-slate)' }}>Gestoras españolas cualificadas para pilotos con reservas, Datadis y dolor energético claro.</p>
          </header>

          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-[16px] p-2" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <Filter className="ml-2 h-4 w-4" style={{ color: 'var(--color-muted-slate)' }} />
            {statuses.map((item) => (
              <button
                key={item}
                onClick={() => setStatus(item)}
                className={`rounded-[8px] px-4 py-2 text-sm font-semibold ${
                  status === item
                    ? 'bg-[var(--color-bark)] text-[var(--color-sheet-white)]'
                    : 'text-[var(--color-slate)] hover:bg-[var(--color-sheet-white)]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <section className="overflow-hidden rounded-[16px]" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
            <div className="hidden grid-cols-[1fr_1fr_90px_120px_100px_1fr_130px] gap-4 px-5 py-3 text-xs font-semibold uppercase lg:grid" style={{ borderBottom: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)', color: 'var(--color-muted-slate)' }}>
              <span>Nombre</span><span>Empresa</span><span>Unidades</span><span>PMS</span><span>Datadis</span><span>Dolor</span><span>Status</span>
            </div>
            {filtered.map(([name, company, units, pms, datadis, pain, leadStatus]) => (
              <div
                key={`${name}-${company}`}
                className="grid gap-3 px-5 py-4 last:border-b-0 lg:grid-cols-[1fr_1fr_90px_120px_100px_1fr_130px] lg:items-center"
                style={{ borderBottom: '1px solid var(--color-sage-mist)' }}
              >
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--color-bark)' }}>
                  <Building2 className="h-4 w-4" style={{ color: 'var(--color-canopy)' }} /> {name}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-slate)' }}>{company}</span>
                <span className="font-mono text-sm tabular-nums" style={{ color: 'var(--color-bark)' }}>{units}</span>
                <span className="text-sm" style={{ color: 'var(--color-slate)' }}>{pms}</span>
                <span className="text-sm" style={{ color: 'var(--color-slate)' }}>{datadis}</span>
                <span className="text-sm" style={{ color: 'var(--color-slate)' }}>{pain}</span>
                <span className={pillClass(leadStatus)}>{leadStatus}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AppShell>
  )
}
