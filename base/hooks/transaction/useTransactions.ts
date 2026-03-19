import { useMemo, useState } from "react";
import { TRANSACTIONS } from "@/data/transactionListData";
import {
  groupByDate,
  flattenSections,
  matchesFilter,
  matchesSearch,
} from "@/utils/transaction.utils";
import { FilterLabel } from "@/types/transaction.types";

export const useTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] =
    useState<FilterLabel>("All");

  const flatListData = useMemo(() => {
    const filtered = TRANSACTIONS.filter(
      (tx) =>
        matchesFilter(tx, activeFilter) &&
        matchesSearch(tx, searchQuery)
    );
    const sections = groupByDate(filtered);
    return flattenSections(sections);
  }, [activeFilter, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    flatListData,
  };
};