import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { BackHandler, ScrollView, View } from "react-native";
import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { BalanceCard } from "@/src/features/Home/components/HomeBalanceCard";
import { ExpensePieChart } from "@/src/features/Home/components/HomeExpensePieChart";
import { HomeHeader } from "@/src/features/Home/components/HomeHeader";
import { IncomeVsExpensesChart } from "@/src/features/Home/components/HomeIncomeVsExpensesChart";
import { TransactionList } from "@/src/features/Home/components/HomeTransactionList";

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
