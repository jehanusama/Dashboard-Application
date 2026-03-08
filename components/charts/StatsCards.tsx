"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";

export default function StatsCards() {
  const { transactions } = useAppSelector((s) => s.data);

  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalTransactions = transactions.length;

  const avgValue =
    totalTransactions > 0
      ? totalRevenue /
        transactions.filter((t) => t.status === "completed").length
      : 0;

  const successRate =
    totalTransactions > 0
      ? (transactions.filter((t) => t.status === "completed").length /
          totalTransactions) *
        100
      : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Revenue"
        value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={DollarSign}
        trend={{ value: "+12.5%", isPositive: true }}
      />
      <StatCard
        label="Total Transactions"
        value={totalTransactions}
        icon={ShoppingCart}
        trend={{ value: "+5.2%", isPositive: true }}
      />
      <StatCard
        label="Avg. Transaction"
        value={`$${avgValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={TrendingUp}
        trend={{ value: "-2.1%", isPositive: false }}
      />
      <StatCard
        label="Success Rate"
        value={`${successRate.toFixed(1)}%`}
        icon={CheckCircle2}
        trend={{ value: "+0.8%", isPositive: true }}
      />
    </div>
  );
}
