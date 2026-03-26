import { AppText } from "@/src/components/Global/AppText";
import type { CategoryBreakdownItem } from "@/src/features/Budget/hooks/useMonthlyBreakdown";
import { getCategoryColor } from "@/src/features/Transaction/utils/getCategoryColor";
import { formatCompactCurrency } from "@/src/utils/formatCurrency";
import React from "react";
import { View, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";

type Props = {
  categoryBreakdown: CategoryBreakdownItem[];
  totalSpent: number;
};

export function SpendingChart({ categoryBreakdown, totalSpent }: Props) {
  const { width: screenWidth } = useWindowDimensions();

  const pieData = categoryBreakdown.map((item, index) => ({
    value: item.total,
    color: getCategoryColor(item.name, index),
    text: `${((item.total / totalSpent) * 100).toFixed(0)}%`,
    label: item.name,
  }));

  return (
    <View className="bg-brand-bg-medium rounded-3xl p-6">
      <AppText className="text-text-primary text-base mb-6">
        Spending by Category
      </AppText>

      <View className="flex-row items-center justify-between">
        <PieChart
          data={pieData}
          donut
          radius={screenWidth * 0.17}
          innerRadius={screenWidth * 0.1}
          innerCircleColor="#E8EAF6"
          backgroundColor="transparent"
          centerLabelComponent={() => (
            <View className="items-center justify-center">
              <AppText className="text-text-muted text-[10px] font-lato-regular">
                Total
              </AppText>
              <AppText className="text-text-primary font-extrabold text-sm">
                {formatCompactCurrency(totalSpent)}
              </AppText>
            </View>
          )}
        />

        <View className="flex-1 ml-6">
          {pieData.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between mb-2"
            >
              <View className="flex-row items-center flex-1 pr-2">
                <View
                  className="w-2.5 h-2.5 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <AppText
                  className="text-text-muted text-sm mr-3 font-lato-regular"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.label}
                </AppText>
              </View>
              <AppText
                className="text-text-primary text-sm font-lato-regular"
                style={{ fontWeight: "600" }}
              >
                {item.text}
              </AppText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
