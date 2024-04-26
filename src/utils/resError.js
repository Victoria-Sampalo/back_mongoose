// src/utils/resError.js
//Para manejar los errores, para que no sea node quien me diga que tiene un error.
const resError=(res, status,message)=>{
    res.status(status).json({
      error:true,
      message:message
    })
  }

  module.exports=resError;