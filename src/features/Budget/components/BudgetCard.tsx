import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BudgetCardProps, StatTileProps } from "../types/budgetProps";

export function BudgetCard({
  budgetLimit,
  totalSpent,
  remaining,
  onEdit,
}: BudgetCardProps) {
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

      <View className="flex-row justify-between items-start">
        <View>
          <AppText className="text-gray-200 text-sm uppercase">
            Budget Goal
          </AppText>
          <AppText
            className="text-white mt-1 text-[27px]"
            style={{ fontWeight: "800" }}
          >
            {formatCurrency(budgetLimit)}
          </AppText>
        </View>

        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            className="bg-overlay-white-heavy p-2 rounded-full"
          >
            <IconSymbol name="pencil" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row mt-6">
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
      className="flex-1 px-4 py-3.5 rounded-2xl bg-overlay-white-medium"
    >
      <View className="flex-row items-center mb-1">
        <IconSymbol name={icon} size={14} color={color} />
        <AppText
          className="text-[12px] font-lato-regular ml-1"
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
