import { ScrollView, View } from "react-native";
import { Stack } from "expo-router";
import { AppText } from "@/src/components/Global/AppText";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

import { useNotifications } from "../hooks/useNotifications";
import { NotificationTabs } from "./NotificationTabs";
import { NotificationItem } from "./NotificationItem";
import { EmptyState } from "./EmptyState";
export default function NotificationsScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const { filtered, activeTab, setActiveTab, markAsRead } = useNotifications();

  return (
    <View className="flex-1 bg-surface-main">
      <Stack.Screen
        options={{
          title: "Notifications",
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-5">
          <View className="mb-6">
            <AppText className="text-[24px] font-extrabold text-text-primary">
              Stay In Sync
            </AppText>
            <AppText className="mt-1 text-sm leading-5 text-text-secondary">
              Alerts, security updates and spending nudges in one place.
            </AppText>
          </View>

          <NotificationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            colors={colors}
            isDark={isDark}
          />

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                colors={colors}
                isDark={isDark}
                onPress={() => markAsRead(item.id)}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
