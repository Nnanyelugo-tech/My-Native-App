import { useMemo } from "react";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { CategoryBreakdownItem } from "@/src/features/Budget/types/budgetProps";


export function useCategoryBreakdown() {
  const { data: transactions = [] } = useTransactionsQuery();

  return useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Get current month transactions
    const expenses = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.type === "expense" &&
        tDate.getMonth() === currentMonth &&
        tDate.getFullYear() === currentYear
      );
    });
 
    // Calculate total spent
    const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categories: Record<string, Omit<CategoryBreakdownItem, "name">> = {};

    // Calculate category breakdown
    expenses.forEach((t) => {
      if (!categories[t.category]) {
        categories[t.category] = {
          total: 0,
          icon: t.icon,
          iconBg: t.iconBg,
          iconColor: t.iconColor,
          count: 0,
        };
      }
      categories[t.category].total += t.amount;
      categories[t.category].count += 1;
    });
   
    // Get category breakdown
    const categoryBreakdown: CategoryBreakdownItem[] = Object.entries(categories)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.total - a.total);

    return { totalSpent, categoryBreakdown };
  }, [transactions]);
}