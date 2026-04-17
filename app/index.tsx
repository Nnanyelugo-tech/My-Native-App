import { MMKV_KEYS, storage } from "@/src/constants/mmkvStore";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {
  const hasSeenOnboarding = storage.getString(MMKV_KEYS.IS_NEW_USER);
  const { isLoggedIn, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surface-main">
        <AnimatedSpinner size="large" color="#2F2E7E" />
      </View>
    );
  }

  // First time - welcome screen
  if (!hasSeenOnboarding) {
    return <Redirect href="./onboarding/onboardingScreen" />;
  }

  // Not logged in - login screen
  if (!isLoggedIn) {
    return <Redirect href="./auth/login" />;
  }

  // Logged in - home
  return <Redirect href="./(tabs)/home" />;
}
