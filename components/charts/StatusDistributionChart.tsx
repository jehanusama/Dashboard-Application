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
