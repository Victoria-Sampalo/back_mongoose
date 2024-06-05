const express = require('express');
const router = express.Router()


const bodyParser = require('body-parser');

const { postCreateOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById, getUserOrders } = require('../controllers/orderController');
const {tokenValid,tokenValidAdmin} =require ('../controllers/indexController.js')
const urlencodedParser = bodyParser.urlencoded({ extended: false })



//Especificación tipo de usuario necesario o ninguno.
// /creatorder ninguno
// tokenValid -> /order/:id, deleteorder, updateorder
// tokenValidAdmin -> /orders, 
router.post("/createorder", urlencodedParser,tokenValid, postCreateOrder);

router.get("/orders", urlencodedParser,tokenValidAdmin, getAllOrders);

router.post("/getuserorders", urlencodedParser,tokenValid, getUserOrders);

router.get("/order/:id", urlencodedParser,tokenValid, getOrderById);

router.delete("/deleteorder/:id", urlencodedParser,tokenValidAdmin, deleteOrderById);

router.put("/updateorder", urlencodedParser,tokenValid, updateOrderById);


module.exports = router;