import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {UsuarioForm} from "../components/UsuarioForm";
import { ListaUsuarios } from "../components/ListaUsuarios";

export const Admin: React.FC = () => {
  const { user, isAuthResolved } = useAuth();
  console.log("🧠 Usuario cargado:", user);

  // ⏳ Espera a que se resuelva el estado de autenticación
  if (!isAuthResolved) {
    return <div className="p-6 text-center">Verificando acceso...</div>;
  }

  // 🔐 Redirige si no hay usuario autenticado
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 🔐 Redirige si el tipo de usuario no es administrador
  if (user.tipo_usuario !== "administrador") {
    if (user.tipo_usuario === "creador") return <Navigate to="/creadores" />;
    if (user.tipo_usuario === "consumidor")
      return <Navigate to="/consumidores" />;
    return <Navigate to="/" />;
  }

  // ✅ Renderiza el panel del admin
  return (
    <main className="p-6">
      <Routes>
        <Route path="/usuarios/crear" element={<UsuarioForm />} />
        <Route path="/usuarios/" element={<ListaUsuarios />} />
        
        <Route path="*" element={<Navigate to="/admin/usuarios" />} />
      </Routes>
    </main>
  );
};
