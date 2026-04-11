import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export const useAvatar = () => {
  const { user, avatarUrl, setAvatarUrl } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);

  const uploadAvatar = async () => {
    if (!user) return;

    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required to upload an avatar!",
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) {
        return;
      }

      setIsUploading(true);
      const asset = result.assets[0];
      const base64 = asset.base64;

      if (!base64) {
        throw new Error("Could not extract image data. Please try again.");
      }

      const fileData = decode(base64);

      const filePath = `avatars/${user.id}.png`;
      const contentType = asset.mimeType || "image/png";

      const { error } = await supabase.storage
        .from("profile-pics")
        .upload(filePath, fileData, {
          upsert: true,
          contentType,
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      const { data } = await supabase.storage
        .from("profile-pics")
        .createSignedUrl(filePath, 60 * 60 * 24 * 7);

      if (data?.signedUrl) {
        const finalUrl = `${data.signedUrl}&t=${new Date().getTime()}`;
        setAvatarUrl(finalUrl);
      } else {
        throw new Error("Failed to generate signed URL");
      }
    } catch (error: any) {
      console.error("Upload process caught error:", error);
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
