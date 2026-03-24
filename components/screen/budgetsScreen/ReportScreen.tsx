import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ScreenContainer from "@/components/global/ScreenContainer";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { useIncomeVsExpenses } from "@/base/hooks/transaction/useIncomeVsExpenses";
import { useCategoryBreakdown } from "@/base/hooks/transaction/useMonthlyBreakdown";
import { BudgetCard } from "@/components/screen/budgetsScreen/BudgetCard";
import { ProgressCard } from "@/components/screen/budgetsScreen/ProgressCard";
import { SpendingChart } from "@/components/screen/budgetsScreen/CategoryPieChart";
import { IncomeVsExpensesChart } from "@/components/screen/budgetsScreen/IncomeExpenseChart";
import { BreakdownList } from "@/components/screen/budgetsScreen/BreakdownList";

const budgetLimit = 350000;

export function ReportScreen() {
  const { expense: monthExpense } = useIncomeVsExpenses("Month");
  const { totalSpent, categoryBreakdown } = useCategoryBreakdown();

  const remaining = Math.max(budgetLimit - monthExpense, 0);

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
