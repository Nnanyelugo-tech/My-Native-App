// useTransactionsQuery.ts: Custom hook for fetching transactions using react-query.
// It leverages useQuery with the queryKeys.transactions key and enables caching.
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "../services/transactionService";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { queryKeys } from "./queryKeys";

export const useTransactionsQuery = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: user?.id ? queryKeys.transactions(user.id) : [],
    queryFn: () => {
      if (!user?.id) throw new Error("No user");
      return fetchTransactions(user.id);
    },
    enabled: !!user?.id,
  });
};
