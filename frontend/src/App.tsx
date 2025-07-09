import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import { Navbar } from "./components/NavBar"; // importa tu Navbar
import { Login } from "./auth/Login";
import { Admin } from "./pages/Admin";
import { Creadores } from "./pages/Creadores";
import { Consumidores } from "./pages/Consumidores";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Mostrar Navbar solo si hay usuario */}
      {user && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/creadores/*" element={<Creadores />} />
        <Route path="/consumidores/*" element={<Consumidores />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default App;
