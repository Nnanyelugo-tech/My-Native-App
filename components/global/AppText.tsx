import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface IAppText {
  children: React.ReactNode;
  className?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "tail" | "middle" | "clip";
  style?: StyleProp<TextStyle>;
}

export const AppText = ({
  children,
  className,
  numberOfLines,
  ellipsizeMode,
  style,
}: IAppText) => {
  return (
    <Text
      className={`text-text-primary font-lato ${className}`}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={style}
    >
      {children}
    </Text>
  );
};
