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
      if (event.key === 'Escape') { setMobileNavOpen(false); setPaletteOpen(false) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [mobileNavOpen, paletteOpen])

  return (
    <div style={{ background: 'var(--canvas)', color: 'var(--ink)' }}>
      <div onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)}>
        <Sidebar expanded={expanded} />
      </div>

      <div className="min-h-dvh transition-[padding] duration-300 md:pl-[var(--sidebar-width)]" style={{ '--sidebar-width': `${expanded ? 292 : 76}px` } as CSSProperties}>
        {/* Top bar */}
        <header className="sticky top-0 z-40 px-4 md:px-6" style={{ background: 'var(--fog)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
          <div className="flex h-[52px] items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <button type="button" onClick={() => setMobileNavOpen(true)} className="grid h-10 w-10 place-items-center rounded-[16px] md:hidden" style={{ background: 'var(--snow)', boxShadow: 'rgba(0,0,0,0.06) 0px 0px 6px 0px' }}>
                <Menu className="h-5 w-5" style={{ color: 'var(--ink)' }} />
              </button>
              <Link href="/app/dashboard" className="font-display text-lg font-light text-[var(--ink)] no-underline md:hidden">Tram<span style={{ color: 'var(--graphite)' }}>o</span></Link>
              <button type="button" onClick={() => setPaletteOpen(true)} className="hidden h-10 w-full max-w-xl items-center gap-3 rounded-[16px] px-4 text-left text-sm transition-all duration-200 sm:flex" style={{ background: 'var(--snow)', boxShadow: 'rgba(0,0,0,0.04) 0px 0px 4px 0px', color: 'var(--graphite)' }}>
                <Search className="h-4 w-4" style={{ color: 'var(--slate)' }} />
                <span className="truncate">Buscar apartamento, CUPS, factura o alerta</span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-[12px] px-2 py-1 font-mono text-[0.65rem] uppercase" style={{ background: 'var(--fog)', color: 'var(--slate)' }}><Command className="h-3 w-3" /> K</span>
              </button>
            </div>
            <div className="hidden items-center gap-2 lg:flex">
              {savedViews.slice(0, 3).map((view) => (<button key={view} className="rounded-[9999px] px-4 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-[var(--fog)]" style={{ color: 'var(--ink)' }}>{view}</button>))}
            </div>
            <button className="relative grid h-10 w-10 place-items-center rounded-[16px]" style={{ background: 'var(--snow)', boxShadow: 'rgba(0,0,0,0.04) 0px 0px 4px 0px' }} aria-label="Notificaciones">
              <Bell className="h-4 w-4" style={{ color: 'var(--graphite)' }} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full" style={{ background: 'var(--color-amber)' }} />
            </button>
          </div>
        </header>
        <main className="px-4 py-5 md:px-6"><div className="mx-auto max-w-[1400px]">{children}</div></main>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[80] md:hidden" role="dialog" aria-modal="true" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
          <aside className="absolute inset-y-0 left-0 flex w-[min(88vw,320px)] flex-col" style={{ background: 'var(--snow)' }}>
            <div className="flex h-[52px] items-center justify-between px-4" style={{ borderBottom: '1px solid var(--fog)' }}>
              <h2 className="font-display text-lg font-light text-[var(--ink)]">Tramo</h2>
              <button onClick={() => setMobileNavOpen(false)} className="grid h-10 w-10 place-items-center rounded-[16px]" style={{ background: 'var(--fog)' }}><X className="h-5 w-5" style={{ color: 'var(--ink)' }} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto p-3">
              {navItems.map((item) => {
                const Icon = item.icon; const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (<Link key={item.href} href={item.href} onClick={() => setMobileNavOpen(false)} className="mb-1 flex min-h-[52px] items-center gap-3 rounded-[16px] px-3 py-3 no-underline transition-all duration-200" style={{ background: active ? 'var(--ink)' : 'transparent', color: active ? 'var(--snow)' : 'var(--ink)' }}><Icon className="h-5 w-5 shrink-0" /><span className="min-w-0"><span className="block text-sm font-medium">{item.label}</span><span className="block font-mono text-[0.65rem] uppercase tracking-[0.12em]" style={{ opacity: active ? 0.6 : 0.4 }}>{item.meta}</span></span></Link>)
              })}
            </nav>
          </aside>
        </div>
      )}

      {paletteOpen && (
        <div className="fixed inset-0 z-[90] p-4" role="dialog" aria-modal="true" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
          <div className="mx-auto mt-20 max-w-2xl overflow-hidden rounded-[20px]" style={{ background: 'var(--snow)', boxShadow: 'rgba(0,0,0,0.12) 0px 8px 32px 0px' }}>
            <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--fog)' }}>
              <Search className="h-4 w-4" style={{ color: 'var(--slate)' }} />
              <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar VGO-014, ES0021, factura, alerta..." className="min-h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--slate)]" style={{ color: 'var(--ink)' }} />
              <button onClick={() => setPaletteOpen(false)} className="grid h-8 w-8 place-items-center rounded-[12px]" style={{ background: 'var(--fog)' }}><X className="h-4 w-4" style={{ color: 'var(--graphite)' }} /></button>
            </div>
            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.map((item) => (<button key={item} onClick={() => setPaletteOpen(false)} className="flex w-full items-center gap-3 rounded-[12px] px-3 py-3 text-left text-sm transition-all duration-200 hover:bg-[var(--fog)]"><Filter className="h-4 w-4" style={{ color: 'var(--graphite)' }} /><span>{item}</span></button>))}
              {results.length === 0 && <p className="px-3 py-8 text-center text-sm" style={{ color: 'var(--slate)' }}>Sin resultados.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
