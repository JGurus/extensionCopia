const User = require("../models/user");
const Doc = require("../models/Doc");
exports.obtenerUsuarios = async (req, res) => {
  try {
    if (req.usuario.admin === false)
      return res.status(401).json({ msg: "No eres admin" });
    const listUser = await User.find().select("-contrasenia");
    if (listUser.length < 1)
      return res.status(404).json({ msg: "No hay mensajes" });
    res.status(200).json({ listUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
exports.editarActivo = async (req, res) => {
  try {
    if (req.usuario.admin === false)
      return res.status(401).json({ msg: "No eres admin" });
    const userDB = await User.findByIdAndUpdate(req.body.id, {
      $set: { active: req.body.active },
    });
    userDB.active = req.body.active;
    console.log(userDB);
    res.status(200).json({ userDB });
  } catch (error) {
    console.log(error);
  }
};
exports.editarDoc = async (req, res) => {
  console.log(req.body);
  try {
    if (req.usuario.admin === false)
      return res.status(401).json({ msg: "No eres admin" });

    const doc = await Doc.find();
    if (doc.length > 0) {
      const newDoc = await Doc.findByIdAndUpdate(doc[0]._id, {
        $set: { doc: req.body.doc },
      });
    } else {
      const newDoc = new Doc(req.body);
      await newDoc.save();
    }
    res.status(200).json({ msg: "Exito" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
