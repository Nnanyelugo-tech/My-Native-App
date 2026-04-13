import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { queryKeys } from "../../Transaction/api/queryKeys";
import { fetchDashboardData } from "../services/dashboardService";

export const useDashboardQuery = () => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: user?.id ? queryKeys.dashboard(user.id) : [],
    queryFn: () => {
      if (!user?.id) throw new Error("No user");
      return fetchDashboardData(user.id);
    },
    enabled: !!user?.id,
    staleTime: 0, 
    placeholderData: keepPreviousData, 
  });
};
