const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const adminController = require("../controllers/adminControllers");
router.get("/", auth, adminController.obtenerUsuarios);
router.post("/active", auth, adminController.editarActivo);
router.post("/doc", auth, adminController.editarDoc);
module.exports = router;
