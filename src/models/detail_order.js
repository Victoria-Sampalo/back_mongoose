const mongoose = require("mongoose");

// Define el esquema para la cantidad de productos
const cantidadProductsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true,
    }

});

// Define el esquema para la colección detail_orders
const detailOrderSchema = new mongoose.Schema({
    id_user: {
        type: String,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    order_date: {
        type: Date,
        default: Date.now
    },
    list_products: [cantidadProductsSchema], // Array de cantidad de productos
    order_status: {
        type: String,
        enum: ['activo', 'preparado', 'enviado', 'completo'],
        default: 'activo'
    },
    shipping_address: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    shipping_date: {
        type: Date
    },
    delivery_date: {
        type: Date
    }
});

// Crea el modelo DetailOrder usando el esquema detailOrderSchema
const DetailOrder = mongoose.model('DetailOrder', detailOrderSchema);

module.exports = DetailOrder;
