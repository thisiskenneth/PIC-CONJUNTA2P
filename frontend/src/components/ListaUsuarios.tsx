import { useEffect, useState } from "react";
import { getUsuarios } from "../services/usuarioService";
import type { Usuario } from "../interfaces/Usuario";

import {
  Box,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [error, setError] = useState("");

  const fetchUsuarios = async () => {
    try {
      const data = await getUsuarios();
      setUsuarios(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar usuarios");
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h5" gutterBottom>
        Lista de Usuarios
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Nombres</strong>
              </TableCell>
              <TableCell>
                <strong>Apellidos</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Tipo</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id_usuario}>
                <TableCell>{usuario.id_usuario}</TableCell>
                <TableCell>{usuario.nombres}</TableCell>
                <TableCell>{usuario.apellidos}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.tipo_usuario}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
