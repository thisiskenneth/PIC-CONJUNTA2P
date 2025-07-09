import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  createSuscripcion,
  deleteSuscripcionPorUsuarioYCurso,
  verificarSuscripcion,
} from "../services/suscripcionService";
import { getCursosActivos } from "../services/cursoService";
import type { Curso } from "../interfaces/Curso";
import dayjs from "dayjs";

import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Alert,
} from "@mui/material";

export const CursosDisponibles = () => {
  const { user } = useAuth();
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [estadoSuscripcion, setEstadoSuscripcion] = useState<
    Record<number, boolean>
  >({});
  const [mensaje, setMensaje] = useState("");

  if (!user) {
    return (
      <Box p={6} textAlign="center">
        <Typography variant="h6">Por favor, inicia sesión</Typography>
      </Box>
    );
  }

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const data = await getCursosActivos();
        setCursos(data);
      } catch (error) {
        console.error("Error al cargar cursos activos", error);
      }
    };

    fetchCursos();
  }, []);

  useEffect(() => {
    const verificar = async () => {
      if (!user || cursos.length === 0) return;
      const estados: Record<number, boolean> = {};
      for (const curso of cursos) {
        const suscrito = await verificarSuscripcion(
          user.id_usuario,
          curso.id_curso!
        );
        estados[curso.id_curso!] = suscrito;
      }
      setEstadoSuscripcion(estados);
    };
    verificar();
  }, [cursos, user]);

  const manejarSuscripcion = async (cursoId: number, suscrito: boolean) => {
    try {
      if (suscrito) {
        await deleteSuscripcionPorUsuarioYCurso(user.id_usuario, cursoId);
        setMensaje("🚫 Suscripción cancelada");
        setEstadoSuscripcion({ ...estadoSuscripcion, [cursoId]: false });
      } else {
        await createSuscripcion({
          id_usuario: user.id_usuario,
          id_curso: cursoId,
          fecha: dayjs().format("YYYY-MM-DD"),
        });
        setMensaje("✅ Suscripción realizada");
        setEstadoSuscripcion({ ...estadoSuscripcion, [cursoId]: true });
      }
    } catch {
      setMensaje("❌ Error en la suscripción");
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Cursos Disponibles
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
              p: 2,
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <ListItemText
              primary={
                <Typography variant="subtitle1" fontWeight="bold">
                  {curso.nombre}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {curso.descripcion}
                </Typography>
              }
            />
            <Button
              variant="contained"
              color={estadoSuscripcion[curso.id_curso!] ? "error" : "success"}
              onClick={() =>
                manejarSuscripcion(
                  curso.id_curso!,
                  estadoSuscripcion[curso.id_curso!]
                )
              }
              sx={{ mt: { xs: 2, sm: 0 }, minWidth: "130px" }}
            >
              {estadoSuscripcion[curso.id_curso!] ? "Cancelar" : "Suscribirse"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
