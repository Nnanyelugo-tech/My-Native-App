import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";
import { PieChart } from "react-native-gifted-charts";
import { AppText } from "@/components/global/AppText";
import { TRANSACTIONS } from "@/data/transactionListData";
import { formatCompactCurrency } from "@/utils/formatCurrency";
import { getCategoryColor } from "@/utils/getCategoryColor";
import { useMemo } from "react";

export const ExpensePieChart = () => {
  const { width: screenWidth } = useWindowDimensions();
  const router = useRouter();

  const { totalExpenses, mappedCategories } = useMemo(() => {
    let total = 0;
    const categories: Record<string, number> = {};

    TRANSACTIONS.forEach((t) => {
      if (t.type === "expense") {
        total += t.amount;
        categories[t.category] = (categories[t.category] || 0) + t.amount;
      }
    });

   

    const sorted = Object.entries(categories)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);

    const mapped = sorted.map((item, index) => ({
      ...item,
      color: getCategoryColor(item.label, index),
      percentage: total > 0 ? ((item.value / total) * 100).toFixed(0) : "0",
    }));

    return { totalExpenses: total, mappedCategories: mapped.slice(0, 4) };
  }, []);

  const data = mappedCategories.map((d) => ({
    value: parseFloat(d.percentage),
    color: d.color,
    text: `${d.percentage}%`,
    shiftTextX: -6,
    shiftTextY: -2,
  }));

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <AppText className="text-lg text-text-primary" style={{ fontWeight: "800" }}>
          Expense Breakdown
        </AppText>
        <TouchableOpacity activeOpacity={0.8}
        accessibilityRole="button" onPress={() => router.push("/budget")}>
          <AppText className="text-sm text-brand-main" style={{ fontWeight: "700" }}>
            View All
          </AppText>
        </TouchableOpacity>
      </View>

      <View className="bg-brand-bg-medium rounded-3xl px-5 py-6">
        {/* chart + legend row */}
        <View className="flex-row items-center">
          {/* donut chart */}
          <View className="relative justify-center items-center">
            <PieChart
              data={data}
              donut
              radius={screenWidth * 0.17}
              innerRadius={screenWidth * 0.1}
              innerCircleColor="#E8EAF6"
              centerLabelComponent={() => (
                <View className="items-center justify-center">
                  <AppText
                    className="text-[10px] font-lato-regular text-text-muted"
                  >
                    Total
                  </AppText>
                  <AppText
                    className="text-sm text-text-primary"
                    style={{ fontWeight: "800" }}
                  >
                    {formatCompactCurrency(totalExpenses)}
                  </AppText>
                </View>
              )}
            />
          </View>

          <View className="ml-6 flex-1">
            {mappedCategories.map((item) => (
              <View
                key={item.label}
                className="flex-row items-center justify-between mb-2"
              >
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-2.5 h-2.5 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  />
                  <AppText
                    className="text-sm font-lato-regular mr-2 text-text-muted"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.label}
                  </AppText>
                </View>
                <AppText
                  className="text-sm font-lato-regular ml-4"
                  style={{ fontWeight: "600" }}
                >
                  {item.percentage}%
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};