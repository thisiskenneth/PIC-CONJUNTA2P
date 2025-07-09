const bcrypt = require("bcrypt");
const Usuario = require("../models/Usuario");

const adminData = {
  nombres: "Admin",
  apellidos: "Principal",
  email: "admin@admin.com",
  contrasena: "12345678", 
  tipo_usuario: "administrador",
};

async function crearAdminPorDefecto() {
  try {
    const existente = await Usuario.getByEmail(adminData.email);
    if (existente) {
      console.log("✅ El usuario admin ya existe.");
      return;
    }

    const hashedPassword = await bcrypt.hash(adminData.contrasena, 10);
    await Usuario.create({ ...adminData, contrasena: hashedPassword });

    console.log("✅ Usuario admin creado exitosamente.");
  } catch (error) {
    console.error("❌ Error creando el usuario admin:", error.message);
  }
}

module.exports = crearAdminPorDefecto;
