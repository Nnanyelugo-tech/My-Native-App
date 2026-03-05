import { Pressable, Text, View, BackHandler } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { storage, MMKV_KEYS } from "@/constants/mmkvStore";
import { useCallback } from "react";
import ScreenWrapper from "@/components/global/ScreenWrapper";


export default function WelcomeScreen() {
  const {replace} = useRouter();

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        // block back
        () => true 
      );

      return () => subscription.remove();
    }, [])
  );

  const handleContinue = () => {
    storage.set(MMKV_KEYS.IS_NEW_USER, "true");
    replace("./auth/register"); 
  };

  return (
    <ScreenWrapper>
    <View className="flex-1 justify-center items-center px-6">
      <Text className="text-2xl text-center text-black font-semibold">
        Welcome to my App
      </Text>
      <Pressable
        className="mt-8 bg-blue-600 py-3 px-6 rounded-lg"
        onPress={handleContinue}
      >
        <Text className="text-white text-lg font-semibold">Get Started</Text>
      </Pressable>
    </View>
    </ScreenWrapper>
  );
}