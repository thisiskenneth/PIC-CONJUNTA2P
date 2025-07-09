const Usuario = require("../models/Usuario");

exports.getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUsuario = async (req, res) => {
  try {
    const { nombres, apellidos, email, contrasena, tipo_usuario } = req.body;

    if (!nombres || !apellidos || !email || !contrasena || !tipo_usuario) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    const nuevoUsuario = await Usuario.create({
      nombres,
      apellidos,
      email,
      contrasena,
      tipo_usuario,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { email, contrasena } = req.body;

    if (!email || !contrasena) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }

    const usuario = await Usuario.getByEmail(email);
    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({
      id_usuario: usuario.id_usuario,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
