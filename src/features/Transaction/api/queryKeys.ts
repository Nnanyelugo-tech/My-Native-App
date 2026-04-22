// queryKeys.ts - Defines query key arrays used by react-query.
// This ensures consistent cache invalidation and refetching.
export const queryKeys = {
  transactions: (userId: string) => ["transactions", userId],
  budgets: (userId: string) => ["budgets", userId],
  dashboard: (userId: string) => ["dashboard", userId],
};
