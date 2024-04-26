//usamos express como freamwork
const express=require('express');
const mongoose=require("mongoose")
const resError = require('./utils/resError');
// usamos dtenv para las variables de entorno
require('dotenv').config()

// Importar las rutas de usuarios
const userRoutes=require("./routes/userRoutes");


//Creamos la instancia
const app=express();

// Middleware para manejar datos JSON
app.use(express.json());


// Middleware para manejar las rutas de usuarios
// app.use('/',userRoutes)
app.use('/api',userRoutes)

// le asignamos una constante a las rutas de usuario
// donde escucha el servidor
//Iniciar el servidor
app.listen(process.env.PORT,  () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});


//le pasamos el manejador de errores en vez del suyo para no mostrar la ruta del error
app.use((err,req,res,next)=>{
  const statusCode=err.status || 500;
  const message=err.message || 'Error interno del servidor';
  resError(res,statusCode,message)
})
// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

