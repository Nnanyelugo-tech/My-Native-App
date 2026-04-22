// Custom hook for managing transaction form state and logic.
import { useEffect, useRef } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams } from "expo-router";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { useBudgetsQuery } from "@/src/features/Transaction/api/useBudgetsQuery";
import {
    TransactionMode,
    expenseCategories,
    incomeSources,
} from "@/src/features/PlusScreen/constants/transactions";
import {
    budgetSchema,
    transactionSchema,
} from "../validation/addTransactionSchema";
import { AddTransactionFormValues } from "../types/AddTransaction";
import { getYearMonthKey } from "@/src/utils/date";

export function useTransactionForm(activeTab: TransactionMode) {
    const params = useLocalSearchParams<{
        mode?: string;
        type?: string;
        amount?: string;
        id?: string;
    }>();
    const isEditMode = params.mode === "edit";

    const { data: transactions = [] } = useTransactionsQuery();
    const { data: budgets = [] } = useBudgetsQuery();

    // Dynamic validation schema
    const schema = activeTab === "Budget" ? budgetSchema : transactionSchema;

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<AddTransactionFormValues>({
        resolver: yupResolver(schema) as unknown as Resolver<AddTransactionFormValues>,
        defaultValues: {
            amount: "",
            title: "",
            category:
                activeTab === "Income"
                    ? incomeSources[0].id
                    : expenseCategories[0].id,
            description: "",
            notes: "",
        },
    });

    const editingId = useRef<string | null>(null);

    const prefillKey = useRef<string | null>(null);
    const paramFingerprint = `${params.mode}-${params.type}-${params.amount}-${params.id}`;

    const currentMonthKey = getYearMonthKey();
    const existingBudget = budgets.find((b) => b.month === currentMonthKey);

    useEffect(() => {
        if (activeTab === "Budget") {
            if (existingBudget && existingBudget.amount > 0) {
                setValue("amount", existingBudget.amount.toString());
            }
            prefillKey.current = paramFingerprint;
        } else if (
            isEditMode &&
            params.id &&
            prefillKey.current !== paramFingerprint
        ) {
            const transaction = transactions.find((t) => t.id === params.id);
            if (transaction) {
                setValue("amount", transaction.amount.toString());
                setValue("title", transaction.title);

                const sourceArray =
                    transaction.type === "income" ? incomeSources : expenseCategories;
                const matchedCategory = sourceArray.find(
                    (c) => c.name === transaction.category
                );

                if (matchedCategory) {
                    setValue("category", matchedCategory.id);
                } else {
                    setValue("category", sourceArray[0].id);
                }

                setValue("description", transaction.description || "");
                setValue("notes", transaction.note || "");

                editingId.current = params.id;
            }
            prefillKey.current = paramFingerprint;
        }
    }, [
        activeTab,
        isEditMode,
        paramFingerprint,
        params.id,
        existingBudget,
        transactions,
        setValue,
    ]);

    // Tab switch handler 
    const resetForTab = (tab: TransactionMode) => {
        const first =
            tab === "Income" ? incomeSources[0].id : expenseCategories[0].id;

        editingId.current = null;

        if (tab === "Budget" && existingBudget && existingBudget.amount > 0) {
            reset({
                amount: existingBudget.amount.toString(),
                title: "",
                category: first,
                description: "",
                notes: "",
            });
        } else {
            reset({
                amount: "",
                title: "",
                category: first,
                description: "",
                notes: "",
            });
        }
    };

    // Post submit reset
    const resetAfterSubmit = (currentTab: TransactionMode) => {
        reset({
            amount: "",
            title: "",
            category:
                currentTab === "Income"
                    ? incomeSources[0].id
                    : expenseCategories[0].id,
            description: "",
            notes: "",
        });
        prefillKey.current = paramFingerprint;
        editingId.current = null;
    };

    const hasBudget = !!(existingBudget && existingBudget.amount > 0);

    return {
        control,
        handleSubmit,
        errors,
        setValue,
        watch,
        resetForTab,
        resetAfterSubmit,
        hasBudget,
        existingBudget,
        currentMonthKey,
        editingId,
    };
}
