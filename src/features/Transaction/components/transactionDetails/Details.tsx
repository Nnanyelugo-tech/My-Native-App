import { AppText } from "@/src/components/Global/AppText";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { Transaction } from "@/src/features/Transaction/types/transactionType";
import { formatDateGroup, formatTime } from "@/src/utils/date";
import { formatCurrency } from "@/src/utils/formatCurrency";

interface DetailsProps {
  transaction: Transaction;
}

const statusColors: Record<string, string> = {
  completed: "#4CAF50",
  pending: "#FFC107",
  failed: "#F44336",
};

const Details = ({ transaction }: DetailsProps) => {
  const { back } = router;
  const { bottom } = useSafeAreaInsets();
  const isExpense = transaction.type === "expense";
  const statusColor = statusColors[transaction.status] ?? "#9c27b0";

  const formattedType =
    transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1);

  return (
    <ScreenContainer scrollable={false}>
      <View className="flex-row items-center px-5 pb-4 bg-surface-main">
        <TouchableOpacity
          onPress={() => back()}
          activeOpacity={0.8}
          accessibilityRole="button"
          className="w-10 h-10 items-center justify-center -ml-2"
        >
          <IconSymbol name="arrow.left" size={24} color="#1A237E" />
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
        <View className="bg-white rounded-[32px] p-6 mb-8">
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
          <View className="bg-white rounded-2xl p-5">
            <AppText className="text-text-primary leading-5">
              {transaction.description || "No description available"}
            </AppText>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-8">
          <AppText className="text-text-muted font-bold mb-3 ml-1">
            Notes
          </AppText>

          <View className="bg-white rounded-2xl p-5 min-h-[80px]">
            <AppText className="text-text-primary leading-5">
              {transaction.note || "No notes available for this transaction."}
            </AppText>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

type DetailRowProps = {
  label: string;
  value: React.ReactNode;
};
const DetailRow = ({ label, value }: DetailRowProps) => (
  <View className="flex-row justify-between items-center py-3 border-b border-gray-50 last:border-b-0">
    <AppText className="text-text-secondary font-lato-regular text-[15px]">
      {label}
    </AppText>
    <AppText className="text-text-primary text-[15px] font-bold">
      {value}
    </AppText>
  </View>
);
export default Details;
