import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { AmountInput } from "@/src/features/PlusScreen/components/AmountInput";
import { BudgetForm } from "@/src/features/PlusScreen/components/BudgetForm";
import { ModeSelector } from "@/src/features/PlusScreen/components/ModeSelector";
import { TransactionForm } from "@/src/features/PlusScreen/components/TransactionForm";
import { useAddTransaction } from "@/src/features/PlusScreen/hooks/useAddTransaction";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const submitLabel = {
  Income: "Add Income",
  Expense: "Add Expense",
  Budget: "Set Budget",
} as const;

export default function AddTransactionScreen() {
  const { back } = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const params = useLocalSearchParams<{ mode?: string; type?: string }>();
  const isEditMode = params.mode === "edit";

  const {
    activeTab,
    activeColor,
    categories,
    control,
    errors,
    date,
    time,
    hasBudget,
    handleTabChange,
    handleSubmit,
  } = useAddTransaction();

  const title =
    isEditMode && activeTab === "Budget" ? "Edit Budget" : "Add Transactions";
  const buttonLabel =
    activeTab === "Budget"
      ? hasBudget
        ? "Update Budget"
        : "Set Budget"
      : submitLabel[activeTab];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: top }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? top + 10 : 0}
      className="bg-surface-main"
    >
      <View className="flex-row items-center pb-4 px-6 py-4 bg-surface-main">
        <IconSymbol
          name="arrow.left"
          size={24}
          color="#1A237E"
          onPress={back}
        />
        <AppText className="ml-4 text-xl font-bold text-brand-main">
          {title}
        </AppText>
      </View>

      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom + 100 }}
      >
        <ModeSelector activeTab={activeTab} onSelect={handleTabChange} />

        <AmountInput
          activeTab={activeTab}
          activeColor={activeColor}
          control={control}
          name="amount"
          error={errors.amount?.message as string}
        />

        <View className="bg-white mx-6 rounded-[32px] p-6 mb-6">
          {activeTab !== "Budget" ? (
            <TransactionForm
              activeColor={activeColor}
              categories={categories}
              control={control}
              errors={errors}
              date={date}
              time={time}
            />
          ) : (
            <BudgetForm />
          )}
        </View>
      </ScrollView>

      <View
        className="w-full px-6 pt-2 bg-surface-main/95"
        style={{ paddingBottom: bottom + 8 }}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          accessibilityRole="button"
          className="flex-row justify-center items-center py-4 rounded-full"
          style={{ backgroundColor: activeColor }}
          onPress={handleSubmit}
        >
          <AppText className="text-white text-lg font-bold">
            {buttonLabel}
          </AppText>
          <IconSymbol
            name="arrow.right"
            size={20}
            color="white"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
