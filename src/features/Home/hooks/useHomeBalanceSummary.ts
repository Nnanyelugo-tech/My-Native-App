import { useMemo } from "react";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";

export type BalanceSummary = {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};

export function useBalanceSummary(): BalanceSummary {
  const transactions = useTransactionStore((state) => state.transactions);

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