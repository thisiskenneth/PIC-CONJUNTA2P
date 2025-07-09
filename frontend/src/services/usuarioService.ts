import type { Usuario } from "../interfaces/Usuario";

const API_URL = "http://localhost:3000/api/usuarios";

export const loginUsuario = async (
  email: string,
  contrasena: string
): Promise<Usuario> => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, contrasena }),
  });
  if (!response.ok) throw new Error("Credenciales inválidas");
  return await response.json();
};

export const createUsuario = async (
  usuario: Omit<Usuario, "id_usuario">
): Promise<Usuario> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuario),
  });
  if (!response.ok) throw new Error("Error al crear usuario");
  return await response.json();
};

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return await response.json();
};
