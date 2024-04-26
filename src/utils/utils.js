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

  // Exporta las funciones de validación
module.exports = {
    validateName,
    validateEmail
  };