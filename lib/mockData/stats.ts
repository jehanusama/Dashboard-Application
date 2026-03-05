import { StatRecord } from "./types";

export const MOCK_STATS: StatRecord[] = [
  {
    id: "stat_01",
    key: "total_revenue",
    label: "Total Revenue",
    value: 128430,
    previousValue: 114200,
  },
  {
    id: "stat_02",
    key: "active_users",
    label: "Active Users",
    value: 2420,
    previousValue: 2210,
  },
  {
    id: "stat_03",
    key: "conversion_rate",
    label: "Conversion Rate",
    value: 3.2,
    previousValue: 3.8,
    unit: "percentage",
  },
  {
    id: "stat_04",
    key: "pending_orders",
    label: "Pending Orders",
    value: 48,
    previousValue: 52,
  },
];
