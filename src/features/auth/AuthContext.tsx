import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "./api";

type User = {
  id: number;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  // Load user from localStorage on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // LOGIN
  async function login(email: string, password: string) {
    const { token } = await loginUser(email, password);

    const payload = JSON.parse(atob(token.split(".")[1]));

    const userObj = {
      id: payload.id,
      email: payload.email,
      name: payload.name,
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userObj));

    setUser(userObj);
    setLoginOpen(false);
  }

  // REGISTER
  async function register(name: string, email: string, password: string) {
    await registerUser(name, email, password);
    await login(email, password); // auto-login
  }

  // LOGOUT
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
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
