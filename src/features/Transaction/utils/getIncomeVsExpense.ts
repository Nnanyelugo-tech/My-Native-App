import { Transaction } from "@/src/features/Transaction/types/transactionType";

export const getIncomeVsExpense = (transactions: Transaction[]) => {
  let income = 0;
  let expense = 0;

  for (const t of transactions) {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  }

  return { income, expense };
};