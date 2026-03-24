import { IconSymbolName } from "@/components/ui/icon-symbol";

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
    Note?: string;
};