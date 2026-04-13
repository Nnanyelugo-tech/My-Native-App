import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AppText } from "@/src/components/Global/AppText";
import SettingsRow from "./SettingsRow";
import Divider from "./Divider";
import { Switch, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { SettingsSectionType, SettingsSectionData } from "../types/profile";

interface Props {
  type: SettingsSectionType;
}

export default function SettingsSection({ type }: Props) {
  const { theme, setTheme } = useTheme();
  const sections: Record<SettingsSectionType, SettingsSectionData> = {
    account: {
      title: "Account Settings",
      items: [
        {
          icon: <IconSymbol name="shield.fill" size={18} color="#283593" />,
          iconBg: "bg-brand-bg-light",
          title: "Security & Password",
        },
        {
          icon: <IconSymbol name="bell.fill" size={18} color="#FF9800" />,
          iconBg: "bg-[rgba(255,152,0,0.1)]",
          title: "Notification Settings",
        },
        {
          icon: (
            <IconSymbol
              name="building.columns.fill"
              size={18}
              color="#00E676"
            />
          ),
          iconBg: "bg-[rgba(0,230,118,0.1)]",
          title: "Linked Bank Accounts",
        },
      ],
    },

    preferences: {
      title: "Preferences",
      items: [
        {
          icon: <IconSymbol name="moon.fill" size={18} color="#AB47BC" />,
          iconBg: "bg-[rgba(171,71,188,0.1)]",
          title: "Theme Mode",
          subtitle: "Light / Dark",
          rightElement: (
            <Switch
              value={theme === "dark"}
              onValueChange={(value) => setTheme(value ? "dark" : "light")}
              trackColor={{ false: "#E0E0E0", true: "#283593" }}
            />
          ),
        },
        {
          icon: (
            <IconSymbol
              name="dollarsign.circle.fill"
              size={18}
              color="#FF9800"
            />
          ),
          iconBg: "bg-[rgba(255,152,0,0.1)]",
          title: "Currency",
          subtitle: "USD ($)",
        },
      ],
    },

    support: {
      title: "Support",
      items: [
        {
          icon: <IconSymbol name="questionmark" size={18} color="#555" />,
          iconBg: "bg-surface-main",
          title: "Help Center",
        },
        {
          icon: <IconSymbol name="shield.fill" size={18} color="#555" />,
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

      <View className="bg-surface-card rounded-3xl py-2 mb-8">
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
