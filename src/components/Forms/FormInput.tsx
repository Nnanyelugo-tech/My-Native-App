import { AppText } from "@/src/components/Global/AppText";
import { FormInputProps } from "@/src/types/forms";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";
import { useTheme } from "../Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword,
  ...inputProps
}: FormInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View className="mb-4 w-full">
      <AppText className="text-sm font-medium text-text-secondary mb-1.5 ml-1">
        {label}
      </AppText>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center border rounded-2xl px-4 bg-surface-card ${
              error ? "border-danger-main" : "border-border-subtle"
            }`}
          >
            {leftIcon && <View className="mr-3">{leftIcon}</View>}

            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor={colors.placeholder}
              secureTextEntry={isPassword && !showPassword}
              className="flex-1 py-3.5 font-lato-regular text-text-primary text-[13px]"
              {...inputProps}
            />

            {isPassword ? (
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            ) : (
              rightIcon && <AppText className="ml-2">{rightIcon}</AppText>
            )}
          </View>
        )}
      />

      {error && (
        <AppText className="text-danger-main text-[12px] mt-1 ml-1 font-medium">
          {error}
        </AppText>
      )}
    </View>
  );
}
