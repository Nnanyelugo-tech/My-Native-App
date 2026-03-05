import React from "react";
import { View, Text, Pressable } from "react-native";
import { useMagicModal } from "react-native-magic-modal";

export function ExampleModal() {
  const { hide } = useMagicModal();

  return (
    <View className="w-full px-6">
      <View className="bg-white dark:bg-black rounded-xl p-6 items-center justify-center">
        <Text className="text-2xl font-bold text-black dark:text-white">
          Example Modal
        </Text>

        <Text className="text-base text-gray-600 dark:text-gray-400 mt-2 text-center">
          This is an example modal
        </Text>

        <Pressable
          onPress={() => hide()}
          className="bg-blue-500 dark:bg-blue-600 px-6 py-3 rounded-lg mt-6"
        >
          <Text className="text-white font-bold text-base">Close</Text>
        </Pressable>
      </View>
    </View>
  );
}