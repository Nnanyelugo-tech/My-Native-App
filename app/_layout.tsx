import { Sheets } from "@/src/components/UI/actionSheet/Sheets";
import { ToastMessage } from "@/src/components/UI/ToastMessage/ToastMessage";
import AuthProvider, {
  useAuthContext,
} from "@/src/features/Auth/provider/AuthProvider";
import { focusManager, useIsRestoring } from "@tanstack/react-query";
import { queryClient, persister } from "@/src/lib/queryClient";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/src/components/Global/ThemeContext";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MagicModalPortal } from "react-native-magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, AppState, AppStateStatus, Platform } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { RealtimeSync } from "@/src/components/Global/RealtimeSync";
import { useEffect, useState } from "react";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";

export const unstable_settings = {
  anchor: "(tabs)",
};

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

function RootContent() {
  const { theme } = useTheme();
  const isRestoring = useIsRestoring();
  const { isLoading: isAuthLoading } = useAuthContext();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);
    return () => subscription.remove();
  }, []);

  const isAppReady = !isRestoring && !isAuthLoading;

  useEffect(() => {
    if (isAppReady) {
      const timeout = setTimeout(() => {
        setShowLoader(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isAppReady]);

  if (showLoader) {
    return (
      <View
        className={`flex-1 ${
          theme === "dark" ? "dark" : ""
        } bg-bgColor items-center justify-center`}
      >
        <AnimatedSpinner size="large" color="#2F2E7E" />
      </View>
    );
  }

  return (
    <View className={`flex-1 ${theme === "dark" ? "dark" : ""} bg-bgColor`}>
      <SafeAreaProvider>
        <RealtimeSync />
        <SheetProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding/onboardingScreen"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="auth/login" options={{ headerShown: false }} />
            <Stack.Screen
              name="auth/register"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/forgot-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/email-sent"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="transaction/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="profile/edit"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>

          <StatusBar style={theme === "dark" ? "light" : "dark"} />

          <Sheets />
        </SheetProvider>
        <MagicModalPortal />
        <ToastMessage />
      </SafeAreaProvider>
    </View>
  );
}

export default function RootLayout() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <AuthProvider>
            <RootContent />
          </AuthProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </PersistQueryClientProvider>
  );
}
