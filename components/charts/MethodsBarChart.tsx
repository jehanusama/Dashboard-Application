"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useMemo } from "react";

const COLORS = [
  "#4f46e5",
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function MethodsBarChart() {
  const { transactions } = useAppSelector((s) => s.data);

  const chartData = useMemo(() => {
    const methodCounts: Record<string, number> = {};

    transactions.forEach((t) => {
      methodCounts[t.method] = (methodCounts[t.method] || 0) + 1;
    });

    return Object.entries(methodCounts)
      .map(([method, count]) => ({
        name: method
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
            Payment Methods
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Distribution of transactions by payment method
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
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          <p className="text-sm font-medium">No payment data available</p>
          <p className="text-xs text-surface-400">
            Transaction methods will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
          Payment Methods
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Distribution of transactions by payment method
        </p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={true}
              vertical={false}
              stroke="#e2e8f0"
              className="dark:stroke-surface-800"
            />
            <XAxis type="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              cursor={{ fill: "rgba(79, 70, 229, 0.05)" }}
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
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={24}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
