import React from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ScreenWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ScreenWrapper({
  children,
  className,
}: ScreenWrapperProps) {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? top + 10 : 0}

    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className={`flex-1 w-full ${className}`}
          style={{ paddingTop: top + 10 }}
        >
          {children}
        </View>
      </ScrollView>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}