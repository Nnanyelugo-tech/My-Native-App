export type Budget = {
    id: string;
    amount: number;
    month: string; // e.g. "March 2026"
    category?: string; // Optional: total budget or category-specific
};
