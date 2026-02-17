import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Settings() {
  const {top} = useSafeAreaInsets();
  
  return (
    <View className='pb-4 border-b border-gray-200 dark:border-gray-800'
    style={{
      paddingTop: top + 10
    }}>
      <Text className='text-lg font-semibold'>Settings</Text>
    </View>
  )
}