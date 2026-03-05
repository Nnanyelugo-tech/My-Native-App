import React from "react";
import { Pressable, Text } from "react-native";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
};

export function AppButton({ title, onPress, className }: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-blue-500 px-5 py-2.5 rounded-lg self-center ${className}`}
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}