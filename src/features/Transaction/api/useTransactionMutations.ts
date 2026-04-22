// React Query mutation hooks for CRUD operations on transactions and budgets.
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertBudget } from "../services/budgetService";
import {
  createTransaction,
  deleteTransactionById,
  updateTransactionById,
} from "../services/transactionService";
import { Budget } from "../types/budgetType";
import { NewTransaction, Transaction } from "../types/transactionType";
import { sortTransactions } from "../utils/cacheHelpers";
import { queryKeys } from "./queryKeys";

// Add transaction mutation
export const useAddTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const userId = user?.id;
  
  return useMutation({
    mutationFn: (transaction: NewTransaction) => {
      if (!userId) throw new Error("User not authenticated");
      return createTransaction(transaction, userId);
    },
    onMutate: async (newTx) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(userId) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(userId));

      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(userId), (old = []) =>
        sortTransactions([
          { ...newTx, id: tempId, _optimistic: true } as Transaction,
          ...old,
        ]),
      );
      return { previous, tempId };
    },
    onError: (_err, _newTx, context) => {
      if (userId) {
        queryClient.setQueryData(queryKeys.transactions(userId), context?.previous);
      }
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.budgets(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) });
      }
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const userId = user?.id;

  return useMutation({
    mutationFn: (id: string) => {
      if (!userId) throw new Error("User not authenticated");
      return deleteTransactionById(id);
    },
    onMutate: async (id) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(userId) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(userId));

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(userId), (old = []) =>
        old.filter((t) => t.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (userId) {
        queryClient.setQueryData(queryKeys.transactions(userId), context?.previous);
      }
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.budgets(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) });
      }
    },
  });
};

export const useUpdateTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const userId = user?.id;

  return useMutation({
    mutationFn: (transaction: Transaction) => {
      if (!userId) throw new Error("User not authenticated");
      return updateTransactionById(transaction, userId);
    },
    onMutate: async (updatedTx) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(userId) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(userId));

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(userId), (old = []) =>
        sortTransactions(old.map((t) => (t.id === updatedTx.id ? updatedTx : t))),
      );
      return { previous };
    },
    onError: (_err, _updatedTx, context) => {
      if (userId) {
        queryClient.setQueryData(queryKeys.transactions(userId), context?.previous);
      }
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.budgets(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) });
      }
    },
  });
};

export const useUpsertBudgetMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const userId = user?.id;

  return useMutation({
    mutationFn: (budget: Budget) => {
      if (!userId) throw new Error("User not authenticated");
      return upsertBudget(budget, userId);
    },
    onMutate: async (newBudget) => {
      if (!userId) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.budgets(userId) });
      const previous = queryClient.getQueryData<Budget[]>(queryKeys.budgets(userId));

      queryClient.setQueryData<Budget[]>(queryKeys.budgets(userId), (old = []) => {
        const existingIndex = old.findIndex(
          (b) => b.month === newBudget.month && b.category === newBudget.category,
        );
        if (existingIndex !== -1) {
          const newBudgets = [...old];
          newBudgets[existingIndex] = newBudget;
          return newBudgets;
        }
        return [newBudget, ...old];
      });
      return { previous };
    },
    onError: (_err, _newBudget, context) => {
      if (userId) {
        queryClient.setQueryData(queryKeys.budgets(userId), context?.previous);
      }
    },
    onSettled: () => {
      if (userId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.transactions(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.budgets(userId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard(userId) });
      }
    },
  });
};
