import { ChartSkeleton, DashboardCardsSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 pb-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-36" />
        <Skeleton className="h-4 w-52" />
      </div>
      <DashboardCardsSkeleton />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartSkeleton height="h-64" />
        <ChartSkeleton height="h-64" />
      </div>
    </div>
  );
}
