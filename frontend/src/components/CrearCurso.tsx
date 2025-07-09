// src/pages/CrearCurso.tsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createCurso } from "../services/cursoService";
import type { Curso } from "../interfaces/Curso";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";

export const CrearCurso = () => {
  const { user } = useAuth();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!user) {
      setError("No se ha iniciado sesión");
      return;
    }

    if (!nombre.trim() || !descripcion.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    const nuevoCurso: Omit<Curso, "id_curso"> = {
      nombre,
      descripcion,
      estado: "en construcción",
      id_creador: user.id_usuario,
    };

    try {
      await createCurso(nuevoCurso);
      setMensaje("✅ Curso creado correctamente");
      setNombre("");
      setDescripcion("");
    } catch (err) {
      setError("❌ Error al crear el curso");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={4}
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 6,
        p: 4,
        borderRadius: 3,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Crear nuevo curso
      </Typography>

      {mensaje && (
        <Alert severity="success" sx={{ mb: 2, justifyContent: "center" }}>
          {mensaje}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2, justifyContent: "center" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre del curso"
          fullWidth
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Descripción del curso"
          fullWidth
          multiline
          rows={4}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2, py: 1.2 }}
        >
          Crear Curso
        </Button>
      </form>
    </Box>
  );
};
