import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import { useThemeColor } from "@/src/hooks/useThemeColor";
import { AppText } from "@/src/components/Global/AppText";

type SocialAuthButtonsProps = {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  variant?: "continue" | "signup";
};

export function SocialAuthButtons({
  onGooglePress,
  onApplePress,
  variant = "continue",
}: SocialAuthButtonsProps) {
  const textColor = useThemeColor({}, "text");

  return (
    <View className="flex-row gap-4 w-full mt-4">
      <Pressable
        onPress={onGooglePress}
        className="flex-1 flex-row items-center justify-center border border-border-subtle py-3.5 rounded-2xl bg-surface-card shadow-sm"
      >
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <AppText className="ml-2 font-bold text-text-primary text-[14px]">
          Google
        </AppText>
      </Pressable>

      <Pressable
        onPress={onApplePress}
        className="flex-1 flex-row items-center justify-center border border-border-subtle py-3.5 rounded-2xl bg-surface-card shadow-sm"
      >
        <Ionicons name="logo-apple" size={20} color={textColor} />
        <AppText className="ml-2 font-bold text-text-primary text-[14px]">
          Apple
        </AppText>
      </Pressable>
    </View>
  );
}
