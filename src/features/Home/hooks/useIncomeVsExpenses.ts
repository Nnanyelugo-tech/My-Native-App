import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { getIncomeVsExpense } from "@/src/features/Transaction/utils/getIncomeVsExpense";
import { isSameDay, getStartOfWeek } from "@/src/utils/date";

import {
  chartHorizontalPadding,
  barWidth,
  barSpacing,
} from "@/src/constants/chart";

import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

type TrendType = "Today" | "Week" | "Month";

export const useIncomeVsExpenses = (activeTab: TrendType) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { data: transactions = [] } = useTransactionsQuery();
  const { width } = useWindowDimensions();

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    //compute once
    const startOfWeek = getStartOfWeek(now);

    // define proper end of week
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    return transactions.filter((t) => {
      const tDate = new Date(t.date);

      if (activeTab === "Today") {
        return isSameDay(tDate, now);
      }

      if (activeTab === "Week") {
        // consistent week range: [start, end)
        return tDate >= startOfWeek && tDate < endOfWeek;
      }

      if (activeTab === "Month") {
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      }

      return false;
    });
  }, [transactions, activeTab]);

  const { income, expense } = useMemo(() => {
    return getIncomeVsExpense(filteredTransactions);
  }, [filteredTransactions]);

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

  // safe max (prevents zero crash + gives spacing)
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
