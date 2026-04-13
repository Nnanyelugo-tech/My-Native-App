import { View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { getDisplayMonth } from "@/src/utils/date";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function BudgetForm() {
  const currentMonth = getDisplayMonth();
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <>
      <AppText className="text-[20px] text-text-primary mb-5 font-bold">
        Monthly Budget
      </AppText>

      <View className="mb-6">
        <AppText className="text-[11px] font-bold text-text-secondary tracking-widest mb-3 uppercase">
          Month
        </AppText>
        <View className={`flex-row items-center border border-border-subtle rounded-2xl px-4 py-4 ${theme === 'dark' ? "bg-brand-bg-medium" : "bg-bgColor"}`}>
          <IconSymbol name="calendar" size={20} color={colors.textSecondary} />
          <AppText className="text-[13px] text-text-primary ml-3 font-bold flex-1">
            {currentMonth}
          </AppText>
          <IconSymbol name="chevron.down" size={20} color={colors.textSecondary} />
        </View>
      </View>

      <AppText className="text-[14px] font-lato-regular text-text-secondary leading-6">
        Set a target budget for the selected month to keep your spending in
        check. Keep track of your financial goals effortlessly.
      </AppText>
    </>
  );
}
