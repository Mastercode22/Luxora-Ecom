export function Skeleton({ className = "" }) {
  return (
    <div
      className={`skeleton-shimmer animate-shimmer rounded-card ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card-surface overflow-hidden flex flex-col">
      <Skeleton className="aspect-[4/5] w-full rounded-none" />
      <div className="p-6 flex flex-col gap-3">
        <Skeleton className="h-2.5 w-1/4" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between mt-1 pt-3 border-t border-line">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Skeleton className="w-28 h-28 rounded-full" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}
