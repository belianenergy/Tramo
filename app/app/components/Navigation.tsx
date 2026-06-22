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
  { label: 'Centro de control', href: '/app/dashboard', icon: BarChart3, meta: 'Decisiones' },
  { label: 'Cartera', href: '/app/apartments', icon: Building2, meta: 'Unidades' },
  { label: 'Operaciones', href: '/app/operations', icon: AlertTriangle, meta: 'Alertas' },
  { label: 'Contratos', href: '/app/advisor', icon: SlidersHorizontal, meta: 'CUPS' },
  { label: 'Informes', href: '/app/informe', icon: FileText, meta: 'Propietarios' },
  { label: 'Arbitraje', href: '/app/arbitrage', icon: BatteryCharging, meta: 'Premium' },
  { label: 'Configuración', href: '/app/config', icon: Settings, meta: 'Integraciones' },
]

export default function Sidebar({ expanded }: { expanded: boolean }) {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 z-50 hidden h-dvh flex-col transition-[width] duration-300 md:flex"
      style={{ width: expanded ? 292 : 76, background: 'var(--color-sheet-white)', borderRight: '1px solid var(--color-sage-mist)' }}
    >
      <div className="flex h-[52px] items-center gap-3 px-4" style={{ borderBottom: '1px solid var(--color-sage-mist)' }}>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-sm font-medium" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-bark)' }}>
          T
        </div>
        {expanded && (
          <div className="min-w-0">
            <p className="font-display text-base font-light text-[var(--color-bark)]">Tramo</p>
            <p className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.16em]" style={{ color: 'var(--color-muted-slate)' }}>Energy desk</p>
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
              className={`group flex min-h-11 items-center gap-3 rounded-[8px] px-3 py-2 text-sm no-underline transition-[background-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-canopy)] ${expanded ? '' : 'justify-center px-1'}`}
              style={{
                background: active ? 'var(--color-bark)' : 'transparent',
                color: active ? 'var(--color-sheet-white)' : 'var(--color-bark)',
              }}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {expanded && (
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{item.label}</span>
                  <span className="block truncate font-mono text-[0.6rem] uppercase tracking-[0.12em]" style={{ opacity: active ? 0.6 : 0.35 }}>
                    {item.meta}
                  </span>
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {expanded && (
        <div className="p-3" style={{ borderTop: '1px solid var(--color-sage-mist)' }}>
          <div className="rounded-[8px] p-3" style={{ background: 'var(--color-cream-paper)' }}>
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full font-mono text-xs font-medium" style={{ background: 'var(--color-sheet-white)', color: 'var(--color-bark)' }}>
                MG
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-[var(--color-bark)]">Mauro · Admin</p>
                <p className="truncate font-mono text-[0.6rem] uppercase tracking-[0.12em]" style={{ color: 'var(--color-muted-slate)' }}>— unidades · demo</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-[8px] px-2.5 py-2 text-[0.7rem]" style={{ background: 'var(--color-sheet-white)', color: 'var(--color-canopy)' }}>
              <Layers3 className="h-3.5 w-3.5" />
              <span>Demo · pendente de conexión real</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
