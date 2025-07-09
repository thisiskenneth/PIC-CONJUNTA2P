import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getCursosByCreador,
  cambiarEstadoCurso,
} from "../services/cursoService";
import type { Curso, EstadoCurso } from "../interfaces/Curso";

import {
  Box,
  Typography,
  Paper,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
} from "@mui/material";

export const MisCursos = () => {
  const { user } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        if (!user?.id_usuario) return;
        const cursosData = await getCursosByCreador(user.id_usuario);
        setCursos(cursosData);
      } catch (e) {
        console.error("Error al cargar cursos:", e);
      }
    };

    fetchCursos();
  }, [user]);

  const handleEstadoChange = async (
    id_curso: number,
    nuevoEstado: EstadoCurso
  ) => {
    try {
      const actualizado = await cambiarEstadoCurso(id_curso, nuevoEstado);
      setCursos((prev) =>
        prev.map((curso) =>
          curso.id_curso === id_curso
            ? { ...curso, estado: actualizado.estado }
            : curso
        )
      );
      setMensaje("✅ Estado actualizado correctamente");
    } catch (err) {
      setMensaje("❌ Error al actualizar el estado");
    }

    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Mis Cursos
      </Typography>

      {mensaje && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {mensaje}
        </Alert>
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {cursos.map((curso) => (
          <ListItem
            key={curso.id_curso}
            component={Paper}
            elevation={3}
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {curso.nombre}
            </Typography>

            {curso.creador && (
              <Typography variant="body2" color="text.secondary">
                Creador: {curso.creador.nombres} {curso.creador.apellidos} (
                {curso.creador.email})
              </Typography>
            )}

            <FormControl fullWidth sx={{ mt: 1 }}>
              <InputLabel id={`estado-label-${curso.id_curso}`}>
                Estado
              </InputLabel>
              <Select
                labelId={`estado-label-${curso.id_curso}`}
                value={curso.estado}
                label="Estado"
                onChange={(e) =>
                  handleEstadoChange(
                    curso.id_curso!,
                    e.target.value as EstadoCurso
                  )
                }
              >
                <MenuItem value="en construcción">En construcción</MenuItem>
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>

            <Typography variant="body2" sx={{ mt: 1 }}>
              {curso.descripcion}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
