
const bodyParser = require("body-parser");
const {Router} =require("express");

const router=Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })



// Ruta para crear un usuario
router.post("/usuarios", urlencodedParser, async (req, res) => {
    try {
      // Crear un nuevo usuario con los datos del cuerpo de la solicitud
      const nuevoUsuario = await User.create(req.body);
      res.status(201).json(nuevoUsuario);
    } catch (error) {
      res.status(400).json({ mensaje: error.message });
    }
  });




  
// Ruta de prueba para método GET
//de forma directa
router.get('/saludo',urlencodedParser, (req, res) => {
    res.send('¡Funciona! Esta es la respuesta del servidor.');
  });


//Forma eli 
router.get('/hola',urlencodedParser,(req,res)=>{
    saludar(req,res)
})

const saludar=(req , res)=>{
    console.log(req.body)
    res.json({mensage:"hola"})
}


module.exports= router
