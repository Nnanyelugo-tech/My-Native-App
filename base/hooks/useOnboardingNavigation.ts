import { useRouter } from "expo-router";

export const useOnboardingNavigation = () => {
  const { replace } = useRouter();

  const goToRegister = () => replace("/auth/register");
  const goToLogin = () => replace("/auth/login");

  return { goToRegister, goToLogin };
};