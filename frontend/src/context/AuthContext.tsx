import { createContext, type ReactNode, useState } from "react";
import type { AppContextType } from "../types/AppContextType";

export const AuthContext = createContext<AppContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AppContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const value: AppContextType = {
    isAuthenticated,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
