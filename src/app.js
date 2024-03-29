import express from "express";
import morgan from "morgan"
import not_found_handler from "./middlewares/not_found_handler.js";
import index_router from "./routes/index.js";
import { __dirname } from "./utils.js";
import { engine } from "express-handlebars";
import initializePassport from './config/passport_local.js'
import passport from "passport";
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
import config from "./config/config.js";
import errorMiddleware from "./middlewares/errors/index.js";
import {addLogger} from "./config/logger.js";
import cors from 'cors'


const server = express()


server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+'/views')


server.use(cookieParser(config.SECRET_COOKIE))
server.use(expressSession({
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true
}))
server.use('/public', express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use(morgan('dev'))
initializePassport()
server.use(passport.initialize())
server.use(addLogger)
server.use(cors())

server.use('/', index_router)
server.use(errorMiddleware)
server.use(not_found_handler)

 
export default server