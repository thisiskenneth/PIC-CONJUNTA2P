import type { Curso, EstadoCurso } from "../interfaces/Curso";

const API_URL = "http://localhost:3000/api/cursos";

export const getCursos = async (): Promise<Curso[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener cursos");
  return await response.json();
};

export const getCursosByCreador = async (
  creadorId: number
): Promise<Curso[]> => {
  const response = await fetch(`${API_URL}?creadorId=${creadorId}`);
  if (!response.ok) throw new Error("Error al obtener cursos por creador");
  return await response.json();
};

export const getCursoById = async (id: number): Promise<Curso> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) throw new Error("Error al obtener curso por ID");
  return await response.json();
};

export const createCurso = async (
  curso: Omit<Curso, "id_curso">
): Promise<Curso> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(curso),
  });
  if (!response.ok) throw new Error("Error al crear curso");
  return await response.json();
};

export const cambiarEstadoCurso = async (
  id: number,
  nuevoEstado: EstadoCurso
): Promise<Curso> => {
  const response = await fetch(`${API_URL}/${id}/estado`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado: nuevoEstado }),
  });
  if (!response.ok) throw new Error("Error al cambiar estado");
  return await response.json();
};

export const getCursosActivos = async (): Promise<Curso[]> => {
  const response = await fetch(`${API_URL}/activos`);
  if (!response.ok) throw new Error("Error al obtener cursos activos");
  return await response.json();
};
