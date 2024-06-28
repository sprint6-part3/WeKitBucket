"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AuthProvider, useAuth };
