
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

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

  const isSignup = variant === "signup";

  return (
    <View className="flex-row gap-4 w-full mt-4">
      <Pressable
        onPress={onGooglePress}
        className="flex-1 flex-row items-center justify-center border border-gray-100 py-3.5 rounded-2xl bg-white shadow-sm shadow-gray-100 active:bg-gray-50"
      >
        <Ionicons name="logo-google" size={20} color="#EA4335" />
        <Text className="ml-2 font-bold text-gray-700 text-[14px]">
          {isSignup ? "Google" : "Google"}
        </Text>
      </Pressable>

      <Pressable
        onPress={onApplePress}
        className="flex-1 flex-row items-center justify-center border border-gray-100 py-3.5 rounded-2xl bg-white shadow-sm shadow-gray-100 active:bg-gray-50"
      >
        <Ionicons name="logo-apple" size={20} color="#000000" />
        <Text className="ml-2 font-bold text-gray-700 text-[14px]">
          {isSignup ? "Apple" : "Apple"}
        </Text>
      </Pressable>
    </View>
  );
}
