// utils/generatorUtils.js


const { Product } = require("../models/indexModels");// Asegúrate de importar tu modelo de producto
const { response } = require("./response");
// Función para generar un valor aleatorio de un conjunto dado
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const urlImageTest= "https://images.pexels.com/photos/221247/pexels-photo-221247.jpeg";


// Función para generar un SKU único ficticio
const generateUniqueSKU = async () => {
    // Generar un SKU aleatorio
    const randomSKU = Math.random().toString(36).substring(2, 10).toUpperCase();
  
    // Verificar si el SKU generado ya existe en la base de datos
    const existingProduct = await Product.findOne({ sku: randomSKU });
  
    // Si el SKU ya existe, llamar recursivamente a la función para generar uno nuevo
    if (existingProduct) {
      return generateUniqueSKU();
    }
  
    // Si el SKU es único, devolverlo
    return randomSKU;
  };

// Función para generar 50 productos aleatorios
async function generateRandomProducts(req, res) {
  // Conjuntos de valores posibles para cada campo
  const brands = ['Brand A', 'Brand B', 'Brand C'];
  const categories = ['Elbow_Pads', 'Knee_Pads', 'Wrist_Guards', 'Backpacks', 'Vests', 'Belts', 'Ropes', 'Insoles', 'Other'];
  const descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent metus augue, ullamcorper nec massa nec, varius ullamcorper tortor. Nunc et sem a sapien tristique dignissim ut quis lacus. Nam eu tincidunt turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut id augue massa. Phasellus non cursus lorem, quis semper turpis. Cras aliquet lacus leo, et placerat tellus fringilla in. Aliquam a efficitur justo. Nam eget nibh condimentum, elementum libero vel, fermentum lorem. Suspendisse vel placerat mauris, et pulvinar neque. ', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent metus augue, ullamcorper nec massa nec, varius ullamcorper tortor. Nunc et sem a sapien tristique dignissim ut quis lacus. Nam eu tincidunt turpis. Interdum et malesuada fames ac ante ipsum primis in faucibus. '];
  const images = [urlImageTest];
  
  let respuesta;
  
  // Crear 50 productos aleatorios
  for (let i = 0; i < 40; i++) {
    const category = getRandomValue(categories);
    const newProduct = new Product({
      sku: await generateUniqueSKU(),
      name: `${category} ${i + 1}`,
      price: Math.floor(Math.random() * 100) + 1, // Precio aleatorio entre 1 y 100
      brand: getRandomValue(brands),
      category: category,
      description: getRandomValue(descriptions),
      images: images,
      stock: Math.floor(Math.random() * 1000) + 1, // Stock aleatorio entre 1 y 1000
    });
    //products.push(newProduct);
    respuesta= await newProduct.save();

  }


  response(res, 200, respuesta );
  // Guardar los productos en la base de datos
// await Product.new(products);
}

// // Llamar a la función para generar los productos aleatorios
// generateRandomProducts()
//   .then(() => console.log('Productos aleatorios creados exitosamente'))
//   .catch(error => console.error('Error al crear productos aleatorios:', error));

  // Exporta las funciones de validación
  module.exports = {
  generateRandomProducts,
  };