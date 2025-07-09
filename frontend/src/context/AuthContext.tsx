import React, { createContext, useContext, useEffect, useState } from "react";
import type { Usuario } from "../interfaces/Usuario";

interface AuthContextType {
  user: Usuario | null;
  isAuthResolved: boolean;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsAuthResolved(true);
  }, []);

  const login = (usuario: Usuario) => {
    localStorage.setItem("user", JSON.stringify(usuario));
    setUser(usuario);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthResolved, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
