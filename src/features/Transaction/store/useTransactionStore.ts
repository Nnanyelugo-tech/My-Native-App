import { create } from 'zustand';
import { Transaction } from '../types/transactionType';
import { Budget } from '../types/budgetType';
import { TRANSACTIONS as INITIAL_TRANSACTIONS } from '../data/transactionListData';
import { getYearMonthKey } from '@/src/utils/date';

interface TransactionState {
  transactions: Transaction[];
  budgets: Budget[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  setBudget: (budget: Budget) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: INITIAL_TRANSACTIONS,
  budgets: [
    { id: '1', amount: 0, month: getYearMonthKey() }
  ],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  updateTransaction: (updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      ),
    })),
  setBudget: (budget) =>
    set((state) => {
      const existing = state.budgets.find((b) => b.month === budget.month);
      if (existing) {
        return {
          budgets: state.budgets.map((b) => (b.month === budget.month ? { ...b, ...budget } : b)),
        };
      }
      return { budgets: [budget, ...state.budgets] };
    }),
}));
