import { AppText } from "@/src/components/Common/AppText";
import ScreenWrapper from "@/src/components/Common/ScreenWrapper";
import React from "react";
import { View } from "react-native";

export default function PlusScreen() {
  return (
    <ScreenWrapper>
      <View>
        <AppText className="text-center text-xl" style={{ fontWeight: "700" }}>
          PlusScreen
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
