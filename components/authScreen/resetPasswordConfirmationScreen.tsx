import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export function ResetConfirmation() {
  const { replace } = useRouter();

  return (
    <ScreenWrapper className="px-6 pb-10 bg-white justify-center">
      <View className="items-center">
        {/* Success Icon with nested circles */}
        <View className="w-28 h-28 bg-[#F3E5F5] rounded-full items-center justify-center mb-8">
          <View className="w-20 h-20 bg-[#D1C4E9] rounded-full items-center justify-center">
            <View className="w-12 h-12 bg-[#311B92] rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={30} color="white" />
            </View>
          </View>
        </View>

        {/* Text Content */}
        <Text className="text-3xl font-black text-gray-900 mb-4 text-center">
          Email Sent
        </Text>
        <Text className="text-gray-500 font-medium leading-6 text-[15px] text-center px-4 mb-10">
          We&apos;ve sent password reset instructions to your email. Please
          check your inbox and follow the link to reset your password.
        </Text>

        {/* Main Action */}
        <Pressable
          onPress={() => replace("/auth/login")}
          className="bg-[#1A237E] py-4 rounded-2xl w-full shadow-lg shadow-indigo-100 mb-8"
        >
          <Text className="text-white text-center font-bold text-lg">
            Back to Login
          </Text>
        </Pressable>

        {/* Resend Option */}
        <View className="items-center mb-10">
          <Text className="text-gray-400 text-sm mb-2 font-medium">
            Didn&apos;t receive the email?
          </Text>
          <Pressable className="flex-row items-center">
            <Ionicons name="refresh-outline" size={18} color="#1A237E" />
            <Text className="text-[#1A237E] font-bold ml-2">Resend Email</Text>
          </Pressable>
        </View>
      </View>

      {/* Footer Support Link */}
      <View className="mt-auto items-center">
        <Text className="text-sm text-gray-400 font-medium">
          Need help?{" "}
          <Text className="text-[#1A237E] underline font-bold">
            Contact Fintrack Support
          </Text>
        </Text>
      </View>
    </ScreenWrapper>
  );
}
