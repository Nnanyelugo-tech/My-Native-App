import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useDashboardQuery } from "../api/useDashboardQuery";
import {
  chartHorizontalPadding,
  barWidth,
  barSpacing,
} from "@/src/constants/chart";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

type TrendType = "Today" | "Week" | "Month";

export const useIncomeVsExpenses = (activeTab: TrendType = "Today") => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { data: dashboardData } = useDashboardQuery();
  const { width } = useWindowDimensions();

  const { income, expense } = useMemo(() => {
    if (!dashboardData) return { income: 0, expense: 0 };
    
    switch (activeTab) {
      case "Today":
        return dashboardData.trends.today;
      case "Week":
        return dashboardData.trends.week;
      case "Month":
        return dashboardData.trends.month;
      default:
        return { income: 0, expense: 0 };
    }
  }, [dashboardData, activeTab]);

  // Chart dimension calculations
  const chartWidth = width - chartHorizontalPadding;
  const totalBarWidth = barWidth * 2 + barSpacing;
  const initialSpacing = (chartWidth - totalBarWidth) / 2;

  const chartData = useMemo(() => {
    return [
      {
        value: Number(income),
        frontColor: colors.success,
        spacing: barSpacing,
      },
      {
        value: Number(expense),
        frontColor: colors.danger,
      },
    ];
  }, [income, expense, colors]);

  // safe max prevents zero crash + gives spacing
  const maxValue = Math.max(income, expense, 1) * 1.2;

  return {
    chartData,
    income,
    expense,
    chartWidth,
    initialSpacing,
    maxValue,
    barWidth,
  };
};
