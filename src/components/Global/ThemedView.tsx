
// import { View, ViewProps } from "react-native";
// import { useThemeColor } from "@/src/hooks/useThemeColor";

// type Props = ViewProps & {
//   lightColor?: string;
//   darkColor?: string;
// };

// export function ThemedView({
//   style,
//   lightColor,
//   darkColor,
//   ...props
// }: Props) {
//   const backgroundColor = useThemeColor(
//     { light: lightColor, dark: darkColor },
//     "background"
//   );

//   return <View style={[{ backgroundColor }, style]} {...props} />;
// }