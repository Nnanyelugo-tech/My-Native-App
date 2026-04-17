import React, { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";
import { Uniwind } from "uniwind";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme | "system") => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  isDark: false,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useRNColorScheme() as Theme;
  const [override, setOverride] = useState<Theme | "system">("system");

  const theme = override === "system" ? systemTheme : override;

  const setTheme = (value: Theme | "system") => {
    setOverride(value);
    Uniwind.setTheme(value);
  };

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);