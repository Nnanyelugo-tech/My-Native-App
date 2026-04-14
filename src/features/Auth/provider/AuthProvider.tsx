import { Session, supabase, User } from "@/src/lib/supabase";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppState } from "react-native";
import { AuthContext, Profile } from "./useAuthContext";

export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: PropsWithChildren): React.JSX.Element {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let hasInitialized = false;
    console.log("[Auth] Provider Mounted");

    const fetchProfile = async (userId: string, retries = 3) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (data) {
        if (isMounted) setProfile(data);
      } else if (retries > 0 && isMounted) {
        setTimeout(() => fetchProfile(userId, retries - 1), 1000);
      } else {
        console.error("Failed to fetch profile after retries", error);
      }
    };

    const fetchAvatar = async (userId: string) => {
      const { data } = await supabase.storage
        .from("profile-pics")
        .createSignedUrl(`avatars/${userId}.png`, 60 * 60 * 24 * 7);

      if (data?.signedUrl && isMounted) {
        setAvatarUrl(`${data.signedUrl}&t=${new Date().getTime()}`);
      }
    };

    const timeout = setTimeout(() => {
      if (isMounted) {
        setIsLoading((prev) => {
          if (prev) {
            console.warn("[Auth] Fallback timeout triggered");
            return false;
          }
          return prev;
        });
      }
    }, 7000);

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted || hasInitialized) return;
      hasInitialized = true;
      clearTimeout(timeout);
      console.log("[Auth] Initial Session Fetched:", !!data.session);
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        await Promise.all([
          fetchProfile(data.session.user.id),
          fetchAvatar(data.session.user.id),
        ]);
      }
      setIsLoading(false);
      console.log("[Auth] Loading State: false");
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        hasInitialized = true;
        console.log("[Auth] AuthState Changed Event:", event);
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await Promise.all([
            fetchProfile(session.user.id),
            fetchAvatar(session.user.id),
          ]);
        } else {
          setProfile(null);
          setAvatarUrl(null);
        }
        setIsLoading(false);
      },
    );

    const appStateListener = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        console.log("[Auth] App returned to foreground, refreshing session...");
        supabase.auth.refreshSession();
      }
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
      appStateListener.remove();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        isLoggedIn: !!session,
        avatarUrl,
        setAvatarUrl,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
