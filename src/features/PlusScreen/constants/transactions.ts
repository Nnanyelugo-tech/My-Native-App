export type TransactionMode = "Income" | "Expense" | "Budget";

export const transactionColors = {
    Income: "#10B981",
    Expense: "#D9042B",
    Budget: "#1A237E",
} as const satisfies Record<TransactionMode, string>;

export const expenseCategories = [
    { id: "1", name: "Food", icon: "fork.knife" },
    { id: "2", name: "Transport", icon: "car" },
    { id: "3", name: "Rent/Bills", icon: "doc.text" },
    { id: "4", name: "Shopping", icon: "cart" },
    { id: "5", name: "Entertainment", icon: "gamecontroller" },
    { id: "6", name: "Health", icon: "cross.case" },
    { id: "7", name: "Data/Airtime", icon: "wifi" },
    { id: "8", name: "Others", icon: "folder" },
] as const;

export const incomeSources = [
    { id: "1", name: "Salary", icon: "banknote" },
    { id: "2", name: "Freelance", icon: "laptopcomputer" },
    { id: "3", name: "Gift", icon: "gift" },
    { id: "4", name: "Others", icon: "folder" },
] as const;

export type Category =
    | (typeof expenseCategories)[number]
    | (typeof incomeSources)[number];