import React from "react";
import { ActivityIndicator, Platform } from "react-native";

interface Props {
  size?: number | "small" | "large";
  color?: string;
  thickness?: number;
}

export const AnimatedSpinner = ({
  size = "small",
  color = "#FFFFFF",
}: Props) => {
  const indicatorSize =
    Platform.OS === "ios" && typeof size === "number"
      ? size > 30
        ? "large"
        : "small"
      : size;

  return <ActivityIndicator size={indicatorSize} color={color} />;
};
