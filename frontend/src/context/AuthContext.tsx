import { createContext, type ReactNode } from "react";
import type { AppContextType } from "../types/AppContextType";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

export const AuthContext = createContext<AppContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

interface AppContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AppContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage("isAuthenticated", false);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);

  const value: AppContextType = {
    isAuthenticated,
    setIsAuthenticated,
    currentUser,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};