import { useRouter } from "expo-router";
import { storage, MMKV_KEYS } from "@/src/constants/mmkvStore";

export const useOnboardingNavigation = () => {
  const { replace } = useRouter();

  const goToRegister = () => {
    storage.set(MMKV_KEYS.IS_NEW_USER, "true");
    replace("/auth/register");
  };

  return { goToRegister };
};