import React, { useCallback } from "react";
import { View, TouchableOpacity } from "react-native";

import { LegendList } from "@legendapp/list";

import { TransactionListItem } from "@/types/transaction.types";

import ScreenContainer from "@/components/global/ScreenContainer";

import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";

import { SearchBar } from "./SearchBar";
import { FilterChips } from "./FilterChips";
import { TransactionItem } from "./TransactionItem";
import { TransactionSectionHeader } from "./TransactionSectionHeader";
import { EmptyState } from "./EmptyState";

import { useTransactions } from "@/base/hooks/transaction/useTransactions";

export default function TransactionHistoryScreen() {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    flatListData,
  } = useTransactions();

  const renderItem = useCallback(
    ({ item }: { item: TransactionListItem }) => {
      if (item.rowType === "header") {
        return <TransactionSectionHeader section={item} />;
      }
      return <TransactionItem item={item} />;
    },
    []
  );

  const keyExtractor = useCallback(
    (item: TransactionListItem) =>
      item.rowType === "header" ? `header-${item.title}` : item.id,
    []
  );

  const getItemType = useCallback(
    (item: TransactionListItem) => item.rowType,
    []
  );

  return (
    <ScreenContainer className="bg-surface-main">
      <View className="flex-row items-center justify-between px-5 pt-3 pb-2">
        <AppText
          className="text-xl text-text-primary"
          style={{ fontWeight: "800" }}
        >
          Transactions
        </AppText>

        <TouchableOpacity activeOpacity={0.6} className="p-1">
          <IconSymbol
            name="line.3.horizontal.decrease"
            size={22}
            color="#1A237E"
          />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {/* Filters */}
      <FilterChips
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <LegendList<TransactionListItem>
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        estimatedItemSize={70}
        ListEmptyComponent={EmptyState}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
        recycleItems
      />
    </ScreenContainer>
  );
}