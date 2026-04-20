import { AppText } from "@/src/components/Global/AppText";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { AnimatedSpinner } from "@/src/components/UI/AnimatedSpinner";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { Colors } from "@/src/constants/Colors";
import { useDeleteTransactionMutation } from "@/src/features/Transaction/api/useTransactionMutations";
import { Transaction } from "@/src/features/Transaction/types/transactionType";
import { formatDateGroup, formatTime } from "@/src/utils/date";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { magicModal } from "react-native-magic-modal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

import ScreenContainer from "@/src/components/Global/ScreenContainer";

interface DetailsProps {
  transaction: Transaction;
}

const statusColors: Record<Transaction["status"], string> = {
  completed: "#4CAF50",
  pending: "#FFC107",
  failed: "#F44336",
};

const Details = ({ transaction }: DetailsProps) => {
  const router = useRouter();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { bottom } = useSafeAreaInsets();
  const isExpense = transaction.type === "expense";
  const statusColor = statusColors[transaction.status] ?? "#9c27b0";

  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();
  const [isDeleting, setIsDeleting] = useState(false);

  const formattedType =
    transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);

  const handleEdit = () => {
    router.push({
      pathname: "/plus",
      params: {
        mode: "edit",
        type: transaction.type === "income" ? "Income" : "Expense",
        id: transaction.id,
      },
    });
  };

const handleDelete = () => {
  magicModal.show(() => (
    <ConfirmDeleteModal
      title={transaction.title}
      onConfirm={async () => {
        setIsDeleting(true);
        try {
          await deleteTransaction(transaction.id);
          Toast.show({
            type: "success",
            text1: "Deleted",
            text2: "Transaction deleted successfully",
          });
          router.back();
        } catch (err) {
          console.error("Delete error:", err);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Failed to delete transaction. Please try again.",
          });
        } finally {
          setIsDeleting(false);
        }
      }}
    />
  ));
};

  return (
    <ScreenContainer scrollable={false}>
      <View className="flex-row items-center px-5 pb-4 bg-surface-main">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.8}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <IconSymbol name="arrow.left" size={24} color={colors.brandMain} />
        </TouchableOpacity>

        <AppText className="ml-2 text-xl font-bold text-brand-main">
          Transaction Details
        </AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: bottom + 40 }}
      >
        {/* Icon + Amount */}
        <View className="items-center mb-2">
          <View
            style={{ backgroundColor: transaction.iconBg }}
            className="w-24 h-24 rounded-full items-center justify-center mb-2 shadow-sm"
          >
            <IconSymbol
              name={transaction.icon}
              size={40}
              color={transaction.iconColor}
            />
          </View>

          <AppText className="text-lg text-text-muted mb-1">
            {transaction.title}
          </AppText>

          <AppText
            className={`text-4xl font-bold ${
              isExpense ? "text-danger-muted" : "text-success-muted"
            }`}
          >
            {isExpense ? "-" : "+"}
            {formatCurrency(transaction.amount)}
          </AppText>
        </View>

        {/* Status */}
        <View className="items-center mb-6">
          <View
            style={{ backgroundColor: `${statusColor}20` }}
            className="px-6 py-2 rounded-full"
          >
            <AppText
              style={{ color: statusColor }}
              className="font-bold text-xs uppercase"
            >
              {transaction.status}
            </AppText>
          </View>
        </View>

        {/* Info */}
        <View className="bg-surface-card rounded-[32px] p-6 mb-8">
          <DetailRow label="Category" value={transaction.category} />
          <DetailRow label="Type" value={formattedType} />
          <DetailRow label="Date" value={formatDateGroup(transaction.date)} />
          <DetailRow label="Time" value={formatTime(transaction.date)} />
        </View>

        {/* Description */}
        <View className="mb-6">
          <AppText className="text-text-muted font-bold mb-3 ml-1">
            Description
          </AppText>
          <View className="bg-surface-card rounded-2xl p-5">
            <AppText className="text-text-primary leading-5">
              {transaction.description || "No description available"}
            </AppText>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-6">
          <AppText className="text-text-muted font-bold mb-3 ml-1">
            Notes
          </AppText>

          <View className="bg-surface-card rounded-2xl p-5 min-h-[80px]">
            <AppText className="text-text-primary leading-5">
              {transaction.note || "No notes available for this transaction."}
            </AppText>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          onPress={handleEdit}
          activeOpacity={0.9}
          accessibilityRole="button"
          className="py-4 rounded-full items-center justify-center mb-4 border-2"
          style={{ borderColor: colors.brandMain }}
        >
          <AppText className="text-brand-main text-base font-bold">
            Edit Transaction
          </AppText>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={handleDelete}
          activeOpacity={0.9}
          accessibilityRole="button"
          disabled={isDeleting}
          className="py-4 rounded-full items-center justify-center mb-8"
          style={{
            backgroundColor: colors.danger,
            opacity: isDeleting ? 0.9 : 1,
          }}
        >
          {isDeleting ? (
            <AnimatedSpinner size="small" color="#fff" />
          ) : (
            <AppText className="text-white text-base font-bold">
              Delete Transaction
            </AppText>
          )}
        </TouchableOpacity>
      </ScrollView>
    </ScreenContainer>
  );
};

type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};
const DetailRow = ({ label, value }: DetailRowProps) => (
  <View className="flex-row justify-between items-center py-3 border-b border-border-subtle last:border-b-0">
    <AppText className="text-text-secondary font-lato-regular text-[15px]">
      {label}
    </AppText>
    <AppText className="text-text-primary text-[15px] font-bold">
      {value}
    </AppText>
  </View>
);
export default Details;
