import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { useBalanceSummary } from "@/src/features/Home/hooks/useHomeBalanceSummary";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { StatTileProps } from "@/src/features/Home/types/homeTypeProps";
import { LinearGradient } from "expo-linear-gradient";

function StatTile({ label, amount, direction }: StatTileProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";
  const isIncome = direction === "income";
  const iconColor = isIncome ? colors.success : colors.danger;
  const iconName = isIncome ? "arrow.down" : "arrow.up";

  return (
    <View 
      className={`flex-1 px-4 py-3.5 rounded-2xl border ${
        isDark ? "bg-bgColor border-border-subtle" : "bg-white/10 border-white/5"
      }`}
    >
      <View className="flex-row items-center mb-1">
        <IconSymbol name={iconName} size={14} color={iconColor} />
        <AppText
          className="text-[12px] ml-1 font-lato-regular"
          style={{ color: iconColor }}
        >
          {label}
        </AppText>
      </View>
      <AppText
        className={`text-[17px] font-bold ${isDark ? "text-text-primary" : "text-white"}`}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {amount}
      </AppText>
    </View>
  );
}

export function BalanceCard() {
  const { totalIncome, totalExpenses, totalBalance } = useBalanceSummary();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const Content = (
    <>
      <View className="absolute top-4 right-4 opacity-10">
        <IconSymbol 
          name="wallet-outline" 
          size={90} 
          color={isDark ? colors.textSecondary : "#FFFFFF"} 
        />
      </View>

      <AppText 
        className={`text-sm uppercase font-bold tracking-wider ${
          isDark ? "text-text-secondary" : "text-white/80"
        }`}
      >
        Total Balance
      </AppText>
      <AppText 
        className={`mt-1 text-[32px] font-extrabold ${
          isDark ? "text-text-primary" : "text-white"
        }`}
      >
        {formatCurrency(totalBalance)}
      </AppText>

      <View className="flex-row mt-6 gap-4">
        <StatTile
          label="Income"
          amount={formatCurrency(totalIncome)}
          direction="income"
        />
        <StatTile
          label="Expenses"
          amount={formatCurrency(totalExpenses)}
          direction="expense"
        />
      </View>
    </>
  );

  return (
    <View className="mx-5 mt-6 pb-6">
      {isDark ? (
        <View className="bg-surface-card rounded-[32px] p-6 shadow-sm border border-border-subtle relative overflow-hidden">
          {Content}
        </View>
      ) : (
        <LinearGradient
          colors={["#1A237E", "#283593", "#0D1B5E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 32, padding: 24, overflow: "hidden" }}
        >
          {Content}
        </LinearGradient>
      )}
    </View>
  );
}

