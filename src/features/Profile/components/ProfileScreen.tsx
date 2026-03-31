import { AppText } from "@/src/components/Global/AppText";
import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import SettingsSection from "./SettingsSection";

export function ProfileScreen() {
  return (
    <ScreenContainer>
      <ProfileHeader />
      <ScrollView
        className="flex-1 bg-surface-main"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          <ProfileCard />

          <SettingsSection type="account" />
          <SettingsSection type="preferences" />
          <SettingsSection type="support" />

          {/* LOGOUT BUTTON */}
          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            className="flex-row items-center justify-center border-2 border-[rgba(255,23,68,0.1)] bg-[rgba(255,23,68,0.02)] py-4 rounded-full mx-2 mb-8"
          >
            <IconSymbol name="arrow.right.square.fill" size={18} color="#FF1744" />
            <AppText className="text-danger-main font-bold ml-2">
              Logout
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
