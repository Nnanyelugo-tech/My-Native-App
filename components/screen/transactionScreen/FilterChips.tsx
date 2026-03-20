import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AppText } from "@/components/global/AppText";
import { filters } from "@/constants/filters";
import { FilterLabel } from "@/types/transaction.types";

interface FilterChipsProps {
  activeFilter: FilterLabel;
  setActiveFilter: (label: FilterLabel) => void;
}

export const FilterChips = ({
  activeFilter,
  setActiveFilter,
}: FilterChipsProps) => (
  <View className="flex-row px-5 mb-2 gap-2">
    {filters.map((label) => {
      const isActive = activeFilter === label;

      return (
        <TouchableOpacity
          key={label}
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={() => setActiveFilter(label)}
          className={`px-5 py-2 rounded-full ${
            isActive
              ? "bg-brand-main"
              : "bg-surface-card border border-border-subtle"
          }`}
        >
          <AppText
            className="text-sm"
            style={{
              fontWeight: "700",
              color: isActive ? "#FFFFFF" : "#1A1A2E",
            }}
          >
            {label}
          </AppText>
        </TouchableOpacity>
      );
    })}
  </View>
);
