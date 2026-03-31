import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";

export default function ProfileCard() {
  return (
    <View className="bg-surface-card rounded-3xl p-6 mb-8 items-center">
      <View className="relative mb-4">
        <View className="w-18 h-18 rounded-full bg-brand-bg-medium items-center justify-center">
          <IconSymbol name="person.fill" size={24} color="#283593" />
        </View>

        <TouchableOpacity
         activeOpacity={0.9}
         accessibilityRole="button"
         className="absolute bottom-0 right-0 bg-brand-indigo w-8 h-8 rounded-full items-center justify-center border-2 border-surface-card">
          <Ionicons name="camera" size={14} color="#FFF" />
        </TouchableOpacity>
      </View>

      <AppText className="text-xl mb-1">Nego</AppText>
      <AppText className="text-text-secondary text-sm mb-6">
        nego@example.com
      </AppText>

      <TouchableOpacity
       activeOpacity={0.9}
       accessibilityRole="button"
       className="bg-brand-indigo w-full py-4 rounded-full items-center">
        <AppText className="text-text-inverse font-bold">Edit Profile</AppText>
      </TouchableOpacity>
    </View>
  );
}
