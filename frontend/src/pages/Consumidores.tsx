import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CursosDisponibles } from "../components/CursosDisponibles";
import { MisSuscripciones } from "../components/MisSuscripciones";

export const Consumidores = () => {
  const { user, isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return <div className="p-6 text-center">Verificando acceso...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.tipo_usuario !== "consumidor") {
    if (user.tipo_usuario === "administrador") return <Navigate to="/admin" />;
    if (user.tipo_usuario === "creador") return <Navigate to="/creadores" />;
    return <Navigate to="/" />;
  }

  return (
    <main className="p-6">
      <Routes>
        <Route path="/disponibles" element={<CursosDisponibles />} />
        <Route path="/mis-cursos" element={<MisSuscripciones />} />
        <Route path="*" element={<Navigate to="/consumidores/disponibles" />} />
      </Routes>
    </main>
  );
};
