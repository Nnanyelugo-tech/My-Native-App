import { View, TouchableOpacity, useWindowDimensions } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { AppText } from "@/components/global/AppText";
import { expenseData } from "@/data/expenseData";

export const ExpensePieChart = () => {
  const { width: screenWidth } = useWindowDimensions();

  const data = expenseData.map((d) => ({
    value: d.value,
    color: d.color,
    text: `${d.value}%`,
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
        accessibilityRole="button">
          <AppText className="text-sm text-brand-main" style={{ fontWeight: "700" }}>
            View All
          </AppText>
        </TouchableOpacity>
      </View>

      <View className="bg-brand-bg-medium rounded-3xl px-5 py-6">
        {/* chart + legend row */}
        <View className="flex-row items-center">
          {/* donut chart */}
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
                  ₦55k
                </AppText>
              </View>
            )}
          />

          <View className="ml-6 flex-1">
            {expenseData.map((item) => (
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
                  {item.value}%
                </AppText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};