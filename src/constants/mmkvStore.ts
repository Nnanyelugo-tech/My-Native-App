// Defines constants for MMKV storage.
import { createMMKV } from "react-native-mmkv";

export const storage = createMMKV({ id: "myAppStorage" });

export const MMKV_KEYS = {
  // track if user has seen welcome screen
  IS_NEW_USER: "isNewUser",
  // stores auth token after login
  USER_TOKEN: "userToken",
} as const;
