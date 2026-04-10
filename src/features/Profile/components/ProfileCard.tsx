import { View, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { Image } from "expo-image";
import { useAvatar } from "../hook/useAvatar";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { useState, useEffect } from "react";

export default function ProfileCard() {
  const { profile, user } = useAuthContext();
  const { avatarUrl, isUploading, uploadAvatar } = useAvatar();
  const [imageError, setImageError] = useState(false);

  // Reset error state when avatarUrl changes
  useEffect(() => {
    setImageError(false);
  }, [avatarUrl]);

  return (
    <View className="bg-surface-card rounded-3xl p-6 mb-8 items-center">
      <View className="relative mb-4">
        <View className="w-20 h-20 rounded-full bg-brand-bg-medium items-center justify-center overflow-hidden">
          {avatarUrl && !imageError ? (
            <Image
              source={{ uri: avatarUrl }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={200}
              cachePolicy="none"
              onError={() => setImageError(true)}
            />
          ) : (
            <IconSymbol name="person.fill" size={32} color="#283593" />
          )}

          {isUploading && (
            <View className="absolute inset-0 bg-black/40 items-center justify-center">
              <AnimatedSpinner size={24} color="#FFF" />
            </View>
          )}
        </View>

        <TouchableOpacity
         activeOpacity={0.9}
         accessibilityRole="button"
         onPress={uploadAvatar}
         disabled={isUploading}
         className="absolute bottom-0 right-0 bg-brand-indigo w-8 h-8 rounded-full items-center justify-center border-2 border-surface-card">
          <Ionicons name="camera" size={14} color="#FFF" />
        </TouchableOpacity>
      </View>

      <AppText className="text-lg mb-1">{profile?.full_name || user?.user_metadata?.full_name || "User"}</AppText>
      <AppText className="text-text-secondary text-sm mb-6">
        {profile?.email || user?.email || ""}
      </AppText>

      <TouchableOpacity
       activeOpacity={0.9}
       accessibilityRole="button"
       onPress={() => router.push("/profile/edit")}
       className="bg-brand-indigo w-full py-4 rounded-full items-center">
        <AppText className="text-text-inverse font-bold">Edit Profile</AppText>
      </TouchableOpacity>
    </View>
  );
}
