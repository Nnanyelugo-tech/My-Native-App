import { IconSymbolName } from "@/src/components/UI/IconSymbol";

export type Transaction = {
    id: string;
    title: string;
    category: string;
    date: string;
    amount: number;
    type: "income" | "expense";
    status: "completed" | "pending" | "failed";
    icon: IconSymbolName;
    iconBg: string;
    iconColor: string;
    description?: string;
    note?: string;
};

// A transaction without an id used when creating new ones Supabase generates the UUID.
export type NewTransaction = Omit<Transaction, "id"> & { id?: string };