import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({ id: "myAppStorage" });

export const MMKV_KEYS = {
  // Flag to track if user has seen welcome screen
  IS_NEW_USER: "isNewUser",
  //  Stores auth token after login
  USER_TOKEN: "userToken",
} as const;
