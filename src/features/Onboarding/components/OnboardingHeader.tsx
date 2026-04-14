import { AppText } from "@/src/components/Global/AppText";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

type Props = {
  isLastSlide: boolean;
  onSkip: () => void;
  onBack: () => void;
};

export default function OnboardingHeader({
  isLastSlide,
  onSkip,
  onBack,
}: Props) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  if (!isLastSlide) {
    return (
      <View className="flex-row justify-end px-6 pt-4">
        <TouchableOpacity
          activeOpacity={0.9}
          accessibilityRole="button"
          onPress={onSkip}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <AppText className="text-brand-main font-bold text-lg">Skip</AppText>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-row items-center justify-between px-6 pt-2 pb-2">
      <TouchableOpacity
        activeOpacity={0.9}
        accessibilityRole="button"
        onPress={onBack}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={28} color={colors.textSecondary} />
      </TouchableOpacity>
      <AppText className="text-xl font-bold text-text-primary">Fintrack</AppText>
      <View style={{ width: 28 }} />
    </View>
  );
}
