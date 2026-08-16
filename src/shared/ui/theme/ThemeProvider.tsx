import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { ETheme, IThemeContextValue, ThemeContext } from "./ThemeContext";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<ETheme>(ETheme.LIGHT);

  // Прокидываем тему на корневой элемент, чтобы её могли использовать
  // CSS-селекторы (включая содержимое порталов, DOM которого лежит вне дерева)
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback((next: ETheme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) =>
      prev === ETheme.DARK ? ETheme.LIGHT : ETheme.DARK,
    );
  }, []);

  const value = useMemo<IThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
