export interface Usuario {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  email: string;
  contrasena: string;
  tipo_usuario: "administrador" | "creador" | "consumidor";
}
