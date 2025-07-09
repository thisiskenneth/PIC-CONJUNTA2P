import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CrearCurso } from "../components/CrearCurso";
import { MisCursos } from "../components/MisCursos";
import { TodosLosCursos } from "../components/TodosLosCursos";

export const Creadores = () => {
  const { user, isAuthResolved } = useAuth();

  if (!isAuthResolved) {
    return <div className="p-6 text-center">Verificando acceso...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.tipo_usuario !== "creador") {
    if (user.tipo_usuario === "administrador") return <Navigate to="/admin" />;
    if (user.tipo_usuario === "consumidor") return <Navigate to="/consumidores" />;
    return <Navigate to="/" />;
  }

  return (
    <main className="p-6">
      <Routes>
        <Route path="/crear" element={<CrearCurso />} />
        <Route path="/mis-cursos" element={<MisCursos />} />
        <Route path="/ver" element={<TodosLosCursos/>} />
        <Route path="*" element={<Navigate to="/creadores/mis-cursos" />} />
      </Routes>
    </main>
  );
};
