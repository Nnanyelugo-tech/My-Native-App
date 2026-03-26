import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol, IconSymbolName } from "@/src/components/UI/IconSymbol";
import type { CategoryBreakdownItem } from "@/src/features/Budget/hooks/useMonthlyBreakdown";
import { formatCurrency } from "@/src/utils/formatCurrency";
import React from "react";
import { View } from "react-native";

type Props = {
  items: CategoryBreakdownItem[];
};

export function BreakdownList({ items }: Props) {
  return (
    <View className="mb-10">
      {items.map((item, index) => (
        <View
          key={item.name}
          className="flex-row items-center justify-between p-4 bg-surface-card rounded-3xl mb-3"
        >
          <View className="flex-row items-center flex-1">
            <View
              className="w-12 h-12 rounded-full items-center justify-center mr-4"
              style={{ backgroundColor: item.iconBg }}
            >
              <IconSymbol
                name={item.icon as IconSymbolName}
                size={24}
                color={item.iconColor}
              />
            </View>
            <View>
              <AppText className="text-[15px] text-text-primary font-semibold">
                {item.name}
              </AppText>
              <AppText className="text-[11px] font-lato-regular mt-0.5 text-text-secondary">
                {item.count} Transactions
              </AppText>
            </View>
          </View>

          <View className="items-end">
            <AppText className="text-text-primary font-bold text-base">
              {formatCurrency(item.total)}
            </AppText>
            <AppText
              className={`text-xs mt-0.5 font-bold ${
                index % 2 === 0 ? "text-success-main" : "text-danger-main"
              }`}
            >
              {index % 2 === 0 ? "+" : "-"}
              {(Math.random() * 10).toFixed(1)}%
            </AppText>
          </View>
        </View>
      ))}
    </View>
  );
}
