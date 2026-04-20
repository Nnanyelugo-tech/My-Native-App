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
      activeOpacity={0.9}
      accessibilityRole="button"
      className="bg-surface-card rounded-3xl px-4 py-3.5 mb-3 flex-row items-center"
    >
      <View
        className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
        style={{ backgroundColor: tone.timeBackground }}
      >
        <IconSymbol name={tone.icon} size={22} color={tone.accent} />
      </View>

      <View className="flex-1 mr-3">
        <AppText className="text-[15px] text-text-primary font-semibold">
          {item.title}
        </AppText>
        <AppText className="text-[11px] font-lato-regular mt-0.5 text-text-secondary">
          {item.subtitle} • {item.time}
        </AppText>
      </View>

      {!item.read ? (
        <View
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: tone.accent }}
        />
      ) : (
        <AppText className="text-[11px] text-text-secondary">Read</AppText>
      )}
    </TouchableOpacity>
  );
};
// export const NotificationItem = ({
//   item,
//   colors,
//   isDark,
//   onPress,
// }: NotificationItemProps) => {
//   const tone = getNotificationTone(item.type, colors, isDark);

//   return (
//     <TouchableOpacity
//       onPress={onPress}
//       activeOpacity={0.9}
//       accessibilityRole="button"
//       className="bg-surface-card rounded-3xl px-4 py-3.5 mb-3 flex-row items-center"
//     >
//       <View className="flex-row items-start">
//         <View
//           className="w-12 h-12 rounded-2xl items-center justify-center mr-3"
//           style={{ backgroundColor: tone.timeBackground }}
//         >
//           <IconSymbol name={tone.icon} size={22} color={tone.accent} />
//         </View>

//         <View className="flex-1 mr-3">
//           <AppText
//             className="text-[15px] text-text-primary font-semibold"
//             style={{ color: colors.text }}
//           >
//             {item.title}
//           </AppText>
//           <AppText
//             className="mt-1 text-xs leading-5"
//             style={{ color: colors.textMuted }}
//           >
//             {item.subtitle} • {item.time}
//           </AppText>
//         </View>
//       </View>

//       <View className="mt-3 flex-row items-center justify-between">
//         <View
//           className="h-2.5 w-2.5 rounded-full"
//           style={{ backgroundColor: tone.accent }}
//         />

//         {!item.read ? (
//           <View
//             className="h-2.5 w-2.5 rounded-full"
//             style={{ backgroundColor: tone.accent }}
//           />
//         ) : (
//           <AppText className="text-[11px] text-text-secondary">
//             Read
//           </AppText>
//         )}
//       </View>
//     </TouchableOpacity>
//   );
// };
