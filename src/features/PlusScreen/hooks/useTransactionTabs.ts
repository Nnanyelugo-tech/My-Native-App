// Hook for managing transaction tab state.
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useTheme } from "@/src/components/Global/ThemeContext";
import { Colors } from "@/src/constants/Colors";
import {
    TransactionMode,
    expenseCategories,
    incomeSources,
} from "@/src/features/PlusScreen/constants/transactions";

export function useTransactionTabs() {
    const params = useLocalSearchParams<{ mode?: string; type?: string }>();
    const isEditMode = params.mode === "edit";

    const [activeTab, setActiveTab] = useState<TransactionMode>(
        isEditMode && params.type === "Budget" ? "Budget" : "Expense"
    );

    useEffect(() => {
        if (isEditMode && params.type) {
            if (params.type === "Budget") setActiveTab("Budget");
            else if (params.type === "Income") setActiveTab("Income");
            else setActiveTab("Expense");
        }
    }, [isEditMode, params.type]);

    const { theme } = useTheme();
    const colors = Colors[theme];

    const activeColor =
        activeTab === "Expense" ? colors.danger : colors.brandMain;

    const categories =
        activeTab === "Income" ? incomeSources : expenseCategories;

    return { activeTab, setActiveTab, activeColor, categories };
}
