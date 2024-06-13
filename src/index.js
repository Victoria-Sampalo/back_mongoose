//usamos express como freamwork
const express=require('express');
const mongoose=require("mongoose")
const resError = require('./utils/resError');
const cors = require('cors');
const { ClientError } = require('./utils/clientError');

// usamos dtenv para las variables de entorno
require('dotenv').config()


const port = process.env.PORT || 10000;

// Importar las rutas de usuarios
const userRoutes=require("./routes/userRoutes");
// Importar las rutas de productos
const productRoutes=require("./routes/productRoutes");

//importar las rutas de detalle orders
const orderRoutes=require("./routes/orderRoutes");

const loginRoutes=require("./routes/loginRoutes");

const generateRandomProducts = require('./utils/indexUtils'); // Asegúrate de tener la ruta correcta



//Creamos la instancia
const app=express();

// Middleware para manejar datos JSON
app.use(express.json());

// le asignamos una constante a las rutas de usuario
// donde escucha el servidor
//Iniciar el servidor

// app.listen(process.env.PORT,  () => {
//   console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
// });
app.listen(port,  () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});


app.use(cors());

// Middleware para manejar las rutas
//de usuarios
// app.use('/',userRoutes)
app.use('/api',userRoutes)
//de productos

app.use('/api',productRoutes)
//de orders

app.use('/api',orderRoutes)

app.use('/api',loginRoutes)


//le pasamos el manejador de errores en vez del suyo para no mostrar la ruta del error
app.use((err,req,res,next)=>{
  const statusCode=err.status || 500;
  const message=err.message || 'Error interno del servidor';
  resError(res,statusCode,message)
})
// Conexión a la base de datos de MongoDB
// mongoose.connect(process.env.URI);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
// db.once('open', () => {
//   console.log('Conexión exitosa a MongoDB');
// });
// Conexión a la base de datos de MongoDB
// Construir la URI de conexión a MongoDB

const uri = `mongodb+srv://${process.env.NAMEUSER}:${process.env.PASS}@cluster0.68hp9n4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0s`;

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});