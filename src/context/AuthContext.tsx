import { createContext, useContext, useState } from "react";

type User = { name: string } | null;

type AuthContextType = {
  user: User;
  login: (name: string) => void;
  logout: () => void;
  openLogin: () => void;
  closeLogin: () => void;
  loginOpen: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const login = (name: string) => {
    setUser({ name });
    setLoginOpen(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loginOpen,
        openLogin: () => setLoginOpen(true),
        closeLogin: () => setLoginOpen(false),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
