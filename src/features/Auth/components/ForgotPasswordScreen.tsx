import { FormInput } from "@/src/components/Forms/FormInput";
import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { ForgotPasswordValues } from "@/src/features/Auth/types/auth";
import { forgotPasswordSchema } from "@/src/features/Auth/validation/authSchema";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, Pressable, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function Forgot() {
  const { back, replace } = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];

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
    <ScreenWrapper className="px-6 pb-10 bg-surface-main">
      <Pressable onPress={() => back()} className="mt-4 mb-8">
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </Pressable>

      <View className="mb-8">
        <View className="w-16 h-16 bg-brand-bg-dark rounded-2xl items-center justify-center">
          <Ionicons name="refresh-circle-outline" size={36} color={colors.brandMain} />
        </View>
      </View>

      <View className="mb-10">
        <AppText className="text-2xl font-black text-text-primary mb-3">
          Forgot Password?
        </AppText>
        <AppText className="text-text-secondary font-medium font-lato leading-6 text-[14px]">
          Enter your email address and we&apos;ll send you a reset link to
          regain access to your Fintrack account.
        </AppText>
      </View>

      <View className="gap-4">
        <FormInput
          control={control}
          name="email"
          label="Email Address"
          placeholder="name@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Ionicons name="mail-outline" size={20} color={colors.placeholder} />}
          error={errors.email?.message}
        />

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-brand-main py-4 rounded-2xl shadow-lg shadow-brand-main/20 mt-2"
        >
          <AppText className="text-white text-center font-bold text-sm">
            Send Reset Link
          </AppText>
        </Pressable>
      </View>

      <View className="flex-row justify-center mt-10">
        <AppText className="text-text-secondary font-medium">
          Remember your password?{" "}
        </AppText>
        <Pressable onPress={() => replace("/auth/login")}>
          <AppText className="text-brand-main font-bold">Log In</AppText>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}
