import {
  FilterLabel,
  TransactionListItem,
  TransactionSection,
} from "@/src/features/Transaction/types/transaction.types";
import { Transaction } from "@/src/features/Transaction/types/transactionType";
import { formatDateGroup } from "@/src/utils/date";

export const groupByDate = (transactions: Transaction[]) => {
  //sort ALL transactions first
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  // Map to store groups keyed by date label
  const groups = new Map<string, Transaction[]>();

  //group already sorted data
  for (const tx of sorted) {
    const group = formatDateGroup(tx.date);

    if (!groups.has(group)) {
      // create a new array if this group doesn't exist
      groups.set(group, []);
    }
    // push transaction into the correct group
    groups.get(group)!.push(tx);
  }

  //preserve order
  return Array.from(groups.entries()).map(([title, data]) => ({
    title,
    data,
  }));
};

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

export const matchesSearch = (tx: Transaction, query: string) => {
  const q = query.toLowerCase();

  return (
    tx.title.toLowerCase().includes(q) ||
    tx.category.toLowerCase().includes(q)
  );
};

export const matchesFilter = (
  tx: Transaction,
  filter: FilterLabel
): boolean => {
  if (filter === "All") return true;
  if (filter === "Income") return tx.type === "income";
  if (filter === "Expenses") return tx.type === "expense";
  return true;
};