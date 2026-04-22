// Custom hook for fetching budgets using react-query.
// It leverages useQuery with the queryKeys.budgets key and enables caching.
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { fetchBudgets } from "../services/budgetService";
import { queryKeys } from "./queryKeys";

export const useBudgetsQuery = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: user?.id ? queryKeys.budgets(user.id) : [],
    queryFn: () => {
      if (!user?.id) throw new Error("No user");
      return fetchBudgets(user.id);
    },
    enabled: !!user?.id,
  });
};
