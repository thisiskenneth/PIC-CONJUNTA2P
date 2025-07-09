import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getSuscripcionesPorUsuario } from "../services/suscripcionService";
import type { SuscripcionConCurso } from "../interfaces/Suscripcion";

import {
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export const MisSuscripciones = () => {
  const { user } = useAuth();
  const [suscripciones, setSuscripciones] = useState<SuscripcionConCurso[]>([]);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <Box p={6} textAlign="center">
        <Typography variant="h6">Por favor, inicia sesión</Typography>
      </Box>
    );
  }

  useEffect(() => {
    const fetchSuscripciones = async () => {
      try {
        const data = await getSuscripcionesPorUsuario(user.id_usuario);
        setSuscripciones(data);
      } catch (e) {
        setError("Error al cargar suscripciones");
      }
    };

    fetchSuscripciones();
  }, [user]);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Mis Cursos Suscritos
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {suscripciones.map((s) => (
          <ListItem
            key={s.id_suscripcion}
            component={Paper}
            elevation={2}
            sx={{ p: 2, borderRadius: 2 }}
          >
            <ListItemText
              primary={
                <Typography fontWeight="bold">{s.curso_nombre}</Typography>
              }
              secondary={`Estado: ${s.estado}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
