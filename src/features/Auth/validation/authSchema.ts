import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
  fullName: Yup.string()
    .transform((value) => value?.trim())
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters")
    .matches(/^[a-zA-Z\s'-]+$/, "Invalid name format")
    .required("Full name is required"),
  email: Yup.string()
    .transform((value) => value?.trim())
    .lowercase()
    .email("Enter a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .required("Email is required"),
  password: Yup.string()
    .transform((value) => value?.trim())
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .transform((value) => value?.trim())
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .transform((value) => value?.trim())
    .lowercase()
    .email("Enter a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .required("Email is required"),
  password: Yup.string()
    .transform((value) => value?.trim())
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must not exceed 128 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
});

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .transform((value) => value?.trim())
    .lowercase()
    .email("Enter a valid email address")
    .max(100, "Email must not exceed 100 characters")
    .required("Email is required"),
});