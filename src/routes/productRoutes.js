const express = require('express');
const router = express.Router();
const { postCreateProduct, getAllProducts, getProductById, deleteProductById, updateProductById } = require('../controllers/indexController');
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/createproduct", urlencodedParser, postCreateProduct);

router.get("/products", urlencodedParser, getAllProducts);

router.get("/product/:id", urlencodedParser, getProductById);

router.delete("/deleteproduct/:id", urlencodedParser, deleteProductById);

router.put("/updateproduct", urlencodedParser, updateProductById);

module.exports = router;
