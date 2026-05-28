'use client'

import { useState } from 'react'
import { Database, KeyRound, Plug, ShieldCheck, Users } from 'lucide-react'
import AppShell from '../components/AppShell'
import { PageHeader, StatusBadge } from '../components/platform-ui'

const tabs = ['Integraciones', 'Roles', 'Datos', 'Automations'] as const

const integrations = [
  ['Datadis', 'CUPS y curvas horarias', 'Conectado', 'Ultima sync 19:10'],
  ['PMS Guesty', 'Reservas y ventanas operativas', 'Conectado', '124 unidades'],
  ['Shelly MQTT', 'Medicion y relays opcionales', 'Parcial', '68% de unidades'],
  ['Facturas', 'PDF/CSV comercializadoras', 'Revisar', '7 pendientes'],
  ['OMIE', 'Precios spot para arbitraje', 'Conectado', 'Actualizado 18:00'],
]

export default function ConfigPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('Integraciones')

  return (
    <AppShell>
      <PageHeader
        eyebrow="Settings · plataforma"
        title="Configuracion operacional para datos, roles, integraciones y reglas."
        description="La capa administrativa mantiene trazabilidad: quien aprueba cambios, de donde vienen las lecturas y que automatizaciones pueden ejecutarse sin supervision."
      />

      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        <nav className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-2 lg:self-start">
          {tabs.map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`flex min-h-11 w-full items-center rounded-md px-3 text-left text-sm font-semibold ${tab === item ? 'bg-[var(--color-ink)] text-[var(--color-lime)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-alt)]'}`}>
              {item}
            </button>
          ))}
        </nav>

        {tab === 'Integraciones' && (
          <section className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]">
            <div className="grid grid-cols-[1fr_1.2fr_110px_150px] gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-xs font-semibold uppercase text-[var(--color-muted)] max-md:hidden">
              <span>Fuente</span><span>Funcion</span><span>Estado</span><span>Detalle</span>
            </div>
            {integrations.map(([name, role, status, detail]) => (
              <div key={name} className="grid gap-3 border-b border-[var(--color-border)] px-4 py-4 last:border-b-0 md:grid-cols-[1fr_1.2fr_110px_150px] md:items-center">
                <span className="flex items-center gap-2 font-semibold"><Plug className="h-4 w-4 text-[var(--color-accent-ink)]" /> {name}</span>
                <span className="text-sm text-[var(--color-muted)]">{role}</span>
                <StatusBadge status={status === 'Conectado' ? 'Correcta' : status} />
                <span className="font-mono text-xs text-[var(--color-muted)]">{detail}</span>
              </div>
            ))}
          </section>
        )}

        {tab !== 'Integraciones' && (
          <section className="grid gap-4 md:grid-cols-3">
            {[
              [Users, 'Roles y permisos', 'Aprobadores, operaciones, finanzas y lectura propietario.'],
              [Database, 'Politica de datos', 'Retencion, importaciones CSV, calidad de lectura y auditoria.'],
              [ShieldCheck, 'Reglas seguras', 'Limites por coste, horarios y acciones que requieren doble aprobacion.'],
              [KeyRound, 'Credenciales', 'Gestion separada de tokens e integradores; no se muestran secretos.'],
            ].map(([Icon, title, copy]) => (
              <article key={title as string} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <Icon className="h-5 w-5 text-[var(--color-accent-ink)]" />
                <h2 className="mt-4 font-display text-xl font-semibold">{title as string}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{copy as string}</p>
                <button className="mt-4 min-h-10 rounded-lg border border-[var(--color-border)] px-3 text-sm font-semibold">Configurar</button>
              </article>
            ))}
          </section>
        )}
      </div>
    </AppShell>
  )
}
