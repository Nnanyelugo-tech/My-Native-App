import React, { useCallback } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { FormInput } from "@/components/forms/formInput";
import { RegisterFormValues } from "@/base/interface/auth";
import { registerSchema } from "@/base/validation/authSchema";
import { useAuthStore } from "@/base/hooks/store/useAuthStore";

export function Signup() {
  const { replace } = useRouter();
  const login = useAuthStore((s) => s.login);

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
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => sub.remove();
    }, [])
  );

  const onSubmit = (data: RegisterFormValues) => {
  console.log(data);
    login("mock-token");
    replace("/(tabs)/home");
  };

  return (
    <ScreenWrapper>
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">
        Sign Up
      </Text>

      <FormInput
        control={control}
        name="fullName"
        label="Full Name"
        placeholder="Enter your full name"
        error={errors.fullName?.message}
      />

      <FormInput
        control={control}
        name="email"
        label="Email"
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email?.message}
      />

      <FormInput
        control={control}
        name="password"
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        error={errors.password?.message}
      />

      <FormInput
        control={control}
        name="confirmPassword"
        label="Confirm Password"
        placeholder="Confirm password"
        secureTextEntry
        error={errors.confirmPassword?.message}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-600 py-4 rounded-xl mt-2"
      >
        <Text className="text-white text-center font-semibold">
          Create Account
        </Text>
      </Pressable>

      <Pressable
        onPress={() => replace("/auth/login")}
        className="mt-4"
      >
        <Text className="text-center">
          Already have an account?{" "}
          <Text className="text-blue-600 font-semibold">
            Login
          </Text>
        </Text>
      </Pressable>
    </View>
    </ScreenWrapper>
  );
}