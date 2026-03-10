import React, { useCallback, useRef } from "react";
import { Dimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { useOnboardingNavigation } from "@/base/hooks/useOnboardingNavigation";
import { onboardingData } from "@/constants/onboardingData";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import OnboardingFooter from "./OnboardingFooter";
import OnboardingHeader from "./OnboardingHeader";
import OnboardingSlide from "./OnboardingSlide";

const { width, height } = Dimensions.get("window");

export default function OnboardingCarousel() {
  const carouselRef = useRef<any>(null);
  const progress = useSharedValue(0);
  const { goToRegister, goToLogin } = useOnboardingNavigation();
  const insets = useSafeAreaInsets();

  const scrollNext = useCallback((index: number) => {
    carouselRef.current?.scrollTo({
      index: index + 1,
      animated: true,
    });
  }, []);

  const scrollBack = useCallback((index: number) => {
    carouselRef.current?.scrollTo({
      index: index - 1,
      animated: true,
    });
  }, []);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      const isLastSlide = index === onboardingData.length - 1;

      return (
        <View style={{ width, height: height * 0.9 }}>
          <OnboardingHeader
            isLastSlide={isLastSlide}
            onSkip={goToRegister}
            onBack={() => scrollBack(index)}
          />

          <OnboardingSlide item={item} index={index} />

          <OnboardingFooter
            progress={progress}
            data={onboardingData}
            isLastSlide={isLastSlide}
            onNext={() => scrollNext(index)}
            onRegister={goToRegister}
            onLogin={goToLogin}
          />
        </View>
      );
    },
    [scrollBack, scrollNext, goToRegister, goToLogin, progress],
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: insets.top }}>
      <Carousel
        ref={carouselRef}
        width={width}
        height={height}
        data={onboardingData}
        loop={false}
        snapEnabled={true}
        scrollAnimationDuration={150}
        renderItem={renderItem}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
      />
    </View>
  );
}
