import ScreenWrapper from "@/components/global/ScreenWrapper";
import React from "react";
import { AppText } from "@/components/global/AppText";

export function ProfileScreen() {
  return (
    <ScreenWrapper>
      <AppText className="text-2xl text-center" style={{ fontWeight: "700" }}>Profile Screen</AppText>

      <AppText className="mt-4 text-red-400 text-center px-4 font-lato">
        Welcome to the Profile Screen! This is where you can discover new
        content and features of our app. Explore the tabs below to navigate
        through different sections and find out more.
      </AppText>
    </ScreenWrapper>
  );
}
