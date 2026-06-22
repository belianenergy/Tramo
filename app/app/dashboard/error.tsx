'use client'

import AppShell from '../components/AppShell'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <AppShell>
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-[12px]" style={{ background: 'var(--color-cream-paper)' }}>
          <AlertTriangle className="h-8 w-8" style={{ color: 'var(--color-canopy)' }} />
        </div>
        <h2 className="font-display text-2xl font-light" style={{ letterSpacing: '-0.01em', color: 'var(--color-ink)' }}>
          Error al cargar el dashboard
        </h2>
        <p className="mt-3 max-w-md text-[15px]" style={{ color: 'var(--color-slate)' }}>
          No se pudieron recuperar los datos de tu cartera. Comprueba tu conexión o inténtalo de nuevo en unos segundos.
        </p>
        <p className="mt-2 font-mono text-[10px]" style={{ color: 'var(--color-muted-slate)' }}>
          {error.digest ? `Ref: ${error.digest}` : 'Error de conexión con los datos'}
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-[9999px] px-6 text-[14px] font-medium transition-[background-color,transform] duration-200 active:translate-y-px"
          style={{ background: 'var(--color-ink)', color: 'var(--color-cream-paper)' }}
        >
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </button>
      </div>
    </AppShell>
  )
}
