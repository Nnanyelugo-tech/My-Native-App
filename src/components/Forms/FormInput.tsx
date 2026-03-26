import { AppText } from "@/src/components/Global/AppText";
import { FormInputProps } from "@/src/types/forms";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Pressable, TextInput, View } from "react-native";

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

  return (
    <View className="mb-4 w-full">
      <AppText className="text-sm font-medium text-gray-600 mb-1.5 ml-1">
        {label}
      </AppText>

      <Controller
        control={control}
        name={name}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center border rounded-2xl px-4 bg-red-50/50 ${
              error ? "border-red-500" : "border-gray-200"
            }`}
          >
            {leftIcon && <View className="mr-3">{leftIcon}</View>}

            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholderTextColor="#9CA3AF"
              secureTextEntry={isPassword && !showPassword}
              className="flex-1 py-3.5 text-gray-600 text-[15px]"
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
                  color="#6B7280"
                />
              </Pressable>
            ) : (
              rightIcon && <AppText className="ml-2">{rightIcon}</AppText>
            )}
          </View>
        )}
      />

      {error && (
        <AppText className="text-red-500 text-[12px] mt-1 ml-1 font-medium">
          {error}
        </AppText>
      )}
    </View>
  );
}
