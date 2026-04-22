// This custom hook combines transaction data with search and filter logic.
// It fetches transactions using useTransactionsQuery, filters them based on user input, 
// groups them by date, and flattens the structure for display.
import { useMemo, useState } from "react";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import {
  groupByDate,
  flattenSections,
  matchesFilter,
  matchesSearch,
} from "@/src/features/Transaction/utils/transaction.utils";
import { FilterLabel } from "@/src/features/Transaction/types/transaction.types";

export const useTransactions = () => {
  const { data: transactions = [], isLoading } = useTransactionsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterLabel>("All");

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