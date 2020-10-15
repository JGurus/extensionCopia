const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  usuario: { type: String, required: true, unique: true, lowercase: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  admin: { type: Boolean, default: false },
  contrasenia: { type: String, required: true },
});
module.exports = model("User", userSchema);
