// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AppBar, Toolbar, Button, Box, Typography, Stack } from "@mui/material";

interface MenuItem {
  label: string;
  path: string;
}

export const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  let menuItems: MenuItem[] = [];

  if (user.tipo_usuario === "administrador") {
    menuItems.push(
      { label: "Crear Usuarios", path: "/admin/usuarios/crear" },
      { label: "Ver Usuarios", path: "/admin/usuarios" }
    );
  }

  if (user.tipo_usuario === "creador") {
    menuItems.push(
      { label: "Mis Cursos", path: "/creadores" },
      { label: "Crear Curso", path: "/creadores/crear" },
      { label: "Ver Cursos Creados", path: "/creadores/ver" }
    );
  }

  if (user.tipo_usuario === "consumidor") {
    menuItems.push(
      { label: "Cursos Disponibles", path: "/consumidores/disponibles" },
      { label: "Mis Suscripciones", path: "/consumidores/mis-cursos" }
    );
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <Typography variant="h6" component="div">
            Plataforma Cursos
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Box>
        <Button
          onClick={logout}
          color="inherit"
          variant="outlined"
          size="small"
        >
          Cerrar sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};
