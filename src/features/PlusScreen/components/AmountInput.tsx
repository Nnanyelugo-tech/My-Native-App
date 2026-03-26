import { View, TextInput } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { TransactionMode } from "@/src/features/PlusScreen/constants/transactions";

type Props = {
  activeTab: TransactionMode;
  activeColor: string;
  amount: string;
  onChangeAmount: (val: string) => void;
};

export function AmountInput({ activeTab, activeColor, amount, onChangeAmount }: Props) {
  return (
    <View className="items-center mb-6">
      <AppText className="text-[10px] font-bold text-gray-500 tracking-widest mb-1 uppercase">
        {activeTab === "Budget" ? "Monthly Budget" : "Transaction Amount"}
      </AppText>

      <View className="flex-row items-center justify-center">
        <AppText className="text-4xl font-bold mr-1" style={{ color: activeColor }}>
          ₦
        </AppText>
        <TextInput
          value={amount}
          onChangeText={onChangeAmount}
          placeholder="0.00"
          placeholderTextColor={activeColor}
          keyboardType="numeric"
          className="text-4xl font-extrabold text-center py-0"
          style={{ color: activeColor, height: 80 }}
        />
      </View>

      <View
        className="w-10 h-1 rounded-full mt-2"
        style={{ backgroundColor: activeColor, opacity: 0.3 }}
      />
    </View>
  );
}