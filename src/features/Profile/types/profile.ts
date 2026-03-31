import { ReactNode } from "react";

export interface SettingsItem {
  icon: ReactNode;
  iconBg?: string;
  title: string;
  subtitle?: string;
  rightElement?: ReactNode;
  isLast?: boolean;
}

export type SettingsSectionType = "account" | "preferences" | "support";

export interface SettingsSectionData {
  title: string;
  items: SettingsItem[];
}
