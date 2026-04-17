import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export default function ProfileHeader() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View className="flex-row items-center justify-between pb-2 px-4 bg-surface-main">
      <AppText className="text-[20px] text-text-primary" style={{ fontWeight: "700" }}>
        Settings
      </AppText>

      <TouchableOpacity
       activeOpacity={0.9}
       accessibilityRole="button"
       className="p-2">
        <IconSymbol name="magnifyingglass" size={24} color={colors.brandMain} />
      </TouchableOpacity>
    </View>
  );
}