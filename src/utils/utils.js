// utils/utils.js

//Función para validar campo nombre
const validateName=(valor)=>{
    
    if (!valor || typeof valor !== 'string' || valor.trim() === '') {
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


// Función para validar la fecha de nacimiento
const validateDateOfBirth = (date) => {
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

  // Exporta las funciones de validación
module.exports = {
    validateName,
    validateEmail,
    validateText, 
    validateDateOfBirth
  };