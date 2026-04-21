import { queryClient } from "@/src/lib/queryClient";
import { Session, supabase, User } from "@/src/lib/supabase";
import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
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
  const initRef = useRef(false);

  useEffect(() => {
    let isMounted = true;

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
      const tryPaths = [`${userId}.png`, `avatars/${userId}.png`];

      for (const path of tryPaths) {
        try {
          const { data, error } = await supabase.storage
            .from("profile-pics")
            .createSignedUrl(path, 60 * 60 * 24 * 7);

          if (error) {
            console.debug(
              `[Auth] createSignedUrl error for ${path}:`,
              error.message || error,
            );
            continue;
          }

          if (data?.signedUrl && isMounted) {
            setAvatarUrl(`${data.signedUrl}&t=${new Date().getTime()}`);
            return;
          }
        } catch (e) {
          console.debug(
            `[Auth] Unexpected error while fetching avatar for ${path}:`,
            e,
          );
        }
      }
    };

    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;

      const session = data.session;

      if (session?.user && !initRef.current) {
        initRef.current = true;
        setSession(session);
        setUser(session.user);
        await Promise.all([
          fetchProfile(session.user.id),
          fetchAvatar(session.user.id),
        ]);
      }

      if (isMounted) setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;

        if (event === "SIGNED_OUT") {
          setSession(null);
          setUser(null);
          setProfile(null);
          setAvatarUrl(null);
          initRef.current = false;
          setIsLoading(true);
          queryClient.clear();
          return;
        }

        if (session?.user && !initRef.current) {
          initRef.current = true;
          setSession(session);
          setUser(session.user);
          await Promise.all([
            fetchProfile(session.user.id),
            fetchAvatar(session.user.id),
          ]);
        } else if (!session) {
          setSession(null);
          setUser(null);
          setProfile(null);
          setAvatarUrl(null);
          initRef.current = false;
        }

        setIsLoading(false);
      },
    );

    // App state listener
    const appStateListener = AppState.addEventListener(
      "change",
      (nextAppState) => {
        if (nextAppState === "active") {
          supabase.auth.refreshSession();
        }
      },
    );
 
    // Cleanup
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
