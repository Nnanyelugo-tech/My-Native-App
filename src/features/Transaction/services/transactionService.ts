import { supabase } from "@/src/lib/supabase";
import { Transaction, NewTransaction } from "../types/transactionType";

//  Maps a Supabase row snake_case to frontend Transaction camelCase.
export const toTransaction = (row: Record<string, unknown>): Transaction => ({
  id: row.id as string,
  title: row.title as string,
  category: row.category as string,
  date: row.date as string,
  amount: Number(row.amount),
  type: row.type as Transaction["type"],
  status: row.status as Transaction["status"],
  icon: row.icon as Transaction["icon"],
  iconBg: (row.icon_bg as string) ?? "#F5F5F5",
  iconColor: (row.icon_color as string) ?? "#9E9E9E",
  description: (row.description as string) ?? undefined,
  note: (row.note as string) ?? undefined,
});

//  Maps a frontend Transaction camelCase to Supabase row snakecase.
// Strips `id` when not provided so Supabase generates a UUID.
const toRow = (t: NewTransaction, userId: string) => ({
  ...(t.id ? { id: t.id } : {}),
  user_id: userId,
  title: t.title,
  category: t.category,
  date: t.date,
  amount: t.amount,
  type: t.type,
  status: t.status,
  icon: t.icon,
  icon_bg: t.iconBg,
  icon_color: t.iconColor,
  description: t.description ?? null,
  note: t.note ?? null,
});


// Fetch all transactions for the given user, ordered newest first.
export const fetchTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;

  return (data ?? []).map(toTransaction);
};

// Insert a new transaction and return the created row with Supabase UUID.
export const createTransaction = async (
  transaction: NewTransaction,
  userId: string
): Promise<Transaction> => {
  const { data, error } = await supabase
    .from("transactions")
    .insert(toRow(transaction, userId))
    .select()
    .single();

  if (error) throw error;

  return toTransaction(data);
};

// Update an existing transaction by ID.
export const updateTransactionById = async (
  transaction: Transaction,
  userId: string
): Promise<Transaction> => {
  const row = toRow(transaction, userId);
  delete row.id;

  const { data, error } = await supabase
    .from("transactions")
    .update(row)
    .eq("id", transaction.id)
    .select()
    .single();

  if (error) throw error;
  
  return toTransaction(data);
};

// Delete a transaction by ID.
export const deleteTransactionById = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
