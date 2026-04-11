import { useMemo } from "react";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";

export type BalanceSummary = {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};

export function useBalanceSummary(): BalanceSummary {
  const { data: transactions = [] } = useTransactionsQuery();

  return useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else if (t.type === "expense") expense += t.amount;
    });

    return {
      totalIncome: income,
      totalExpenses: expense,
      totalBalance: income - expense,
    };
  }, [transactions]);
}