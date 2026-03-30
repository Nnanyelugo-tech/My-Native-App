import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Category, TransactionMode } from "../constants/transactions";

export type TransactionFormProps<T extends FieldValues> = {
  activeColor: string;
  categories: readonly Category[];
  control: Control<T>;
  errors: FieldErrors<T>;
  date: string;
  time: string;
};

export type AmountInputProps<T extends FieldValues> = {
  activeTab: TransactionMode;
  activeColor: string;
  control: Control<T>;
  name: Path<T>;
  error?: string;
};

export type CategoryPickerProps = {
  categories: readonly Category[];
  selectedId: string;
  activeColor: string;
  onSelect: (id: string) => void;
};

export type ModeSelectorProps = {
  activeTab: TransactionMode;
  onSelect: (mode: TransactionMode) => void;
};