// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/indexModels');
const { catchAsync, response, ClientError, validateName, validateEmail, validateText, validateDate, removeTimeFromDate, hashPassword, validatePass, generateToken } = require('../utils/indexUtils');

const register = async (req, res) => {
  const { email } = req.body.email;

  // Verificar si el usuario ya existe en la base de datos
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ClientError('El usuario ya existe', 400);
  }

    // Validar los datos del usuario antes de crearlo
    if (!validateText(req.body.user_name) ||
    !validateEmail(req.body.email) ||
    !validateText(req.body.full_name) ||
    !validateText(req.body.billing_address) ||
    !validateText(req.body.country) ||
    !validateText(req.body.phone) ||
    !validateDate(new Date(req.body.date_of_birth))) {
  throw new ClientError("Los datos no son correctos", 400);
  }
  
     // Generar el hash de la contraseña
     const hashedPassword = await hashPassword(req.body.password);
  
  // Crear un nuevo usuario
  const newUser = new User({
    user_name: req.body.user_name,
      email: req.body.email,
      password:  hashedPassword,
      full_name: req.body.full_name,
      billing_address: req.body.billing_address,
      country: req.body.country,
      phone: req.body.phone,
      date_of_birth: removeTimeFromDate(new Date(req.body.date_of_birth)), // Eliminar la hora de la fecha de nacimiento
      registration_date: Date.now(), // Fecha actual
      type: req.body.type || 'normal', // Asignar el tipo de usuario proporcionado o 'normal' por defecto

  });

  // Guardar el usuario en la base de datos
  const savedUser = await newUser.save();

  // Responder con el usuario creado
  response(res, 201, savedUser);
};


const login = async (req, res) => {
  const  email = req.body.email;
  const  password = req.body.password;
  //console.log("recibo: "+ req.body.email + " " + password)

  // Verificar si el usuario existe en la base de datos
  const user = await User.findOne({ email });
  if (!user) {
    throw new ClientError('Usuario inválido', 401);
  }

  //console.log(user.password)

 // Verificar la contraseña
if (!await validatePass(password, user.password)) {
  throw new ClientError("La contraseña no es correcta", 403);
}
  // Generar token JWT
  const token = await generateToken(user)
  //console.log("mi token" + token)

  // Enviar el token como respuesta
  response(res, 200, { user, token });
};

const validToken=async(req,res)=>{
  const token=req.body.token
  if(verificarToken(token)){
      const id=jwt.decode(token)._id
      const usuario = await User.findOne({ _id: id});
      response(res,200,usuario)
  } else{
      throw new ClientError("El token no es correcto o a expirado", 403);
  }
  

}

//La funcion catch tiene que tratar los errores
module.exports={
  register:catchAsync(register),
  login:catchAsync(login),
  validToken:catchAsync(validToken)
  
}