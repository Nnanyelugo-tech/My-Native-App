import { FormInput } from "@/src/components/Forms/FormInput";
import { AppText } from "@/src/components/Global/AppText";
import ScreenWrapper from "@/src/components/Global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { BackHandler, Pressable, View } from "react-native";
import { SocialAuthButtons } from "./SocialAuthButtons";
import { useSignUp } from "@/src/features/Auth/hook/useSignUp";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";

export function Signup() {
  const {
    form,
    isLoading,
    agreeToTerms,
    setAgreeToTerms,
    onSubmit,
    back,
    replace,
  } = useSignUp();

  const {
    control,
    formState: { errors },
  } = form;

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", () => {
        back();
        return true;
      });
      return () => sub.remove();
    }, [back]),
  );

  return (
    <ScreenWrapper className="px-6 pb-10 bg-surface-main">
      <View className="items-center mt-5 mb-8">
        <View className="w-16 h-16 bg-brand-main rounded-2xl items-center justify-center mb-4 shadow-sm shadow-indigo-200">
          <Ionicons name="wallet-outline" size={32} color="white" />
        </View>
        <AppText className="text-2xl font-lato-bold text-gray-900  text-center mb-2">
          Create your Fintrack account
        </AppText>
        <AppText className="text-gray-500 text-center  leading-5 px-4 font-medium">
          Start your journey to financial freedom{"\n"}today
        </AppText>
      </View>

      {/* Form Fields */}
      <View className="gap-1">
        <FormInput
          control={control}
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          leftIcon={
            <Ionicons name="person-outline" size={20} color="#9CA3AF" />
          }
          error={errors.fullName?.message}
        />

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
          placeholder="Create a password"
          isPassword
          leftIcon={
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
          }
          error={errors.password?.message}
        />

        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          isPassword
          leftIcon={
            <Ionicons name="refresh-outline" size={20} color="#9CA3AF" />
          }
          error={errors.confirmPassword?.message}
        />
      </View>

      <View className="flex-row mt-2 mb-8">
        <Pressable
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
            agreeToTerms ? "bg-brand-main border-brand-main" : "border-gray-300"
          }`}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {agreeToTerms && (
            <Ionicons name="checkmark" size={16} color="white" />
          )}
        </Pressable>

        <AppText className="flex-1 text-gray-500 font-medium text-sm font-lato">
          By creating an account, i agree to Fintrack&apos;s{" "}
          <AppText className="text-brand-main font-bold">Terms of Service</AppText>{" "}
          and <AppText className="text-brand-main font-bold">Privacy Policy</AppText>
        </AppText>
      </View>

      <Pressable
        onPress={onSubmit}
        disabled={!agreeToTerms || isLoading}
        className={`py-4 rounded-2xl shadow-lg shadow-indigo-100 items-center justify-center min-h-[50px] ${
          agreeToTerms ? "bg-brand-main" : "bg-gray-300"
        }`}
      >
        {isLoading ? (
          <AnimatedSpinner color="#FFFFFF" size={24} />
        ) : (
          <AppText className="text-white text-center font-bold text-sm">
            Sign Up
          </AppText>
        )}
      </Pressable>

      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-gray-200" />
        <AppText className="mx-4 text-gray-500 text-xs font-bold tracking-widest uppercase">
          OR SIGN UP WITH
        </AppText>
        <View className="flex-1 h-px bg-gray-200" />
      </View>

      <SocialAuthButtons variant="signup" />

      <View className="flex-row justify-center mt-12">
        <AppText className="text-gray-500">
          Already have an account?{" "}
        </AppText>
        <Pressable onPress={() => replace("/auth/login")}>
          <AppText className="text-brand-main font-bold">Log In</AppText>
        </Pressable>
      </View>

      <View className="mt-8 items-center">
        <AppText className="text-[12px] text-gray-400 text-center px-10">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
