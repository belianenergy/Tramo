'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Landing error:', error)
  }, [error])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-bark)' }}>
      <div className="flex h-16 w-16 items-center justify-center rounded-[16px]" style={{ border: '1px solid var(--color-sage-mist)' }}>
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="var(--color-slate)" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      </div>
      <div>
        <h1 className="font-display text-2xl font-light" style={{ letterSpacing: '-0.02em', color: 'var(--color-ink)' }}>Algo no fue bien</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-slate)' }}>No se pudo cargar la página. Inténtalo de nuevo.</p>
      </div>
      <button
        onClick={reset}
        className="rounded-[8px] px-6 py-2 text-sm font-medium text-[var(--color-sheet-white)] transition-opacity hover:opacity-90"
        style={{ background: 'var(--color-canopy)' }}
      >
        Reintentar
      </button>
    </main>
  )
}
