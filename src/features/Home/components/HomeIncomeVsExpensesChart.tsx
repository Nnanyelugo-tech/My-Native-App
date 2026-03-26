import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

import { AppText } from "@/src/components/Global/AppText";
import { chartHeight } from "@/src/constants/chart";
import { useIncomeVsExpenses } from "@/src/features/Home/hooks/useIncomeVsExpenses";
import {
  formatCompactCurrency,
  formatCurrency,
} from "@/src/utils/formatCurrency";

type TrendType = "Today" | "Week";

export const IncomeVsExpensesChart = () => {
  const [activeTab, setActiveTab] = useState<TrendType>("Today");

  const {
    chartData,
    income,
    expense,
    chartWidth,
    initialSpacing,
    maxValue,
    barWidth,
  } = useIncomeVsExpenses(activeTab);

  return (
    <View className="mb-6">
      <AppText className="text-lg text-text-primary mb-3 font-extrabold">
        Income vs Expenses Trends
      </AppText>

      <View className="bg-white  rounded-3xl p-4">
        <View className="flex-row mb-4">
          <View className="flex-row bg-brand-bg-medium rounded-full p-1">
            {(["Today", "Week"] as TrendType[]).map((tab) => (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.9}
                accessibilityRole="button"
                onPress={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full ${
                  activeTab === tab ? "bg-brand-main" : ""
                }`}
              >
                <AppText
                  className={`text-xs font-bold ${
                    activeTab === tab ? "text-white" : "text-text-muted"
                  }`}
                >
                  {tab}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="items-center justify-center">
          <BarChart
            key={`${income}-${expense}-${activeTab}`}
            data={chartData}
            barWidth={barWidth}
            initialSpacing={initialSpacing}
            maxValue={maxValue}
            noOfSections={4}
            barBorderRadius={6}
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisLabelWidth={45}
            yAxisTextStyle={{ color: "#9E9E9E", fontSize: 10 }}
            formatYLabel={(label) => formatCompactCurrency(Number(label))}
            hideRules
            isAnimated
            height={chartHeight}
            activeOpacity={1}
            width={chartWidth}
          />
          <AppText
            style={{
              paddingLeft: 43,
              marginLeft: 22,
              marginTop: -20,
            }}
            className="text-[10px] text-text-secondary text-center font-bold uppercase tracking-widest mt-4"
          >
            {activeTab === "Today" ? "Today" : "Weekly"} Trend
          </AppText>
        </View>

        <View className="flex-row justify-around items-center mt-6 pt-4 border-t border-border-subtle">
          <View className="items-center">
            <View className="flex-row items-center mb-1">
              <View className="w-2 h-2 rounded-full bg-success-main mr-2" />
              <AppText className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                Income
              </AppText>
            </View>
            <AppText className="text-base font-extrabold text-text-primary">
              {formatCurrency(income)}
            </AppText>
          </View>

          <View className="items-center">
            <View className="flex-row items-center mb-1">
              <View className="w-2 h-2 rounded-full bg-danger-main mr-2" />
              <AppText className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
                Expenses
              </AppText>
            </View>
            <AppText className="text-base font-extrabold text-text-primary">
              {formatCurrency(expense)}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};
