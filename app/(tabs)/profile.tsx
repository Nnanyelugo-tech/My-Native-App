import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const {top} = useSafeAreaInsets();

  return (
    <View className="flex-1 items-center justify-center" style={
      { paddingTop: top + 10}}>
      <Text className="text-2xl font-bold  text-center">
        Profile Screen
      </Text>

      <Text className="mt-4 text-red-400 text-center px-4 "
        style={{
          fontFamily: "RobotoCondensed-Italic-VariableFont_wght",
        }}>
          Welcome to the Profile Screen! 
          This is where you can discover new content and features of our app. 
          Explore the tabs below to navigate through different sections and find out more.
        </Text>
    </View>
  )
}