import { Category, TransactionMode } from "../constants/transactions";

export type AddTransactionFormValues = {
    amount: string;
    title: string;
    category: string;
    description: string;
    notes: string;
};

export interface SubmitDeps {
    activeTab: TransactionMode;
    activeColor: string;
    categories: readonly Category[];
    existingBudget: { id: string; amount: number; month: string } | undefined;
    currentMonthKey: string;
    resetAfterSubmit: (tab: TransactionMode) => void;
    setActiveTab: (tab: TransactionMode) => void;
}