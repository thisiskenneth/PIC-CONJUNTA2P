import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUsuario } from "../services/usuarioService";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !contrasena) {
      setError("Por favor, complete ambos campos.");
      return;
    }

    try {
      const usuario = await loginUsuario(email, contrasena);
      login(usuario);
      console.log("🧠 Usuario recibido:", usuario);

      if (usuario.tipo_usuario === "administrador") {
        navigate("/admin/usuarios");
      } else if (usuario.tipo_usuario === "creador") {
        navigate("/creadores");
      } else if (usuario.tipo_usuario === "consumidor") {
        navigate("/consumidores/disponibles");
      } else {
        setError("Tipo de usuario no reconocido");
      }
    } catch (err: any) {
      setError("Credenciales inválidas o error en el servidor.");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={6}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom align="center">
        Iniciar Sesión
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Correo electrónico"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          placeholder="correo@ejemplo.com"
        />

        <TextField
          fullWidth
          label="Contraseña"
          variant="outlined"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          margin="normal"
          placeholder="********"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.5 }}
        >
          Ingresar
        </Button>
      </form>
    </Box>
  );
};
