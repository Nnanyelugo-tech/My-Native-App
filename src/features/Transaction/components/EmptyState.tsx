import { AppText } from "@/src/components/Global/AppText";
import React from "react";
import { View } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";

export const EmptyState = () => (
  <View className="items-center justify-center py-20">
    <IconSymbol name="doc.text" size={32} color="#9BA1A6" />
    <AppText className="text-base font-lato-regular text-text-secondary">
      No transactions found
    </AppText>
  </View>
);
