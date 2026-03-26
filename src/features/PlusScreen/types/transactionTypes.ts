import type { Category } from "../constants/transactions";

export type TransactionFormProps = {
  activeColor: string;
  categories: readonly Category[];
  title: string;
  onTitleChange: (v: string) => void;
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
  description: string;
  onDescriptionChange: (v: string) => void;
  date: string;
  time: string;
  notes: string;
  onNotesChange: (v: string) => void;
};
