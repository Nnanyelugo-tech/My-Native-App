export type ThemeColors = {
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  brand: string;
  brandMain: string;
  brandIndigo: string;
  brandBgMedium: string;
  brandBgDark: string;
  textMuted: string;
  placeholder: string;
  divider: string;
  successMuted: string;
  success: string;
  danger: string;
  dangerMuted: string;
  warning: string;
  chartData: string;
  chartPurple: string;
  textInverse: string;
  inverse: string;
};

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    text: "#1A1A2E",
    textSecondary: "#9E9E9E",
    background: "#F9F9FB",
    surface: "#FFFFFF",
    border: "#F0EEF6",
    brand: "#1A237E",
    brandMain: "#1A237E",
    brandIndigo: "#283593",
    brandBgMedium: "#E8EAF6",
    brandBgDark: "#EDE7F6",
    textMuted: "#555555",
    placeholder: "#9CA3AF",
    divider: "#F0EEF6",
    success: "#00E676",
    successMuted: "#4CAF50",
    danger: "#FF1744",
    dangerMuted: "#EF5350",
    warning: "#FF9800",
    chartData: "#CFD8DC",
    chartPurple: "#AB47BC",
    textInverse: "#FFFFFF",
    inverse: "#FFFFFF",
  },

  dark: {
    text: "#FFFFFF",
    textSecondary: "#9BA1A6",
    background: "#151718",
    surface: "#1C1C1E",
    border: "#2C2C2E",
    brand: "#5E5CE6",
    brandMain: "#5E5CE6",
    brandIndigo: "#4B4ACF",
    brandBgMedium: "#2C2C2E",
    brandBgDark: "#3A3A3C",
    textMuted: "#8E8E93",
    placeholder: "#555557",
    divider: "#2C2C2E",
    success: "#30D158",
    successMuted: "#34C759",
    danger: "#FF453A",
    dangerMuted: "#FF3B30",
    warning: "#FF9F0A",
    chartData: "#455A64",
    chartPurple: "#D1C4E9",
    textInverse: "#1A1A2E",
    inverse: "#1A1A2E",
  },
};