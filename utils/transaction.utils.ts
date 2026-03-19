import { Transaction } from "@/data/transactionListData";
import {
  TransactionSection,
  TransactionListItem,
  FilterLabel,
} from "@/types/transaction.types";

export const groupByDate = (
  transactions: Transaction[]
): TransactionSection[] => {
  const groups = new Map<string, Transaction[]>();

  for (const tx of transactions) {
    const existing = groups.get(tx.dateGroup);
    if (existing) {
      existing.push(tx);
    } else {
      groups.set(tx.dateGroup, [tx]);
    }
  }

  return Array.from(groups, ([title, data]) => ({ title, data }));
};

//Flatten grouped sections into a single array for LegendList
export const flattenSections = (
  sections: TransactionSection[]
): TransactionListItem[] => {
  const items: TransactionListItem[] = [];

  for (const section of sections) {
    items.push({ rowType: "header", title: section.title });
    for (const tx of section.data) {
      items.push({ ...tx, rowType: "item" });
    }
  }

  return items;
};

export const matchesSearch = (
  tx: Transaction,
  query: string
): boolean => {
  const q = query.toLowerCase();
  return (
    tx.title.toLowerCase().includes(q) ||
    tx.category.toLowerCase().includes(q) ||
    tx.dateGroup.toLowerCase().includes(q)
  );
};

export const matchesFilter = (
  tx: Transaction,
  filter: FilterLabel
): boolean => {
  if (filter === "All") return true;
  if (filter === "Income") return tx.type === "income";
  return tx.type === "expense";
};