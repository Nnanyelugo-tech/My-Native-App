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
import { useBudgetsQuery } from "@/src/features/Transaction/api/useBudgetsQuery";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { getYearMonthKey, getDisplayMonth } from "@/src/utils/date";

export function ReportScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { data: budgets = [] } = useBudgetsQuery();
  const currentMonthKey = getYearMonthKey();
  const currentMonthDisplay = getDisplayMonth();
  
  const currentBudget = budgets.find((b) => b.month === currentMonthKey);
  const budgetLimit = currentBudget ? currentBudget.amount : 0;

  const { expense: monthExpense } = useIncomeVsExpenses("Month");
  const { totalSpent, categoryBreakdown } = useCategoryBreakdown();

  const remaining = Math.max(budgetLimit - monthExpense, 0);

  const handleEditBudget = () => {
    router.push({
      pathname: "/plus",
      params: { mode: "edit", type: "Budget", amount: budgetLimit.toString() }
    });
  };

  return (
    <ScreenContainer>
      <View className="flex-row justify-between items-center px-5 pb-4 bg-surface-main">
        <AppText className="text-xl font-semibold text-text-primary">
          Monthly Report
        </AppText>
        <TouchableOpacity className="flex-row items-center bg-surface-card border border-border-subtle rounded-xl px-3 py-2">
          <IconSymbol name="calendar" size={16} color={colors.textSecondary} />
          <AppText className="text-text-secondary text-sm ml-2 font-bold">
            {currentMonthDisplay}
          </AppText>
          <IconSymbol name="chevron.right" size={14} color={colors.textSecondary} />
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
