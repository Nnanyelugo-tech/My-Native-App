import { AppText } from "@/src/components/Global/AppText";
import { OnboardingFooterProps } from "@/src/features/Onboarding/types/onboarding";
import { Ionicons } from "@expo/vector-icons";
import * as React from "react";
import { TouchableOpacity, View } from "react-native";
import { Extrapolation, interpolate } from "react-native-reanimated";
import { Pagination } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export default function OnboardingFooter({
  progress,
  data,
  isLastSlide,
  onNext,
  onRegister,
  onPressPagination,
}: OnboardingFooterProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      className="px-8 items-center w-full"
      style={{ paddingBottom: Math.max(insets.bottom + 20, 20) }}
    >
      <View className="mb-6">
        <Pagination.Custom
          progress={progress}
          data={data}
          size={8}
          dotStyle={{
            height: 8,
            width: 8,
            borderRadius: 100,
            backgroundColor: colors.textMuted,
            opacity: 0.3,
          }}
          activeDotStyle={{
            height: 8,
            width: 26,
            borderRadius: 100,
            backgroundColor: colors.brandMain,
          }}
          containerStyle={{
            gap: 6,
            alignItems: "center",
          }}
          horizontal
          onPress={onPressPagination}
          customReanimatedStyle={(progress, index, length) => {
            let val = Math.abs(progress - index);
            if (index === 0 && progress > length - 1) {
              val = Math.abs(progress - length);
            }

            const width = interpolate(
              val,
              [0, 1],
              [26, 8],
              Extrapolation.CLAMP,
            );
            const opacity = interpolate(
              val,
              [0, 1],
              [1, 0.4],
              Extrapolation.CLAMP,
            );

            return { width, opacity };
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={1}
        accessibilityRole="button"
        onPress={isLastSlide ? onRegister : onNext}
        className="bg-brand-main w-full py-3 rounded-[24px] flex-row justify-center items-center"
      >
        <AppText className="text-white text-xl font-bold mr-2">
          {isLastSlide ? "Get Started" : "Next"}
        </AppText>
        <Ionicons
          name={isLastSlide ? "checkmark" : "arrow-forward"}
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
}
