// Type definitions for budget screen components.
export type BudgetCardProps = {
  budgetLimit: number;
  totalSpent: number;
  remaining: number;
  onEdit?: () => void;
};

// Type definitions for budget screen components.
export type StatTileProps = {
  label: string;
  value: number;
  arrowDir: "up" | "down";
};

export type CategoryBreakdownItem = {
  name: string;
  total: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  count: number;
};