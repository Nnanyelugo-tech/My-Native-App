// export const Colors = {
//   light: {
//     text: "#1A1A2E",
//     background: "#F9F9FB",
//     textSecondary: "#9E9E9E",
//     surface: "#FFFFFF",
//     border: "#F0EEF6",
//     brand: "#1A237E",
//   },

//   dark: {
//     text: "#FFFFFF",
//     background: "#151718",
//     textSecondary: "#9BA1A6",
//     surface: "#1C1C1E",
//     border: "#2C2C2E",
//     brand: "#5E5CE6",
//   },
// };

export type ThemeColors = {
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  brand: string;
};

export const Colors: Record<"light" | "dark", ThemeColors> = {
  light: {
    text: "#1A1A2E",
    textSecondary: "#9E9E9E",
    background: "#F9F9FB",
    surface: "#FFFFFF",
    border: "#F0EEF6",
    brand: "#1A237E",
  },

  dark: {
    text: "#FFFFFF",
    textSecondary: "#9BA1A6",
    background: "#151718",
    surface: "#1C1C1E",
    border: "#2C2C2E",
    brand: "#5E5CE6",
  },
};