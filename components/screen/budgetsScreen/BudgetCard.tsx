import React from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "@/components/global/AppText";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { formatCurrency } from "@/utils/formatCurrency";

type Props = {
  budgetLimit: number;
  totalSpent: number;
  remaining: number;
};

type StatTileProps = {
  label: string;
  value: number;
  arrowDir: "up" | "down";
};

export function BudgetCard({ budgetLimit, totalSpent, remaining }: Props) {
  return (
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
        Budget Goal
      </AppText>
      <AppText
        className="text-white mt-1 text-[27px]"
        style={{ fontWeight: "800" }}
      >
        {formatCurrency(budgetLimit)}
      </AppText>

      <View className="flex-row mt-6"
      >
        <StatTile label="Total Spent" value={totalSpent} arrowDir="down" />
        <View className="w-4" />
        <StatTile label="Remaining" value={remaining} arrowDir="up" />
      </View>
    </LinearGradient>
  );
}

function StatTile({ label, value, arrowDir }: StatTileProps) {
  const color = arrowDir === "down" ? "#FF1744" : "#00E676";
  const icon = arrowDir === "down" ? "arrow.down" : "arrow.up";

  return (
    
    <View
      className="flex-1 px-4 py-3.5 rounded-2xl"
      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
    >
      <View className="flex-row items-center mb-1">
        <IconSymbol name={icon} size={14} color={color} />
        <AppText className="text-[12px] font-lato-regular text-gray-300 ml-1"
        style={{ color }}
        >
          {label}
        </AppText>
      </View>
      <AppText
        className="text-white text-[18px]"
        style={{ fontWeight: "800" }}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {formatCurrency(value)}
      </AppText>
    </View>
    
  );
}
