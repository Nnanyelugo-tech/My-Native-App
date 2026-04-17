import { Transaction } from "../types/transactionType";

export const sortTransactions = (list: Transaction[]): Transaction[] =>
  [...list].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
