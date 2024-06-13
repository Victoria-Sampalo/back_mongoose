// utils/utils.js

//Función para validar campo nombre
const validateName=(valor)=>{
    
    if (!valor || typeof valor !== 'string' || valor.trim() === '') {
        return false;
      }
      return true;
}

// Función para validar un número (precio)
const validateNumber = (value) => {
  // Comprueba si el valor es nulo, no es un número o es negativo
  if (value === null || isNaN(value) || value < 0) {
      return false;
  }
  return true;
}


// Función para validar un campo de tipo email
const validateEmail = (email) => {
    if (!email || typeof email !== 'string' || email.trim() === '') {
     return false;
    }
  
    // Utiliza una expresión regular para validar el formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return false;
    }
    return true;
  };


// Función para validar un campo de texto en general
const validateText = (text) => {
  // Verificar si el texto es nulo, vacío o no es una cadena
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return false;
  }
  return true;
};


// Función para validar la fecha 
const validateDate = (date) => {
  // Verificar si la fecha es nula o no es una instancia de Date
  if (!date || !(date instanceof Date)) {
    return false;
  }
  // Verificar si la fecha es válida (no es un NaN)
  if (isNaN(date.getTime())) {
    return false;
  }
  return true;
};



// Función para eliminar la parte de la hora de una fecha
function removeTimeFromDate(date) {
  if (!date) return null;
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

// Función para generar un SKU único ficticio
const generateUniqueSKU = async (Product) => {
  // Generar un SKU aleatorio
  const randomSKU = Math.random().toString(36).substring(2, 10).toUpperCase();

  // Verificar si el SKU generado ya existe en la base de datos
  const existingProduct = await Product.findOne({ sku: randomSKU });

  // Si el SKU ya existe, llamar recursivamente a la función para generar uno nuevo
  if (existingProduct) {
    return generateUniqueSKU(Product);
  }

  // Si el SKU es único, devolverlo
  return randomSKU;
};


const calculateTotalPrice=(lista)=>{
  let total=0;
  for (const item of lista) {
      total+=(item.quantity*item.price)   
  }
  return total
}


  // Exporta las funciones de validación
module.exports = {
    validateName,
    validateEmail,
    validateText, 
    validateDate,
    removeTimeFromDate,
    validateNumber,
    generateUniqueSKU,
    calculateTotalPrice
  };