import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

export function ResetConfirmation() {
  const { replace } = useRouter();

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

        <AppText className="text-3xl font-black text-gray-900 mb-4 text-center">
          Email Sent
        </AppText>
        <AppText className="text-gray-500 font-medium leading-6 text-[15px] text-center px-4 mb-10">
          We&apos;ve sent password reset instructions to your email. Please
          check your inbox and follow the link to reset your password.
        </AppText>

        <Pressable
          onPress={() => replace("/auth/login")}
          className="bg-brand-main py-4 rounded-2xl w-full shadow-lg shadow-indigo-100 mb-8"
        >
          <AppText className="text-white text-center font-bold text-lg">
            Back to Login
          </AppText>
        </Pressable>

        <View className="items-center mb-10">
          <AppText className="text-gray-400 text-sm mb-2 font-medium">
            Didn&apos;t receive the email?
          </AppText>
          <Pressable className="flex-row items-center">
            <Ionicons name="refresh-outline" size={18} color="#1A237E" />
            <AppText className="text-brand-main font-bold ml-2">Resend Email</AppText>
          </Pressable>
        </View>
      </View>

      <View className="mt-auto items-center">
        <AppText className="text-sm text-gray-400 font-medium">
          Need help?{" "}
          <AppText className="text-brand-main underline font-bold">
            Contact Fintrack Support
          </AppText>
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
