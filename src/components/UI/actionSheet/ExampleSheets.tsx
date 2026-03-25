import React from "react";
import { Pressable, Text, View } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";

export const ExampleSheet = () => {
  const handleClose = () => {
    SheetManager.hide("example-sheet");
  };

  return (
    <ActionSheet id="example-sheet" gestureEnabled closable={false}>
      <View className="w-full px-3 pb-4 pt-3">
        <View className="bg-white dark:bg-black rounded-2xl p-6 items-center border-t border-gray-200 dark:border-gray-800">
          <Text className="text-2xl font-bold text-black dark:text-white">
            Example Sheet
          </Text>

          <Text className="text-base text-gray-600 dark:text-gray-400 mt-2 text-center">
            This is an example sheet
          </Text>

          <Pressable
            onPress={handleClose}
            className="bg-blue-500 dark:bg-blue-600 px-6 py-3 rounded-lg mt-6 w-full items-center"
          >
            <Text className="text-white font-bold text-base">Close</Text>
          </Pressable>
        </View>
      </View>
    </ActionSheet>
  );
};