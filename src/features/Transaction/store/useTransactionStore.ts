import { create } from 'zustand';
import { Transaction, NewTransaction } from '../types/transactionType';
import { Budget } from '../types/budgetType';
import { supabase } from '@/src/lib/supabase';
import {
  fetchTransactions,
  createTransaction,
  updateTransactionById,
  deleteTransactionById,
} from '../services/transactionService';
import { fetchBudgets, upsertBudget } from '../services/budgetService';

interface TransactionState {
  transactions: Transaction[];
  budgets: Budget[];
  isLoading: boolean;
  error: string | null;

  loadTransactions: () => Promise<void>;
  loadBudgets: () => Promise<void>;
  addTransaction: (transaction: NewTransaction) => Promise<Transaction | null>;
  deleteTransaction: (id: string) => Promise<void>;
  updateTransaction: (transaction: Transaction) => Promise<void>;
  setBudget: (budget: Budget) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  budgets: [],
  isLoading: false,
  error: null,

  // Fetch all transactions from Supabase
  loadTransactions: async () => {
    try {
      set({ isLoading: true, error: null });

      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) {
        set({ isLoading: false });
        return;
      }

      const data = await fetchTransactions(user.id);
      set({ transactions: data, isLoading: false });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load transactions';
      console.error('loadTransactions error:', message);
      set({ error: message, isLoading: false });
    }
  },

  // Fetch all budgets from Supabase
  loadBudgets: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;

      const data = await fetchBudgets(user.id);
      set({ budgets: data });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load budgets';
      console.error('loadBudgets error:', message);
      set({ error: message });
    }
  },

  // Create a new transaction
  addTransaction: async (transaction) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return null;

      const created = await createTransaction(transaction, user.id);

      set((state) => ({
        transactions: [created, ...state.transactions],
      }));

      return created;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to add transaction';
      console.error('addTransaction error:', message);
      set({ error: message });
      throw err;
    }
  },

  // Delete a transaction
  deleteTransaction: async (id) => {
    try {
      await deleteTransactionById(id);

      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete transaction';
      console.error('deleteTransaction error:', message);
      set({ error: message });
      throw err;
    }
  },

  // Update a transaction
  updateTransaction: async (updatedTransaction) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;

      await updateTransactionById(updatedTransaction, user.id);

      set((state) => ({
        transactions: state.transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        ),
      }));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update transaction';
      console.error('updateTransaction error:', message);
      set({ error: message });
      throw err;
    }
  },

  // Budget Persisted
  setBudget: async (budget) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) return;

      const savedBudget = await upsertBudget(budget, user.id);

      set((state) => {
        const existingIndex = state.budgets.findIndex((b) => b.month === savedBudget.month && b.category === savedBudget.category);
        if (existingIndex !== -1) {
          const newBudgets = [...state.budgets];
          newBudgets[existingIndex] = savedBudget;
          return { budgets: newBudgets };
        }
        return { budgets: [savedBudget, ...state.budgets] };
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save budget';
      console.error('setBudget error:', message);
      set({ error: message });
      throw err;
    }
  },
}));
