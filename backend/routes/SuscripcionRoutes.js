const express = require("express");
const router = express.Router();
const SuscripcionController = require("../controllers/SuscripcionController");

router.post("/", SuscripcionController.createSuscripcion);
router.get("/verificar", SuscripcionController.getPorUsuarioYCurso);
router.delete("/cancelar", SuscripcionController.deletePorUsuarioYCurso);
router.get("/usuario/:id", SuscripcionController.getByUsuario);

module.exports = router;
