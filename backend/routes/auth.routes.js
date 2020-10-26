const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.post(
  "/login",
  [
    check("usuario", "Nombre de usuario requerido").not().isEmpty(),
    check("contrasenia", "La contraseña es requerida").not().isEmpty(),
  ],
  authController.login
);
router.post(
  "/signup",
  [
    check("usuario", "Nombre de usuario requerido").not().isEmpty(),
    check(
      "contrasenia",
      "La contraseña debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "Ingrese un correo valido").isEmail(),
  ],
  authController.register
);
router.get("/user", auth, authController.getUser);
router.get("/doc", auth, authController.obtenerDoc);
router.delete("/", auth, authController.cerrarSesion);

module.exports = router;
