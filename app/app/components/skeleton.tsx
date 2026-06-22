interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-[8px] ${className}`}
      style={{ background: 'var(--color-sage-mist)' }}
    />
  )
}
