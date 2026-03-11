import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
} & TextInputProps;

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
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className="mb-4 w-full">
      <Text className="text-sm font-medium text-gray-600 mb-1.5 ml-1">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={{required: true}}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            className={`flex-row items-center border rounded-2xl px-4 bg-gray-50/50 ${
              error ? "border-red-500" : "border-gray-200"
            }`}
          >
            {leftIcon && <View className="mr-3">{leftIcon}</View>}

            <TextInput
              value={value as string}
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
              rightIcon &&
              <Text className="ml-2">{rightIcon}</Text>
            )}
          </View>
        )}
      />

      {error && (
        <Text className="text-red-500 text-[12px] mt-1 ml-1 font-medium">
          {error}
        </Text>
      )}
    </View>
  );
}
