import { ScrollView, TouchableOpacity, View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { withOpacity } from "../utils/notificationUtils";
import type { NotificationFilter, NotificationTabsProps } from "../types";

const tabs: NotificationFilter[] = [
  "all",
  "income",
  "expense",
  "warning",
  "security",
];

export const NotificationTabs = ({
  activeTab,
  setActiveTab,
  colors,
  isDark,
}: NotificationTabsProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-5"
      contentContainerStyle={{ paddingRight: 8 }}
    >
      <View className="flex-row">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="mr-2 rounded-full border px-4 py-2"
              style={{
                backgroundColor: isActive
                  ? withOpacity(colors.brandMain, isDark ? 0.26 : 0.1)
                  : colors.surface,
                borderColor: isActive
                  ? withOpacity(colors.brandMain, isDark ? 0.45 : 0.18)
                  : colors.border,
              }}
            >
              <AppText
                className="capitalize text-sm font-extrabold"
                style={{
                  color: isActive ? colors.brandMain : colors.textMuted,
                }}
              >
                {tab}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
