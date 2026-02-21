import ScreenWrapper from "@/components/global/ScreenWrapper";
import React from "react";
import { Text } from "react-native";

export function ProfileScreen() {
  return (
    <ScreenWrapper>
      <Text className="text-2xl font-bold  text-center">Profile Screen</Text>

      <Text className="mt-4 text-red-400 text-center px-4 font-lato">
        Welcome to the Profile Screen! This is where you can discover new
        content and features of our app. Explore the tabs below to navigate
        through different sections and find out more.
      </Text>
    </ScreenWrapper>
  );
}
