const express = require('express');
const router = express.Router()


const bodyParser = require('body-parser');

const { postCreateOrder, getAllOrders, getOrderById, deleteOrderById, updateOrderById } = require('../controllers/orderController');

const urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post("/createorder", urlencodedParser, postCreateOrder);

router.get("/orders", urlencodedParser, getAllOrders);

router.get("/order/:id", urlencodedParser, getOrderById);

router.delete("/deleteorder/:id", urlencodedParser, deleteOrderById);

router.put("/updateorder", urlencodedParser, updateOrderById);


module.exports = router;