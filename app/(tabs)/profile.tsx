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
    </View>
  )
}