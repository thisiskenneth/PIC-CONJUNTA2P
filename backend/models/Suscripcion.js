const pool = require("../config/db");

class Suscripcion {
  constructor({ id_suscripcion, id_usuario, id_curso, fecha }) {
    this.id_suscripcion = id_suscripcion;
    this.id_usuario = id_usuario;
    this.id_curso = id_curso;
    this.fecha = fecha;
  }

  static async create({ id_usuario, id_curso, fecha }) {
    const result = await pool.query(
      `INSERT INTO suscripcion (id_usuario, id_curso, fecha)
       VALUES ($1, $2, $3) RETURNING *`,
      [id_usuario, id_curso, fecha]
    );
    return new Suscripcion(result.rows[0]);
  }

  static async getByUsuarioYCurso(id_usuario, id_curso) {
    const result = await pool.query(
      "SELECT * FROM suscripcion WHERE id_usuario = $1 AND id_curso = $2",
      [id_usuario, id_curso]
    );
    if (result.rowCount === 0) return null;
    return new Suscripcion(result.rows[0]);
  }

  static async deleteByUsuarioYCurso(id_usuario, id_curso) {
    const result = await pool.query(
      "DELETE FROM suscripcion WHERE id_usuario = $1 AND id_curso = $2 RETURNING *",
      [id_usuario, id_curso]
    );
    return result.rowCount > 0;
  }

  static async getByUsuario(id_usuario) {
    const result = await pool.query(
      `SELECT s.*, c.nombre AS curso_nombre, c.estado
       FROM suscripcion s
       JOIN curso c ON s.id_curso = c.id_curso
       WHERE s.id_usuario = $1`,
      [id_usuario]
    );
    return result.rows;
  }
}

module.exports = Suscripcion;
