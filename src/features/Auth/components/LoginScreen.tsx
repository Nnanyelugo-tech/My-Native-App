import { FormInput } from "@/src/components/Forms/FormInput";
import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { supabase } from "@/src/lib/supabase";
import { LoginFormValues } from "@/src/features/Auth/types/auth";
import { loginSchema } from "@/src/features/Auth/validation/authSchema";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, Pressable, View, Alert } from "react-native";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function Login() {
  const { replace, back, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const colors = Colors[theme];

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

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    setIsLoading(false);

    if (error) {
      Alert.alert("Login Failed", error.message);
    } else {
      replace("/(tabs)/home");
    }
  };

  return (
    <ScreenWrapper className="px-6 pb-10 bg-surface-main">
      <View className="items-center mt-7 mb-10">
        <View className="w-16 h-16 bg-brand-main rounded-2xl items-center justify-center mb-4 shadow-sm shadow-brand-main/20">
          <Ionicons name="wallet-outline" size={32} color="white" />
        </View>
        <AppText className="text-2xl text-text-primary text-center mb-2 font-lato-bold">
          Welcome back
        </AppText>
        <AppText className="text-text-secondary text-center font-lato leading-5 px-4 font-medium">
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
          leftIcon={
            <Ionicons
              name="mail-outline"
              size={20}
              color={colors.placeholder}
            />
          }
          error={errors.email?.message}
        />

        <FormInput
          control={control}
          name="password"
          label="Password"
          placeholder="Enter your password"
          isPassword
          leftIcon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={colors.placeholder}
            />
          }
          error={errors.password?.message}
        />
      </View>

      <Pressable
        onPress={() => push("/auth/forgot-password")}
        className="self-end mb-8"
      >
        <AppText className="text-brand-main font-bold text-sm">
          Forgot Password?
        </AppText>
      </Pressable>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="bg-brand-main py-4 rounded-2xl shadow-lg shadow-brand-main/20 items-center justify-center min-h-[50px]"
      >
        {isLoading ? (
          <AnimatedSpinner size="small" color="#ffffff" />
        ) : (
          <AppText className="text-white text-center font-bold text-sm">
            Log In
          </AppText>
        )}
      </Pressable>

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-divider" />
        <AppText className="mx-4 text-text-muted text-xs font-bold tracking-widest uppercase">
          OR CONTINUE WITH
        </AppText>
        <View className="flex-1 h-px bg-divider" />
      </View>

      {/* Social Auth Buttons */}
      <SocialAuthButtons variant="continue" />

      <View className="flex-row justify-center mt-auto pt-10">
        <AppText className="text-text-secondary">
          Don&apos;t have an account?{" "}
        </AppText>
        <Pressable onPress={() => replace("/auth/register")}>
          <AppText className="text-brand-main font-bold">Sign Up</AppText>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}
