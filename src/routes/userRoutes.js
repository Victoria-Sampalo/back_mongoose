// routes/userRoutes.js
const express = require('express');
const router = express.Router()
const {postCreateUser,getAllUsers, getUserById, deleteUserById, updateUserById, tokenValid, tokenValidAdmin} = require('../controllers/indexController')
const bodyParser = require('body-parser');


const urlencodedParser = bodyParser.urlencoded({ extended: false })
//Especificación tipo de usuario necesario o ninguno.
// /createuser ninguno
// tokenValid -> /user/:id, deleteuser, updateuser 
// tokenValidAdmin -> /users, 
router.post("/createuser", urlencodedParser,postCreateUser)

//check
 router.get("/users", urlencodedParser,tokenValidAdmin,getAllUsers)
//check
router.get("/user/:id", urlencodedParser,tokenValid,getUserById);
//check
router.delete("/deleteuser/:id", urlencodedParser,tokenValid,deleteUserById);
//check
router.put("/updateuser", urlencodedParser,tokenValid,updateUserById);


module.exports = router;
