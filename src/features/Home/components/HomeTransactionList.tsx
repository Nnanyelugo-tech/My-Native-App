import { AppText } from "@/src/components/Global/AppText";
import { IconSymbol } from "@/src/components/UI/IconSymbol";
import { EmptyState } from "@/src/features/Transaction/components/EmptyState";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";
import { formatTime } from "@/src/utils/date";
import { formatCurrency } from "@/src/utils/formatCurrency";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";

export const TransactionList = () => {
  const transactionsData = useTransactionStore((state) => state.transactions);
  const transactions = useMemo(
    () =>
      [...transactionsData]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4),
    [transactionsData],
  );
  const { push } = router;
  const handleSeeMore = useCallback(() => {
    push("/transaction");
  }, [push]);

  return (
    <View className="mb-10">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <AppText className="text-lg text-text-primary font-extrabold">
          Recent Transactions
        </AppText>

        <TouchableOpacity
          activeOpacity={0.9}
          accessibilityRole="button"
          onPress={handleSeeMore}
        >
          <AppText className="text-sm text-brand-main font-extrabold">
            See More
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        transactions.map((t) => {
          const isIncome = t.type === "income";

          return (
            <TouchableOpacity
              key={t.id}
              activeOpacity={0.7}
              accessibilityRole="button"
              onPress={() =>
                push({
                  pathname: "/transaction/[id]",
                  params: { id: t.id },
                })
              }
              className="bg-white rounded-3xl px-4 py-4 mb-3 flex-row items-center"
            >
              <View
                className="w-14 h-14 rounded-2xl items-center justify-center mr-4"
                style={{ backgroundColor: t.iconBg }}
              >
                <IconSymbol name={t.icon} size={24} color={t.iconColor} />
              </View>

              <View className="flex-1 mr-3">
                <AppText className="text-[15px] text-text-primary font-semibold">
                  {t.title}
                </AppText>

                <AppText className="text-xs font-lato-regular mt-0.5 text-text-secondary">
                  {t.category} • {formatTime(t.date)}
                </AppText>
              </View>

              <AppText
                className={`text-[15px] font-bold ${
                  isIncome ? "text-success-muted" : "text-danger-muted"
                }`}
              >
                {isIncome ? "+" : "-"}
                {formatCurrency(t.amount)}
              </AppText>
            </TouchableOpacity>
          );
        })
      )}
    </View>
  );
};
