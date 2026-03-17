import { ForgotPasswordValues } from "@/base/interface/auth";
import { forgotPasswordSchema } from "@/base/validation/authSchema";
import { FormInput } from "@/components/forms/formInput";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, Pressable, Text, View } from "react-native";

export function Forgot() {
  const { back, replace } = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        back();
        return true;
      });
      return () => sub.remove();
    }, [back]),
  );

  const onSubmit = (data: ForgotPasswordValues) => {
    console.log("Send reset link to:", data.email);
    replace("/auth/email-sent");
  };

  return (
    <ScreenWrapper className="px-6 pb-10 bg-white">
      <Pressable onPress={() => back()} className="mt-4 mb-8">
        <Ionicons name="arrow-back" size={24} color="#1F2937" />
      </Pressable>

      <View className="mb-8">
        <View className="w-16 h-16 bg-[#F3E5F5] rounded-2xl items-center justify-center">
          <Ionicons name="refresh-circle-outline" size={36} color="#4A148C" />
        </View>
      </View>

      <View className="mb-10">
        <Text className="text-3xl font-black text-gray-900 mb-3">
          Forgot Password?
        </Text>
        <Text className="text-gray-500 font-medium font-lato leading-6 text-[15px]">
          Enter your email address and we&apos;ll send you a reset link to
          regain access to your Fintrack account.
        </Text>
      </View>

    
      <View className="gap-4">
        <FormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
          error={errors.email?.message}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-[#1A237E] py-4 rounded-2xl shadow-lg shadow-indigo-100 mt-2"
        >
          <Text className="text-white text-center font-bold text-lg">
            Send Reset Link
          </Text>
        </Pressable>
      </View>

      
      <View className="flex-row justify-center mt-10">
        <Text className="text-gray-500 font-medium">
          Remember your password?{" "}
        </Text>
        <Pressable onPress={() => replace("/auth/login")}>
          <Text className="text-[#1A237E] font-bold">Log In</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}
