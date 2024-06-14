# 🛒 Proyecto Backend API REST

## 📄 Descripción

Este proyecto consiste en una API RESTful desarrollada con Node.js y Express, utilizando Mongoose para gestionar una base de datos MongoDB alojada en MongoDB Atlas. La aplicación está desplegada en Render.com.

La API RESTful corresponde al back del proyecto final de FTP Módulo Superior de Desarrollo de Aplicaciones Web (DAW), CrossLab. Un e-commerce de productos deportivos.

## 📂 Estructura del Proyecto

La estructura del proyecto es la siguiente:

```plaintext

back-mongoose/
|
|—— .env
|—— .gitignore
|—— node_modules
|—— package-lock.json
|—— package.json
|—— src
|    |—— controllers
|        |—— authController.js
|        |—— indexController.js
|        |—— loginController.js
|        |—— orderController.js
|        |—— productController.js
|        |—— userController.js
|    |—— index.js
|    |—— models
|        |—— detail_order.js
|        |—— indexModels.js
|        |—— product.js
|        |—— user.js
|    |—— routes
|        |—— indexRoutes.js
|        |—— loginRoutes.js
|        |—— orderRoutes.js
|        |—— productRoutes.js
|        |—— prueba.js
|        |—— userRoutes.js
|    |—— utils
|        |—— catchAsync.js
|        |—— clientError.js
|        |—— generatorUtils.js
|        |—— indexUtils.js
|        |—— passwordUtils.js
|        |—— resError.js
|        |—— response.js
|        |—— utils.js
|—— tests
|    |—— test.js
|    |—— test2.js
|    |—— userController.test.js
```

## 🚀 Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio:

```plaintext
git clone <URL_DEL_REPOSITORIO>
cd back_mongoose
```

### 2.Instalar las dependencias:

```plaintext
npm install
```

### 3.Configurar las variables de entorno:

Crea un archivo .env en la raíz del proyecto y define las siguientes variables:
```plaintext
PORT=<puerto asigmado>
JWT=<jwt token>
NAMEUSER=<nombre asignado al usuario de la BD en mongo>
PASS=<contraseña asignada para la BD en mongo>
```
#### 4.Ejecutar la aplicación:

- En desarrollo:
```plaintext
npm run dev
```
- En producción:
```plaintext
npm start
```

## 🌐 Despliegue en Render.com
Para desplegar la aplicación en Render.com, sigue estos pasos:

Crear un nuevo servicio en Render: Accede a la consola de Render.com y crea un nuevo servicio web, seleccionando tu repositorio de GitHub.
Configura el despliegue añadiendo:
Build Command: npm install
Start Command: npm start
Define las variables del .env (copia y pega todas desde el botón "Add from .env").
Desplegar: Render se encargará de construir y desplegar la aplicación automáticamente.


## 📬 Endpoints
 ### 🏀 Productos


```plaintext
POST /createproduct - Crea un nuevo producto (Requiere autenticación de administrador).
GET /products - Obtiene todos los productos.
GET /product/:id - Obtiene un producto por su ID.
DELETE /deleteproduct/:id - Elimina un producto por su ID (Requiere autenticación de administrador).
PUT /updateproduct - Actualiza un producto (Requiere autenticación).
GET /createramdonproducts - Genera productos aleatorios.
GET /categories - Obtiene todas las categorías.
POST /productsbyfilters - Obtiene productos por filtros.
POST /countproductsadminfilters - Cuenta productos según filtros para administración.
POST /getallproductsadmin - Obtiene todos los productos con filtros y límites para administración.
```

 ### 🔒 Autenticación

```plaintext
POST /login - Inicia sesión.
POST /validtoken - Valida el token de sesión.
```
 ### 🛒 Pedidos

```plaintext
POST /createorder - Crea un nuevo pedido (Requiere autenticación).
GET /orders - Obtiene todos los pedidos (Requiere autenticación de administrador).
POST /getuserorders - Obtiene pedidos de un usuario (Requiere autenticación).
GET /order/:id - Obtiene un pedido por su ID (Requiere autenticación).
DELETE /deleteorder/:id - Elimina un pedido por su ID (Requiere autenticación de administrador).
PUT /updateorder - Actualiza el status de un pedido (Requiere autenticación).
POST /countordersadminfilter - Obtiene el número de pedidos según los filtros (Requiere autenticación).
POST /ordersadminlimitfilter - Obtiene los pedidos según paginación y filtros (Requiere autenticación).
```
 ### 👥 Usuarios

```plaintext
POST /createuser - Crea un nuevo usuario.
GET /users - Obtiene todos los usuarios (Requiere autenticación de administrador).
GET /user/:id - Obtiene un usuario por su ID (Requiere autenticación).
DELETE /deleteuser/:id - Elimina un usuario por su ID (Requiere autenticación).
PUT /updateuser - Actualiza un usuario (Requiere autenticación).
```
## 🛠️ Tecnologías Utilizadas


```plaintext
Node.js: Entorno de ejecución para JavaScript.
Express: Framework para aplicaciones web en Node.js.
Postman: Herramienta para probar y desarrollar APIs.
Mongoose: ODM para MongoDB.
MongoDB Atlas: Servicio de base de datos en la nube.
Render.com: Plataforma de despliegue.
```

📜 Creador

Este proyecto está ha sido elaborado por Victoria Sampalo García.
