import React from "react";
import { View, TextInput } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  return (
    <View className="mx-5 mt-2 mb-3">
      <View
        className="flex-row items-center bg-surface-card rounded-2xl px-4 py-3 shadow-sm border border-border-subtle"
        style={isDark ? { borderWidth: 1 } : undefined}
      >
        <IconSymbol name="magnifyingglass" size={18} color={colors.textSecondary} />

        <TextInput
          className="flex-1 ml-3 text-sm font-lato-regular"
          placeholder="Search transactions"
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChange}
          autoCorrect={false}
          style={{ color: colors.text, paddingVertical: 0 }}
        />
      </View>
    </View>
  );
};