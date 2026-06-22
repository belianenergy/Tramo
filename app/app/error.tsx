'use client'

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 text-center" style={{ background: 'var(--color-cream-paper)' }}>
      <div
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{ background: 'var(--color-orb-violet)' }}
      >
        <span className="text-2xl font-mono font-bold text-[var(--color-sheet-white)]">!</span>
      </div>

      <div className="max-w-md space-y-2">
        <h1 className="font-display text-xl font-light" style={{ color: 'var(--color-bark)' }}>
          Algo no fue bien
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--color-slate)' }}>
          No se pudo cargar esta sección. Puedes intentarlo de nuevo o, si el problema persiste, revisa la conexión de datos.
        </p>
        {error.digest && (
          <p className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>
            Código: {error.digest}
          </p>
        )}
      </div>

      <button
        onClick={reset}
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[8px] px-6 font-display text-sm font-medium transition-[background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-canopy)]"
        style={{ background: 'var(--color-bark)', color: 'var(--color-sheet-white)' }}
      >
        Reintentar
      </button>
    </div>
  )
}
