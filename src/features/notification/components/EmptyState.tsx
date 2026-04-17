import { View } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export const EmptyState = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      className="mt-16 items-center rounded-3xl border border-dashed px-6 py-12"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
      }}
    >
      <AppText
        className="text-base font-extrabold"
        style={{ color: colors.text }}
      >
        You&rsquo;re all caught up
      </AppText>
      <AppText
        className="mt-2 text-center text-sm leading-5"
        style={{ color: colors.textMuted }}
      >
        New alerts will appear here when there is fresh activity.
      </AppText>
    </View>
  );
};
