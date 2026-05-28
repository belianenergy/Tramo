'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  color: string
  children?: { label: string; href: string }[]
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Panel', href: '/app/dashboard', icon: '📊', color: 'var(--primary)' },
  {
    id: 'fincas', label: 'Fincas', href: '/app/fincas', icon: '🏢', color: 'var(--fincas)',
    children: [
      { label: 'Comunidades', href: '/app/fincas' },
    ],
  },
  {
    id: 'apartments', label: 'Apartamentos', href: '/app/apartments', icon: '🏠', color: 'var(--apartments)',
    children: [
      { label: 'Propiedades', href: '/app/apartments' },
    ],
  },
  { id: 'arbitrage', label: 'Arbitraje', href: '/app/arbitrage', icon: '⚡', color: 'var(--arbitrage)' },
  { id: 'advisor', label: 'Asesor IA', href: '/app/advisor', icon: '🤖', color: 'var(--advisor)' },
  { id: 'config', label: 'Configuración', href: '/app/config', icon: '⚙️', color: 'var(--text-secondary)' },
]

export default function Sidebar({ expanded }: { expanded: boolean }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/app/dashboard') return pathname === '/app/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className="fixed left-0 top-0 h-full z-50 flex flex-col bg-white border-r transition-all duration-300"
      style={{
        width: expanded ? 260 : 64,
        borderColor: 'var(--border)',
      }}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: 'var(--primary)' }}
          >
            T
          </div>
          {expanded && (
            <span className="font-display font-bold text-lg whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
              Tramo
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <div key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline"
                style={{
                  color: active ? item.color : 'var(--text-secondary)',
                  background: active ? `${item.color}10` : 'transparent',
                  border: active ? `1px solid ${item.color}25` : '1px solid transparent',
                }}
              >
                <span className="text-base shrink-0">{item.icon}</span>
                {expanded && <span>{item.label}</span>}
              </Link>
              {expanded && item.children && active && (
                <div className="ml-6 mt-1 space-y-0.5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-1.5 rounded-md text-xs font-medium transition-colors no-underline"
                      style={{
                        color: pathname === child.href ? item.color : 'var(--text-secondary)',
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          >
            MG
          </div>
          {expanded && (
            <div className="min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>Manuel García</p>
              <p className="text-[10px] truncate" style={{ color: 'var(--text-secondary)' }}>Administrador</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
