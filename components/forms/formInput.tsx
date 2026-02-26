import React from "react";
import { View, Text, TextInput, TextInputProps } from "react-native";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
} & TextInputProps;

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  error,
  ...inputProps
}: FormInputProps<T>) {
  return (
    <View className="mb-4 w-full">
      <Text className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value as string}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholderTextColor="#9CA3AF"
            className={`border rounded-xl px-4 py-3 text-black ${
              error ? "border-red-500" : "border-gray-400"
            }`}
            {...inputProps}
          />
        )}
      />

      {error && (
        <Text className="text-red-500 text-sm mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}

