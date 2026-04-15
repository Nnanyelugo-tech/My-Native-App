import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { decode } from "base64-arraybuffer";
import { File } from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export const useAvatar = () => {
  const { user, avatarUrl, setAvatarUrl } = useAuthContext();
  const [isUploading, setIsUploading] = useState(false);

  const uploadAvatar = async () => {
    setIsUploading(true);

    if (!user?.id) {
      setIsUploading(false);
      Alert.alert("Not ready", "User session not available yet");
      return;
    }

    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        setIsUploading(false);
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required to upload an avatar!",
        );
        return;
      }

      //Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) {
        setIsUploading(false);
        return;
      }

      const asset = result.assets[0];

      const file = new File(asset.uri);

      const base64 = await file.base64();

      if (!base64) {
        throw new Error("Failed to read image file");
      }

      // Optional: check file size
      const approxBytes = Math.round((base64.length * 3) / 4);
      if (approxBytes > 5 * 1024 * 1024) {
        console.warn(
          `[Avatar] Image is large (~${Math.round(
            approxBytes / 1024,
          )} KB). Consider reducing quality.`,
        );
      }

      // Convert to ArrayBuffer for Supabase
      const fileData = decode(base64);

      const filePath = `${user.id}.png`;
      const contentType = asset.mimeType || "image/png";

      //  Upload
      const { error: uploadError } = await supabase.storage
        .from("profile-pics")
        .upload(filePath, fileData, {
          upsert: true,
          contentType,
        });

      if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        throw uploadError;
      }

      //  Signed URL (with fallback)
      const tryPaths = [filePath, `avatars/${filePath}`];
      let signedUrl: string | null = null;

      for (const path of tryPaths) {
        try {

          const { data, error } = await supabase.storage
            .from("profile-pics")
            .createSignedUrl(path, 60 * 60 * 24 * 7);

          if (error) {
            console.debug(
              `[Avatar] Signed URL error for ${path}:`,
              error.message,
            );
            continue;
          }

          if (data?.signedUrl) {
            signedUrl = `${data.signedUrl}&t=${Date.now()}`;
            break;
          }
        } catch (e) {
          console.debug(`[Avatar] Unexpected error for ${path}:`, e);
        }
      }

      if (!signedUrl) {
        throw new Error("Failed to generate signed URL");
      }

      setAvatarUrl(signedUrl);
    } catch (error: any) {
      console.error("Upload process caught error:", error);
      Alert.alert(
        "Upload Failed",
        error.message || "An unknown error occurred",
      );
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
