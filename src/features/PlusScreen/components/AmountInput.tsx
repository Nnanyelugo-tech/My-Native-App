import { View, TextInput } from "react-native";
import { AppText } from "@/src/components/Global/AppText";
import { TransactionMode } from "@/src/features/PlusScreen/constants/transactions";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { cleanAmount, formatNumber, getCurrencySymbol } from "@/src/utils/formatCurrency";

type Props<T extends FieldValues> = {
  activeTab: TransactionMode;
  activeColor: string;
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export function AmountInput<T extends FieldValues>({ 
  activeTab, 
  activeColor, 
  control,
  name,
  error
}: Props<T>) {
  return (
    <View className="items-center mb-6">
      <AppText className="text-[10px] font-bold text-gray-500 tracking-widest mb-1 uppercase">
        {activeTab === "Budget" ? "Monthly Budget" : "Transaction Amount"}
      </AppText>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          const displayValue = !value 
            ? "" 
            : value.endsWith(".") 
              ? value 
              : isNaN(parseFloat(value)) 
                ? value 
                : formatNumber(parseFloat(value));

          return (
            <View className="flex-row items-center justify-center">
              <AppText className="text-4xl font-bold mr-1" style={{ color: activeColor }}>
                {getCurrencySymbol()}
              </AppText>
              <TextInput
                value={displayValue}
                onChangeText={(val) => onChange(cleanAmount(val))}
                onBlur={onBlur}
                placeholder="0.00"
                placeholderTextColor={activeColor}
                keyboardType="numeric"
                className="text-4xl font-extrabold text-center py-0"
                style={{ color: activeColor, height: 80 }}
              />
            </View>
          );
        }}
      />

      {error && (
        <AppText className="text-red-500 text-[12px] mt-1 font-medium">
          {error}
        </AppText>
      )}

      <View
        className="w-10 h-1 rounded-full mt-2"
        style={{ backgroundColor: activeColor, opacity: 0.3 }}
      />
    </View>
  );
}