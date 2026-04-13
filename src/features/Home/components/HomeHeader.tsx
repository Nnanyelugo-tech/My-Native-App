import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { greet } from "@/src/utils/greet";
import { Pressable, TouchableOpacity, View } from "react-native";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { Image } from "expo-image";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { useState, useEffect } from "react";
import { router } from "expo-router";


export const HomeHeader = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const {push} = router;
  const { profile, user, avatarUrl } = useAuthContext();
  const [imageError, setImageError] = useState(false);
  
  const displayName = profile?.full_name || user?.user_metadata?.full_name || "User";
  const firstName = displayName.split(" ")[0];

  useEffect(() => {
    setImageError(false);
  }, [avatarUrl]);

  return (
    <View className="px-5 flex-row items-center pb-3 justify-between">
      <View className="flex-row items-center">
        <Pressable onPress={() => push("/profile/edit")}>

        <View className="w-11 h-11 rounded-full bg-brand-bg-medium items-center justify-center mr-3 overflow-hidden">
          {avatarUrl && !imageError ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
              onError={() => setImageError(true)}
            />
          ) : (
            <IconSymbol name="person.fill" size={20} color={colors.brandIndigo} />
          )}
        </View>
        </Pressable>
        <View>
          <AppText className="text-text-muted text-xs font-roboto">
            Welcome back,
          </AppText>
          <AppText className="text-text-primary text-sm font-extrabold">
            {greet()}, {firstName}
          </AppText>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        accessibilityRole="button"
        className="w-11 h-11 rounded-full bg-brand-bg-light items-center justify-center shadow-sm"
      >
        <IconSymbol name="bell.fill" size={20} color={colors.brandMain} />
      </TouchableOpacity>
    </View>
  );
};
