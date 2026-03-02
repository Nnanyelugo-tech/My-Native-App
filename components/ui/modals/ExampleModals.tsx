import React from "react";
import { View, Text, Pressable } from "react-native";
import { useMagicModal } from "react-native-magic-modal";

export function ExampleModal() {
    const { hide} = useMagicModal();
    return (
        <View className="bg-white dark:bg-black rounded-lg items-center justify-center">
            <Text className="text-2xl font-bold text-black dark:text-white">
            Example Modal
            </Text>
            <Text className="text-base text-gray-600 dark:text-gray-400">
                This is an example modal
            </Text>
            <Pressable  onPress={() => hide()} 
            className="bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg items-center justify-center">
                <Text className="text-white font-bold text-base">Close</Text>
            </Pressable>
        </View>
    );  
}
