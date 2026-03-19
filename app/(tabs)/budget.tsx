import { View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { AppText } from "@/components/global/AppText";

export default function BudgetScreen() {
  return (
    <ScreenWrapper>
      <View>
        <AppText className="text-xl text-center" style={{ fontWeight: "700" }}>BudgetScreen</AppText>
      </View>
    </ScreenWrapper>
  );
}
