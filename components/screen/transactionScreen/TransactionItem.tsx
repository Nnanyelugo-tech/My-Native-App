import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { Transaction } from "@/types/transactionType";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatTime } from "@/utils/date";

export const TransactionItem = ({ item: t }: { item: Transaction }) => {
  const isIncome = t.type === "income";
  const { push } = router;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      onPress={() =>
        push({
          pathname: "/transaction/[id]",
          params: { id: t.id },
        })
      }
      className="bg-white rounded-3xl px-4 py-3.5 mb-3 flex-row items-center"
    >
      <View
        className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
        style={{ backgroundColor: t.iconBg }}
      >
        <IconSymbol name={t.icon} size={22} color={t.iconColor} />
      </View>

      <View className="flex-1 mr-6">
        <AppText className="text-[15px] text-text-primary font-semibold">
          {t.title}
        </AppText>

        <AppText className="text-[11px] font-lato-regular mt-0.5 text-text-secondary">
          {t.category} • {formatTime(t.date)}
        </AppText>
      </View>

      <AppText
        className={`text-[15px] font-bold ${
          isIncome ? "text-success-muted" : "text-danger-muted"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(t.amount)}
      </AppText>
    </TouchableOpacity>
  );
};