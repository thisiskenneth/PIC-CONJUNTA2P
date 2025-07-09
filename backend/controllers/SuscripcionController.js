const Suscripcion = require("../models/Suscripcion");

exports.createSuscripcion = async (req, res) => {
  try {
    const { id_usuario, id_curso, fecha_suscripcion } = req.body;
    if (!id_usuario || !id_curso) {
      return res
        .status(400)
        .json({ error: "ID de usuario e ID de curso son requeridos" });
    }

    const nueva = await Suscripcion.create({
      id_usuario,
      id_curso,
      fecha: fecha_suscripcion,
    });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPorUsuarioYCurso = async (req, res) => {
  const { usuario, curso } = req.query;
  if (!usuario || !curso) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const suscripcion = await Suscripcion.getByUsuarioYCurso(usuario, curso);
  if (!suscripcion) return res.status(404).json({ error: "No suscrito" });

  res.json(suscripcion);
};

exports.deletePorUsuarioYCurso = async (req, res) => {
  const { usuario, curso } = req.query;
  if (!usuario || !curso) {
    return res.status(400).json({ error: "Faltan parámetros" });
  }

  const eliminado = await Suscripcion.deleteByUsuarioYCurso(usuario, curso);
  if (!eliminado) {
    return res.status(404).json({ error: "Suscripción no encontrada" });
  }

  res.json({ message: "Suscripción cancelada correctamente" });
};

exports.getByUsuario = async (req, res) => {
  try {
    const id_usuario = parseInt(req.params.id);
    const suscripciones = await Suscripcion.getByUsuario(id_usuario);
    res.json(suscripciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
