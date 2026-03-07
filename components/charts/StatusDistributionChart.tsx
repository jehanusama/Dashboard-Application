"use client";

import { useAppSelector } from "@/hooks/useAppSelector";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useMemo } from "react";

const COLORS = {
  completed: "#10b981",
  pending: "#f59e0b",
  cancelled: "#ef4444",
  refunded: "#3b82f6",
};

export default function StatusDistributionChart() {
  const { transactions } = useAppSelector((s) => s.data);

  const chartData = useMemo(() => {
    const statusCounts: Record<string, number> = {};

    transactions.forEach((t) => {
      statusCounts[t.status] = (statusCounts[t.status] || 0) + 1;
    });

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: COLORS[status as keyof typeof COLORS] || "#64748b",
    }));
  }, [transactions]);

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
        <div>
          <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
            Status Distribution
          </h3>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            Breakdown of transactions by status
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
              d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
            />
          </svg>
          <p className="text-sm font-medium">No status data available</p>
          <p className="text-xs text-surface-400">
            Transaction statuses will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 h-[400px] flex flex-col gap-4">
      <div>
        <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
          Status Distribution
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Breakdown of transactions by status
        </p>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              animationDuration={1500}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                borderRadius: "12px",
                border: "1px solid rgba(226, 232, 240, 1)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "12px",
              }}
              itemStyle={{ fontWeight: "bold" }}
              labelStyle={{ color: "#0f172a", marginBottom: "4px" }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-surface-600 dark:text-surface-400">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
