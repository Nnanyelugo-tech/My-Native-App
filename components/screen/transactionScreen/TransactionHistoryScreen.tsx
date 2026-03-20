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
import { EmptyState } from "@/components/screen/transactionScreen/EmptyState";

import { useTransactions } from "@/base/hooks/transaction/useTransactions";
import { router } from "expo-router";

export default function TransactionHistoryScreen() {
  const {
    searchQuery,
    setSearchQuery,
    activeFilter,
    setActiveFilter,
    flatListData,
  } = useTransactions();

  const { back } = router;

  const renderItem = useCallback(({ item }: { item: TransactionListItem }) => {
    if (item.rowType === "header") {
      return <TransactionSectionHeader section={item} />;
    }
    return <TransactionItem item={item} />;
  }, []);

  const keyExtractor = useCallback(
    (item: TransactionListItem) =>
      item.rowType === "header" ? `header-${item.title}` : item.id,
    [],
  );

  const getItemType = useCallback(
    (item: TransactionListItem) => item.rowType,
    [],
  );

  return (
    <ScreenContainer className="bg-surface-main">
      <View className="flex-row items-center justify-between px-5 pt-3 pb-2">
        <TouchableOpacity
          onPress={() => back()}
          activeOpacity={0.9}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <IconSymbol name="arrow.left" size={22} color="#1A237E" />
        </TouchableOpacity>
        <AppText className="text-xl text-text-primary font-extrabold">
          Transactions
        </AppText>

        <TouchableOpacity
          activeOpacity={0.6}
          accessibilityRole="button"
          className="p-1"
        >
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

      {/* List */}
      <LegendList<TransactionListItem>
        data={flatListData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemType={getItemType}
        estimatedItemSize={90}
        ListEmptyComponent={() => (
          <View className="flex-1 justify-center items-center">
            <EmptyState />
          </View>
        )}
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
