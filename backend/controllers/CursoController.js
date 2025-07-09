const Curso = require("../models/Curso");

exports.getAllCursos = async (req, res) => {
  try {
    const { creadorId } = req.query;
    const cursos = creadorId
      ? await Curso.getByCreador(creadorId)
      : await Curso.getAll();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.getById(req.params.id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCurso = async (req, res) => {
  try {
    const { nombre, descripcion, estado, id_creador } = req.body;

    if (!nombre || !id_creador) {
      return res
        .status(400)
        .json({ error: "Nombre e ID del creador son requeridos" });
    }

    if (estado === "activo") {
      const activos = await Curso.contarCursosActivosPorCreador(id_creador);
      if (activos >= 2) {
        return res
          .status(400)
          .json({ error: "Máximo 2 cursos activos por creador" });
      }
    }

    const curso = await Curso.create({
      nombre,
      descripcion,
      estado,
      id_creador,
    });
    res.status(201).json(curso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cambiarEstadoCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    if (!["en construcción", "activo", "inactivo"].includes(estado)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const curso = await Curso.getById(id);
    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });

    if (estado === "activo" && curso.estado !== "activo") {
      const activos = await Curso.contarCursosActivosPorCreador(
        curso.id_creador
      );
      if (activos >= 2) {
        return res
          .status(400)
          .json({ error: "Máximo 2 cursos activos por creador" });
      }
    }

    const actualizado = await Curso.cambiarEstado(id, estado);
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCursosActivos = async (req, res) => {
  try {
    const cursos = await Curso.getCursosActivos();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: "Error interno al obtener cursos activos" });
  }
};
