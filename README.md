    En esta ocacion vamos a hacer nuestro propio servidor utilizando routes para configurar los endpoints e implementando middlewares para los errores (cliente/servidor)
Para eso sera necesario utilizar el framework Express.js, usando el comando npm install express.
Creamos un nuevo archivo javascript para el servidor, importamos el modulo de express, definimos un servidor ejecutando el modulo y configuramos el metodo listen para poder inicializar el servidor.
    Creamos los endpoints necesarios para cada metodo dentro de las funciones de carts y products.
Una vez ya configurado todo, vamos a utilizar la app de Postman, que nos facilita el uso de cada endpoint a traves de una interfaz dentro del programa.
Dentro de Postman se van a crear dos carpertas diferentes, una para carts y otra para products, y en cada carpeta se van a agregar 5 request (get, getById, add, update y delete).
Luego debemos configurar una url para poder llamar a los metodos, en este caso se usara http://localhost:8080/api/... (los tres puntos se reemplazan por el endpoint necesario) 
Ya todo configurado dentro de Postman, se apreta el boton send y ya podemos visualizar cada respuesta. 



