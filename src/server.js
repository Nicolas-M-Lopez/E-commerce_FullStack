import server from "./app.js"
import { connect } from "mongoose"
import { Server } from "socket.io"
import config from "./config/config.js"

const port = config.port

const ready = () => {
  console.log('Server ready on '+port)
  connect(config.LINK_MONGO)
    .then(()=>console.log('database connected'))
    .catch(err => console.log(err))
}

const chat = []
let http_server = server.listen(port, ready)
let socket_server = new Server(http_server)

socket_server.on(
    'connection',
    socket => {
        console.log(`client ${socket.client.id} connected`)
        socket.on('auth', () => {
            socket.emit("allMessages", chat)
        })
        socket.on("new_message",data => {
            const { message } = data;
            const lowerCaseMessage = message.toLowerCase();

  let respuesta;
  if (lowerCaseMessage.includes("ayuda")) {
    respuesta = "Escribe productos para saber sobre los vehiculos o carrito para saber sobre el carrito de compras";
  } else if (lowerCaseMessage.includes("chau") || lowerCaseMessage.includes("hasta luego")) {
    respuesta = "Hasta luego. ¡Que tengas un buen día!";
  } else if (lowerCaseMessage.includes("hola") || lowerCaseMessage.includes("hasta luego")) {
    respuesta = "Buen dia! Si tienes alguna duda solo escribe ayuda";
  } else if (lowerCaseMessage.includes("productos") || lowerCaseMessage.includes("producto")) {
    respuesta = "Para ver los productos te recomiendo tocar el link arriba en el navegador llamado Vehiculos";
  } else if (lowerCaseMessage.includes("carrito")) {
    respuesta = "Para ver los productos que tenes en el carrito, clickea el link de arriba en el navegador llamado Carrito";
  } else {
    respuesta = "Lo siento, no puedo entender tu mensaje. ¿Podrías reformularlo?";
  }


  socket.emit("new_message", { userName: "Chatbot", message: respuesta });


  chat.push({ userName: data.userName, message });
  chat.push({ userName: "Chatbot", message: respuesta });


  socket.emit("allMessages", chat);
        })
    }
)