const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, enum: ['Elbow_Pads', 'Knee_Pads', 'Wrist_Guards', 'Backpacks', 'Vests', 'Belts', 'Ropes', 'Insoles', 'Other'], required: true },
  description: { type: String },
  images: [{ type: String }],
  creation_date: { type: Date, default: Date.now },
  stock: { type: Number, required: true },
  modify_date: { type: Date, default: Date.now }
});

//Exportación del modelo
module.exports = mongoose.model("Product", productSchema);

