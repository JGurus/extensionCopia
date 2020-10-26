const bcrypt = require("bcryptjs");
const User = require("../models/user");
const setToken = require("../helpers/setToken");
const Doc = require("../models/Doc");
const Sesion = require("../models/Sesiones");
const { validationResult } = require("express-validator");
const Sesiones = require("../models/Sesiones");
const { findByIdAndRemove } = require("../models/user");
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
    if (userDb.active !== true)
      return res.status(401).json({ msg: "Este usuario no esta activado :(" });
    const sesion = await Sesion.findOne({ user: usuario });
    if (sesion)
      return res.status(401).json({ msg: "ya estas activo en otro pc" });
    const newSesion = Sesiones({ user: usuario });
    await newSesion.save();
    setToken(res, userDb._id, userDb.admin, userDb.usuario);
  } catch (error) {
    console.log(error);
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
  try {
    const usuario = await User.findById(req.usuario.id).select("-contrasenia");
    if (!usuario) return res.status(404).json({ msg: "Usuario no encontrado" });
    res.status(200).json({ usuario });
  } catch (error) {
    res.status(500).json("Hubo un error");
  }
};

exports.obtenerDoc = async (req, res) => {
  try {
    const doc = await Doc.find();
    if (doc.length < 1) {
      return res.status(404).json({ msg: "No hay documentos" });
    }
    res.status(200).json({ doc });
  } catch (error) {
    console.log(error);
    res.status(500).json("Hubo un error");
  }
};

exports.cerrarSesion = async (req, res) => {
  try {
    const sesion = await Sesion.findOneAndRemove({
      user: req.usuario.name,
    });
    res.status(200).json({ msg: "ha cerrado sesion" });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
