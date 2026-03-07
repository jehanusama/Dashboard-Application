"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useMemo } from "react";

export default function RevenueChart() {
  const { transactions } = useAppSelector((s) => s.data);

  const chartData = useMemo(() => {
    const dailyData: Record<string, number> = {};

    const sortedTransactions = [...transactions]
      .filter((t) => t.status === "completed")
      .sort((a, b) => a.date.localeCompare(b.date));

    sortedTransactions.forEach((t) => {
      dailyData[t.date] = (dailyData[t.date] || 0) + t.amount;
    });

    return Object.entries(dailyData).map(([date, amount]) => ({
      date: new Date(date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      amount,
    }));
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
            Revenue Trend
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Daily completed transaction revenue
          </p>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-3 text-surface-400">
          <svg
            className="h-12 w-12 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <p className="text-sm font-medium">No revenue data available</p>
          <p className="text-xs text-surface-400">
            Completed transactions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
          Revenue Trend
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Daily completed transaction revenue
        </p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-surface-800"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              interval="preserveStartEnd"
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                borderRadius: "12px",
                border: "1px solid rgba(226, 232, 240, 1)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "12px",
              }}
              itemStyle={{ color: "#4f46e5", fontWeight: "bold" }}
              labelStyle={{ color: "#0f172a", marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
