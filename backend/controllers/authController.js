const bcrypt = require("bcryptjs");
const User = require("../models/user");
const setToken = require("../helpers/setToken");
const { validationResult } = require("express-validator");
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(401).json({ msg: errors.errors[0].msg });
  const { usuario, contrasenia } = req.body;
  try {
    const userDb = await User.findOne({ usuario });
    if (!userDb) return res.status(404).json({ msg: "Este usuario no existe" });
    const contraseniaCorrecta = await bcrypt.compare(
      contrasenia,
      userDb.contrasenia
    );
    if (!contraseniaCorrecta)
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    setToken(res, userDb._id);
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(401).json({ msg: errors.errors[0].msg });
  const { email, contrasenia, usuario } = req.body;
  try {
    let correo = email.split("@");
    if (correo[1] !== "est.itsgg.edu.ec")
      return res.status(400).json({ msg: "Email invalido" });
    const userDb = await User.findOne({
      $or: [{ usuario }, { email }],
    });
    if (userDb)
      return res.status(400).json({ msg: "Usuario o email ya en uso" });
    let newuser = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    newuser.contrasenia = await bcrypt.hash(contrasenia, salt);
    await newuser.save();
    res.status(200).json({ msg: "Usuario Registrado" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};

exports.getUser = async (req, res) => {
  console.log(req.usuario, "hola");
  try {
    const usuario = await User.findById(req.usuario).select("-contrasenia");
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json("Hubo un error");
  }
};
