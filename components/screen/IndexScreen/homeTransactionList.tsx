import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { TRANSACTIONS } from "@/data/transactionListData";
import { formatCurrency } from "@/utils/formatCurrency";

export const TransactionList = () => {
  return (
    <View className="mb-10">
      <View className="flex-row items-center justify-between mb-4">
        <AppText className="text-lg text-text-primary" style={{ fontWeight: "800" }}>
          Recent Transactions
        </AppText>
        <TouchableOpacity activeOpacity={0.6}>
          <AppText className="text-sm text-brand-main" style={{ fontWeight: "800" }}>
            See More
          </AppText>
        </TouchableOpacity>
      </View>

      {TRANSACTIONS.slice(0, 4).map((t) => (
        <View
          key={t.id}
          className="bg-white rounded-3xl px-4 py-4 mb-3 flex-row items-center"
        >
          <View
            className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
            style={{ backgroundColor: t.iconBg }}
          >
            <IconSymbol
              name={t.icon}
              size={24}
              color={t.iconColor}
            />
          </View>

          <View className="flex-1 mr-3">
            <AppText
              className="text-[15px] text-text-primary"
              style={{ fontWeight: "600" }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t.title}
            </AppText>
            <AppText
              className="text-xs font-lato-regular mt-0.5 text-text-secondary"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {t.category} • {t.time}
            </AppText>
          </View>

          <AppText
            className="text-[15px]"
            style={{
              fontWeight: "700",
              color: t.type === "income" ? "#4CAF50" : "#EF5350",
            }}
          >
            {t.type === "income" ? "+" : "-"}₦{formatCurrency(t.amount)}
          </AppText>
        </View>
      ))}
    </View>
  );
};