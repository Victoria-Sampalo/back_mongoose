const { Order } = require("../models/indexModels");
const {
  catchAsync,
  response,
  ClientError,
  validateText,
  validateNumber,
  validateDate,
  calculateTotalPrice
} = require("../utils/indexUtils");

// Crear detalle de pedido
// const postCreateOrder = async (req, res) => {
//     try {
//          // Verificar si se proporcionó una lista de productos
//          if (!req.body.list_products) {
//             throw new ClientError('Lista de productos no proporcionada', 400);
//         }

//             // Parsear la lista de productos
//             let listProducts;
//             try {
//                 listProducts = JSON.parse(req.body.list_products).catch((error)=> throw new ClientError('Error al analizar la lista de productos', 400));
                
//             } catch (error) {
//                 throw new ClientError('Error al analizar la lista de productos', 400);
//             }
        
//         // Crear el nuevo detalle de pedido
//         const newDetailOrder = new Order({
//             id_user: req.body.id_user, // Se asume que req.body.id_user contiene el ID del usuario
//             total_cost: calculateTotalPrice(listProducts), // Calcular el costo total
//             order_date: new Date(), // Fecha actual
//             list_products: listProducts,
//             order_status: req.body.order_status || 'activo', // Estado por defecto es 'activo'
//             shipping_address: req.body.shipping_address,
//             payment_method: req.body.payment_method,
//             shipping_date: Date.now(), // Fecha actual
//             delivery_date: Date.now(), // Fecha actual
//         });

//         // Guardar el nuevo detalle de pedido en la base de datos
//         const savedDetailOrder = await newDetailOrder.save();

//         // Enviar el detalle de pedido guardado como respuesta
//         response(res, 200, savedDetailOrder);
//     } catch (error) {
//         console.error("Error al crear detalle de pedido:", error);
//         if (error instanceof ClientError) {
//             response(res, error.status, { error: error.message });
//         } else {
//             response(res, 500, { error: "Ha ocurrido un error al crear el detalle de pedido" });
//         }
//     }
// }

const postCreateOrder = async (req, res) => {
  
       // Verificar si se proporcionó una lista de productos
       if (!req.body.list_products) {
          throw new ClientError('Lista de productos no proporcionada', 400);
      }

        // Parsear la lista de productos
        let listProducts;
        try {
            listProducts = JSON.parse(req.body.list_products);
        } catch (error) {
            throw new ClientError('Error al analizar la lista de productos', 400);
        }

      
      // Crear el nuevo detalle de pedido
      const newDetailOrder = new Order({
          id_user: req.body.id_user, // Se asume que req.body.id_user contiene el ID del usuario
          total_cost: calculateTotalPrice(listProducts), // Calcular el costo total
          order_date: new Date(), // Fecha actual
          list_products: listProducts,
          order_status: req.body.order_status || 'activo', // Estado por defecto es 'activo'
          shipping_address: req.body.shipping_address,
          payment_method: req.body.payment_method,
          shipping_date: Date.now(), // Fecha actual
          delivery_date: Date.now(), // Fecha actual
      });

      // Guardar el nuevo detalle de pedido en la base de datos
      const savedDetailOrder = await newDetailOrder.save();

      // Enviar el detalle de pedido guardado como respuesta
      response(res, 200, savedDetailOrder);
  
}



// Obtener todos los detalles de pedido
const getAllOrders = async (req, res) => {
  try {
    // Consultar todos los detalles de pedido de la base de datos
    const orders = await Order.find();

    // Responder con los detalles de pedido
    response(res, 200, orders);
  } catch (error) {
    console.error("Error al obtener detalles de pedido:", error);
    response(res, 500, { error: "Ha ocurrido un error al obtener los detalles de pedido" });
  }
};

