// Hook for handling user sign-up and profile creation.
import { useState } from "react";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { supabase } from "@/src/lib/supabase";
import { RegisterFormValues } from "@/src/features/Auth/types/auth";
import { registerSchema } from "@/src/features/Auth/validation/authSchema";

export function useSignUp() {
  const { replace, back } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    if (!agreeToTerms) {
      return Alert.alert("Please agree to terms");
    }
    setIsLoading(true);
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setIsLoading(false);
      Alert.alert("Sign Up Failed", error.message);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        full_name: data.fullName,
        email: data.email,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
      }
    }

    setIsLoading(false);
    replace("/(tabs)/home");
  };

  return {
    form,
    isLoading,
    agreeToTerms,
    setAgreeToTerms,
    onSubmit: form.handleSubmit(onSubmit),
    back,
    replace,
  };
}
