// src/controllers/indexControllers.js
const { postCreateUser, getAllUsers, getUserById, deleteUserById, updateUserById } = require("./userController");
const { postCreateProduct, getAllProducts, getProductById, deleteProductById, updateProductById } = require("./productController");
const { postCreateOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById } = require("./orderController");

module.exports = {
    postCreateUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById,
    postCreateProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    postCreateOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById,
};
