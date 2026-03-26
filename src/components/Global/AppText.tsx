import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";

interface IAppText {
  children: React.ReactNode;
  className?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "tail" | "middle" | "clip";
  style?: StyleProp<TextStyle>;
  adjustsFontSizeToFit?: boolean;
  selectable?: boolean;
  allowFontScaling?: boolean;
}

export const AppText = ({
  children,
  className,
  numberOfLines,
  ellipsizeMode,
  style,
  adjustsFontSizeToFit,
  selectable,
  allowFontScaling,
}: IAppText) => {
  return (
    <Text
      className={`text-text-primary font-lato ${className}`}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={style}
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      selectable={selectable}
      allowFontScaling={allowFontScaling}
    >
      {children}
    </Text>
  );
};
