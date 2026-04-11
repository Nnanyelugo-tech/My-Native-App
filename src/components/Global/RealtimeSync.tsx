import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/src/lib/supabase";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { queryKeys } from "@/src/features/Transaction/api/queryKeys";
import { toTransaction } from "@/src/features/Transaction/services/transactionService";
import { Transaction } from "@/src/features/Transaction/types/transactionType";
import { toBudget } from "@/src/features/Transaction/services/budgetService";
import { Budget } from "@/src/features/Transaction/types/budgetType";
import { sortTransactions } from "@/src/features/Transaction/utils/cacheHelpers";

export const RealtimeSync = () => {
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user?.id) return;

    const txChannel = supabase
      .channel("transactions-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "transactions",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          queryClient.setQueryData<Transaction[]>(
            queryKeys.transactions(user.id),
            (old = []) => {
              switch (payload.eventType) {
                case "INSERT": {
                  if (!payload.new) return old;
                  const newTx = toTransaction(payload.new);
                  // Remove any optimistic temp items, then add real server row
                  const cleaned = old.filter(
                    (t) => t.id !== newTx.id && !t.id.startsWith("temp-"),
                  );
                  return sortTransactions([newTx, ...cleaned]);
                }
                case "UPDATE": {
                  if (!payload.new) return old;
                  const updatedTx = toTransaction(payload.new);
                  const exists = old.some((t) => t.id === updatedTx.id);
                  if (exists) {
                    return sortTransactions(
                      old.map((t) =>
                        t.id === updatedTx.id ? updatedTx : t,
                      ),
                    );
                  }
                  return sortTransactions([updatedTx, ...old]);
                }
                case "DELETE": {
                  const deletedId = payload.old?.id;
                  if (!deletedId) return old;
                  return old.filter((t) => t.id !== deletedId);
                }
                default:
                  return old;
              }
            },
          );
        },
      )
      .subscribe();

    const budgetChannel = supabase
      .channel("budgets-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "budgets",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          queryClient.setQueryData<Budget[]>(
            queryKeys.budgets(user.id),
            (old = []) => {
              switch (payload.eventType) {
                case "INSERT": {
                  if (!payload.new) return old;
                  const newBudget = toBudget(payload.new);
                  const exists = old.some((b) => b.id === newBudget.id);
                  if (exists) return old;
                  return [newBudget, ...old];
                }
                case "UPDATE": {
                  if (!payload.new) return old;
                  const updatedBudget = toBudget(payload.new);
                  const exists = old.some((b) => b.id === updatedBudget.id);
                  if (exists) {
                    return old.map((b) =>
                      b.id === updatedBudget.id ? updatedBudget : b,
                    );
                  }
                  return [updatedBudget, ...old];
                }
                case "DELETE": {
                  const deletedId = payload.old?.id;
                  if (!deletedId) return old;
                  return old.filter((b) => b.id !== deletedId);
                }
                default:
                  return old;
              }
            },
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(txChannel);
      supabase.removeChannel(budgetChannel);
    };
  }, [user?.id, queryClient]);

  return null;
};
