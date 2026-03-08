import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: string;
  secondaryText?: string;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  color = "bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400",
  secondaryText = "vs previous period",
}: StatCardProps) {
  const TrendIcon = trend?.isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="relative overflow-hidden glass group p-6 rounded-2xl flex flex-col gap-4 border border-surface-100 dark:border-white/5 transition-all duration-300 hover:shadow-premium hover:-translate-y-1 cursor-pointer">
      <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-linear-to-br from-primary-500/5 to-accent-500/5 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-surface-400 uppercase">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-100">
            {value}
          </p>
        </div>
        <div
          className={`rounded-xl p-3 ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={20} />
        </div>
      </div>

      {trend && (
        <div className="relative mt-5 flex items-center gap-1.5">
          <div
            className={`flex items-center gap-0.5 rounded-full px-2 py-0.5 ${
              trend.isPositive
                ? "bg-success/10 text-success"
                : "bg-error/10 text-error"
            }`}
          >
            <TrendIcon size={12} strokeWidth={3} />
            <span className="text-[10px] font-bold">{trend.value}</span>
          </div>
          <span className="text-[10px] text-surface-400 font-medium tracking-tight whitespace-nowrap">
            {secondaryText}
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary-500 group-hover:w-full transition-all duration-500" />
    </div>
  );
}
