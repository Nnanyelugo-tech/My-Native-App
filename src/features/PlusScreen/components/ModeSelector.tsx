import { View, Pressable } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { transactionColors, TransactionMode } from "@/src/features/PlusScreen/constants/transactions";

const modes: TransactionMode[] = ["Income", "Expense", "Budget"];

type Props = {
  activeTab: TransactionMode;
  onSelect: (mode: TransactionMode) => void;
};

export function ModeSelector({ activeTab, onSelect }: Props) {
  return (
    <View className="flex-row justify-between mt-4 bg-gray-100 mx-6 p-1.5 rounded-full mb-8">
      {modes.map((mode) => {
        const isActive = activeTab === mode;
        return (
          <Pressable
          
            key={mode}
            onPress={() => onSelect(mode)}
            className={`flex-1 py-3 rounded-full items-center ${
              isActive ? "bg-white" : ""
            }`}
            style={
              isActive
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 2,
                  }
                : undefined
            }
          >
            <AppText
              className={`font-bold ${isActive ? "" : "text-gray-500"}`}
              style={isActive ? { color: transactionColors[mode] } : undefined}
            >
              {mode}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}