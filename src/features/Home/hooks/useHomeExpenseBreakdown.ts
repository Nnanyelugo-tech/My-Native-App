import { useMemo } from "react";
import { useTransactionStore } from "../../Transaction/store/useTransactionStore";
import { getCategoryColor } from "../../Transaction/utils/getCategoryColor";


export type ExpenseBreakdownItem = {
  label: string;
  value: number;
  percentage: number;
  color: string;
};

export function useExpenseBreakdown() {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    let totalExpenses = 0;
    const categories: Record<string, number> = {};

    transactions.forEach((t) => {
      if (t.type !== "expense") return;
      totalExpenses += t.amount;
      categories[t.category] = (categories[t.category] ?? 0) + t.amount;
    });

    const breakdown: ExpenseBreakdownItem[] = Object.entries(categories)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .map((item, index) => ({
        ...item,
        color: getCategoryColor(item.label, index),
        percentage: totalExpenses > 0
          ? parseFloat(((item.value / totalExpenses) * 100).toFixed(0))
          : 0,
      }));

    return { totalExpenses, breakdown };
  }, [transactions]);
}