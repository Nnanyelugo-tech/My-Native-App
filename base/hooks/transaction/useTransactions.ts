import { useMemo, useState } from "react";
import { TRANSACTIONS } from "@/data/transactionListData";
import {
  groupByDate,
  flattenSections,
  matchesFilter,
  matchesSearch,
} from "@/utils/transactions/transaction.utils";
import { FilterLabel } from "@/types/transaction.types";

export const useTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterLabel>("All");

  const flatListData = useMemo(() => {
    const filtered = TRANSACTIONS.filter(
      (tx) =>
        // Keep transactions that match the selected filter
        matchesFilter(tx, activeFilter) &&
        matchesSearch(tx, searchQuery)
    );
    // Group transactions by date for sectioned display
    const sections = groupByDate(filtered);
    // Flatten the sections into a list for LegendList
    return flattenSections(sections);
  }, [searchQuery, activeFilter]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    flatListData,
  };
};