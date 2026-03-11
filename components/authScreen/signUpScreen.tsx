import { useAuthStore } from "@/base/hooks/store/useAuthStore";
import { RegisterFormValues } from "@/base/interface/auth";
import { registerSchema } from "@/base/validation/authSchema";
import { FormInput } from "@/components/forms/formInput";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { BackHandler, Pressable, Text, View } from "react-native";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function Signup() {
  const { replace, back } = useRouter();
  const login = useAuthStore((s) => s.login);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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

  const onSubmit = (data: RegisterFormValues) => {
    if (!agreeToTerms) {
      return;
    }
    console.log(data);
    login("mock-token");
    replace("/(tabs)/home");
  };

  return (
    <ScreenWrapper className="px-6 pb-10 bg-white">
     
        {/* Logo and Welcome Text */}
        <View className="items-center mt-5 mb-8">
          <View className="w-16 h-16 bg-[#1A237E] rounded-2xl items-center justify-center mb-4 shadow-sm shadow-indigo-200">
            <Ionicons name="wallet-outline" size={32} color="white" />
          </View>
          <Text className="text-2xl font-black text-gray-900 text-center mb-2">
            Create your Fintrack account
          </Text>
          <Text className="text-gray-500 text-center font-lato leading-5 px-4 font-medium">
            Start your journey to financial freedom{"\n"}today
          </Text>
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
            leftIcon={
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
            }
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

        {/* Terms and Conditions */}
        <Pressable
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          className="flex-row items-center mt-2 mb-8"
        >
          <View
            className={`w-5 h-5 rounded-md border-2 mr-3 items-center justify-center ${
              agreeToTerms ? "bg-[#1A237E] border-[#1A237E]" : "border-gray-300"
            }`}
          >
            {agreeToTerms && (
              <Ionicons
                name="checkmark"
                size={14}
                color="white"
                fontWeight="700"
              />
            )}
          </View>
          <Text className="flex-1 text-[13px] font-lato text-gray-500 font-medium">
            By creating an account, I agree to Fintrack&apos;s{" "}
            <Text className="text-[#1A237E] font-bold">Terms of Service</Text>{" "}
            and <Text className="text-[#1A237E] font-bold">Privacy Policy</Text>
            .
          </Text>
        </Pressable>

        {/* Sign Up Button */}
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className={`py-4 rounded-2xl shadow-lg shadow-indigo-100 ${
            agreeToTerms ? "bg-[#1A237E]" : "bg-gray-300"
          }`}
          disabled={!agreeToTerms}
        >
          <Text className="text-white text-center font-bold text-lg">
            Sign Up
          </Text>
        </Pressable>

        
        <View className="flex-row items-center my-8">
          <View className="flex-1 h-px bg-gray-100" />
          <Text className="mx-4 text-gray-400 text-xs font-bold tracking-widest uppercase">
            OR Sign up WITH
          </Text>
          <View className="flex-1 h-px bg-gray-100" />
        </View>

        
        <SocialAuthButtons variant="signup" />

        {/* Footer */}
        <View className="flex-row justify-center mt-12">
          <Text className="text-gray-500 font-medium">
            Already have an account?{" "}
          </Text>
          <Pressable onPress={() => replace("/auth/login")}>
            <Text className="text-[#1A237E] font-bold">Log In</Text>
          </Pressable>
        </View>

        <View className="mt-8 items-center">
          <Text className="text-[11px] text-gray-400 text-center px-10">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
     
    </ScreenWrapper>
  );
}
