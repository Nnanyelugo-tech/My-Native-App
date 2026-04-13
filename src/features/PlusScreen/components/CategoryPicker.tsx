import { View, TouchableOpacity } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { CategoryPickerProps } from "@/src/features/PlusScreen/types/transactionForm";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

export function CategoryPicker({ categories, selectedId, activeColor, onSelect }: CategoryPickerProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View className="mb-6">
      <AppText className="text-[11px] font-bold text-text-secondary tracking-widest mb-4 uppercase">
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
                className="w-14 h-14 rounded-2xl items-center justify-center mb-2 border-2"
                style={{
                  backgroundColor: isSelected 
                    ? (cat.iconBg || `${activeColor}15`) 
                    : colors.background,
                  borderColor: isSelected 
                    ? (cat.iconColor || activeColor) 
                    : "transparent",
                }}
              >
                <IconSymbol
                  name={cat.icon}
                  size={24}
                  color={isSelected ? (cat.iconColor || activeColor) : colors.textSecondary}
                />
              </View>
              <AppText
                className={`text-[11px] text-center ${
                  isSelected ? "text-text-primary font-bold" : "text-text-secondary"
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