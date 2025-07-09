import type { Suscripcion } from "../interfaces/Suscripcion";

const API_URL = "http://localhost:3000/api/suscripciones";

export const createSuscripcion = async (
  suscripcion: Omit<Suscripcion, "id_suscripcion">
): Promise<Suscripcion> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(suscripcion),
  });
  if (!response.ok) throw new Error("Error creando suscripción");
  return await response.json();
};

export const verificarSuscripcion = async (
  id_usuario: number,
  id_curso: number
): Promise<boolean> => {
  const response = await fetch(
    `${API_URL}/verificar?usuario=${id_usuario}&curso=${id_curso}`
  );
  return response.ok;
};

export const deleteSuscripcionPorUsuarioYCurso = async (
  id_usuario: number,
  id_curso: number
): Promise<void> => {
  const response = await fetch(
    `${API_URL}/cancelar?usuario=${id_usuario}&curso=${id_curso}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Error cancelando suscripción");
};

export const getSuscripcionesPorUsuario = async (
  id_usuario: number
): Promise<any[]> => {
  const response = await fetch(`${API_URL}/usuario/${id_usuario}`);
  if (!response.ok) throw new Error("Error al obtener las suscripciones");
  return await response.json();
};
