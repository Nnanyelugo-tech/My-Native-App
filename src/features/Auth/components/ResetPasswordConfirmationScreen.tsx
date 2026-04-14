import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function ResetConfirmation() {
  const { replace } = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenWrapper className="px-6 pb-10 bg-surface-main justify-center">
      <View className="items-center">
        <View className="w-28 h-28 bg-brand-bg-light rounded-full items-center justify-center mb-8">
          <View className="w-20 h-20 bg-brand-bg-medium rounded-full items-center justify-center">
            <View className="w-12 h-12 bg-brand-main rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={30} color="white" />
            </View>
          </View>
        </View>

        <AppText className="text-2xl font-black text-text-primary mb-4 text-center">
          Email Sent
        </AppText>
        <AppText className="text-text-secondary font-medium leading-6 text-[14px] text-center px-4 mb-10">
          We&apos;ve sent password reset instructions to your email. Please
          check your inbox and follow the link to reset your password.
        </AppText>

        <Pressable
          onPress={() => replace("/auth/login")}
          className="bg-brand-main py-4 rounded-2xl w-full mb-8"
        >
          <AppText className="text-white text-center font-bold text-sm">
            Back to Login
          </AppText>
        </Pressable>

        <View className="items-center mb-10">
          <AppText className="text-text-muted text-[12px] mb-2">
            Didn&apos;t receive the email?
          </AppText>
          <Pressable className="flex-row items-center">
            <Ionicons name="refresh-outline" size={18} color={colors.brandMain} />
            <AppText className="text-brand-main ml-2">Resend Email</AppText>
          </Pressable>
        </View>
      </View>

      <View className="mt-auto items-center">
        <AppText className="text-sm text-text-muted font-medium">
          Need help?{" "}
          <AppText className="text-brand-main underline font-bold">
            Contact Fintrack Support
          </AppText>
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
