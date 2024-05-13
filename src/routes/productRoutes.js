const express = require('express');
const router = express.Router();
const { postCreateProduct, getAllProducts, getProductById, deleteProductById, updateProductById, getAllCategories, postProductsByFilters } = require('../controllers/indexController');
const bodyParser = require('body-parser');
const { generateRandomProducts } = require('../utils/generatorUtils');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/createproduct", urlencodedParser, postCreateProduct);

router.get("/products", urlencodedParser, getAllProducts);

router.get("/product/:id", urlencodedParser, getProductById);

router.delete("/deleteproduct/:id", urlencodedParser, deleteProductById);

router.put("/updateproduct", urlencodedParser, updateProductById);

router.get("/createramdonproducts", urlencodedParser, generateRandomProducts);

router.get("/categories", urlencodedParser, getAllCategories);

router.post("/productsbyfilters", urlencodedParser, postProductsByFilters);




module.exports = router;
