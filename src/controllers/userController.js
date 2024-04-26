// src/controllers/userController.js
const {User} = require('../models/indexModels');
const { catchAsync, response, ClientError, validateName, validateEmail } = require('../utils/indexUtils');

//crear usuario
const postCreateUser= async(req, res)=>{
// nota eli doble comprobación, primero por seguridad en el frontend nos aseguraremos que los datos enviados sean correctos,
    // y aquí (backend) volveremos ha hacer una doble comprobación para evitar injección de código
// !req.body.nombre || !req.body.email ||
    if ( 
    validateName(req.body.nombre) || validateEmail(req.body.email)
    ) throw new ClientError("Los datos no son correctos", 400);

  const newUser=new User({
    nombre: req.body.nombre,
    email: req.body.email
  });

    //Guardo el nuevo usuario
  const userSave= await newUser.save();

response(res,200,userSave)
};

//Función para obtener todos los usuarios
const getAllUsers=  async (req,res)=>{
  //Consulto todos los usuarios de la base de datos
  const users= await User.find();

  //Envio respuesta
  response(res,200,users);
};

//Función para obtener un usuario por su ID
const getUserById=  async (req,res)=>{
  //Consulto todos los usuarios de la base de datos
  const user=await User.findById(req.params.id);
  //si no existe usuario
  if(!user){
    throw new ClientError("Usuario no encontrado", 404);
  }

  //Responde con el usuario
  response(res, 200, usuario);
 
};


//La funcion catch tiene que tratar la funcion 
module.exports={
   postCreateUser:catchAsync(postCreateUser),
   getAllUsers:catchAsync(getAllUsers),
   getUserById:catchAsync(getUserById)

}