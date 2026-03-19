import React from "react";
import { View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppText } from "@/components/global/AppText";
import { Transaction } from "@/data/transactionListData";
import { formatCurrency } from "@/utils/formatCurrency";

export const TransactionItem = ({ item: t }: { item: Transaction }) => {
  return (
    <View className="bg-white rounded-3xl px-4 py-3.5 mb-3 flex-row items-center">
      <View
        className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
        style={{ backgroundColor: t.iconBg }}
      >
        <IconSymbol name={t.icon} size={22} color={t.iconColor} />
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
          className="text-[11px] font-lato-regular mt-0.5 text-text-secondary"
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
  );
};