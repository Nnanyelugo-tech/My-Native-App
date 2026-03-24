import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { formatCurrency } from "@/utils/formatCurrency";
import { useBalanceSummary } from "@/base/hooks/transaction/useHomeBalanceSummary";

type StatTileProps = {
  label: string;
  amount: string;
  direction: "income" | "expense";
};

function StatTile({ label, amount, direction }: StatTileProps) {
  const isIncome = direction === "income";
  const iconColor = isIncome ? "#00E676" : "#FF1744";
  const iconName = isIncome ? "arrow.down" : "arrow.up";

  return (
    <View
      className="flex-1 px-4 py-3.5 rounded-2xl"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <View className="flex-row items-center mb-1">
        <IconSymbol name={iconName} size={14} color={iconColor} />
        <AppText
          className="text-[12px] font-lato-regular text-gray-300  ml-1"
          style={{ color: iconColor }}
        >
          {label}
        </AppText>
      </View>
      <AppText
        className="text-white text-[17px]"
        style={{ fontWeight: "600" }}
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

  return (
    <View className="mx-5 mt-6 pb-6">
      <LinearGradient
        colors={["#1A237E", "#283593", "#0D1B5E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 24, padding: 24, overflow: "hidden" }}
      >
        <View
          style={{
            position: "absolute",
            top: 16,
            right: 17,
            bottom: -2,
            opacity: 0.1,
          }}
        >
          <IconSymbol name="wallet-outline" size={90} color="#FFFFFF" />
        </View>

        <AppText className="text-gray-200 text-sm uppercase">
          Total Balance
        </AppText>
        <AppText
          className="text-white mt-1 text-[27px]"
          style={{ fontWeight: "800" }}
        >
          {formatCurrency(totalBalance)}
        </AppText>

        <View className="flex-row mt-6">
          <StatTile
            label="Income"
            amount={formatCurrency(totalIncome)}
            direction="income"
          />
          <View className="w-4" />
          <StatTile
            label="Expenses"
            amount={formatCurrency(totalExpenses)}
            direction="expense"
          />
        </View>
      </LinearGradient>
    </View>
  );
}
