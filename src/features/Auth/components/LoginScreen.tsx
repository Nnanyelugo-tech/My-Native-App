import { FormInput } from "@/src/components/Forms/FormInput";
import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { useAuthStore } from "@/src/features/Auth/hooks/useAuthStore";
import { LoginFormValues } from "@/src/features/Auth/types/auth";
import { loginSchema } from "@/src/features/Auth/validation/authSchema";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, Pressable, Text, View } from "react-native";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function Login() {
  const { replace, back, push } = useRouter();
  const login = useAuthStore((s) => s.login);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    login("mock-token");
    replace("/(tabs)/home");
  };

  return (
    <ScreenWrapper className="px-6 pb-10 bg-surface-main">
      <View className="items-center mt-7 mb-10">
        <View className="w-16 h-16 bg-brand-main rounded-2xl items-center justify-center mb-4 shadow-sm shadow-indigo-200">
          <Ionicons name="wallet-outline" size={32} color="white" />
        </View>
        <AppText className="text-2xl text-gray-900 text-center mb-2">
          Welcome back
        </AppText>
        <AppText className="text-gray-500 text-center font-lato leading-5 px-4 font-medium">
          Good to see you again! Please sign in to{"\n"}your account
        </AppText>
      </View>

      {/* Form Fields */}
      <View className="gap-2">
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

        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          isPassword
          leftIcon={
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          }
          error={errors.password?.message}
        />
      </View>

      <Pressable
        onPress={() => push("/auth/forgot-password")}
        className="self-end mb-8"
      >
        <Text className="text-brand-main font-bold text-sm">
          Forgot Password?
        </Text>
      </Pressable>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-brand-main py-4 rounded-2xl shadow-lg shadow-indigo-100"
      >
        <Text className="text-white text-center font-bold text-lg">Log In</Text>
      </Pressable>

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-gray-200" />
        <Text className="mx-4 text-gray-500 text-xs font-bold tracking-widest uppercase">
          OR CONTINUE WITH
        </Text>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      {/* Social Auth Buttons */}
      <SocialAuthButtons variant="continue" />

      <View className="flex-row justify-center mt-auto pt-10">
        <Text className="text-gray-500 font-medium">
          Don&apos;t have an account?{" "}
        </Text>
        <Pressable onPress={() => replace("/auth/register")}>
          <Text className="text-brand-main font-bold">Sign Up</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}
