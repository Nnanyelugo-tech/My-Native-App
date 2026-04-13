import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { AppText } from "@/src/components/Global/AppText";
import { formatCompactCurrency } from "@/src/utils/formatCurrency";
// import { useRouter } from "expo-router";
import { useWindowDimensions, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
  type ExpenseBreakdownItem,
  useExpenseBreakdown,
} from "../hooks/useHomeExpenseBreakdown";

type LegendRowProps = {
  item: ExpenseBreakdownItem;
};

function LegendRow({ item }: LegendRowProps) {
  return (
    <View className="flex-row items-center justify-between mb-2">
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
        className="text-sm font-lato-regular ml-4 text-text-primary"
        style={{ fontWeight: "600" }}
      >
        {item.percentage.toFixed(0)}%
      </AppText>
    </View>
  );
}


export function ExpensePieChart() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { width: screenWidth } = useWindowDimensions();
  // const router = useRouter();
  const { totalExpenses, breakdown } = useExpenseBreakdown();

  const pieData = breakdown.map((item) => ({
    value: item.percentage,
    color: item.color,
    text: `${item.percentage.toFixed(0)}%`,
    shiftTextX: -6,
    shiftTextY: -2,
  }));

  return (
    <View className="mb-6">
      <View className="flex-row items-center justify-between mb-4">
        <AppText
          className="text-lg text-text-primary"
          style={{ fontWeight: "800" }}
        >
          Expense Breakdown
        </AppText>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={() => router.push("/budget")}
        >
          <AppText
            className="text-sm text-brand-main"
            style={{ fontWeight: "700" }}
          >
            View All
          </AppText>
        </TouchableOpacity> */}
      </View>

      {/* Card */}
      <View className="bg-brand-bg-medium rounded-3xl px-5 py-6">
        <View className="flex-row items-center">
          {/* Donut chart */}
          <PieChart
            data={pieData}
            donut
            radius={screenWidth * 0.17}
            innerRadius={screenWidth * 0.1}
            innerCircleColor={colors.brandBgMedium}
            centerLabelComponent={() => (
              <View className="items-center justify-center">
                <AppText className="text-[10px] font-lato-regular text-text-muted">
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

          {/* Legend */}
          <View className="ml-6 flex-1">
            {breakdown.map((item) => (
              <LegendRow key={item.label} item={item} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
