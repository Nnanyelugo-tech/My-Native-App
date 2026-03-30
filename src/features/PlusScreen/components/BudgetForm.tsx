import { View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { getDisplayMonth } from "@/src/utils/date";

 export function BudgetForm() {
  const currentMonth = getDisplayMonth();

  return (
    <>
      <AppText className="text-lg font-bold text-gray-800 mb-5">
        Monthly Budget
      </AppText>

      <View className="mb-6">
        <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-3 uppercase">
          Month
        </AppText>
        <View className="flex-row items-center border border-gray-200 rounded-2xl px-4 py-4 bg-gray-50">
          <IconSymbol name="calendar" size={20} color="#6B7280" />
          <AppText className="text-[15px] text-gray-800 ml-3 font-bold flex-1">
            {currentMonth}
          </AppText>
          <IconSymbol name="chevron.down" size={20} color="#6B7280" />
        </View>
      </View>

      <AppText className="text-[14px] text-gray-500 leading-6">
        Set a target budget for the selected month to keep your spending in
        check. Keep track of your financial goals effortlessly.
      </AppText>
    </>
  );
}
