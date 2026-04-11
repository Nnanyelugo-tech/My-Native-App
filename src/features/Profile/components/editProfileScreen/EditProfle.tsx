import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { useAuthContext } from "@/src/features/Auth/provider/AuthProvider";
import { Image } from "expo-image";
import { useAvatar } from "../../hook/useAvatar";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { router } from "expo-router";
import ScreenContainer from "@/src/components/Global/ScreenContainer";

export default function EditProfile() {
  const { profile, user } = useAuthContext();
  const { avatarUrl, isUploading, uploadAvatar } = useAvatar();

  const [fullName, setFullName] = useState(
    profile?.full_name || user?.user_metadata?.full_name || "",
  );
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState(profile?.email || user?.email || "");
  const [isSaving, setIsSaving] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [avatarUrl]);

  // Sync state when profile data arrives
  useEffect(() => {
    if (profile?.full_name && !fullName) {
      setFullName(profile.full_name);
    }
    if ((profile?.email || user?.email) && !email) {
      setEmail(profile?.email || user?.email || "");
    }
  }, [profile, user, fullName, email]);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Connect this to Supabase profile updates using profile hook
    setTimeout(() => {
      setIsSaving(false);
      router.back();
    }, 1000);
  };

  return (
    <ScreenContainer className="bg-surface-main">
      {/* Header (Sticky) */}
      <View className="flex-row items-center px-4 mt-2 ">
        <TouchableOpacity
          activeOpacity={0.9}
          accessibilityRole="button"
          onPress={() => router.back()}
          className="w-10 h-10 justify-center"
        >
          <IconSymbol name="arrow.left" size={24} color="#1A237E" />
        </TouchableOpacity>
        <View className="flex-1 items-center pr-10">
          <AppText className="text-xl font-bold text-brand-main pr-2">
            Edit Profile
          </AppText>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {/* Profile Card Center */}
        <View className="items-center mt-4 mb-8">
          <View className="relative mb-4">
            <View className="w-20 h-20 rounded-full bg-brand-bg-medium items-center justify-center overflow-hidden">
              {avatarUrl && !imageError ? (
                <Image
                  source={{ uri: avatarUrl }}
                  style={{ width: "100%", height: "100%" }}
                  contentFit="cover"
                  transition={200}
                  onError={() => setImageError(true)}
                />
              ) : (
                <IconSymbol name="person.fill" size={40} color="#283593" />
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
              className="absolute bottom-0 right-0 bg-brand-main w-8 h-8 rounded-full items-center justify-center border-2 border-surface-main"
            >
              <IconSymbol name="pencil" size={14} color="#FFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            onPress={uploadAvatar}
          >
            <AppText className="text-brand-main font-bold text-sm">
              Change Photo
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Form Section */}
        <View className="bg-surface-card mx-4 rounded-3xl p-6">
          <AppText className="text-sm font-bold text-text-muted mb-6">
            Personal Information
          </AppText>

          {/* Full Name */}
          <View className="mb-5">
            <AppText className="text-[10px] font-bold text-text-muted mb-2 tracking-wider">
              FULL NAME
            </AppText>
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor="#9E9E9E"
              editable={false}
              className="bg-brand-bg-light border border-border-subtle rounded-[16px] px-4 py-4 text-text-primary font-lato-regular opacity-70 text-[15px]"
            />
          </View>

          {/* Nickname */}
          <View className="mb-5">
            <AppText className="text-[10px] font-bold text-text-muted mb-2 tracking-wider">
              NICKNAME
            </AppText>
            <View className="flex-row items-center bg-brand-bg-light border border-border-subtle rounded-[16px] px-4 mb-1">
              <TextInput
                value={nickname}
                onChangeText={setNickname}
                placeholder="What should we call you?"
                placeholderTextColor="#9E9E9E"
                className="flex-1 py-4 text-text-primary font-lato-regular text-[15px]"
              />
              <Ionicons name="pencil-outline" size={18} color="#9CA3AF" />
            </View>
            <AppText className="text-[10px] text-text-secondary italic ml-1">
              This name will be used across the app
            </AppText>
          </View>

          {/* Email Address */}
          <View className="mb-5">
            <AppText className="text-[10px] font-bold text-text-muted mb-2 tracking-wider">
              EMAIL ADDRESS
            </AppText>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9E9E9E"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={false}
              className="bg-brand-bg-light border border-border-subtle rounded-[16px] px-4 py-4 text-text-primary font-lato-regular opacity-70 text-[15px]"
            />
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-6 mt-10 mb-4">
          <TouchableOpacity
            onPress={handleSave}
            disabled={isSaving}
            activeOpacity={0.9}
            accessibilityRole="button"
            className="bg-brand-indigo w-full py-[18px] rounded-full items-center mb-6 flex-row justify-center"
          >
            {isSaving ? (
              <AnimatedSpinner color="#FFF" size={24} />
            ) : (
              <AppText className="text-white font-bold text-[14px]">
                Save Changes
              </AppText>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            accessibilityRole="button"
            onPress={() => router.back()}
            className="items-center py-2 mb-8"
          >
            <AppText className="text-brand-indigo font-bold text-[14px]">
              Cancel
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
