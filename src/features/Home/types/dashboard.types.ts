import { Transaction } from "../../Transaction/types/transactionType";

export type DashboardSummary = {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};

export type ExpenseBreakdownItem = {
  label: string;
  value: number;
  percentage: number;
  color: string;
};

export type TrendData = {
  income: number;
  expense: number;
};

export type DashboardTrends = {
  today: TrendData;
  week: TrendData;
  month: TrendData;
};

export type DashboardData = {
  summary: DashboardSummary;
  recentTransactions: Transaction[];
  expenseBreakdown: ExpenseBreakdownItem[];
  trends: DashboardTrends;
};
