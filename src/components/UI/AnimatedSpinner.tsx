import React, { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  ReduceMotion,
} from "react-native-reanimated";

interface Props {
  size?: number;
  color?: string;
  thickness?: number;
}

export const AnimatedSpinner = ({
  size = 24,
  color = "#FFFFFF",
  thickness = 3,
}: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = 0;
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 800,
        easing: Easing.linear,
        reduceMotion: ReduceMotion.Never,
      }),
      -1, // Infinite looping
    );
  }, [rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderColor: `${color}40`,
          borderTopColor: color,
          borderRightColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};
