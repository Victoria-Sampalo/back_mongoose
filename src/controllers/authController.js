// src/controllers/authController.js

//Importa el modelo de usuario
const {User} = require('../models/indexModels');
const { verifyToken } = require('../utils/passwordUtils');


//// Middleware para verificar si el token de autorización es válido
const tokenValid=async (req,res,next)=>{
// Obtiene el token del encabezado Authorization de la solicitud
        const token = req.headers.authorization.split(' ').pop();
     // Verifica la validez del token
    const verification=await verifyToken(token);
    if (verification == null) { // Si la verificación no es exitosa (token no válido)
        res.status(409).send({ error: true, message: "El token no es válido" }); // Devuelve un error 409 con un mensaje
    }
    //No devuelvo nada, paso al siguiente middleware
    console.log("verification:", verification);
    next();
}



// Middleware para verificar si el token de autorización es válido
// y si el usuario es administrador
const tokenValidAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop(); // Obtiene el token del encabezado Authorization de la solicitud
     // Verifica la validez del token
    const verification=await verifyToken(token);;
    if (verification == null) { // Si la verificación no es exitosa (token no válido)
        res.status(409).send({ error: true, message: "El token no es válido" }); // Devuelve un error 409 con un mensaje
    }

    if (verification.type && verification.type == 'admin') { // Si el usuario tiene el rol de administrador
        console.log("es admin")
        console.log("verification:", verification);
        next(); // Pasa al siguiente middleware
    } else { // Si el usuario no es administrador
        res.status(409).send({ error: true, message: "El usuario no está autorizado" }); // Devuelve un error 409 con un mensaje
    }
};


module.exports = {
    tokenValid,
    tokenValidAdmin
};