// src/controllers/indexControllers.js
// 
const {postCreateUser, getAllUsers, getUserById, deleteUserById, updateUserById}=require("./userController");

module.exports = {
    postCreateUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    updateUserById
    
}