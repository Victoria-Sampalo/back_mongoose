// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Otros campos...
});

const User = mongoose.model("User", userSchema);

//Exportación del modelo
module.exports = User;
