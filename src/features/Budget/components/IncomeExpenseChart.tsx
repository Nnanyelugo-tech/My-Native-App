import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { AppText } from "@/src/components/Global/AppText";
import { chartHeight } from "@/src/constants/chart";
import { useIncomeVsExpenses } from "@/src/features/Home/hooks/useIncomeVsExpenses";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/src/utils/formatCurrency";
import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

export function IncomeVsExpensesChart() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const {
    chartData,
    income,
    expense,
    chartWidth,
    initialSpacing,
    maxValue,
    barWidth,
  } = useIncomeVsExpenses("Month");

  return (
    <View className="bg-surface-card rounded-3xl p-4">
      <AppText className="text-text-primary text-base mb-3">
        Income vs Expenses
      </AppText>

      <View className="items-center justify-center mt-2">
        <BarChart
          key={`${income}-${expense}-Month`}
          data={chartData}
          barWidth={barWidth}
          initialSpacing={initialSpacing}
          maxValue={maxValue}
          noOfSections={4}
          barBorderRadius={6}
          xAxisThickness={0}
          yAxisThickness={0}
          yAxisLabelWidth={45}
          yAxisTextStyle={{ color: colors.textSecondary, fontSize: 10 }}
          formatYLabel={(label) => formatCompactCurrency(Number(label))}
          hideRules
          isAnimated
          height={chartHeight}
          activeOpacity={1}
          width={chartWidth}
        />
        <AppText
          style={{
            paddingLeft: 40,
            marginLeft: 20,
            marginTop: -20,
          }}
          className="text-text-secondary text-[10px] uppercase font-extrabold tracking-widest mt-4"
        >
          CURRENT MONTH
        </AppText>
      </View>

      <View className="flex-row justify-around items-center mt-6 pt-4 border-t border-border-subtle">
        <LegendItem label="Income" value={income} color="bg-success-main" />
        <LegendItem label="Expenses" value={expense} color="bg-danger-main" />
      </View>
    </View>
  );
}

type LegendItemProps = { label: string; value: number; color: string };

function LegendItem({ label, value, color }: LegendItemProps) {
  return (
    <View className="items-center">
      <View className="flex-row items-center mb-1">
        <View className={`w-2 h-2 rounded-full ${color} mr-2`} />
        <AppText className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
          {label}
        </AppText>
      </View>
      <AppText className="text-base font-extrabold text-text-primary">
        {formatCurrency(value)}
      </AppText>
    </View>
  );
}
