import server from "./app.js"
import { connect } from "mongoose"
import { Server } from "socket.io"
import config from "./config/config.js"
import { logger } from "./config/logger.js"


const port = config.port

const ready = () => {
  logger.info('Server ready on '+port)
  connect(config.LINK_MONGO)
    .then(()=>logger.info('database connected'))
    .catch(err => logger.error(err))
}

let http_server = server.listen(port, ready)

