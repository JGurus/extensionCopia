const { Router } = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const router = Router();

router.post(
  "/login",
  [
    check("usuario", "Nombre de usuario requerido").not().isEmpty(),
    check("contrasenia", "La contraseña es requerida").not().isEmpty(),
  ],
  authController.login
);

module.exports = router;
