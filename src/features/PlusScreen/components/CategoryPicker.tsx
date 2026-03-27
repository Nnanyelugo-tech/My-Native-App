import { View, TouchableOpacity } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import type { Category } from "@/src/features/PlusScreen/constants/transactions";

type Props = {
  categories: readonly Category[];
  selectedId: string;
  activeColor: string;
  onSelect: (id: string) => void;
};

export function CategoryPicker({ categories, selectedId, activeColor, onSelect }: Props) {
  return (
    <View className="mb-6">
      <AppText className="text-[11px] font-bold text-gray-700 tracking-widest mb-4 uppercase">
        Category
      </AppText>
      <View className="flex-row flex-wrap">
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id;
          return (
            <TouchableOpacity
            activeOpacity={0.8}
              key={cat.id}
              onPress={() => onSelect(cat.id)}
              className="items-center mr-4 mt-2 w-16"
            >
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center mb-2"
                style={{
                  backgroundColor: isSelected ? (cat.iconBg || `${activeColor}15`) : "#F7F7F9",
                  borderWidth: 2,
                  borderColor: isSelected ? (cat.iconColor || activeColor) : "transparent",
                }}
              >
                <IconSymbol
                  name={cat.icon}
                  size={24}
                  color={isSelected ? (cat.iconColor || activeColor) : "#4B5563"}
                />
              </View>
              <AppText
                className={`text-[11px] text-center ${
                  isSelected ? "text-gray-900 font-bold" : "text-gray-500"
                }`}
                numberOfLines={1}
              >
                {cat.name}
              </AppText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}