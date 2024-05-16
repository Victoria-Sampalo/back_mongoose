// routes/loginRoutes.js
const express = require('express');
const router = express.Router()



const bodyParser = require('body-parser');
const { register, login, validToken } = require('../controllers/loginController');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post("/register", urlencodedParser,register)

router.post("/login", urlencodedParser,login)

 router.post("/validtoken", urlencodedParser,validToken)
 
module.exports = router;