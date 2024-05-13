// models/User.js
const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   // _id:mongoose.Schema.ObjectId,
//   nombre: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   // Otros campos...
// });


const userSchema = new mongoose.Schema({
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String },
  billing_address: { type: String },
  country: { type: String },
  phone: { type: String },
  date_of_birth: { type: Date, set: removeTime },
  registration_date: { type: Date, default: Date.now },
  type: { type: String, enum: ['normal', 'admin'], default: 'normal', required: true },
});

// Función para eliminar la parte de la hora de una fecha
function removeTime(date) {
  // Si el valor es nulo, devuelve nulo
  if (!date) return null;
  
  // Establece la hora, minutos, segundos y milisegundos a cero
  date.setHours(0, 0, 0, 0);
  
  // Devuelve la fecha modificada
  return date;
}


// const User = mongoose.model("User", userSchema);

//Exportación del modelo
module.exports = mongoose.model("User", userSchema);
