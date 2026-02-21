import ScreenWrapper from "@/components/global/ScreenWrapper";
import { View, Text } from "react-native";

export function ExploreScreen() {
  return (
    <ScreenWrapper>
      <View className="max-w-md">
        <Text className="text-2xl font-bold text-center">Explore Screen</Text>

        <Text className="mt-4 text-red-400 text-center px-4 font-roboto">
          Welcome to the Explore Screen! This is where you can discover new
          content and features of our app. Explore the tabs below to navigate
          through different sections and find out more.
        </Text>
      </View>
    </ScreenWrapper>
  );
}
