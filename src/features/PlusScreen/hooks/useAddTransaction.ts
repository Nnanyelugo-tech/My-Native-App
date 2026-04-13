import { IconSymbolName } from "@/src/components/UI/IconSymbol";
import {
    TransactionMode,
    expenseCategories,
    incomeSources,
} from "@/src/features/PlusScreen/constants/transactions";
import { useTransactionsQuery } from "@/src/features/Transaction/api/useTransactionsQuery";
import { useBudgetsQuery } from "@/src/features/Transaction/api/useBudgetsQuery";
import { 
  useAddTransactionMutation,
  useUpdateTransactionMutation,
  useUpsertBudgetMutation
} from "@/src/features/Transaction/api/useTransactionMutations";
import { Transaction, NewTransaction } from "@/src/features/Transaction/types/transactionType";
import { getYearMonthKey, getTodayDate, getCurrentTime } from "@/src/utils/date";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { budgetSchema, transactionSchema } from "../validation/addTransactionSchema";
import Toast from "react-native-toast-message";
import { AddTransactionFormValues } from "../types/AddTransaction";

export function useAddTransaction() {
    const router = useRouter();
    const params = useLocalSearchParams<{ mode?: string; type?: string; amount?: string; id?: string }>();
    const isEditMode = params.mode === "edit";

    // Store Access
    const { data: transactions = [] } = useTransactionsQuery();
    const { data: budgets = [] } = useBudgetsQuery();
    const { mutateAsync: addTransaction } = useAddTransactionMutation();
    const { mutateAsync: updateTransaction } = useUpdateTransactionMutation();
    const { mutateAsync: setBudget } = useUpsertBudgetMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Track if we've already pre-filled values to prevent loops after reset.
    const prefillKey = useRef<string | null>(null);
    const paramFingerprint = `${params.mode}-${params.type}-${params.amount}-${params.id}`;

    // Active Tab & Validation Schema
    const [activeTab, setActiveTab] = useState<TransactionMode>(
        (isEditMode && params.type === "Budget") ? "Budget" : "Expense"
    );


    // sync the active tab and allow pre-fill to run again.
    useEffect(() => {
        if (isEditMode && params.type === "Budget") {
            setActiveTab("Budget");
        }
    }, [isEditMode, params.type]);

    // Use dynamic validation schema based on activeTab
    const schema = activeTab === "Budget" ? budgetSchema : transactionSchema;

    // Budget State
    const currentMonthKey = getYearMonthKey();
    const existingBudget = budgets.find(b => b.month === currentMonthKey);


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
            category: activeTab === "Income" ? incomeSources[0].id : expenseCategories[0].id,
            description: "",
            notes: "",
        },
    });
    // Live Clock with useEffect
    const [date, setDate] = useState(getTodayDate());
    const [time, setTime] = useState(getCurrentTime());
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const tick = () => {
            setDate(getTodayDate());
            setTime(getCurrentTime());
        };
        const msUntilNextMinute = (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

        const initialTimeout = setTimeout(() => {
            tick();
            intervalRef.current = setInterval(tick, 60_000);
        }, msUntilNextMinute);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (activeTab === "Budget") {
            if (existingBudget && existingBudget.amount > 0) {
                setValue("amount", existingBudget.amount.toString());
            }
            prefillKey.current = paramFingerprint;
        } else if (isEditMode && params.id && prefillKey.current !== paramFingerprint) {
            // Transaction edit: fill once
            const transaction = transactions.find(t => t.id === params.id);
            if (transaction) {
                setValue("amount", transaction.amount.toString());
                setValue("title", transaction.title);
                setValue("category", transaction.category);
                setValue("description", transaction.description || "");
                setValue("notes", transaction.note || "");
            }
            prefillKey.current = paramFingerprint;
        }
    }, [activeTab, isEditMode, paramFingerprint, params.id, existingBudget, transactions, setValue]);

    const { theme } = useTheme();
    const colors = Colors[theme];

    // Dynamic Colors & Categories/Derived Values & Tab Switcher
    const activeColor = activeTab === "Expense" ? colors.danger : colors.brandMain;
    const categories = activeTab === "Income" ? incomeSources : expenseCategories;

    const handleTabChange = (tab: TransactionMode) => {
        if (activeTab === tab) return;

        setActiveTab(tab);
        const first = tab === "Income" ? incomeSources[0].id : expenseCategories[0].id;

        // When switching to Budget, pre-fill with existing budget;
        // otherwise clear the form for a fresh transaction.
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
    // Whether a budget already exists (for button label)
    const hasBudget = !!(existingBudget && existingBudget.amount > 0);

    // Form Submission Logic
    const onSubmit = async (data: AddTransactionFormValues) => {
        setIsSubmitting(true);
        try {
            if (activeTab === "Budget") {
                await setBudget({
                    id: existingBudget?.id || Date.now().toString(),
                    amount: parseFloat(data.amount),
                    month: currentMonthKey,
                });
                
                prefillKey.current = null;
                router.back();
                Toast.show({
                    type: "success",
                    text1: "Success",
                    text2: "Budget saved successfully",
                });
                return;
            }

            // Transaction submission
            const categoryObj = categories.find(c => c.id === data.category);

            const transactionData: NewTransaction = {
                // For edits keep existing ID; for new ones omit so Supabase generates UUID
                ...(isEditMode && params.id ? { id: params.id } : {}),
                title: data.title,
                amount: parseFloat(data.amount),
                category: categoryObj?.name || "Others",
                date: (isEditMode && params.id)
                    ? transactions.find(t => t.id === params.id)?.date || new Date().toISOString()
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

            // Transaction: clear form and reset to default state
            reset({
                amount: "",
                title: "",
                category: activeTab === "Income" ? incomeSources[0].id : expenseCategories[0].id,
                description: "",
                notes: "",
            });
            prefillKey.current = null;
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
    // Return Values
    return {
        activeTab,
        activeColor,
        categories,
        control,
        errors,
        date,
        time,
        hasBudget,
        handleTabChange,
        handleSubmit: handleSubmit(onSubmit),
        isSubmitting,
        setValue,
        watch,
    };
}