import { supabase } from "@/src/lib/supabase";
import { Budget } from "../types/budgetType";

//  Maps a Supabase row snakecase to frontend Budget camelCase.
export const toBudget = (row: Record<string, unknown>): Budget => ({
  id: row.id as string,
  amount: Number(row.amount),
  month: row.month as string,
  category: row.category as string | undefined,
});

export const fetchBudgets = async (userId: string): Promise<Budget[]> => {
  const { data, error } = await supabase
    .from("budgets")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return (data ?? []).map(toBudget);
};

// If the budget has an ID, it updates.
export const upsertBudget = async (
  budget: Budget,
  userId: string
): Promise<Budget> => {
  const isTempId = !isNaN(Number(budget.id));

  const row = {
    ...(isTempId ? {} : { id: budget.id }),
    user_id: userId,
    amount: budget.amount,
    month: budget.month,
    category: budget.category ?? null,
  };

  const { data, error } = await supabase
    .from("budgets")
    .upsert(row, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;

  return toBudget(data);
};
