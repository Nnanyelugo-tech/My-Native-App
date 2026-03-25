import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useOnboardingNavigation } from "@/src/features/Onboarding/hooks/useOnboardingNavigation";
import { onboardingData } from "@/src/constants/onboardingData";
import OnboardingFooter from "./OnboardingFooter";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingSlide from "./OnboardingSlide";
import { useCallback, useState } from "react";

const slides = onboardingData.map((item, index) => ({
  ...item,
  id: index,
  isLast: index === onboardingData.length - 1,
}));

export default function OnboardingCarousel() {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const { goToRegister } = useOnboardingNavigation();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);

  const lastIndex = slides.length - 1;
  const isLastSlide = activeIndex === lastIndex;

  const onPressPagination = useCallback(
    (index: number) => {
      ref.current?.scrollTo({
        count: index - progress.value,
        animated: true,
      });
    },
    [progress],
  );

  const scrollNext = useCallback(() => {
    ref.current?.scrollTo({ count: 1, animated: true });
  }, []);

  const scrollBack = useCallback(() => {
    ref.current?.scrollTo({ count: -1, animated: true });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <OnboardingHeader
        isLastSlide={isLastSlide}
        onSkip={goToRegister}
        onBack={scrollBack}
      />

      <View style={{ flex: 1 }}>
        <Carousel
          ref={ref}
          width={screenWidth}
          height={screenHeight - (insets.top + insets.bottom + 200)}
          data={slides}
          loop={false}
          snapEnabled
          onProgressChange={(_, absoluteProgress) => {
            // Sync dots animation and update active slide index as user swipes
            progress.value = absoluteProgress;
            const rounded = Math.round(absoluteProgress);
            if (
              rounded !== activeIndex &&
              rounded >= 0 &&
              rounded <= lastIndex
            ) {
              setActiveIndex(rounded);
            }
          }}
          renderItem={({ item, index }) => (
            // Render each slide with its data and position
            <OnboardingSlide item={item} index={index} />
          )}
        />
      </View>

      <OnboardingFooter
        progress={progress}
        data={slides}
        isLastSlide={isLastSlide}
        onNext={scrollNext}
        onRegister={goToRegister}
        onPressPagination={onPressPagination}
      />
    </View>
  );
}
