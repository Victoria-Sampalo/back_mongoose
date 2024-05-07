const express = require('express');
const router = express.Router();

// Importar las rutas de usuarios y productos
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');

 
// Middleware para manejar datos JSON
router.use(express.json());

// Rutas para usuarios y productos
router.use('/api/users', userRoutes);
router.use('/api/products', productRoutes);
router.use('/api/orders', orderRoutes);
module.exports = router;
