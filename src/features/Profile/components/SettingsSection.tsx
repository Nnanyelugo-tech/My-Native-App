import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";
import SettingsRow from "./SettingsRow";
import Divider from "./Divider";
import { Switch, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { SettingsSectionType, SettingsSectionData } from "../types/profile";

interface Props {
  type: SettingsSectionType;
}

export default function SettingsSection({ type }: Props) {
  const { theme, setTheme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const sections: Record<SettingsSectionType, SettingsSectionData> = {
    account: {
      title: "Account Settings",
      items: [
        {
          icon: <IconSymbol name="shield.fill" size={18} color={colors.brandMain} />,
          iconBg: isDark ? "bg-brand-bg-medium" : "bg-bgColor",
          title: "Security & Password",
        },
        {
          icon: <IconSymbol name="bell.fill" size={18} color={colors.warning} />,
          iconBg: isDark ? "bg-warning-bg" : "bg-warning-bg/50",
          title: "Notification Settings",
        },
        {
          icon: (
            <IconSymbol
              name="building.columns.fill"
              size={18}
              color={colors.success}
            />
          ),
          iconBg: isDark ? "bg-success-bg" : "bg-success-bg/50",
          title: "Linked Bank Accounts",
        },
      ],
    },

    preferences: {
      title: "Preferences",
      items: [
        {
          icon: <IconSymbol name="moon.fill" size={18} color={colors.chartPurple} />,
          iconBg: isDark ? "bg-chart-purple/20" : "bg-chart-purple/10",
          title: "Theme Mode",
          subtitle: "Light / Dark",
          rightElement: (
            <Switch
              value={isDark}
              onValueChange={(value) => setTheme(value ? "dark" : "light")}
              trackColor={{ false: colors.border, true: colors.brandMain }}
              thumbColor={isDark ? colors.brandMain : "#f4f3f4"}
            />
          ),
        },
        {
          icon: (
            <IconSymbol
              name="dollarsign.circle.fill"
              size={18}
              color={colors.warning}
            />
          ),
          iconBg: isDark ? "bg-warning-bg" : "bg-warning-bg/50",
          title: "Currency",
          subtitle: "USD ($)",
        },
      ],
    },

    support: {
      title: "Support",
      items: [
        {
          icon: <IconSymbol name="questionmark" size={18} color={colors.textSecondary} />,
          iconBg: "bg-surface-main",
          title: "Help Center",
        },
        {
          icon: <IconSymbol name="shield.fill" size={18} color={colors.textSecondary} />,
          iconBg: "bg-surface-main",
          title: "Privacy Policy",
        },
      ],
    },
  };

  const section = sections[type];

  return (
    <>
      <AppText className="text-text-secondary text-xs uppercase font-bold mb-3 tracking-widest px-2">
        {section.title}
      </AppText>

      <View className="bg-surface-card rounded-3xl py-2 mb-8 shadow-sm border border-border-subtle">
        {section.items.map((item, index) => (
          <View key={index}>
            <SettingsRow {...item} />
            {index !== section.items.length - 1 && <Divider />}
          </View>
        ))}
      </View>
    </>
  );
}
