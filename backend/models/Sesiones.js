const { Schema, model } = require("mongoose");
const sesionSchema = new Schema({
  user: { type: String, required: true },
});

module.exports = model("sesiones", sesionSchema);
