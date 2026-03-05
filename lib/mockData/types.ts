export type TransactionStatus =
  | "completed"
  | "pending"
  | "cancelled"
  | "refunded";
export type TransactionMethod =
  | "credit_card"
  | "paypal"
  | "bank_transfer"
  | "stripe";
export type UserRole = "admin" | "user";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  role: UserRole;
}

export interface Transaction {
  id: string;
  date: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  status: TransactionStatus;
  method: TransactionMethod;
}

export interface StatRecord {
  id: string;
  key: string;
  label: string;
  value: number;
  previousValue: number;
  unit?: string;
}

export interface ChartDataPoint {
  month: string;
  sales: number;
  revenue: number;
  activeUsers: number;
}

export interface CategoryData {
  category: string;
  value: number;
}
