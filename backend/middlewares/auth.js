const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  //Verificar el token del header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No has proveido el token" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.usuario = decode.usuario;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Token Invalido" });
  }
};
