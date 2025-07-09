const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");

router.get("/", UsuarioController.getAllUsuarios);
router.post("/", UsuarioController.createUsuario);
router.post("/login", UsuarioController.loginUsuario);

module.exports = router;
