import type { ThemeColors } from "@/src/constants/Colors";
import type { NotificationTone, NotificationType } from "../types";

export const withOpacity = (hexColor: string, opacity: number) => {
  const normalized = hexColor.replace("#", "");
  const fullHex =
    normalized.length === 3
      ? normalized.split("").map((v) => `${v}${v}`).join("")
      : normalized;

  const color = parseInt(fullHex, 16);
  const r = (color >> 16) & 255;
  const g = (color >> 8) & 255;
  const b = color & 255;

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const getNotificationTone = (
  type: NotificationType,
  colors: ThemeColors,
  isDark: boolean,
): NotificationTone => {
  const accent =
    type === "income"
      ? colors.success
      : type === "expense"
        ? colors.danger
        : type === "warning"
          ? colors.warning
          : colors.brandMain;

  return {
    accent,
    icon:
      type === "income"
        ? "arrow.up"
        : type === "expense"
          ? "arrow.down"
        : type === "warning"
          ? "exclamationmark.triangle.fill"
          : "shield.fill",

    iconBackground: withOpacity(accent, isDark ? 0.2 : 0.12),
    unreadBackground: withOpacity(accent, isDark ? 0.18 : 0.08),
    unreadBorder: withOpacity(accent, isDark ? 0.38 : 0.18),
    timeBackground: withOpacity(accent, isDark ? 0.16 : 0.1),
  };
};
