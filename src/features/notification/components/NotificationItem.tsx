import { TouchableOpacity, View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { getNotificationTone } from "../utils/notificationUtils";
import type { NotificationItemProps } from "../types";

export const NotificationItem = ({
  item,
  colors,
  isDark,
  onPress,
}: NotificationItemProps) => {
  const tone = getNotificationTone(item.type, colors, isDark);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      className="mb-3 rounded-2xl border p-4"
    >
      <View className="flex-row items-start">
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
        >
          <IconSymbol name={tone.icon} size={18} color={tone.accent} />
        </View>

        <View className="flex-1">
          <AppText
            className="text-sm font-extrabold"
            style={{ color: colors.text }}
          >
            {item.title}
          </AppText>
          <AppText
            className="mt-1 text-xs leading-5"
            style={{ color: colors.textMuted }}
          >
            {item.subtitle}
          </AppText>
        </View>
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <View
          className="rounded-full px-2.5 py-1"
          style={{ backgroundColor: tone.timeBackground }}
        >
          <AppText
            className="text-[11px] font-bold"
            style={{ color: tone.accent }}
          >
            {item.time}
          </AppText>
        </View>

        {!item.read ? (
          <View
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: tone.accent }}
          />
        ) : (
          <AppText className="text-[11px]" style={{ color: colors.textMuted }}>
            Read
          </AppText>
        )}
      </View>
    </TouchableOpacity>
  );
};
