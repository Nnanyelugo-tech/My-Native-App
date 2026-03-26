import { useState } from "react";
import {
    TransactionMode,
    transactionColors,
    expenseCategories,
    incomeSources,
} from "@/src/features/PlusScreen/constants/transactions";

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
    const [activeTab, setActiveTab] = useState<TransactionMode>("Expense");
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>(
        expenseCategories[0].id
    );
    const [description, setDescription] = useState("");
    const [date] = useState(getTodayDate());
    const [time] = useState(getCurrentTime());
    const [notes, setNotes] = useState("");

    const activeColor = transactionColors[activeTab];
    const categories = activeTab === "Income" ? incomeSources : expenseCategories;

    const handleTabChange = (tab: TransactionMode) => {
        setActiveTab(tab);
        // Reset category to first item of the new tab's list
        const first = tab === "Income" ? incomeSources[0].id : expenseCategories[0].id;
        setSelectedCategory(first);
    };

    const handleSubmit = () => {
        // 
        console.log({ activeTab, amount, title, selectedCategory, description, date, time, notes });
    };

    return {
        activeTab,
        activeColor,
        categories,
        amount, setAmount,
        title, setTitle,
        selectedCategory, setSelectedCategory,
        description, setDescription,
        date,
        time,
        notes, setNotes,
        handleTabChange,
        handleSubmit,
    };
}