import { AppText } from "@/src/components/Global/AppText";
import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { BreakdownList } from "@/src/features/Budget/components/BreakdownList";
import { BudgetCard } from "@/src/features/Budget/components/BudgetCard";
import { SpendingChart } from "@/src/features/Budget/components/CategoryPieChart";
import { IncomeVsExpensesChart } from "@/src/features/Budget/components/IncomeExpenseChart";
import { ProgressCard } from "@/src/features/Budget/components/ProgressCard";
import { useCategoryBreakdown } from "@/src/features/Budget/hooks/useMonthlyBreakdown";
import { useIncomeVsExpenses } from "@/src/features/Home/hooks/useIncomeVsExpenses";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export function ReportScreen() {
  const router = useRouter();
  const budgets = useTransactionStore((state) => state.budgets);
  const currentMonth = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  
  const currentBudget = budgets.find((b) => b.month === currentMonth);
  const budgetLimit = currentBudget ? currentBudget.amount : 0;

  const { expense: monthExpense } = useIncomeVsExpenses("Month");
  const { totalSpent, categoryBreakdown } = useCategoryBreakdown();

  const remaining = Math.max(budgetLimit - monthExpense, 0);

  const handleEditBudget = () => {
    router.push({
      pathname: "/plus",
      params: { mode: "edit", type: "Budget" }
    });
  };

  return (
    <ScreenContainer>
      <View className="flex-row justify-between items-center px-5 pb-4 bg-surface-main">
        <AppText className="text-2xl font-semibold text-text-primary">
          Monthly Report
        </AppText>
        <TouchableOpacity className="flex-row items-center bg-white border-border-subtle rounded-xl px-3 py-2">
          <IconSymbol name="calendar" size={16} color="#555555" />
          <AppText className="text-text-muted text-sm ml-2 font-bold">
            Mar 2026
          </AppText>
          <IconSymbol name="chevron.right" size={14} color="#555555" />
        </TouchableOpacity>
      </View>

      {/* Scrollable body */}
      <ScrollView
        className="flex-1 px-5 bg-surface-main"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 mt-6">
          <BudgetCard
            budgetLimit={budgetLimit}
            totalSpent={monthExpense}
            remaining={remaining}
            onEdit={handleEditBudget}
          />
        </View>

        <View className="mb-8">
          <ProgressCard spent={monthExpense} limit={budgetLimit} />
        </View>

        <View className="mb-6">
          <SpendingChart
            categoryBreakdown={categoryBreakdown}
            totalSpent={totalSpent}
          />
        </View>

        <View className="mb-6">
          <IncomeVsExpensesChart />
        </View>

        <AppText className="text-text-primary text-base mb-4 mt-2">
          Monthly Expense Breakdown
        </AppText>

        <BreakdownList items={categoryBreakdown} />
      </ScrollView>
    </ScreenContainer>
  );
}
