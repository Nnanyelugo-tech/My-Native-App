import { Sheets } from "@/src/components/UI/actionSheet/Sheets";
import { ToastMessage } from "@/src/components/UI/ToastMessage/ToastMessage";
import AuthProvider from "@/src/features/Auth/provider/AuthProvider";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { createMMKV } from "react-native-mmkv";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider, useTheme } from "@/src/components/Global/ThemeContext";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MagicModalPortal } from "react-native-magic-modal";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";
import "react-native-reanimated";
import "../global.css";
import { RealtimeSync } from "@/src/components/Global/RealtimeSync";

export const unstable_settings = {
  anchor: "(tabs)",
};

const storage = createMMKV();

const clientStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: (key: string) => {
    storage.remove(key);
  },
};

const persister = createAsyncStoragePersister({
  storage: clientStorage,
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => console.error("Global Query Error:", error),
  }),
  mutationCache: new MutationCache({
    onError: (error) => console.error("Global Mutation Error:", error),
  }),
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

persistQueryClient({
  queryClient,
  persister,
});

function RootContent() {
  const { theme } = useTheme();

  return (
    <View className={`flex-1 ${theme === "dark" ? "dark" : ""} bg-bgColor`}>
      <SafeAreaProvider>
        <AuthProvider>
          <RealtimeSync />
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
        </AuthProvider>

        <MagicModalPortal />
        <ToastMessage />
      </SafeAreaProvider>
    </View>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <RootContent />
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
