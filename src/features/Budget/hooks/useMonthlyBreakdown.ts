import { useMemo } from "react";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";
import { CategoryBreakdownItem } from "@/src/features/Budget/types/budgetProps";


export function useCategoryBreakdown() {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const expenses = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return (
        t.type === "expense" &&
        tDate.getMonth() === currentMonth &&
        tDate.getFullYear() === currentYear
      );
    });

    const totalSpent = expenses.reduce((sum, t) => sum + t.amount, 0);

    const categories: Record<string, Omit<CategoryBreakdownItem, "name">> = {};

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

    const categoryBreakdown: CategoryBreakdownItem[] = Object.entries(categories)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.total - a.total);

    return { totalSpent, categoryBreakdown };
  }, [transactions]);
}