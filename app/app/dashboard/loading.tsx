import AppShell from '../components/AppShell'

export default function DashboardLoading() {
  const fakeRows = Array.from({ length: 5 })
  return (
    <AppShell>
      <div className="space-y-5">
        {/* Header skeleton */}
        <div className="space-y-3">
          <div className="h-5 w-48 animate-pulse rounded-[6px]" style={{ background: 'var(--color-sage-mist)' }} />
          <div className="h-4 w-80 animate-pulse rounded-[6px]" style={{ background: 'var(--color-sage-mist)' }} />
          <div className="h-11 w-44 animate-pulse rounded-[8px]" style={{ background: 'var(--color-sage-mist)' }} />
        </div>

        {/* Metric tiles skeleton */}
        <div className="grid gap-3 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-[12px] border p-5" style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-cream-paper)' }}>
              <div className="h-4 w-24 animate-pulse rounded-[6px] mb-3" style={{ background: 'var(--color-sage-mist)' }} />
              <div className="h-8 w-16 animate-pulse rounded-[6px] mb-1" style={{ background: 'var(--color-cream-paper)' }} />
              <div className="h-3 w-32 animate-pulse rounded-[6px]" style={{ background: 'var(--color-sage-mist)' }} />
            </div>
          ))}
        </div>

        {/* Charts skeleton */}
        <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="h-[280px] animate-pulse rounded-[12px]" style={{ background: 'var(--color-sage-mist)', opacity: 0.3 }} />
          <div className="h-[280px] animate-pulse rounded-[12px]" style={{ background: 'var(--color-sage-mist)', opacity: 0.3 }} />
        </div>

        {/* Table skeleton */}
        <div className="rounded-[12px] border p-5" style={{ border: '1px solid var(--color-sage-mist)' }}>
          <div className="h-8 w-full animate-pulse rounded-[6px] mb-3" style={{ background: 'var(--color-sage-mist)' }} />
          {fakeRows.map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-[6px] mb-2" style={{ background: 'var(--color-sage-mist)', opacity: 0.5 }} />
          ))}
        </div>
      </div>
    </AppShell>
  )
}
