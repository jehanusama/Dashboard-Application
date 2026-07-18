import { TableSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 pb-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-44" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>
      <Skeleton className="h-9 w-full rounded-xl" />
      <div className="flex gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <TableSkeleton rows={6} cols={5} />
    </div>
  );
}
