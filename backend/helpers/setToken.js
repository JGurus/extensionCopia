const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (res, id, admin) => {
  let payload = {
    usuario: id,
    admin: admin,
  };
  jwt.sign(
    payload,
    process.env.JWT_KEY,
    {
      expiresIn: 7200,
    },
    (error, token) => {
      if (error) return res.status(500).json({ msg: "Hubo un error" });
      return res.status(200).json({ token });
    }
  );
};
