import React, { useState } from "react";
import { View, Pressable } from "react-native";
import { useMagicModal } from "react-native-magic-modal";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";

interface Props {
  onConfirm: () => Promise<void>;
}

export function ConfirmLogoutModal({ onConfirm }: Props) {
  const { hide } = useMagicModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    await onConfirm();
    setIsLoading(false);
    hide();
  };

  return (
    <View className="w-full px-2">
      <View className="bg-black rounded-2xl p-6 items-center">
        <View className="w-14 h-14 bg-[rgba(255,23,68,0.1)] rounded-full items-center justify-center mb-4">
          <IconSymbol
            name="arrow.right.square.fill"
            size={24}
            color="#FF1744"
          />
        </View>

        <AppText className="text-lg font-bold text-white text-center">
          Log Out
        </AppText>

        <AppText className="text-center text-white mt-2 mb-6">
          Are you sure you want to log out of your account?
        </AppText>

        <View className="flex-row gap-3 w-full">
          <Pressable
            onPress={() => hide()}
            disabled={isLoading}
            className="flex-1 py-2 rounded-2xl border border-border bg-surface-main items-center"
          >
            <AppText className="font-bold text-text-primary">Cancel</AppText>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            disabled={isLoading}
            className="flex-1 py-2 rounded-2xl bg-danger-main items-center justify-center flex-row"
          >
            {isLoading ? (
              <AnimatedSpinner color="#FFFFFF" size={24} />
            ) : (
              <AppText className="font-sm text-white">Yes, Log Out</AppText>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
