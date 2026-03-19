import React from "react";
import { View, TextInput } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";

export const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => (
  <View className="mx-5 mt-2 mb-3">
    <View
      className="flex-row items-center bg-white rounded-2xl px-4 py-3"
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
        placeholderTextColor="#BDBDBD"
        value={value}
        onChangeText={onChange}
        autoCorrect={false}
        style={{ color: "#1A1A2E", paddingVertical: 0 }}
      />
    </View>
  </View>
);