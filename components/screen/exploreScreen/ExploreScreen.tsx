import ScreenWrapper from "@/components/global/ScreenWrapper";
import { View, Text } from "react-native";
import { SheetManager } from "react-native-actions-sheet";
import { magicModal } from "react-native-magic-modal";
import { ExampleModal } from "@/components/ui/modals/ExampleModals";
import Toast from "react-native-toast-message";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { AppButton } from "@/components/ui/AppButton";

export function ExploreScreen() {
  const handleOpenSheet = () => {
    SheetManager.show("example-sheet");
  };

  const handleOpenModal = () => {
    magicModal.show(ExampleModal);
  };

  const handleOpenToast = () => {
    Toast.show({
      type: "info",
      text1: "Hello",
      text2: "This is a toast info",
      position: "top",
      visibilityTime: 3000,
      props: {
        icon: <IconSymbol name="xmark" size={20} color="red" />,
        onClose: () => Toast.hide(),
      },
    });
  };

  return (
    <ScreenWrapper>
      <View className="max-w-md">
        <Text className="text-2xl font-bold text-center">Explore Screen</Text>

        <Text className="mt-4 text-red-400 text-center px-4 font-roboto">
          Welcome to the Explore Screen! This is where you can discover new
          content and features of our app.
        </Text>

        <AppButton
          title="Open Sheet"
          onPress={handleOpenSheet}
          className="mt-4"
        />

        <AppButton
          title="Open Modal"
          onPress={handleOpenModal}
          className="mt-4"
        />

        <AppButton
          title="Open Toast"
          onPress={handleOpenToast}
          className="mt-4"
        />
      </View>
    </ScreenWrapper>
  );
}
