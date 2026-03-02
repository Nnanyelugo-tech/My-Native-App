import ScreenWrapper from "@/components/global/ScreenWrapper";
import { View, Text, Pressable } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { magicModal } from "react-native-magic-modal";
import { ExampleModal } from "@/components/ui/modals/ExampleModals";
import Toast from "react-native-toast-message";
import { IconSymbol } from "@/components/ui/icon-symbol";

export function ExploreScreen() {
  const handleOpenSheet = () => {
    SheetManager.show('example-sheet');
  }

  const handleOpenModal = () => {
    magicModal.show(ExampleModal);
  }

  const handleOpenToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is a toast message',
      position: 'top',
      visibilityTime: 3000,
      props: {
        icon: <IconSymbol name="xmark" size={24} color="red" />,
        onclose: () => {
          Toast.hide();
        }
      }
    });
  }
  return (
    <ScreenWrapper>
      <View className="max-w-md">
        <Text className="text-2xl font-bold text-center">Explore Screen</Text>

        <Text className="mt-4 text-red-400 text-center px-4 font-roboto">
          Welcome to the Explore Screen! This is where you can discover new
          content and features of our app. Explore the tabs below to navigate
          through different sections and find out more.
        </Text>

        <Pressable onPress={handleOpenSheet} 
        className="mt-4 bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg items-center justify-center
        ">
          <Text className="text-white font-bold text-base">Open Sheet</Text>
        </Pressable>

        <Pressable onPress={handleOpenModal} 
        className="mt-4 bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg items-center justify-center
        ">
          <Text className="text-white font-bold text-base">Open Modal</Text>
        </Pressable>


        <Pressable onPress={handleOpenToast}
        className="mt-4 bg-blue-500 dark:bg-blue-600 px-4 py-2 rounded-lg items-center justify-center
        ">
          <Text className="text-white font-bold text-base">Open Toast</Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}
