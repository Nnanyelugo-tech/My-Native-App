import React from 'react'
import { Pressable, Text, View } from 'react-native'
import ActionSheet, { SheetManager } from 'react-native-actions-sheet'


export const ExampleSheet = () => {
 const handleClose = () => {
    SheetManager.hide('example-sheet')   
 }


    return (
        <ActionSheet id='example-sheet' gestureEnabled={true} closable={false}>   
            <View className='py-4 px-8 bg-white dark:bg-black rounded-lg items-center
            justify-center border-t-2 border-gray-200 dark:border-gray-800'>
                <Text className='text-2xl font-bold text-black dark:text-white'>
                Example Sheet
                </Text>
                <Text className='text-base text-gray-600 dark:text-gray-400'>
                This is an example sheet
                </Text>

                <Pressable onPress={handleClose} 
                className='bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg items-center justify-center'>

                    <Text className='text-white font-bold text-base'>Close</Text>
                </Pressable>
            </View>
        </ActionSheet>
    )
}