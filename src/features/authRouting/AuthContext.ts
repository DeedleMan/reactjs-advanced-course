import { createContext } from "react";

export type TAuthContextType = {
  user: IUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
};

export interface IUser {
  id: string;
  email: string;
}

export const AuthContext = createContext<TAuthContextType | null>(null);
