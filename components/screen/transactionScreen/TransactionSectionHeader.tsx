import React from "react";
import { View } from "react-native";
import { AppText } from "@/components/global/AppText";

export const TransactionSectionHeader = ({
  section,
}: {
  section: { title: string };
}) => (
  <View className="pt-5 pb-2 px-1 bg-surface-main">
    <AppText
      className="text-xs font-lato-regular tracking-widest text-text-secondary"
      style={{ textTransform: "uppercase" }}
    >
      {section.title}
    </AppText>
  </View>
);