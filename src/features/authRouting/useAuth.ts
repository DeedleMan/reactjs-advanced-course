import { useContext } from "react";

import { AuthContext, type TAuthContextType } from "./AuthContext";

export const useAuth = (): TAuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};
