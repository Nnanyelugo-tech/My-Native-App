import { useMemo, useState } from "react";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";
import {
  groupByDate,
  flattenSections,
  matchesFilter,
  matchesSearch,
} from "@/src/features/Transaction/utils/transaction.utils";
import { FilterLabel } from "@/src/features/Transaction/types/transaction.types";

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const isLoading = useTransactionStore((state) => state.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterLabel>("All");

  const flatListData = useMemo(() => {
    const filtered = transactions.filter(
      (tx) =>
        // Keep transactions that match the selected filter
        matchesFilter(tx, activeFilter) &&
        matchesSearch(tx, searchQuery)
    );
    // Group transactions by date for sectioned display
    const sections = groupByDate(filtered);
    // Flatten the sections into a list for LegendList
    return flattenSections(sections);
  }, [transactions, searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    flatListData,
    isLoading,
  };
};