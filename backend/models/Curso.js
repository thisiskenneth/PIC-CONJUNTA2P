const pool = require("../config/db");

class Curso {
  constructor({ id_curso, nombre, descripcion, estado, id_creador }) {
    this.id_curso = id_curso;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.id_creador = id_creador;
  }

  static async getAll() {
    const result = await pool.query(
      `SELECT c.id_curso, c.nombre, c.descripcion, c.estado, c.id_creador,
              u.nombres AS creador_nombres, u.apellidos AS creador_apellidos, u.email AS creador_email
       FROM curso c
       JOIN usuario u ON c.id_creador = u.id_usuario
       ORDER BY c.id_curso`
    );

    return result.rows.map((row) => ({
      id_curso: row.id_curso,
      nombre: row.nombre,
      descripcion: row.descripcion,
      estado: row.estado,
      id_creador: row.id_creador,
      creador: {
        nombres: row.creador_nombres,
        apellidos: row.creador_apellidos,
        email: row.creador_email,
      },
    }));
  }

  static async getById(id) {
    const result = await pool.query(
      `SELECT c.id_curso, c.nombre, c.descripcion, c.estado, c.id_creador,
              u.nombres AS creador_nombres, u.apellidos AS creador_apellidos, u.email AS creador_email
       FROM curso c
       JOIN usuario u ON c.id_creador = u.id_usuario
       WHERE c.id_curso = $1`,
      [id]
    );

    if (result.rowCount === 0) return null;

    const row = result.rows[0];
    return {
      id_curso: row.id_curso,
      nombre: row.nombre,
      descripcion: row.descripcion,
      estado: row.estado,
      id_creador: row.id_creador,
      creador: {
        nombres: row.creador_nombres,
        apellidos: row.creador_apellidos,
        email: row.creador_email,
      },
    };
  }

  static async getByCreador(id_creador) {
    const result = await pool.query(
      "SELECT * FROM curso WHERE id_creador = $1",
      [id_creador]
    );
    return result.rows.map((row) => new Curso(row));
  }

  static async getCursosActivos() {
    const result = await pool.query(
      "SELECT * FROM curso WHERE estado = 'activo'"
    );
    return result.rows.map((row) => new Curso(row));
  }

  static async contarCursosActivosPorCreador(id_creador) {
    const result = await pool.query(
      "SELECT COUNT(*) FROM curso WHERE id_creador = $1 AND estado = 'activo'",
      [id_creador]
    );
    return parseInt(result.rows[0].count);
  }

  static async create({ nombre, descripcion, id_creador, estado }) {
    const result = await pool.query(
      `INSERT INTO curso (nombre, descripcion, id_creador, estado)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [nombre, descripcion, id_creador, estado || "en construcción"]
    );
    return new Curso(result.rows[0]);
  }

  static async cambiarEstado(id, nuevoEstado) {
    const result = await pool.query(
      "UPDATE curso SET estado = $1 WHERE id_curso = $2 RETURNING *",
      [nuevoEstado, id]
    );
    return result.rowCount > 0 ? new Curso(result.rows[0]) : null;
  }
}

module.exports = Curso;
