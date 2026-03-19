import React from "react";
import { View } from "react-native";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { AppText } from "@/components/global/AppText";

export default function PlusScreen() {
  return (
    <ScreenWrapper>
      <View>
        <AppText className="text-center text-xl" style={{ fontWeight: "700" }}>PlusScreen</AppText>
      </View>
    </ScreenWrapper>
  );
}
