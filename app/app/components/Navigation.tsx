'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentType } from 'react'
import {
  AlertTriangle,
  BarChart3,
  BatteryCharging,
  Building2,
  FileText,
  Layers3,
  Settings,
  SlidersHorizontal,
} from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ className?: string }>
  meta: string
}

export const navItems: NavItem[] = [
  { label: 'Command Center', href: '/app/dashboard', icon: BarChart3, meta: 'Cartera' },
  { label: 'Portfolio', href: '/app/apartments', icon: Building2, meta: 'Unidades' },
  { label: 'Optimization', href: '/app/operations', icon: AlertTriangle, meta: 'Alertas' },
  { label: 'Billing', href: '/app/advisor', icon: SlidersHorizontal, meta: 'CUPS' },
  { label: 'Arbitrage', href: '/app/arbitrage', icon: BatteryCharging, meta: 'OMIE' },
  { label: 'Reports', href: '/app/informe', icon: FileText, meta: 'Owners' },
  { label: 'Settings', href: '/app/config', icon: Settings, meta: 'Integraciones' },
]

export default function Sidebar({ expanded }: { expanded: boolean }) {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 z-50 hidden h-dvh flex-col border-r border-[var(--color-border)] bg-[var(--color-ink)] text-[var(--color-paper)] transition-[width] duration-300 md:flex"
      style={{ width: expanded ? 292 : 76 }}
    >
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-[var(--color-lime)]/45 bg-[var(--color-lime)] text-sm font-black text-[var(--color-ink)]">
          T
        </div>
        {expanded && (
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-none">Tramo</p>
            <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-white/45">Energy desk</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex min-h-12 items-center gap-3 rounded-lg border px-3 py-2 text-sm no-underline transition ${
                active
                  ? 'border-[var(--color-lime)]/35 bg-[var(--color-lime)] text-[var(--color-ink)]'
                  : 'border-transparent text-white/68 hover:border-white/12 hover:bg-white/7 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {expanded && (
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{item.label}</span>
                  <span className={`block truncate font-mono text-[0.65rem] uppercase tracking-[0.12em] ${active ? 'text-[var(--color-ink)]/65' : 'text-white/35'}`}>
                    {item.meta}
                  </span>
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/10 font-mono text-xs font-semibold">MG</div>
            {expanded && (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Mauro · Admin</p>
                <p className="truncate font-mono text-[0.65rem] uppercase tracking-[0.12em] text-white/42">124 unidades · España</p>
              </div>
            )}
          </div>
          {expanded && (
            <div className="mt-3 flex items-center gap-2 rounded-md border border-[var(--color-lime)]/25 bg-[var(--color-lime)]/10 px-2 py-1.5 text-[0.72rem] text-[var(--color-lime)]">
              <Layers3 className="h-3.5 w-3.5" />
              <span>Datadis, PMS y facturas sincronizados</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
