import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2F2E7E",
        tabBarInactiveTintColor: "#9E9E9E",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="history" color={color} />
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
              <View className="w-[55px] h-[55px] rounded-full bg-[#1E1E5F] items-center justify-center border-4 border-white shadow-2xl">
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
            <IconSymbol size={30} name="bar-chart.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={30} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
