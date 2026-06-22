export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5" style={{ background: 'var(--color-cream-paper)', color: 'var(--color-bark)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="font-display text-lg font-medium" style={{ color: 'var(--color-canopy)' }}>Tramo</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-canopy)', animationDelay: '0ms' }} />
          <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-mint-pulse)', animationDelay: '150ms' }} />
          <span className="h-2 w-2 animate-bounce rounded-full" style={{ background: 'var(--color-orb-violet)', animationDelay: '300ms' }} />
        </div>
      </div>
    </main>
  )
}
