import { SectionListData } from "react-native";
import { Transaction } from "@/data/transactionListData";

export type FilterLabel = "All" | "Income" | "Expenses";

export type TransactionSection = SectionListData<Transaction, { title: string }>;

// A section header row in the flat list
export type SectionHeaderRow = {
  rowType: "header";
  title: string;
};

// A transaction item row in the flat list
export type TransactionItemRow = Transaction & {
  rowType: "item";
};

// Union of all row types for LegendList
export type TransactionListItem = SectionHeaderRow | TransactionItemRow;  