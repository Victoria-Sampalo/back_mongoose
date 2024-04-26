// routes/userRoutes.js
const express = require('express');
const router = express.Router()
const {postCreateUser,getAllUsers, getUserById} = require('../controllers/indexController')
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

// router.get("/users", urlencodedParser, getUser)
// router.get("/user/:id", urlencodedParser, getUserID)
router.post("/createuser", urlencodedParser,postCreateUser)
router.get("/users/:id", urlencodedParser,getUserById);
// router.get("/users", urlencodedParser,getAllUsers)


// router.delete("/borrarusuario/:id", urlencodedParser,UserDeleteId)
// router.put("/actualizarusuario", urlencodedParser,userPut)

module.exports = router;
