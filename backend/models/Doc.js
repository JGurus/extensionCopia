const { Schema, model } = require("mongoose");
const docSchema = new Schema({
  doc: { type: String, required: true },
});

module.exports = model("documento", docSchema);
