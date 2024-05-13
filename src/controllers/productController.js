//./src/constrollers/productController.js
const { Product } = require("../models/indexModels");
const {
  catchAsync,
  response,
  ClientError,
  validateText,
  validateNumber,
  validateDate,
  generateUniqueSKU,
} = require("../utils/indexUtils");

// Crear producto
const postCreateProduct = async (req, res) => {
  console.log(req.body);
  // Validar los datos del producto antes de crearlo
  if (
    !validateText(req.body.name) ||
    !validateNumber(req.body.price) ||
    !validateText(req.body.brand) ||
    !validateText(req.body.category) ||
    !validateText(req.body.description) ||
    !validateNumber(req.body.stock)
  ) {
    throw new ClientError("Los datos no son correctos", 400);
  }

  const newProduct = new Product({
    sku: await generateUniqueSKU(),
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    images: req.body.images,
    creation_date: Date.now(), // Fecha actual
    stock: req.body.stock,
    modify_date: Date.now(), // Fecha actual
  });

  // Guardar el nuevo producto
  const productSave = await newProduct.save();

  response(res, 200, productSave);
};

// Función para obtener todos los productos
const getAllProducts = async (req, res) => {
  // Consultar todos los productos de la base de datos
  const products = await Product.find();

  // Responder con los productos
  response(res, 200, products);
};

// Función para obtener un producto por su ID
const getProductById = async (req, res) => {
  // Consultar el producto por su ID en la base de datos
  const product = await Product.findById(req.params.id);

  // Si no existe el producto, devolver un error 404
  if (!product) {
    throw new ClientError("Producto no encontrado", 404);
  }

  // Responder con el producto
  response(res, 200, product);
};

// Función para eliminar un producto por su ID
const deleteProductById = async (req, res) => {
  // Buscar y eliminar el producto por su ID en la base de datos
  const productDelete = await Product.findByIdAndDelete(req.params.id);

  // Si no se encuentra el producto, devolver un error 404
  if (!productDelete) {
    throw new ClientError("Producto no encontrado", 404);
  }

  // Responder con un mensaje de éxito
  response(res, 200, { message: "Producto eliminado correctamente" });
};

// Función para modificar un producto por su ID
const updateProductById = async (req, res) => {
  const productId = { _id: req.body.id };
  const updateText = {};

  // Verificar si se proporcionaron datos válidos para actualizar
  if (req.body.sku && validateText(req.body.sku)) {
    updateText["sku"] = req.body.sku;
  }
  if (req.body.name && validateText(req.body.name)) {
    updateText["name"] = req.body.name;
  }
  if (req.body.price && validateNumber(req.body.price)) {
    updateText["price"] = req.body.price;
  }
  if (req.body.brand && validateText(req.body.brand)) {
    updateText["brand"] = req.body.brand;
  }
  if (req.body.category && validateText(req.body.category)) {
    updateText["category"] = req.body.category;
  }
  if (req.body.description && validateText(req.body.description)) {
    updateText["description"] = req.body.description;
  }
  if (Array.isArray(req.body.images)) {
    updateText["images"] = req.body.images;
  }
  if (req.body.creation_date && validateDate(req.body.creation_date)) {
    updateText["creation_date"] = req.body.creation_date;
  }
  if (req.body.stock && validateNumber(req.body.stock)) {
    updateText["stock"] = req.body.stock;
  }

  // Buscar y actualizar el producto por su ID en la base de datos
  const productUpdate = await Product.findByIdAndUpdate(productId, updateText, {
    new: true,
  });

  // Si no se encuentra el producto, devolver un error 404
  if (!productUpdate) {
    throw new ClientError("Producto no encontrado", 404);
  }

  // Responder con el producto actualizado
  response(res, 200, productUpdate);
};

//un get que me traiga el nombre de las categorias existentes
// Función para obtener todas las categorias
const getAllCategories = async (req, res) => {
  // Consultar todos los productos de la base de datos
  const categories = await Product.distinct("category");

  // Responder con los productos
  response(res, 200, categories);
};

// Función para buscar productos por filtros
const postProductsByFilters = async (req, res) => {
  // Obtener los parámetros de consulta de la solicitud GET
  const { minPrice, category } = req.body;
  console.log(req.body.minPrice)
  console.log(req.body.category)

  // Construir el objeto de filtros para la consulta
  const filters = {};
  if (minPrice !== undefined && minPrice !== null) {
    filters.price = { $gte: minPrice }; // Precio mayor o igual que minPrice
  }
  if (category !== undefined && category !== "" && category !== null) {
    filters.category = category; // Filtrar por categoría
  }
  // Si no se proporciona ningún filtro, no aplicar ningún filtro en la consulta
  if (Object.keys(filters).length === 0) {
    // Si no hay filtros, devolver todos los productos
    const allProducts = await Product.find();
    return res.status(200).json(allProducts);
  }
  // Realizar la consulta en la base de datos
  const products = await Product.find(filters);
  // console.log(products)
// const objectKeys = Object.keys(products);
// const objectLength = objectKeys.length;
// console.log(objectLength);

  // Responder con los productos encontrados
   res.status(200).json(products);
};

//contar los registros 


module.exports = {
  postCreateProduct: catchAsync(postCreateProduct),
  getAllProducts: catchAsync(getAllProducts),
  getProductById: catchAsync(getProductById),
  deleteProductById: catchAsync(deleteProductById),
  updateProductById: catchAsync(updateProductById),
  getAllCategories: catchAsync(getAllCategories),
  postProductsByFilters: catchAsync(postProductsByFilters),
};
