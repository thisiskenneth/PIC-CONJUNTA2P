const express = require("express");
const router = express.Router();
const CursoController = require("../controllers/CursoController");

router.get("/", CursoController.getAllCursos);
router.get("/activos", CursoController.getCursosActivos);
router.get("/:id", CursoController.getCursoById);
router.post("/", CursoController.createCurso);
router.patch("/:id/estado", CursoController.cambiarEstadoCurso);

module.exports = router;
