// src/controllers/userController.js
const {User} = require('../models/indexModels');
const { catchAsync, response, ClientError, validateName, validateEmail, validateText, validateDateOfBirth, removeTimeFromDate, hashPassword } = require('../utils/indexUtils');


//crear usuario
const postCreateUser= async(req, res)=>{
// nota eli doble comprobación, primero por seguridad en el frontend nos aseguraremos que los datos enviados sean correctos,
    // y aquí (backend) volveremos ha hacer una doble comprobación para evitar injección de código
// !req.body.full_name || !req.body.email ||
      console.log(req.body)
    // Validar los datos del usuario antes de crearlo
  if (!validateText(req.body.userName) ||
  !validateEmail(req.body.email) ||
  !validateText(req.body.password) ||
  !validateText(req.body.full_name) ||
  !validateText(req.body.billing_address) ||
  !validateText(req.body.country) ||
  !validateText(req.body.phone) ||
  !validateDateOfBirth(new Date(req.body.date_of_birth))) {
throw new ClientError("Los datos no son correctos", 400);
}

   // Generar el hash de la contraseña
   const hashedPassword = await hashPassword(req.body.password);



  const newUser=new User({
      userName: req.body.userName,
      email: req.body.email,
      password:  hashedPassword,
      full_name: req.body.full_name,
      billing_address: req.body.billing_address,
      country: req.body.country,
      phone: req.body.phone,
      date_of_birth: removeTimeFromDate(new Date(req.body.date_of_birth)), // Eliminar la hora de la fecha de nacimiento
      registration_Date: Date.now() // Fecha actual
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
  console.log(req.params)
  //Consulto todos los usuarios de la base de datos
  const user=await User.findById(req.params.id);

  console.log(user)

  //si no existe usuario
  if(!user){
    throw new ClientError("Usuario no encontrado", 404);
  }

  //Responde con el usuario
  response(res, 200, user);
 
};



//Función para borrar un usuario por su ID
const deleteUserById = async (req, res) => {
  // Busca y elimina el usuario por su ID en la base de datos
  
  const userDelete = await User.findByIdAndDelete(req.params.id);
  console.log(userDelete)
  // Si no se encuentra el usuario, devuelve un error 404
  if (!userDelete) {
    throw new ClientError('Usuario no encontrado', 404);
  }
  
  // Responde con un mensaje de éxito
  response(res, 200, { message: 'Usuario eliminado correctamente' });
};


// //Función para modificar un usuario por su ID.
// const updateUserById = async (req, res) => {
//   try {
//       const userId = req.body.id;
//       const updateText = {};

//       // Verifica si se proporcionaron datos válidos para actualizar
//       if (req.body.full_name && validateName(req.body.full_name)) {
//           updateText['full_name'] = req.body.full_name;
//       }
//       if (req.body.email && validateEmail(req.body.email)) {
//           updateText['email'] = req.body.email;
//       }

//       // Verifica si hay datos válidos para actualizar
//       if (Object.keys(updateText).length === 0) {
//           return response(res, 400, { error: "No se proporcionaron datos válidos para actualizar" });
//       }

//       // Busca y actualiza el usuario por su ID en la base de datos
//       const userUpdate = await User.findByIdAndUpdate(userId, updateText, { new: true });

//       // Si no se encuentra el usuario, devuelve un error 404
//       if (!userUpdate) {
//           throw new ClientError('Usuario no encontrado', 404);
//       }

//       // Responde con el usuario actualizado
//       response(res, 200, { message: "Usuario actualizado correctamente", user: userUpdate });
//   } catch (error) {
//       console.error("Error al actualizar usuario:", error);
//       response(res, 500, { error: "Ha ocurrido un error al actualizar el usuario" });
//   }
// };

const updateUserById = async (req, res) => {
  console.log("updateUser... " +req.body.id);
  const userId = { _id: req.body.id};
  const updateText={};
  console.log(req.body);

  // Verifica si se proporcionaron datos válidos para actualizar
      if (req.body.full_name && validateName(req.body.full_name)) {
          updateText['full_name'] = req.body.full_name;
      }
      if (req.body.email && validateEmail(req.body.email)) {
          updateText['email'] = req.body.email;
      }
  
  // Busca y actualiza el usuario por su ID en la base de datos
  const userUpdate = await User.findByIdAndUpdate(userId, updateText, { new: true });
  // Si no se encuentra el usuario, devuelve un error 404
  if (!userUpdate) {
    throw new ClientError('Usuario no encontrado', 404);
  }
  
  // Responde con el usuario actualizado
  response(res, 200, userUpdate);
};


//La funcion catch tiene que tratar la funcion 
module.exports={
   postCreateUser:catchAsync(postCreateUser),
   getAllUsers:catchAsync(getAllUsers),
   getUserById:catchAsync(getUserById),
   deleteUserById:catchAsync(deleteUserById),
   updateUserById:catchAsync(updateUserById)

}