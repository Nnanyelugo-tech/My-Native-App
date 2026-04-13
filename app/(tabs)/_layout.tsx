import { HapticTab } from "@/src/components/Global/HapticTab";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  const colors = Colors[theme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transaction"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="history" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="plus"
        options={{
          tabBarLabel: () => null,
          tabBarButton: ({
            onPress,
            accessibilityState,
          }: BottomTabBarButtonProps) => (
            <TouchableOpacity
              onPress={onPress}
              activeOpacity={1}
              className="items-center justify-center -top-5 h-full"
              accessibilityState={accessibilityState}
            >
              <View
                style={{
                  backgroundColor: colors.brand,
                  borderColor: colors.surface,
                }}
                className="w-[55px] h-[55px] rounded-full items-center justify-center border-4 shadow-2xl"
              >
                <IconSymbol size={32} name="plus.circle.fill" color="#fff" />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Tabs.Screen
        name="budget"
        options={{
          title: "Reports",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="bar-chart.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
