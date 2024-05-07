// routes/userRoutes.js
const express = require('express');
const router = express.Router()
const {postCreateUser,getAllUsers, getUserById, deleteUserById, updateUserById} = require('../controllers/indexController')
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/createuser", urlencodedParser,postCreateUser)

 router.get("/users", urlencodedParser,getAllUsers)

router.get("/user/:id", urlencodedParser,getUserById);

router.delete("/deleteuser/:id", urlencodedParser,deleteUserById);

router.put("/updateuser", urlencodedParser,updateUserById);


module.exports = router;
