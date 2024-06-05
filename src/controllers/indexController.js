// src/controllers/indexControllers.js
const { postCreateUser, getAllUsers, getUserById, deleteUserById, updateUserById } = require("./userController");
const { postCreateProduct, getAllProducts, getProductById, deleteProductById, updateProductById, getAllCategories, postProductsByFilters } = require("./productController");
const { postCreateOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById, getUserOrders } = require("./orderController");
const { register, login, validToken } = require("./loginController");
const {tokenValid, tokenValidAdmin} = require("./authController");

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
    getUserOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById,
    getAllCategories,
    postProductsByFilters,
    register,
    login,
    validToken,
    tokenValid,
    tokenValidAdmin

};
