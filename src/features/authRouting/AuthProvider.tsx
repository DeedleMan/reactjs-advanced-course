import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  clearAuthFromStorage,
  loadAuthFromStorage,
  saveAuthToStorage,
} from "@/features/authRouting/lib/authStorage";

import { type TAuthContextType, type IUser, AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [stored, setStored] = useState(() => loadAuthFromStorage());
  const [isLoading, setIsLoading] = useState(() => false);

  useEffect(() => {
    const handleStorage = (e: StorageEvent): void => {
      if (e.key === "auth") {
        setStored(loadAuthFromStorage());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.v2.react-learning.ru/auth/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          },
        );

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.message || "Login failed");
        }

        const data = await response.json();
        /* data: { user: { id, email }, accessToken: "Bearer <token>" } */
        const token = data.accessToken;
        const user: IUser = data.user;

        saveAuthToStorage(user, token);
        setStored({ user, accessToken: token });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
    ): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.v2.react-learning.ru/auth/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          },
        );

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.message || "Registration failed");
        }

        const data = await response.json();
        const token = data.accessToken;
        const user: IUser = data.user;

        saveAuthToStorage(user, token);
        setStored({ user, accessToken: token });
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const logout = useCallback((): void => {
    clearAuthFromStorage();
    setStored(null);
  }, []);

  const value = useMemo<TAuthContextType>(
    () => ({
      user: stored?.user ?? null,
      accessToken: stored?.accessToken ?? null,
      isAuthenticated: !!stored,
      isLoading,
      login,
      register,
      logout,
    }),
    [stored, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
