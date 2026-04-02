import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { supabase } from "@/src/lib/supabase";
import { Alert } from "react-native";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";

export const useAvatar = () => {
  const { user } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user ? `${supabase.storage.from("profile-pics").getPublicUrl(`avatars/${user.id}.png`).data.publicUrl}?t=${new Date().getTime()}` : null
  );

  const uploadAvatar = async () => {
    if (!user) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) {
        return;
      }

      setIsUploading(true);
      const uri = result.assets[0].uri;
      
      const res = await fetch(uri);
      const blob = await res.blob();
      
      const filePath = `avatars/${user.id}.png`;

      const { error } = await supabase.storage
        .from("profile-pics")
        .upload(filePath, blob, { 
            upsert: true,
            contentType: 'image/png' 
        });

      if (error) {
        throw error;
      }

      const { data } = supabase.storage
        .from("profile-pics")
        .getPublicUrl(filePath);

      setAvatarUrl(`${data.publicUrl}?t=${new Date().getTime()}`);
    } catch (error: any) {
      Alert.alert("Upload Failed", error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    avatarUrl,
    isUploading,
    uploadAvatar,
  };
};
