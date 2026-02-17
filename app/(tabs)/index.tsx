import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  return (
    <View
      className="flex-1 items-center justify-center px-6"
      style={{ paddingTop: top + 10 }}
    >
      <View className="max-w-md">
        <Text
          className="text-2xl font-bold  text-center"
          style={{ fontFamily: "Lato-Black" }}
        >
          Home Screen
        </Text>

        <Text className="mt-4 text-red-400 text-center">
          Welcome to the Home Screen! This is where you can find the latest
          updates and features of our app. Explore the tabs below to navigate
          through different sections and discover more.
        </Text>
      </View>
    </View>
  );
}
