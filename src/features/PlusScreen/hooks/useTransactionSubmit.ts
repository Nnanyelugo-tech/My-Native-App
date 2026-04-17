import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { IconSymbolName } from "@/src/components/UI/IconSymbol";
import {
    useAddTransactionMutation,
    useUpdateTransactionMutation,
    useUpsertBudgetMutation,
} from "@/src/features/Transaction/api/useTransactionMutations";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { Transaction, NewTransaction } from "@/src/features/Transaction/types/transactionType";
import { AddTransactionFormValues, SubmitDeps } from "../types/AddTransaction";

export function useTransactionSubmit(deps: SubmitDeps) {
    const {
        activeTab,
        activeColor,
        categories,
        existingBudget,
        currentMonthKey,
        resetAfterSubmit,
        setActiveTab,
    } = deps;

    const router = useRouter();
    const params = useLocalSearchParams<{ mode?: string; id?: string }>();
    const isEditMode = params.mode === "edit";

    const { data: transactions = [] } = useTransactionsQuery();
    const { mutateAsync: addTransaction } = useAddTransactionMutation();
    const { mutateAsync: updateTransaction } = useUpdateTransactionMutation();
    const { mutateAsync: setBudget } = useUpsertBudgetMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: AddTransactionFormValues) => {
        setIsSubmitting(true);
        try {
            if (activeTab === "Budget") {
                await setBudget({
                    id: existingBudget?.id || Date.now().toString(),
                    amount: parseFloat(data.amount),
                    month: currentMonthKey,
                });
                router.back();
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Budget saved successfully",
                });
                return;
            }

            const categoryObj = categories.find((c) => c.id === data.category);

            const transactionData: NewTransaction = {
                ...(isEditMode && params.id ? { id: params.id } : {}),
                title: data.title,
                amount: parseFloat(data.amount),
                category: categoryObj?.name || "Others",
                date:
                    isEditMode && params.id
                        ? transactions.find((t) => t.id === params.id)?.date ||
                        new Date().toISOString()
                        : new Date().toISOString(),
                type: activeTab === "Income" ? "income" : "expense",
                status: "completed",
                icon: (categoryObj?.icon as IconSymbolName) || "pencil",
                iconBg: categoryObj?.iconBg || "#F5F5F5",
                iconColor: categoryObj?.iconColor || activeColor,
                description: data.description,
                note: data.notes,
            };

            if (isEditMode && params.id) {
                await updateTransaction(transactionData as Transaction);
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Transaction updated successfully!",
                });
            } else {
                await addTransaction(transactionData);
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Transaction added successfully!",
                });
            }

            resetAfterSubmit(activeTab);
            setActiveTab("Expense");
            router.back();
        } catch (err) {
            console.error("Submission error:", err);
            Toast.show({
                type: "error",
                text1: "Error",
                text2: "Something went wrong. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return { onSubmit, isSubmitting };
}
