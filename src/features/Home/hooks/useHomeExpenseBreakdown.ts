import { useDashboardQuery } from "../api/useDashboardQuery";
import type { ExpenseBreakdownItem } from "../types/dashboard.types";

export type { ExpenseBreakdownItem };

export function useExpenseBreakdown() {
  const { data: dashboardData } = useDashboardQuery();

  return {
    totalExpenses: dashboardData?.trends.month.expense ?? 0,
    breakdown: dashboardData?.expenseBreakdown ?? [],
  };
}