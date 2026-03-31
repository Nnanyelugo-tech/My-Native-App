import { View, TouchableOpacity } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";
import { SettingsItem } from "../types/profile";

export default function SettingsRow({
  icon,
  iconBg,
  title,
  subtitle,
  rightElement,
}: SettingsItem) {
  return (
    <TouchableOpacity
     activeOpacity={0.9}
     accessibilityRole="button"
     className="flex-row items-center justify-between px-5 py-4">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${iconBg || "bg-surface-main"}`}>
          {icon}
        </View>

        <View>
          <AppText className="text-sm font-bold">{title}</AppText>
          {subtitle && (
            <AppText className="text-xs text-text-secondary mt-0.5">
              {subtitle}
            </AppText>
          )}
        </View>
      </View>

      {rightElement || (
        <IconSymbol name="chevron.right" size={20} color="#9E9E9E" />
      )}
    </TouchableOpacity>
  );
}