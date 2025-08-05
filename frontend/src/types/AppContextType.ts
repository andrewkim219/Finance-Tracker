export interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  currentUser: any | null;
  setCurrentUser: (user: any | null) => void;
}
