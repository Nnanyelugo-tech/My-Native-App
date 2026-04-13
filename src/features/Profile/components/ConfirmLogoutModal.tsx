import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useMagicModal } from "react-native-magic-modal";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

interface Props {
  onConfirm: () => Promise<void>;
}

export function ConfirmLogoutModal({ onConfirm }: Props) {
  const { hide } = useMagicModal();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    hide();
  };

  return (
    <View className="w-full px-5">
      <View className="bg-surface-card rounded-3xl p-6 items-center shadow-lg border border-border-subtle">
        <View className={`w-14 h-14 ${isDark ? "bg-danger/20" : "bg-bgColor"} rounded-full items-center justify-center mb-4 border border-border-subtle`}>
          <IconSymbol
            name="arrow.right.square.fill"
            size={24}
            color={colors.danger}
          />
        </View>

        <AppText className="text-[16px] font-bold text-text-primary text-center">
          Log Out
        </AppText>

        <AppText className="text-center text-[12px] text-text-muted mt-2 mb-6">
          Are you sure you want to log out of your account?
        </AppText>

        <View className="flex-row gap-3 w-full">
          <Pressable
            onPress={() => hide()}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl border border-border-subtle bg-surface-main items-center"
          >
            <AppText className="font-bold text-[12px] text-text-primary">Cancel</AppText>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            disabled={isLoading}
            className="flex-1 py-3 rounded-2xl bg-danger-main items-center justify-center flex-row"
          >
            {isLoading ? (
              <AnimatedSpinner size="small" color={colors.textInverse} />
            ) : ( 
              <AppText className="font-bold text-[12px] text-text-inverse">Yes, Log Out</AppText>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
