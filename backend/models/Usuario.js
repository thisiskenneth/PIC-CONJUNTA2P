const pool = require("../config/db");

class Usuario {
  constructor({ id_usuario, nombres, apellidos, email, contrasena, tipo_usuario }) {
    this.id_usuario = id_usuario;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.contrasena = contrasena;
    this.tipo_usuario = tipo_usuario;
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM usuario ORDER BY id_usuario");
    return result.rows.map((row) => new Usuario(row));
  }

  static async getByEmail(email) {
    const result = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
    if (result.rowCount === 0) return null;
    return new Usuario(result.rows[0]);
  }

  static async create({ nombres, apellidos, email, contrasena, tipo_usuario }) {
    const result = await pool.query(
      `INSERT INTO usuario (nombres, apellidos, email, contrasena, tipo_usuario)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombres, apellidos, email, contrasena, tipo_usuario]
    );
    return new Usuario(result.rows[0]);
  }
}

module.exports = Usuario;
