import React from "react";
import { View, ScrollView, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  scrollable?: boolean;
}

export default function ScreenContainer({
  children,
  className = "",
  style,
  scrollable = false,
}: ScreenContainerProps) {
  const { top, bottom } = useSafeAreaInsets();

  const containerStyle = [
    { paddingTop: top + 10, paddingBottom: bottom + 10 },
    style,
  ];

  if (scrollable) {
    return (
      <ScrollView
        className={`flex-1 bg-surface-main ${className}`}
        style={containerStyle}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      className={`flex-1 bg-surface-main ${className}`}
      style={containerStyle}
    >
      {children}
    </View>
  );
}