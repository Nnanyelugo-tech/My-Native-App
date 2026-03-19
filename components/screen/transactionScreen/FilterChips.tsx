import React from "react";
import { View, TouchableOpacity } from "react-native";
import { AppText } from "@/components/global/AppText";
import { filters } from "@/constants/filters";
import { FilterLabel } from "@/types/transaction.types";

export const FilterChips = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: FilterLabel;
  setActiveFilter: (label: FilterLabel) => void;
}) => (
  <View className="flex-row px-5 mb-1 gap-2">
    {filters.map((label) => {
      const isActive = activeFilter === label;

      return (
        <TouchableOpacity
          key={label}
          activeOpacity={0.7}
          onPress={() => setActiveFilter(label)}
          className="px-5 py-2 rounded-full"
          style={{
            backgroundColor: isActive ? "#1A237E" : "#FFFFFF",
            borderWidth: isActive ? 0 : 1,
            borderColor: "#E0E0E0",
          }}
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