import { useAuthStore } from "@/base/hooks/store/useAuthStore";
import { MMKV_KEYS, storage } from "@/constants/mmkvStore";
import { Redirect } from "expo-router";

export default function Index() {
  const isNewUser = storage.getString(MMKV_KEYS.IS_NEW_USER);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // First time - welcome screen
  if (!isNewUser) {
    return <Redirect href="./onboarding/onboardingScreen" />;
  }

  // Not logged in - login screen
  if (!isAuthenticated) {
    return <Redirect href="./auth/login" />;
  }

  // Logged in - home
  return <Redirect href="./(tabs)/home" />;
}
