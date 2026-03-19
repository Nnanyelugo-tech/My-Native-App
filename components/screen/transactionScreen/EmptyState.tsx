import React from "react";
import { View } from "react-native";
import { AppText } from "@/components/global/AppText";

export const EmptyState = () => (
  <View className="items-center justify-center py-20">
    <AppText
      className="text-base font-lato-regular text-text-secondary"
    >
      No transactions found
    </AppText>
  </View>
);