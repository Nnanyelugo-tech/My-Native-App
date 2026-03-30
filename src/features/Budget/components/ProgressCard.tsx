import { AppText } from "@/src/components/Global/AppText";
import { formatCurrency } from "@/src/utils/formatCurrency";
import React from "react";
import { View } from "react-native";

type Props = {
  spent: number;
  limit: number;
};

export function ProgressCard({ spent, limit }: Props) {
  const percentage = limit > 0 ? Math.min((spent / limit) * 100, 100) : 0;

  return (
    <View className="bg-surface-card rounded-3xl p-6">
      <View className="flex-row justify-between items-end mb-3">
        <AppText className="text-text-muted font-bold text-base">
          Total Progress
        </AppText>
        <AppText className="text-brand-main font-extrabold text-base">
          {percentage.toFixed(0)}% Used
        </AppText>
      </View>

      <View className="h-3 bg-border-subtle rounded-full overflow-hidden mb-4">
        <View
          className="h-full bg-brand-main rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </View>

      <AppText className="text-text-secondary font-lato-regular text-sm text-center italic">
        You&apos;ve spent {formatCurrency(spent)} of your{" "}
        {formatCurrency(limit)} monthly limit.
      </AppText>
    </View>
  );
}
