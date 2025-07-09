const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const UsuarioRoutes = require("./routes/UsuarioRoutes");
const CursoRoutes = require("./routes/CursoRoutes");
const SuscripcionRoutes = require("./routes/SuscripcionRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));

// Rutas nuevas
app.use("/api/usuarios", UsuarioRoutes); // localhost:3000/api/usuarios
app.use("/api/cursos", CursoRoutes); // localhost:3000/api/cursos
app.use("/api/suscripciones", SuscripcionRoutes); // localhost:3000/api/suscripciones

module.exports = app;
