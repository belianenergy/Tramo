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

function pill(status: string) {
  if (status === 'Nuevo') return 'border-[#d8d4d4] bg-[#f3f1ed] text-[#555555]'
  if (status === 'Cualificado') return 'border-[#fde68a] bg-[rgba(82,102,235,0.08)] text-[#3d52d4]'
  if (status === 'Llamada') return 'border-[#fde68a] bg-[#fef3c7] text-[#92600a]'
  return 'border-[#a7f3d0] bg-[#d1fae5] text-[#059669]'
}

export default function LeadsPage() {
  const [status, setStatus] = useState<(typeof statuses)[number]>('Todos')
  const filtered = useMemo(() => (status === 'Todos' ? leads : leads.filter((lead) => lead[6] === status)), [status])

  return (
    <AppShell>
      <div className="min-h-screen" style={{ background: '#f3f1ed' }}>
        <div className="max-w-7xl mx-auto px-0 py-2 md:py-4">
          <header className="mb-8">
            <h1 className="font-display text-2xl font-semibold" style={{ color: '#181011' }}>CRM Piloto</h1>
            <p className="text-sm mt-1" style={{ color: '#aaaaaa' }}>Gestoras españolas cualificadas para pilotos con reservas, Datadis y dolor energético claro.</p>
          </header>

          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-[#d8d4d4] bg-white p-2">
            <Filter className="ml-2 h-4 w-4 text-[#aaaaaa]" />
            {statuses.map((item) => (
              <button key={item} onClick={() => setStatus(item)} className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${status === item ? 'bg-[#5266eb] text-white' : 'text-[#555555] hover:bg-[#f3f1ed]'}`}>{item}</button>
            ))}
          </div>

          <section className="overflow-hidden rounded-2xl border border-[#d8d4d4] bg-white shadow-sm">
            <div className="hidden grid-cols-[1fr_1fr_90px_120px_100px_1fr_130px] gap-4 border-b border-[#d8d4d4] bg-[#f3f1ed] px-5 py-3 text-xs font-semibold uppercase text-[#aaaaaa] lg:grid">
              <span>Nombre</span><span>Empresa</span><span>Unidades</span><span>PMS</span><span>Datadis</span><span>Dolor</span><span>Status</span>
            </div>
            {filtered.map(([name, company, units, pms, datadis, pain, leadStatus]) => (
              <div key={`${name}-${company}`} className="grid gap-3 border-b border-[#d8d4d4] px-5 py-4 last:border-b-0 lg:grid-cols-[1fr_1fr_90px_120px_100px_1fr_130px] lg:items-center">
                <span className="flex items-center gap-2 text-sm font-semibold text-[#181011]"><Building2 className="h-4 w-4 text-[#5266eb]" /> {name}</span>
                <span className="text-sm text-[#555555]">{company}</span>
                <span className="font-mono text-sm text-[#181011]">{units}</span>
                <span className="text-sm text-[#555555]">{pms}</span>
                <span className="text-sm text-[#555555]">{datadis}</span>
                <span className="text-sm text-[#555555]">{pain}</span>
                <span className={`w-fit rounded-full border px-2 py-1 text-xs font-semibold ${pill(leadStatus)}`}>{leadStatus}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </AppShell>
  )
}
