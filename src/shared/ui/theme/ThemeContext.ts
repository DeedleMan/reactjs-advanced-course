import { createContext, useContext } from "react";

export enum ETheme {
  LIGHT = "light",
  DARK = "dark",
}

export interface IThemeContextValue {
  theme: ETheme;
  setTheme: (theme: ETheme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContextValue | undefined>(
  undefined,
);

export const useTheme = (): IThemeContextValue => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
