const { validationResult } = require("express-validator");
exports.validatorFields = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res.status(500).json({ error: error.errors[0].msg });
};
