const app = require("./app"); // Importar la aplicación de Express
const pool = require("./config/db"); // Conexión a la base de datos
const crearAdminPorDefecto = require("./data/initAdmin"); // 💾 Cargar admin por defecto

const PORT = process.env.PORT || 3000;

pool.connect((err) => {
  if (err) {
    console.log("Error al conectar la base de datos");
  } else {
    console.log("Conexión a la base de datos exitosa");

    // 🧠 Crear admin si no existe
    crearAdminPorDefecto();

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  }
});
