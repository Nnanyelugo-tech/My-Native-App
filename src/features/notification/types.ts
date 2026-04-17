import type { Dispatch, SetStateAction } from "react";
import type { ThemeColors } from "@/src/constants/Colors";
import type { IconSymbolName } from "@/src/components/UI/IconSymbol";

export type NotificationType = "income" | "expense" | "warning" | "security";
export type NotificationFilter = "all" | NotificationType;

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  subtitle: string;
  time: string;
  read: boolean;
}

export interface NotificationTone {
  accent: string;
  icon: IconSymbolName;
  iconBackground: string;
  unreadBackground: string;
  unreadBorder: string;
  timeBackground: string;
}

export interface NotificationItemProps {
  item: Notification;
  colors: ThemeColors;
  isDark: boolean;
  onPress: () => void;
}

export interface NotificationTabsProps {
  activeTab: NotificationFilter;
  setActiveTab: Dispatch<SetStateAction<NotificationFilter>>;
  colors: ThemeColors;
  isDark: boolean;
}
