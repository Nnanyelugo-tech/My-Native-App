import React, { useEffect, useRef, forwardRef } from "react";
import { Animated, Easing, View, StyleSheet, ViewStyle } from "react-native";

interface Props {
  size?: number | "small" | "large";
  color?: string;
  animating?: boolean;
  style?: ViewStyle;
}

function resolveSize(size: Props["size"]): number {
  if (size === "small") return 20;
  if (size === "large") return 36;
  return size ?? 20;
}

export const AnimatedSpinner = forwardRef<View, Props>(
  ({ size = "small", color = "#2F2E7E", animating = true, style }, ref) => {
    const rotation = useRef(new Animated.Value(0)).current;
    const animationRef = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
      if (animating) {
        rotation.setValue(0);

        animationRef.current = Animated.loop(
          Animated.timing(rotation, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        );

        animationRef.current.start();
      } else {
        animationRef.current?.stop();
      }

      return () => {
        animationRef.current?.stop();
      };
    }, [animating, rotation]);

    const spin = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"],
    });

    const px = resolveSize(size);

    if (!animating) return null;

    return (
      <Animated.View
        ref={ref}
        style={[
          styles.container,
          {
            width: px,
            height: px,
            borderRadius: px / 2,
            borderWidth: Math.max(2, px * 0.1),
            borderColor: color,
            borderTopColor: "transparent",
            transform: [{ rotate: spin }],
          },
          style,
        ]}
      />
    );
  },
);

AnimatedSpinner.displayName = "AnimatedSpinner";

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
});
