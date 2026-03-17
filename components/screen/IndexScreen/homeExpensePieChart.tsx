import { View, Dimensions, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { AppText } from "@/components/global/AppText";
import { expenseData } from "@/data/expenseData";

const screenWidth = Dimensions.get("window").width;

export const ExpensePieChart = () => {
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
        <AppText className="text-lg" style={{ fontWeight: "800", color: "#1A1A2E" }}>
          Expense Breakdown
        </AppText>
        <TouchableOpacity activeOpacity={0.6}>
          <AppText className="text-sm" style={{ color: "#1A237E", fontWeight: "700" }}>
            View All
          </AppText>
        </TouchableOpacity>
      </View>

      <View
        className="bg-brand-bg-medium rounded-3xl px-5 py-6"
      >
      
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
                className="text-[10px] font-lato-regular"
                style={{ color: "#555" }}
              >
                Total
              </AppText>
              <AppText
                className="text-sm"
                style={{ fontWeight: "800", color: "#1A1A2E" }}
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
                  className="text-sm font-lato-regular"
                  style={{ color: "#555" }}
                >
                 {item.label}
                </AppText>
              </View>
              <AppText
                className="text-sm"
                style={{ fontWeight: "600", color: "#1A1A2E" }}
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