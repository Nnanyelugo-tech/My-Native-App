import { useMemo } from "react";
import { TRANSACTIONS } from "@/data/transactionListData";

export type BalanceSummary = {
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
};

export function useBalanceSummary(): BalanceSummary {
  return useMemo(() => {
    let income = 0;
    let expense = 0;

    TRANSACTIONS.forEach((t) => {
      if (t.type === "income") income += t.amount;
      else if (t.type === "expense") expense += t.amount;
    });

    return {
      totalIncome: income,
      totalExpenses: expense,
      totalBalance: income - expense,
    };
  }, []);
}