// Obtener un detalle de pedido por su ID
const getOrderById = async (req, res) => {
  try {
    // Consultar el detalle de pedido por su ID en la base de datos
    const order = await Order.findById(req.params.id);

    // Si no existe el detalle de pedido, devolver un error 404
    if (!order) {
      throw new ClientError("Detalle de pedido no encontrado", 404);
    }

    // Responder con el detalle de pedido
    response(res, 200, order);
  } catch (error) {
    console.error("Error al obtener detalle de pedido:", error);
    if (error instanceof ClientError) {
      response(res, error.status, { error: error.message });
    } else {
      response(res, 500, { error: "Ha ocurrido un error al obtener el detalle de pedido" });
    }
  }
};

// Eliminar un detalle de pedido por su ID
const deleteOrderById = async (req, res) => {
  try {
    // Buscar y eliminar el detalle de pedido por su ID en la base de datos
    const orderDelete = await Order.findByIdAndDelete(req.params.id);

    // Si no se encuentra el detalle de pedido, devolver un error 404
    if (!orderDelete) {
      throw new ClientError("Detalle de pedido no encontrado", 404);
    }

    // Responder con un mensaje de éxito
    response(res, 200, { message: "Detalle de pedido eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar detalle de pedido:", error);
    if (error instanceof ClientError) {
      response(res, error.status, { error: error.message });
    } else {
      response(res, 500, { error: "Ha ocurrido un error al eliminar el detalle de pedido" });
    }
  }
};

// Modificar un detalle de pedido por su ID
const updateOrderById = async (req, res) => {
    try {
        const orderId = req.body.id;
        const updateText = {};
    
        // Verificar si se proporcionaron datos válidos para actualizar
        if (req.body.id_user && validateText(req.body.id_user)) {
          updateText["id_user"] = req.body.id_user;
        }
        if (req.body.total_cost && validateNumber(req.body.total_cost)) {
          updateText["total_cost"] = req.body.total_cost;
        }
        if (
          req.body.list_products && 
          Array.isArray(req.body.list_products) && 
          req.body.list_products.every(
            (product) =>
              product.productId &&
              validateText(product.productId) &&
              product.quantity &&
              validateNumber(product.quantity)
          )
        ) {
          updateText["list_products"] = req.body.list_products;
        }
        if (req.body.order_status && validateText(req.body.order_status)) {
          updateText["order_status"] = req.body.order_status;
        }
        if (req.body.shipping_address && validateText(req.body.shipping_address)) {
          updateText["shipping_address"] = req.body.shipping_address;
        }
        if (req.body.payment_method && validateText(req.body.payment_method)) {
          updateText["payment_method"] = req.body.payment_method;
        }
        if (req.body.shipping_date && validateDate(req.body.shipping_date)) {
          updateText["shipping_date"] = req.body.shipping_date;
        }
        if (req.body.delivery_date && validateDate(req.body.delivery_date)) {
          updateText["delivery_date"] = req.body.delivery_date;
        }

        // Buscar y actualizar el detalle de pedido por su ID en la base de datos
        const orderUpdate = await Order.findByIdAndUpdate(orderId, updateText, {
          new: true,
        });
    
        // Si no se encuentra el detalle de pedido, devolver un error 404
        if (!orderUpdate) {
          throw new ClientError("Detalle de pedido no encontrado", 404);
        }
    
        // Responder con el detalle de pedido actualizado
        res.status(200).json(orderUpdate); // Enviar el objeto actualizado como respuesta JSON
      } catch (error) {
        console.error("Error al actualizar detalle de pedido:", error);
        if (error instanceof ClientError) {
          res.status(error.status).json({ error: error.message }); // Enviar un error específico como respuesta JSON
        } else {
          res.status(500).json({ error: "Ha ocurrido un error al actualizar el detalle de pedido" }); // Enviar un error genérico como respuesta JSON
        }
      }
};




module.exports = {
  postCreateOrder: catchAsync(postCreateOrder),
  getAllOrders: catchAsync(getAllOrders),
  getOrderById: catchAsync(getOrderById),
  deleteOrderById: catchAsync(deleteOrderById),
  updateOrderById: catchAsync(updateOrderById),
};
