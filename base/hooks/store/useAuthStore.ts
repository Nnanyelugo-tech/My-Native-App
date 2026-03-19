import { create } from "zustand";
import { storage, MMKV_KEYS } from "@/constants/mmkvStore";

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create a Zustand store for authentication
export const useAuthStore = create<AuthState>((set) => ({
  // Initial state: check if a token already exists in storage
  // !! converts the string (or null) into a boolean
  isAuthenticated: !!storage.getString(MMKV_KEYS.USER_TOKEN),

  login: (token: string) => {
  // Save the token in persistent storage under the key "userToken"
    storage.set(MMKV_KEYS.USER_TOKEN, token);
  // Update the store state to mark the user as authenticated
    set({ isAuthenticated: true });
  },

  logout: () => {
    storage.remove(MMKV_KEYS.USER_TOKEN);
    set({ isAuthenticated: false });
  },
}));