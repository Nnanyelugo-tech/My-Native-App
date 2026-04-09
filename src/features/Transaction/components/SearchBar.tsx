import React from "react";
import { View, TextInput } from "react-native";
import { IconSymbol } from "@/src/components/UI/IconSymbol";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <View className="mx-5 mt-2 mb-3">
    <View
      className="flex-row items-center bg-surface-card rounded-2xl px-4 py-3"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
      }}
    >
      <IconSymbol name="magnifyingglass" size={18} color="#9E9E9E" />

      <TextInput
        className="flex-1 ml-3 text-sm font-lato-regular"
        placeholder="Search transactions"
        placeholderTextColor="#9E9E9E"
        value={value}
        onChangeText={onChange}
        autoCorrect={false}
        style={{ color: "#1A1A2E", paddingVertical: 0 }}
      />
    </View>
  </View>
);