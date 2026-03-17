import { View,BackHandler } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

import ScreenWrapper from "@/components/global/ScreenWrapper";

import { HomeHeader } from "@/components/screen/IndexScreen/homeHeader";
import { BalanceCard } from "@/components/screen/IndexScreen/homeBalanceCard";
import { ExpensePieChart } from "@/components/screen/IndexScreen/homeExpensePieChart";
import { TransactionList } from "@/components/screen/IndexScreen/homeTransactionList";

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      const s = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => s.remove();
    }, [])
  );

  return (
    <ScreenWrapper className="bg-surface-main">
      <View className="flex-1 bg-surface-main">
        <HomeHeader />
      <BalanceCard />

      <View className="px-5 pt-2 flex-1">
        <ExpensePieChart />
        <TransactionList />
      </View>
      </View>
    </ScreenWrapper>
  );
}