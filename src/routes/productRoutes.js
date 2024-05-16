const express = require('express');
const router = express.Router();
const { postCreateProduct, getAllProducts, getProductById, deleteProductById, updateProductById, getAllCategories, postProductsByFilters, validToken, tokenValidAdmin, tokenValid } = require('../controllers/indexController');
const bodyParser = require('body-parser');
const { generateRandomProducts } = require('../utils/generatorUtils');

const urlencodedParser = bodyParser.urlencoded({ extended: false });
//Especificación tipo de usuario necesario o ninguno.
// products ninguno, product/:id
// tokenValid -> createproduct, deleteuser, updateuser 
// tokenValidAdmin -> createproduct, 
router.post("/createproduct", urlencodedParser,tokenValidAdmin, postCreateProduct);

router.get("/products", urlencodedParser, getAllProducts);

router.get("/product/:id", urlencodedParser, getProductById);

router.delete("/deleteproduct/:id", urlencodedParser,tokenValidAdmin, deleteProductById);

router.put("/updateproduct", urlencodedParser,tokenValid, updateProductById);

router.get("/createramdonproducts", urlencodedParser, generateRandomProducts);

router.get("/categories", urlencodedParser, getAllCategories);

router.post("/productsbyfilters", urlencodedParser, postProductsByFilters);




module.exports = router;
