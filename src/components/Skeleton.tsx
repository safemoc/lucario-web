export function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-700/50 ${className}`}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <Skeleton className="mb-3 h-5 w-1/3" />
      <Skeleton className="mb-2 h-3 w-1/2" />
      <div className="mt-2 flex-1 space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-3/4" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="grid h-full grid-cols-12 gap-3">
      <div className="col-span-4">
        <CardSkeleton />
      </div>
      <div className="col-span-4">
        <CardSkeleton />
      </div>
      <div className="col-span-4">
        <CardSkeleton />
      </div>
    </div>
  );
}
