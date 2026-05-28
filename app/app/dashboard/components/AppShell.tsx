'use client'

import { useState } from 'react'
import Sidebar from './Navigation'
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <div
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <Sidebar expanded={expanded} />
      </div>

      {/* Main */}
      <div
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: expanded ? 260 : 64 }}
      >
        {/* Top Header */}
        <header
          className="h-16 flex items-center justify-between px-6 border-b bg-white sticky top-0 z-40"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                type="text"
                placeholder="Buscar comunidades, propiedades..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border bg-gray-50 transition-colors focus:outline-none focus:ring-2"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs font-bold">
              MG
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
