import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MagicModalPortal } from "react-native-magic-modal";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Sheets } from "@/src/components/UI/actionSheet/Sheets";
import { ToastMessage } from "@/src/components/UI/ToastMessage/ToastMessage";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <SheetProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen
                name="onboarding/onboardingScreen"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="auth/login"
                options={{ headerShown: false }}
              />
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
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <StatusBar style="auto" />
            <Sheets />
          </SheetProvider>
          <MagicModalPortal />
          <ToastMessage />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
