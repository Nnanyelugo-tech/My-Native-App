import { AppText } from "@/src/components/Global/AppText";
import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/src/lib/supabase";
import Toast from "react-native-toast-message";
import { magicModal } from "react-native-magic-modal";
import { ConfirmLogoutModal } from "./ConfirmLogoutModal";
import ProfileHeader from "./ProfileHeader";
import ProfileCard from "./ProfileCard";
import SettingsSection from "./SettingsSection";

import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Toast.show({
        type: "error",
        text1: "Logout Error",
        text2: error.message,
      });
    } else {
      router.replace("/auth/login");
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "You have successfully logged out",
      });
    }
  };

  const showLogoutModal = () => {
    magicModal.show(() => <ConfirmLogoutModal onConfirm={handleLogout} />);
  };

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

          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            onPress={showLogoutModal}
            className={`flex-row items-center justify-center border-2 ${
              isDark ? "border-danger/20 bg-danger/5" : "border-border-subtle bg-bgColor"
            } py-4 rounded-full mx-2 mb-8`}
          >
            <IconSymbol 
              name="arrow.right.square.fill" 
              size={18} 
              color={colors.danger} 
            />
            <AppText className="text-danger-main font-bold ml-2">
              Logout
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
