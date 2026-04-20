import { ExpoConfig, ConfigContext } from "expo/config";

// These are public/anon keys — safe to embed in client code.
// They only allow access that your Supabase RLS policies permit.
const SUPABASE_URL =
  process.env.EXPO_PUBLIC_SUPABASE_URL ??
  "https://zchiwlnvmieybibzgoaf.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
  "sb_publishable_l12DXFoU5AYfMD85QnLF0w_N6Xh-y9R";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Fintrack",
  slug: "fintrack-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/app-icon.png",
  scheme: "fintrack",
  userInterfaceStyle: "automatic",
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
    },
    predictiveBackGestureEnabled: false,
    package: "com.ugonnaya.fintrackapp",
  },
  web: {
    output: "static" as const,
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash.icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#ffffff",
        },
      },
    ],
    [
      "expo-font",
      {
        fonts: [
          "./assets/fonts/Lato-Black.ttf",
          "./assets/fonts/RobotoCondensed-Italic-VariableFont_wght.ttf",
          "./assets/fonts/Lato-BlackItalic.ttf",
          "./assets/fonts/Lato-Regular.ttf",
          "./assets/fonts/RobotoCondensed-VariableFont_wght.ttf",
        ],
      },
    ],
    "expo-secure-store",
    [
      "expo-image-picker",
      {
        photosPermission:
          "Allow Fintrack app to access your photos to let you update your profile picture.",
        cameraPermission:
          "Allow Fintrack app to access your camera to let you take a new profile picture.",
        colors: {
          cropToolbarColor: "#000000",
        },
        dark: {
          colors: {
            cropToolbarColor: "#000000",
          },
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    router: {},
    eas: {
      projectId: "bc878625-a051-4a57-866b-0ee39c5e4756",
    },
    // Expose Supabase config through expo-constants
    supabaseUrl: SUPABASE_URL,
    supabaseAnonKey: SUPABASE_ANON_KEY,
  },
  owner: "ugonnaya",
});
