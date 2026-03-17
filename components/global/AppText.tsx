import { StyleProp, Text, TextStyle } from "react-native";

interface IAppText {
  children: React.ReactNode;
  className?: string;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "tail" | "middle" | "clip";
  style?: StyleProp<TextStyle>;
  fontFamily?: string;
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
      className={`text-gray-900 font-lato-bold ${className}`}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={numberOfLines}
      style={style}
    >
      {children}
    </Text>
  );
};
