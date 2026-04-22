// Custom hook that orchestrates the entire add transaction flow.
import { TransactionMode } from "@/src/features/PlusScreen/constants/transactions";
import { useLiveClock } from "./useLiveClock";
import { useTransactionTabs } from "./useTransactionTabs";
import { useTransactionForm } from "./useTransactionForm";
import { useTransactionSubmit } from "./useTransactionSubmit";

// This hook connects everything together
export function useAddTransaction() {
    const { date, time } = useLiveClock();
    const { activeTab, setActiveTab, activeColor, categories } =
        useTransactionTabs();

    const {
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
    } = useTransactionForm(activeTab);

    const { onSubmit, isSubmitting } = useTransactionSubmit({
        activeTab,
        activeColor,
        categories,
        existingBudget,
        currentMonthKey,
        resetAfterSubmit,
        setActiveTab,
        editingId,
    });

    const handleTabChange = (tab: TransactionMode) => {
        if (activeTab === tab) return;
        setActiveTab(tab);
        resetForTab(tab);
    };

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