import ScreenWrapper from "@/components/global/ScreenWrapper";
import React from "react";
import { Text, View } from "react-native";

export function IndexScreen() {
  return (
    <ScreenWrapper>
      <View className="max-w-md">
        <Text className="text-2xl font-bold  text-center font-lato">
          Welcome to the Home Screen!
        </Text>
        <Text className="text-center mt-4 text-gray-600 font-roboto">
          This is the main screen of the app. You can navigate through different
          sections and discover more.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
