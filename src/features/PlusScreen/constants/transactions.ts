export type TransactionMode = "Income" | "Expense" | "Budget";

export const transactionColors = {
    Income: "#1A237E",
    Expense: "#D9042B",
    Budget: "#1A237E",
} as const satisfies Record<TransactionMode, string>;

export const expenseCategories = [
    { id: "1", name: "Food", icon: "fork.knife", iconBg: "#FFF3E0", iconColor: "#FF9800" },
    { id: "2", name: "Transport", icon: "car", iconBg: "#E8F5E9", iconColor: "#00E676" },
    { id: "3", name: "Rent & Bills", icon: "doc.text", iconBg: "#E3F2FD", iconColor: "#2196F3" },
    { id: "4", name: "Shopping", icon: "cart", iconBg: "#FCE4EC", iconColor: "#EC407A" },
    { id: "5", name: "Entertainment", icon: "gamecontroller", iconBg: "#F3E5F5", iconColor: "#9C27B0" },
    { id: "6", name: "Health", icon: "cross.case", iconBg: "#FFF3E0", iconColor: "#FF9800" },
    { id: "7", name: "Data & Airtime", icon: "wifi", iconBg: "#E1F5FE", iconColor: "#03A9F4" },
    { id: "8", name: "Others", icon: "folder", iconBg: "#E8F5E9", iconColor: "#00E676" },
] as const;

export const incomeSources = [
    { id: "1", name: "Salary", icon: "banknote", iconBg: "#E8F5E9", iconColor: "#2E7D32" },
    { id: "2", name: "Freelance", icon: "laptopcomputer", iconBg: "#EDE7F6", iconColor: "#4527A0" },
    { id: "3", name: "Gift", icon: "gift", iconBg: "#FFF8E1", iconColor: "#FF8F00" },
    { id: "4", name: "Others", icon: "folder", iconBg: "#EDE7F6", iconColor: "#1A237E" },
] as const;

export type Category =
    | (typeof expenseCategories)[number]
    | (typeof incomeSources)[number];