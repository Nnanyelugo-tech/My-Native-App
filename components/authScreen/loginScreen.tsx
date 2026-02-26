import React, { useCallback } from "react";
import { View, Text, Pressable, BackHandler } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFocusEffect, useRouter } from "expo-router";
import ScreenWrapper from "@/components/global/ScreenWrapper";
import { useAuthStore } from "@/base/hooks/store/useAuthStore";
import { loginSchema } from "@/base/validation/authSchema";
import { FormInput } from "@/components/forms/formInput";
import { LoginFormValues } from "@/base/interface/auth";

export function Login() {
  const router = useRouter();
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
      const sub = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true
      );
      return () => sub.remove();
    }, [])
  );

  const onSubmit = (data: LoginFormValues) => {
    console.log(data);
    login("mock-token");
    router.replace("/(tabs)/home");
  };

  return (
    <ScreenWrapper>
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-2xl font-bold text-center mb-6 text-black">
        Welcome back
      </Text>

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
        placeholder="Enter your password"
        secureTextEntry
        error={errors.password?.message}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-blue-600 py-4 rounded-xl mt-4"
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </Pressable>

      <Pressable
        onPress={() => router.replace("/auth/register")}
        className="mt-6"
      >
        <Text className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Text>
      </Pressable>
    </View>
    </ScreenWrapper>
  );
}