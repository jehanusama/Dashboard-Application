import StatsCards from "@/components/charts/StatsCards";
import RevenueChart from "@/components/charts/RevenueChart";
import StatusDistributionChart from "@/components/charts/StatusDistributionChart";
import MethodsBarChart from "@/components/charts/MethodsBarChart";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-8 p-dashboard-x py-dashboard-y animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100 italic tracking-tight underline decoration-primary-500/30 underline-offset-8">
          Analytics Deep-Dive
        </h1>
        <p className="text-surface-500 dark:text-surface-400 mt-2">
          Comprehensive performance analysis and data visualizations
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <StatusDistributionChart />
        <MethodsBarChart />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass rounded-2xl p-6 border-l-4 border-primary-500">
          <h4 className="font-bold text-surface-900 dark:text-surface-100">
            Top Performing Region
          </h4>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            North America accounts for 65% of total revenue this month.
          </p>
        </div>
        <div className="glass rounded-2xl p-6 border-l-4 border-accent-500">
          <h4 className="font-bold text-surface-900 dark:text-surface-100">
            Customer Growth
          </h4>
          <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
            New customer acquisitions are up by 15% compared to last week.
          </p>
        </div>
      </div>
    </div>
  );
}
