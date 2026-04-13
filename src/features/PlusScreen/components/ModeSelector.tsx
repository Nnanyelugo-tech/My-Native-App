import { View, Pressable } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { TransactionMode } from "@/src/features/PlusScreen/constants/transactions";
import { ModeSelectorProps } from "@/src/features/PlusScreen/types/transactionForm";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";

const modes: TransactionMode[] = ["Income", "Expense", "Budget"];

export function ModeSelector({ activeTab, onSelect }: ModeSelectorProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const isDark = theme === "dark";

  return (
    <View className={`flex-row justify-between mt-4 mx-6 p-1.5 rounded-full mb-8 border border-border-subtle ${
      isDark ? "bg-brand-bg-medium" : "bg-bgColor"
    }`}>
      {modes.map((mode) => {
        const isActive = activeTab === mode;
        const activeColor = mode === "Expense" ? colors.danger : colors.brandMain;
        
        return (
          <Pressable
            key={mode}
            onPress={() => onSelect(mode)}
            className={`flex-1 py-3 rounded-full items-center ${
              isActive ? "bg-surface-card" : ""
            }`}
            style={
              isActive
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isDark ? 0.3 : 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <AppText
              className={`font-bold ${isActive ? "" : "text-text-secondary"}`}
              style={isActive ? { color: activeColor } : undefined}
            >
              {mode}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}