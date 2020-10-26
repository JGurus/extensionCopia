const { Schema, model } = require("mongoose");
const messageSchema = new Schema({
  mensaje: { type: String, required: true },
  usuario: { type: String, lowercase: true, trim: true, required: true },
});

module.exports = model("message", messageSchema);
