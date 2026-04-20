import { useState } from "react";
import { useRouter } from "expo-router";
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


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function useTransactionSubmit(deps: SubmitDeps) {
    const {
        activeTab,
        activeColor,
        categories,
        existingBudget,
        currentMonthKey,
        resetAfterSubmit,
        setActiveTab,
        editingId,
    } = deps;

    const router = useRouter();

    const { data: transactions = [] } = useTransactionsQuery();
    const { mutateAsync: addTransaction } = useAddTransactionMutation();
    const { mutateAsync: updateTransaction } = useUpdateTransactionMutation();
    const { mutateAsync: setBudget } = useUpsertBudgetMutation();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: AddTransactionFormValues) => {
        setIsSubmitting(true);

        // Read the edit state from the ref at submit time
        const currentEditingId = editingId.current;
        const isEditing = !!currentEditingId;

        try {
            if (activeTab === "Budget") {
                await setBudget({
                    id: existingBudget?.id || Date.now().toString(),
                    amount: parseFloat(data.amount),
                    month: currentMonthKey,
                });
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Budget saved successfully",
                });
                await delay(400);
                router.back();
                return;
            }

            const categoryObj = categories.find((c) => c.id === data.category);

            const transactionData: NewTransaction = {
                ...(isEditing ? { id: currentEditingId } : {}),
                title: data.title,
                amount: parseFloat(data.amount),
                category: categoryObj?.name || "Others",
                date:
                    isEditing
                        ? transactions.find((t) => t.id === currentEditingId)?.date ||
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

            if (isEditing) {
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
            await delay(400);
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
