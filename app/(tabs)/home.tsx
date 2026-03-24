import { View, ScrollView, BackHandler } from "react-native";
import { useCallback } from "react";
import { useFocusEffect } from "expo-router";

import { HomeHeader } from "@/components/screen/IndexScreen/homeHeader";
import { BalanceCard } from "@/components/screen/IndexScreen/homeBalanceCard";
import { ExpensePieChart } from "@/components/screen/IndexScreen/homeExpensePieChart";
import { IncomeVsExpensesChart } from "@/components/screen/IndexScreen/homeIncomeVsExpensesChart";
import { TransactionList } from "@/components/screen/IndexScreen/homeTransactionList";
import ScreenContainer from "@/components/global/ScreenContainer";

export default function Index() {
  useFocusEffect(
    useCallback(() => {
      const s = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => s.remove();
    }, []),
  );

  return (
    <ScreenContainer className="bg-surface-main">
      <HomeHeader />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard />

        <View className="px-5 pt-2 flex-1">
          <ExpensePieChart />
          <IncomeVsExpensesChart />
          <TransactionList />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
