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
