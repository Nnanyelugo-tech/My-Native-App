import { createContext } from "react";
import { Session, User } from "@supabase/supabase-js";

// Type definitions for authentication context.
export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  updated_at: string | null;
};

export type AuthData = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  avatarUrl: string | null;
  setAvatarUrl: (url: string | null) => void;
};

//  Defines the authentication context.
export const AuthContext = createContext<AuthData>({
  session: null,
  user: null,
  profile: null,
  isLoading: true,
  isLoggedIn: false,
  avatarUrl: null,
  setAvatarUrl: () => {},
});
