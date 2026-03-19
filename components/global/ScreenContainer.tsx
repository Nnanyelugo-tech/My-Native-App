import React from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ScreenContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
  withPadding?: boolean;
}

export default function ScreenContainer({
  children,
  className,
  style,
  withPadding = false,
}: ScreenContainerProps) {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-surface-main ${
        withPadding ? "px-5" : ""
      } ${className}`}
      style={[
        {
          paddingTop: top + 10,
          paddingBottom: bottom + 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}