import { useEffect, useState } from "react";
import { getCursos } from "../services/cursoService";
import type { Curso } from "../interfaces/Curso";

import {
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export const TodosLosCursos = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getCursos();
        setCursos(data);
      } catch (e: any) {
        setError("❌ Error al cargar los cursos");
      }
    };
    fetch();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Todos los Cursos del Sistema
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {cursos.map((curso) => (
          <ListItem
            key={curso.id_curso}
            component={Paper}
            elevation={3}
            sx={{
              p: 2,
              borderRadius: 2,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {curso.nombre}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Estado: <strong>{curso.estado}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Creador:{" "}
              {curso.creador
                ? `${curso.creador.nombres} ${curso.creador.apellidos} (${curso.creador.email})`
                : "Desconocido"}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {curso.descripcion}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
