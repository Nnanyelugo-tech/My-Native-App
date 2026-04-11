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

export const useAddTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: NewTransaction) => {
      if (!user?.id) throw new Error("User not authenticated");
      return createTransaction(transaction, user.id);
    },
    onMutate: async (newTx) => {
      if (!user?.id) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(user.id) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(user.id));

      const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(user.id), (old = []) =>
        sortTransactions([
          { ...newTx, id: tempId, _optimistic: true } as Transaction,
          ...old,
        ]),
      );
      return { previous, tempId };
    },
    onError: (_err, _newTx, context) => {
      if (user?.id) {
        queryClient.setQueryData(queryKeys.transactions(user.id), context?.previous);
      }
    },
  });
};

export const useDeleteTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      if (!user?.id) throw new Error("User not authenticated");
      return deleteTransactionById(id);
    },
    onMutate: async (id) => {
      if (!user?.id) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(user.id) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(user.id));

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(user.id), (old = []) =>
        old.filter((t) => t.id !== id),
      );
      return { previous };
    },
    onError: (_err, _id, context) => {
      if (user?.id) {
        queryClient.setQueryData(queryKeys.transactions(user.id), context?.previous);
      }
    },
  });
};

export const useUpdateTransactionMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: Transaction) => {
      if (!user?.id) throw new Error("User not authenticated");
      return updateTransactionById(transaction, user.id);
    },
    onMutate: async (updatedTx) => {
      if (!user?.id) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.transactions(user.id) });
      const previous = queryClient.getQueryData<Transaction[]>(queryKeys.transactions(user.id));

      queryClient.setQueryData<Transaction[]>(queryKeys.transactions(user.id), (old = []) =>
        sortTransactions(old.map((t) => (t.id === updatedTx.id ? updatedTx : t))),
      );
      return { previous };
    },
    onError: (_err, _updatedTx, context) => {
      if (user?.id) {
        queryClient.setQueryData(queryKeys.transactions(user.id), context?.previous);
      }
    },
  });
};

export const useUpsertBudgetMutation = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (budget: Budget) => {
      if (!user?.id) throw new Error("User not authenticated");
      return upsertBudget(budget, user.id);
    },
    onMutate: async (newBudget) => {
      if (!user?.id) return;
      await queryClient.cancelQueries({ queryKey: queryKeys.budgets(user.id) });
      const previous = queryClient.getQueryData<Budget[]>(queryKeys.budgets(user.id));

      queryClient.setQueryData<Budget[]>(queryKeys.budgets(user.id), (old = []) => {
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
      if (user?.id) {
        queryClient.setQueryData(queryKeys.budgets(user.id), context?.previous);
      }
    },
  });
};
