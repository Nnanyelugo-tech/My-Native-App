import React from "react";
import { useLocalSearchParams } from "expo-router";
import Details from "@/components/screen/transactionScreen/transactionDetails/Details";
import { TRANSACTIONS } from "@/data/transactionListData";
import ScreenContainer from "@/components/global/ScreenContainer";
import { EmptyState } from "@/components/screen/transactionScreen/EmptyState";

export default function TransactionDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const transaction = TRANSACTIONS.find((t) => t.id === id);

  if (!transaction) {
    return (
      <ScreenContainer className="items-center justify-center">
        <EmptyState />
      </ScreenContainer>
    );
  }

  return <Details transaction={transaction} />;
}
