"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Users, TrendingUp, ShoppingCart, DollarSign } from "lucide-react";
import { useAppSelector } from "@/hooks/useAppSelector";
import StatCard from "@/components/ui/StatCard";
import RevenueChart from "@/components/charts/RevenueChart";

export default function DashboardPage() {
  const { user } = useAuth();
  const { transactions } = useAppSelector((s) => s.data);

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalOrders = transactions.length;
  const pendingOrders = transactions.filter(
    (t) => t.status === "pending",
  ).length;

  const recentTransactions = [...transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      change: "+12.5%",
      positive: true,
      icon: DollarSign,
      color: "bg-primary-500/10 text-primary-500 shadow-inner-glow",
    },
    {
      title: "Active Users",
      value: "2,420",
      change: "+15.2%",
      positive: true,
      icon: Users,
      color: "bg-accent-500/10 text-accent-500 shadow-inner-glow",
    },
    {
      title: "Pending Orders",
      value: pendingOrders.toString(),
      change: "-2.1%",
      positive: false,
      icon: ShoppingCart,
      color: "bg-warning-500/10 text-warning-500 shadow-inner-glow",
    },
    {
      title: "Total Orders",
      value: totalOrders.toString(),
      change: "+5.4%",
      positive: true,
      icon: TrendingUp,
      color: "bg-info-500/10 text-info-500 shadow-inner-glow",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-dashboard-x py-dashboard-y animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 italic tracking-tight underline decoration-primary-500/30 underline-offset-8">
          Overview Summary
        </h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Welcome back,{" "}
          <span className="font-semibold text-primary-500">{user?.name}</span>.
          Here&apos;s a quick snapshot of your business.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            label={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={{
              value: stat.change,
              isPositive: stat.positive,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        
        <div className="glass rounded-2xl p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100 italic">
              Recent Activity
            </h3>
            <Link
              href="/dashboard/table"
              className="text-xs font-semibold text-primary-500 hover:text-primary-600 transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-800/50 transition-colors border border-transparent hover:border-surface-100 dark:hover:border-surface-700 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-linear-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-800 flex items-center justify-center text-surface-600 dark:text-surface-300 font-bold group-hover:scale-110 transition-transform">
                    {tx.customerName.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-surface-900 dark:text-surface-100">
                      {tx.customerName}
                    </p>
                    <p className="text-xs text-surface-500">
                      {new Date(tx.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-surface-900 dark:text-surface-100">
                    ${tx.amount.toFixed(2)}
                  </p>
                  <p
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      tx.status === "completed"
                        ? "text-success"
                        : tx.status === "pending"
                          ? "text-warning"
                          : "text-error"
                    }`}
                  >
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
