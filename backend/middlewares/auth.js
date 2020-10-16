const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "Token no proveido" });
  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.usuario = decode.usuario;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Token Invalido" });
  }
};
