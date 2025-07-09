export type EstadoCurso = "en construcción" | "activo" | "inactivo";

export interface Curso {
  id_curso?: number;
  nombre: string;
  descripcion: string;
  estado: EstadoCurso;
  id_creador: number;
  creador?: {
    nombres: string;
    apellidos: string;
    email: string;
  };
}
