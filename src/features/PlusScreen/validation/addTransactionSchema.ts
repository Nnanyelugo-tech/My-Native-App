import * as Yup from "yup";

export const transactionSchema = Yup.object().shape({
  amount: Yup.string()
    .required("Amount is required")
    .test("is-number", "Amount must be a valid number", (value) => {
      if (!value) return false;
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    }),
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  category: Yup.string().required("Category is required"),
  description: Yup.string().optional(),
  notes: Yup.string().optional(),
});

export const budgetSchema = Yup.object().shape({
  amount: Yup.string()
    .required("Amount is required")
    .test("is-number", "Amount must be a valid number", (value) => {
      if (!value) return false;
      const num = parseFloat(value);
      return !isNaN(num) && num > 0;
    }),
});

export type TransactionFormValues = Yup.InferType<typeof transactionSchema>;
export type BudgetFormValues = Yup.InferType<typeof budgetSchema>;