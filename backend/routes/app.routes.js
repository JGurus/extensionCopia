const { Router } = require("express");
const router = Router();
const appController = require("../controllers/appController");

router.get("/login", appController.login);

module.exports = router;
