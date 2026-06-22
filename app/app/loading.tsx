import { Skeleton } from '@/app/app/components/skeleton'

export default function AppLoading() {
  return (
    <div className="flex min-h-dvh items-center justify-center p-8" style={{ background: 'var(--color-cream-paper)' }}>
      <div className="w-full max-w-4xl space-y-6">
        {/* Header skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-[16px] p-5"
              style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-sheet-white)' }}
            >
              <Skeleton className="mb-3 h-4 w-32" />
              <Skeleton className="mb-2 h-8 w-20" />
              <Skeleton className="h-3 w-48" />
            </div>
          ))}
        </div>

        {/* Table skeleton */}
        <div
          className="rounded-[16px] p-5"
          style={{ border: '1px solid var(--color-sage-mist)', background: 'var(--color-sheet-white)' }}
        >
          {/* Dots loading indicator */}
          <div className="mb-4 flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-canopy)', animationDelay: '0ms' }} />
            <span className="inline-block h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-mint-pulse)', animationDelay: '150ms' }} />
            <span className="inline-block h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-orb-violet)', animationDelay: '300ms' }} />
            <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: 'var(--color-muted-slate)' }}>Cargando...</span>
          </div>

          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 border-b py-3" style={{ borderColor: 'var(--color-sage-mist)' }}>
              <Skeleton className="h-10 w-10 rounded-[8px]" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-8 w-20 rounded-[8px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
