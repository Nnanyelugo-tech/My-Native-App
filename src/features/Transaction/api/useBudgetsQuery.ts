import { useQuery } from "@tanstack/react-query";
import { fetchBudgets } from "../services/budgetService";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { queryKeys } from "./queryKeys";

export const useBudgetsQuery = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: queryKeys.budgets(user!.id),
    queryFn: () => {
      if (!user?.id) throw new Error("No user");
      return fetchBudgets(user.id);
    },
    enabled: !!user?.id,
  });
};
