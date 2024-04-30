// routes/userRoutes.js
const express = require('express');
const router = express.Router()
const {postCreateUser,getAllUsers, getUserById, deleteUserById, updateUserById} = require('../controllers/indexController')
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.get("/users", urlencodedParser, getUser)
// router.get("/user/:id", urlencodedParser, getUserID)
router.post("/createuser", urlencodedParser,postCreateUser)
//comentado, esto sirve
 router.get("/users", urlencodedParser,getAllUsers)

router.get("/user/:id", urlencodedParser,getUserById);

router.delete("/deleteuser/:id", urlencodedParser,deleteUserById);

router.put("/updateuser", urlencodedParser,updateUserById);

// router.delete("/borrarusuario/:id", urlencodedParser,UserDeleteId)
// router.put("/actualizarusuario", urlencodedParser,userPut)

module.exports = router;
