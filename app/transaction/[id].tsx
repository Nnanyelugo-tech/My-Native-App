import ScreenContainer from "@/src/components/Global/ScreenContainer";
import { EmptyState } from "@/src/features/Transaction/components/EmptyState";
import Details from "@/src/features/Transaction/components/transactionDetails/Details";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { useLocalSearchParams } from "expo-router";
import React from "react";

export default function TransactionDetailScreen() {
  const { data: transactions = [] } = useTransactionsQuery();
  const params = useLocalSearchParams<{ id?: string }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const transaction = transactions.find((t) => t.id === id);

  if (!transaction) {
    return (
      <ScreenContainer className="items-center justify-center">
        <EmptyState />
      </ScreenContainer>
    );
  }

  return <Details transaction={transaction} />;
}
