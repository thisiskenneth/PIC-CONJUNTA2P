import { useState } from "react";
import { createUsuario } from "../services/usuarioService";
import type { Usuario } from "../interfaces/Usuario";

import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
} from "@mui/material";

export const UsuarioForm = () => {
  const [form, setForm] = useState<Omit<Usuario, "id_usuario">>({
    nombres: "",
    apellidos: "",
    email: "",
    contrasena: "",
    tipo_usuario: "creador",
  });

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"success" | "error" | "">("");

  const handleSubmit = async () => {
    setLoading(true);
    setMensaje("");
    setTipoMensaje("");

    try {
      const { nombres, apellidos, email, contrasena } = form;

      if (!nombres || !apellidos || !email || !contrasena) {
        setMensaje("Todos los campos son obligatorios");
        setTipoMensaje("error");
        return;
      }

      if (contrasena.length < 8) {
        setMensaje("La contraseña debe tener al menos 8 caracteres");
        setTipoMensaje("error");
        return;
      }

      await createUsuario(form);

      setMensaje("¡Usuario creado exitosamente!");
      setTipoMensaje("success");

      setForm({
        nombres: "",
        apellidos: "",
        email: "",
        contrasena: "",
        tipo_usuario: "creador",
      });
    } catch (error) {
      setMensaje("Error al crear usuario. Inténtalo de nuevo.");
      setTipoMensaje("error");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    if (mensaje) setMensaje("");
  };

  return (
    <Box maxWidth={500} mx="auto" mt={7} px={2}>
      <Paper elevation={4} sx={{ borderRadius: 2 }}>
        <Box bgcolor="primary.main" color="white" p={2} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Crear Usuario
          </Typography>
        </Box>

        <Box p={4} display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Nombres"
            value={form.nombres}
            onChange={(e) => handleInputChange("nombres", e.target.value)}
            fullWidth
          />

          <TextField
            label="Apellidos"
            value={form.apellidos}
            onChange={(e) => handleInputChange("apellidos", e.target.value)}
            fullWidth
          />

          <TextField
            label="Correo electrónico"
            type="email"
            value={form.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            fullWidth
          />

          <TextField
            label="Contraseña"
            type="password"
            value={form.contrasena}
            onChange={(e) => handleInputChange("contrasena", e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select
              value={form.tipo_usuario}
              label="Tipo de Usuario"
              onChange={(e) =>
                handleInputChange("tipo_usuario", e.target.value)
              }
            >
              <MenuItem value="creador">Creador</MenuItem>
              <MenuItem value="consumidor">Consumidor</MenuItem>
              <MenuItem value="administrador">Administrador</MenuItem>
            </Select>
          </FormControl>

          {mensaje && (
            <Alert severity={tipoMensaje === "success" ? "success" : "error"}>
              {mensaje}
            </Alert>
          )}

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            fullWidth
            sx={{ py: 1.5 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Crear Usuario"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
