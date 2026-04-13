export const queryKeys = {
  transactions: (userId: string) => ["transactions", userId],
  budgets: (userId: string) => ["budgets", userId],
  dashboard: (userId: string) => ["dashboard", userId],
};
