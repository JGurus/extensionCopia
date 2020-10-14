const { validatorFields } = require("../helpers/validatorFields");
exports.login = (req, res) => {
  validatorFields(req, res);

  res.json({ msg: "validando" });
};
