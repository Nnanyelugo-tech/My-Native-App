import { IconSymbolName } from "@/src/components/UI/IconSymbol";
import {
    TransactionMode,
    expenseCategories,
    incomeSources,
    transactionColors,
} from "@/src/features/PlusScreen/constants/transactions";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";
import { Transaction } from "@/src/features/Transaction/types/transactionType";
import { getYearMonthKey, getTodayDate, getCurrentTime } from "@/src/utils/date";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { budgetSchema, transactionSchema } from "../validation/addTransactionSchema";

/**
 * Shared form values type — the superset of all fields used across
 * both transaction and budget forms. Budget mode only uses `amount`,
 * while transaction mode uses all fields.
 */
type AddTransactionFormValues = {
    amount: string;
    title: string;
    category: string;
    description: string;
    notes: string;
};


export function useAddTransaction() {
    const router = useRouter();
    const params = useLocalSearchParams<{ mode?: string; type?: string; amount?: string; id?: string }>();
    const isEditMode = params.mode === "edit";

    // Store Access
    const transactions = useTransactionStore((state) => state.transactions);
    const budgets = useTransactionStore((state) => state.budgets);
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const updateTransaction = useTransactionStore((state) => state.updateTransaction);
    const setBudget = useTransactionStore((state) => state.setBudget);

    // Track if we've already pre-filled values to prevent loops after reset.
    // We store the param fingerprint so we can detect when the screen is
    // re-used with NEW params (Expo Router keeps the component mounted).
    const prefillKey = useRef<string | null>(null);
    const paramFingerprint = `${params.mode}-${params.type}-${params.amount}-${params.id}`;

    // Active Tab & Validation Schema
    const [activeTab, setActiveTab] = useState<TransactionMode>(
        (isEditMode && params.type === "Budget") ? "Budget" : "Expense"
    );

    // When params change (e.g. navigating back then editing again),
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

    //  React Hook Form Initialization — always start empty,
    //  pre-filling is handled via the useEffect below.
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

    // Pre-fill form values based on context.
    // Budget tab: always show the current budget (persistent input pattern).
    // Transaction edit: fill once when params change.
    useEffect(() => {
        if (activeTab === "Budget") {
            // Always reflect the current stored budget on the Budget tab
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

    // Dynamic Colors & Categories/Derived Values & Tab Switcher
    const activeColor = transactionColors[activeTab];
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
    const onSubmit = (data: AddTransactionFormValues) => {
        if (activeTab === "Budget") {
            setBudget({
                id: existingBudget?.id || Date.now().toString(),
                amount: parseFloat(data.amount),
                month: currentMonthKey,
            });
            // Budget: keep the value in the input (persistent pattern).
            // Navigate back without clearing.
            prefillKey.current = null;
            router.back();
            return;
        }

        // Transaction submission
        const categoryObj = categories.find(c => c.id === data.category);

        const transactionData: Transaction = {
            id: (isEditMode && params.id) ? params.id : Date.now().toString(),
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
            updateTransaction(transactionData);
        } else {
            addTransaction(transactionData);
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
        setValue,
        watch,
    };
}