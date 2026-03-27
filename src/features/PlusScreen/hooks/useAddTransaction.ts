import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransactionStore } from "@/src/features/Transaction/store/useTransactionStore";

import {
    TransactionMode,
    transactionColors,
    expenseCategories,
    incomeSources,
} from "@/src/features/PlusScreen/constants/transactions";
import { transactionSchema, budgetSchema } from "../validation/addTransactionSchema";

function getTodayDate() {
    return new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function getCurrentTime() {
    return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function useAddTransaction() {
    const router = useRouter();
    const params = useLocalSearchParams<{ mode?: string; type?: string }>();
    const isEditMode = params.mode === "edit";
    
    const budgets = useTransactionStore((state) => state.budgets);
    const addTransaction = useTransactionStore((state) => state.addTransaction);
    const setBudget = useTransactionStore((state) => state.setBudget);

    const [activeTab, setActiveTab] = useState<TransactionMode>(
        (isEditMode && params.type === "Budget") ? "Budget" : "Expense"
    );
    
    // Use dynamic validation schema based on activeTab
    const schema = activeTab === "Budget" ? budgetSchema : transactionSchema;

    const currentMonth = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
    const existingBudget = budgets.find(b => b.month === currentMonth);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
    } = useForm<any>({
        resolver: yupResolver(schema) as any,
        defaultValues: {
            amount: (isEditMode && params.type === "Budget" && existingBudget) ? existingBudget.amount.toString() : "",
            title: "",
            category: (activeTab === "Income" ? incomeSources[0].id : expenseCategories[0].id) as string,
            description: "",
            notes: "",
        } as any,
    });

    const [date, setDate] = useState(getTodayDate());
    const [time, setTime] = useState(getCurrentTime());

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const tick = () => {
            setDate(getTodayDate());
            setTime(getCurrentTime());
        };

        const msUntilNextMinute =
            (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds();

        const initialTimeout = setTimeout(() => {
            tick();
            intervalRef.current = setInterval(tick, 60_000);
        }, msUntilNextMinute);

        return () => {
            clearTimeout(initialTimeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const activeColor = transactionColors[activeTab];
    const categories = activeTab === "Income" ? incomeSources : expenseCategories;

    const handleTabChange = (tab: TransactionMode) => {
        setActiveTab(tab);
        const first = tab === "Income" ? incomeSources[0].id : expenseCategories[0].id;
        // Important: Reset form when switching tabs to use correct schema
        reset({
            amount: "",
            title: "",
            category: first,
            description: "",
            notes: "",
        });
    };

    const onSubmit = (data: any) => {
        if (activeTab === "Budget") {
            const currentMonth = new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            });
            setBudget({
                id: Date.now().toString(),
                amount: parseFloat(data.amount),
                month: currentMonth,
            });
        } else {
            const categoryObj = categories.find(c => c.id === data.category);
            const catColors = categoryObj as any;
            
            addTransaction({
                id: Date.now().toString(),
                title: data.title,
                amount: parseFloat(data.amount),
                category: categoryObj?.name || "Others",
                date: new Date().toISOString(),
                type: activeTab === "Income" ? "income" : "expense",
                status: "completed",
                icon: categoryObj?.icon as any || "questionmark",
                iconBg: catColors?.iconBg || "#F5F5F5",
                iconColor: catColors?.iconColor || activeColor,
                description: data.description,
                note: data.notes,
            });
        }

        reset();
        router.back();
    };

    return {
        activeTab,
        activeColor,
        categories,
        control,
        errors,
        date,
        time,
        handleTabChange,
        handleSubmit: handleSubmit(onSubmit),
        setValue,
        watch,
    };
}