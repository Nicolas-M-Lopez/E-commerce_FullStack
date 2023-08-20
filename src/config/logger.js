import winston from "winston";
import config from "./config.js";

const customOptions = {
    levels:{
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors:{
        fatal: 'black whiteBG',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'green' 
    }
}

const logger = winston.createLogger({
    levels: customOptions.levels,
    transports: [
        new winston.transports.Console({
            level: config.MODE == 'production' ? 'info' : 'debug',
            format: winston.format.combine(
                winston.format.colorize({colors: customOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({filename: './errors.log', level: 'error', format: winston.format.simple()})
    ]
})

const addLogger = (req,res,next) => {
    req.logger = logger
    req.logger.debug(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}

export {addLogger, logger}