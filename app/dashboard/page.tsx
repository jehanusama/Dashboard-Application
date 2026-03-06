"use client";

import { useAuth } from "@/hooks/useAuth";
import {
  Users,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { MOCK_STATS } from "@/lib/mockData/stats";


const formatValue = (key: string, value: number) => {
  if (key === "total_revenue") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }
  if (key === "conversion_rate") return `${value}%`;
  return new Intl.NumberFormat("en-US").format(value);
};
const calculateChange = (value: number, previous: number) => {
  const diff = ((value - previous) / previous) * 100;
  const isPositive = diff >= 0;
  return {
    text: `${isPositive ? "+" : ""}${diff.toFixed(1)}%`,
    positive: isPositive,
  };
};

const STAT_ICONS: Record<string, React.ElementType> = {
  total_revenue: DollarSign,
  active_users: Users,
  conversion_rate: TrendingUp,
  pending_orders: ShoppingCart,
};

const STAT_COLORS: Record<string, string> = {
  total_revenue:
    "bg-primary-500/10 text-primary-500 dark:bg-primary-500/20 dark:text-primary-400",
  active_users:
    "bg-accent-500/10 text-accent-500 dark:bg-accent-500/20 dark:text-accent-400",
  conversion_rate: "bg-info/10 text-info dark:bg-info/20 text-info-500",
  pending_orders:
    "bg-warning/10 text-warning dark:bg-warning/20 text-warning-500",
};

const stats = MOCK_STATS.map((stat) => {
  const { text: change, positive } = calculateChange(
    stat.value,
    stat.previousValue,
  );
  return {
    title: stat.label,
    value: formatValue(stat.key, stat.value),
    change,
    positive,
    icon: STAT_ICONS[stat.key] || Users,
    color: STAT_COLORS[stat.key] || "bg-gray-100 text-gray-500",
  };
});

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-surface-800 dark:text-surface-100">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-surface-500">
          Here&apos;s what&apos;s happening with your platform today,{" "}
          <span className="font-medium text-primary-500">{user?.name}</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.positive ? ArrowUpRight : ArrowDownRight;
          return (
            <div
              key={stat.title}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-800 p-6 shadow-soft border border-surface-100 dark:border-surface-700 hover:shadow-premium transition-shadow duration-300"
            >
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-linear-to-br from-primary-500/5 to-accent-500/5 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium tracking-wide text-surface-500 uppercase">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-surface-800 dark:text-surface-100">
                    {stat.value}
                  </p>
                </div>
                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon size={22} />
                </div>
              </div>

              <div className="relative mt-4 flex items-center gap-1.5">
                <TrendIcon
                  size={14}
                  className={stat.positive ? "text-success" : "text-error"}
                />
                <span
                  className={`text-xs font-semibold ${
                    stat.positive ? "text-success" : "text-error"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-xs text-surface-400">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 p-6 shadow-soft">
          <h2 className="text-base font-semibold text-surface-700 dark:text-surface-200 mb-4">
            Revenue Overview
          </h2>
          <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-surface-400 text-sm">
            Chart component
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-surface-800 border border-surface-100 dark:border-surface-700 p-6 shadow-soft">
          <h2 className="text-base font-semibold text-surface-700 dark:text-surface-200 mb-4">
            Recent Activity
          </h2>
          <div className="flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-surface-400 text-sm">
            Activity feed
          </div>
        </div>
      </div>
    </div>
  );
}
