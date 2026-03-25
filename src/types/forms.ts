import { Control, FieldValues, Path } from "react-hook-form";
import { TextInputProps } from "react-native";

export type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
} & TextInputProps;