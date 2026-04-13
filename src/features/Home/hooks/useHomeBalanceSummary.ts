import { useDashboardQuery } from "../api/useDashboardQuery";

export type BalanceSummary = {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};

export function useBalanceSummary(): BalanceSummary {
  const { data: dashboardData } = useDashboardQuery();

  return {
    totalIncome: dashboardData?.summary.totalIncome ?? 0,
    totalExpenses: dashboardData?.summary.totalExpenses ?? 0,
    totalBalance: dashboardData?.summary.totalBalance ?? 0,
  };
}