import React from "react";

// ─── Base primitive ───────────────────────────────────────────────────────────

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Single skeleton block — shimmer animation, dark mode aware.
 */
export const Skeleton = ({ className = "", ...props }: SkeletonProps) => (
  <div
    className={[
      "relative overflow-hidden rounded-lg",
      "bg-surface-200 dark:bg-surface-800",
      "before:absolute before:inset-0",
      "before:bg-gradient-to-r before:from-transparent before:via-white/40 dark:before:via-white/10 before:to-transparent",
      "before:-translate-x-full before:animate-[shimmer_1.8s_infinite]",
      className,
    ].join(" ")}
    aria-hidden="true"
    {...props}
  />
);

// ─── Dashboard Cards ──────────────────────────────────────────────────────────

export const StatCardSkeleton = () => (
  <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 flex flex-col gap-4">
    <div className="flex items-start justify-between">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <Skeleton className="h-5 w-16 rounded-full" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-4 w-32" />
    </div>
  </div>
);

export const DashboardCardsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <StatCardSkeleton key={i} />
    ))}
  </div>
);

// ─── Charts ───────────────────────────────────────────────────────────────────

export const ChartSkeleton = ({ height = "h-72" }: { height?: string }) => (
  <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 flex flex-col gap-5">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="h-9 w-28 rounded-lg" />
    </div>
    {/* Chart area — faux bars */}
    <div className={`${height} flex items-end gap-3 px-2`}>
      {[60, 80, 45, 90, 70, 55, 85, 65, 75, 50, 88, 72].map((h, i) => (
        <Skeleton
          key={i}
          className="flex-1 rounded-t-md"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
    {/* X axis labels */}
    <div className="flex justify-between px-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <Skeleton key={i} className="h-3 w-8" />
      ))}
    </div>
  </div>
);

// ─── Tables ───────────────────────────────────────────────────────────────────

export const TableSkeleton = ({
  rows = 8,
  cols = 6,
}: {
  rows?: number;
  cols?: number;
}) => (
  <div className="rounded-2xl border border-surface-200 dark:border-surface-800 overflow-hidden">
    {/* Header */}
    <div className="bg-surface-50 dark:bg-surface-800/50 px-6 py-4 flex gap-6 border-b border-surface-200 dark:border-surface-800">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4" style={{ width: `${[12, 18, 12, 10, 10, 10][i % 6]}%` }} />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, row) => (
      <div
        key={row}
        className="px-6 py-4 flex items-center gap-6 border-b border-surface-100 dark:border-surface-800 last:border-0"
      >
        {/* Avatar + name column */}
        <div className="flex items-center gap-3" style={{ width: "18%" }}>
          <Skeleton className="h-9 w-9 rounded-full shrink-0" />
          <Skeleton className="h-4 flex-1" />
        </div>
        {Array.from({ length: cols - 1 }).map((_, col) => (
          <Skeleton
            key={col}
            className="h-4 rounded-full"
            style={{ width: `${[12, 12, 10, 10, 10][col % 5]}%` }}
          />
        ))}
      </div>
    ))}
  </div>
);

// ─── User Profile ─────────────────────────────────────────────────────────────

export const UserProfileSkeleton = () => (
  <div className="space-y-6">
    {/* Profile header card */}
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <Skeleton className="h-24 w-24 rounded-full shrink-0" />
        <div className="flex-1 space-y-3 w-full">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-36" />
          <div className="flex gap-3 pt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 rounded-xl" />
      </div>
    </div>

    {/* Stats row */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-7 w-16" />
        </div>
      ))}
    </div>

    {/* Info + timeline columns */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Contact info */}
      <div className="lg:col-span-1 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 space-y-4">
        <Skeleton className="h-5 w-32" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        ))}
      </div>

      {/* Activity timeline */}
      <div className="lg:col-span-2 rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 space-y-4">
        <Skeleton className="h-5 w-36" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5 pt-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── Transaction Details ──────────────────────────────────────────────────────

export const TransactionDetailsSkeleton = () => (
  <div className="space-y-6">
    {/* Breadcrumb */}
    <div className="flex items-center gap-2">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4 rounded" />
      <Skeleton className="h-4 w-28" />
    </div>

    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-32 rounded-full" />
      </div>
      <Skeleton className="h-9 w-28 rounded-xl" />
    </div>

    {/* Top info cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-4 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
      ))}
    </div>

    {/* Items table */}
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 space-y-4">
      <Skeleton className="h-5 w-32" />
      <TableSkeleton rows={3} cols={4} />
    </div>

    {/* Timeline */}
    <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-5 space-y-5">
      <Skeleton className="h-5 w-28" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5 pt-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Convenience page-level wrappers ─────────────────────────────────────────

export const DashboardPageSkeleton = () => (
  <div className="flex flex-col gap-8 p-dashboard-x py-dashboard-y">
    <div className="space-y-2">
      <Skeleton className="h-9 w-56" />
      <Skeleton className="h-4 w-72" />
    </div>
    <DashboardCardsSkeleton />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2">
        <ChartSkeleton />
      </div>
      <div className="rounded-2xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-14" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
            <div className="text-right space-y-1.5">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
