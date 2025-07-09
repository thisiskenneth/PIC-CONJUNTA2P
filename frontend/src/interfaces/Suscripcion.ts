export interface Suscripcion {
  id_suscripcion?: number;
  id_usuario: number;
  id_curso: number;
  fecha: string; // formato YYYY-MM-DD
}

export interface SuscripcionConCurso extends Suscripcion {
  curso_nombre: string;
  estado: string;
}
