import { ChartDataPoint, CategoryData } from "./types";

export const SALES_TREND_DATA: ChartDataPoint[] = [
  { month: "Jan", sales: 4200, revenue: 25200, activeUsers: 1800 },
  { month: "Feb", sales: 3800, revenue: 22800, activeUsers: 1950 },
  { month: "Mar", sales: 5100, revenue: 30600, activeUsers: 2100 },
  { month: "Apr", sales: 4800, revenue: 28800, activeUsers: 2050 },
  { month: "May", sales: 6200, revenue: 37200, activeUsers: 2300 },
  { month: "Jun", sales: 5800, revenue: 34800, activeUsers: 2250 },
  { month: "Jul", sales: 7100, revenue: 42600, activeUsers: 2500 },
  { month: "Aug", sales: 6900, revenue: 41400, activeUsers: 2450 },
  { month: "Sep", sales: 7500, revenue: 45000, activeUsers: 2600 },
  { month: "Oct", sales: 8200, revenue: 49200, activeUsers: 2750 },
  { month: "Nov", sales: 7800, revenue: 46800, activeUsers: 2700 },
  { month: "Dec", sales: 9100, revenue: 54600, activeUsers: 3000 },
];

export const CATEGORY_DISTRIBUTION: CategoryData[] = [
  { category: "Electronics", value: 45 },
  { category: "Fashion", value: 25 },
  { category: "Home & Garden", value: 15 },
  { category: "Groceries", value: 10 },
  { category: "Others", value: 5 },
];
