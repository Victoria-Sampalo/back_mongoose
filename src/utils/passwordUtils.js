const bcrypt = require('bcrypt');

const jwt=require('jsonwebtoken')
require('dotenv').config()

//Función que genera el hash para la constraseña
async function hashPassword(password) {
    // Genera el hash de la contraseña con una sal de 10 rondas
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

const validatePass = async (passUno, passDos) => {
    
   // Comparar el hash generado con el hash almacenado
    const resultado = await bcrypt.compare(passUno, passDos)
    console.log("validatePass: "+resultado)
    return resultado ;
  };


const generateToken=async (user)=>{
    const token= jwt.sign(
        {
            _id:user._id,
            type:user.type
        },
        
        process.env.JWT_SECRET,
        {
           expiresIn: "24h"
        }
    )
    
    return token
}

const verifyToken=async(token)=>{
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports={
    hashPassword,
    validatePass,
    generateToken,
    verifyToken,
  };

