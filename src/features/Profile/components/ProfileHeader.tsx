import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";

export default function ProfileHeader() {
  return (
    <View className="flex-row items-center justify-between py-2 px-4 bg-surface-main">
      <AppText className="text-[20px]" style={{ fontWeight: "700" }}>
        Settings
      </AppText>

      <TouchableOpacity
       activeOpacity={0.9}
       accessibilityRole="button"
       className="p-2">
        <IconSymbol name="magnifyingglass" size={24} color="#1A1A2E" />
      </TouchableOpacity>
    </View>
  );
}