'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { Bell, Command, Filter, Menu, Search, X } from 'lucide-react'
import Sidebar, { navItems } from './Navigation'

const commandItems = [
  'VGO-014 · Vigo Centro · CUPS ES0021000009347621TR',
  'COR-007 · A Coruña Marina · factura Naturgy mayo',
  'Alerta >50 EUR · consumo fuera de reserva',
  'Vista guardada · Costa alta ocupación',
  'Informe propietario · Costa Rentals',
]

const savedViews = ['Costa alta ocupación', 'Propietarios premium', 'Alertas >50 EUR', 'Sin lectura 24h']

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [expanded, setExpanded] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [query, setQuery] = useState('')

  const results = useMemo(
    () => commandItems.filter((item) => item.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  useEffect(() => {
    if (!mobileNavOpen && !paletteOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileNavOpen(false)
        setPaletteOpen(false)
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileNavOpen, paletteOpen])

  return (
    <div className="min-h-dvh bg-[var(--color-paper)] text-[var(--color-ink)]">
      <div onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
        <Sidebar expanded={expanded} />
      </div>

      <div
        className="min-h-dvh transition-[padding] duration-300 md:pl-[var(--sidebar-width)]"
        style={{ '--sidebar-width': `${expanded ? 292 : 76}px` } as CSSProperties}
      >
        <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-paper)]/92 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 md:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileNavOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] md:hidden"
                aria-label="Abrir navegación"
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/app/dashboard" className="font-display text-lg font-semibold text-[var(--color-ink)] no-underline md:hidden">
                Tramo
              </Link>
              <button
                type="button"
                onClick={() => setPaletteOpen(true)}
                className="hidden h-10 w-full max-w-xl items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-left text-sm text-[var(--color-muted)] transition hover:border-[var(--color-border-strong)] sm:flex"
              >
                <Search className="h-4 w-4" />
                <span className="truncate">Buscar apartamento, CUPS, factura o alerta</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-md border border-[var(--color-border)] px-2 py-1 font-mono text-[0.65rem] uppercase text-[var(--color-soft)]">
                  <Command className="h-3 w-3" /> K
                </span>
              </button>
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              {savedViews.slice(0, 3).map((view) => (
                <button key={view} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[var(--color-muted)] hover:border-[var(--color-border-strong)]">
                  {view}
                </button>
              ))}
            </div>

            <button className="relative grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]" aria-label="Notificaciones">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-warning)]" />
            </button>
          </div>
        </header>

        <main className="px-4 py-5 md:px-6">
          <div className="mx-auto max-w-[1520px]">{children}</div>
        </main>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[80] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title">
          <button
            type="button"
            aria-label="Cerrar navegación"
            className="absolute inset-0 bg-[var(--color-ink)]/45"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside
            id="mobile-navigation"
            className="absolute inset-y-0 left-0 flex w-[min(88vw,360px)] flex-col border-r border-white/10 bg-[var(--color-ink)] text-[var(--color-paper)] shadow-2xl"
          >
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <div>
                <h2 id="mobile-navigation-title" className="font-display text-lg font-semibold">Tramo</h2>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-white/42">Energy control room</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/12 text-white/70"
                aria-label="Cerrar navegación"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`mb-1 flex min-h-[52px] items-center gap-3 rounded-lg border px-3 py-3 no-underline ${
                      active
                        ? 'border-[var(--color-lime)]/35 bg-[var(--color-lime)] text-[var(--color-ink)]'
                        : 'border-transparent text-white/72 hover:border-white/12 hover:bg-white/7'
                    }`}
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className={`block font-mono text-[0.65rem] uppercase tracking-[0.12em] ${active ? 'text-[var(--color-ink)]/60' : 'text-white/36'}`}>
                        {item.meta}
                      </span>
                    </span>
                  </Link>
                )
              })}
              <Link
                href="/precios"
                onClick={() => setMobileNavOpen(false)}
                className="mt-3 flex min-h-12 items-center rounded-lg border border-white/12 px-3 py-3 text-sm font-semibold text-white/78 no-underline"
              >
                Pricing / tiers
              </Link>
            </nav>
            <div className="border-t border-white/10 p-4 text-xs leading-5 text-white/45">
              Vistas: Costa alta ocupación · Propietarios premium · Alertas &gt;50 EUR · Sin lectura 24h
            </div>
          </aside>
        </div>
      )}

      {paletteOpen && (
        <div className="fixed inset-0 z-[90] bg-[var(--color-ink)]/45 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--color-muted)]" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar VGO-014, ES0021, factura, alerta..."
                className="min-h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--color-soft)]"
              />
              <button onClick={() => setPaletteOpen(false)} className="grid h-8 w-8 place-items-center rounded-md hover:bg-[var(--color-surface-alt)]" aria-label="Cerrar">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.map((item) => (
                <button key={item} onClick={() => setPaletteOpen(false)} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm hover:bg-[var(--color-surface-alt)]">
                  <Filter className="h-4 w-4 text-[var(--color-accent-ink)]" />
                  <span>{item}</span>
                </button>
              ))}
              {results.length === 0 && <p className="px-3 py-8 text-center text-sm text-[var(--color-muted)]">Sin resultados para esta búsqueda.</p>}
            </div>
            <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] px-4 py-3 text-xs text-[var(--color-muted)]">
              Vistas guardadas: {savedViews.join(' · ')}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
