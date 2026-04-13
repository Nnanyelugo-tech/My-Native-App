import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { BudgetCardProps, StatTileProps } from "../types/budgetProps";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function BudgetCard({
  budgetLimit,
  totalSpent,
  remaining,
  onEdit,
}: BudgetCardProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const Content = (
    <>
      <View
        style={{
          position: "absolute",
          top: 16,
          right: 17,
          bottom: -2,
          opacity: 0.1,
        }}
      >
        <IconSymbol 
          name="wallet-outline" 
          size={90} 
          color={isDark ? colors.textSecondary : "#FFFFFF"} 
        />
      </View>

      <View className="flex-row justify-between items-start">
        <View>
          <AppText className={`text-sm uppercase font-bold tracking-wider ${isDark ? "text-text-secondary" : "text-white/80"}`}>
            Budget Goal
          </AppText>
          <AppText
            className={`mt-1 text-[27px] font-extrabold ${isDark ? "text-text-primary" : "text-white"}`}
          >
            {formatCurrency(budgetLimit)}
          </AppText>
        </View>

        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            className={`${isDark ? "bg-brand-bg-light" : "bg-white/20"} p-2 rounded-full`}
          >
            <IconSymbol 
              name="pencil" 
              size={18} 
              color={isDark ? colors.brandMain : "#FFFFFF"} 
            />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row mt-6 gap-4">
        <StatTile label="Total Spent" value={totalSpent} arrowDir="down" />
        <StatTile label="Remaining" value={remaining} arrowDir="up" />
      </View>
    </>
  );

  return (
    <View className="mx-0">
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

function StatTile({ label, value, arrowDir }: StatTileProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";
  const color = arrowDir === "down" ? colors.danger : colors.success;
  const icon = arrowDir === "down" ? "arrow.down" : "arrow.up";

  return (
    <View
      className={`flex-1 px-4 py-3.5 rounded-2xl border ${
        isDark ? "bg-bgColor border-border-subtle" : "bg-white/10 border-white/5"
      }`}
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
        className={`text-[18px] font-extrabold ${isDark ? "text-text-primary" : "text-white"}`}
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {formatCurrency(value)}
      </AppText>
    </View>
  );
}

