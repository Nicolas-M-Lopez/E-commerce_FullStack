import { Router } from "express";
import { addLogger, logger } from "../../config/logger.js";

let loggerRouter = Router()

loggerRouter.get('/', (req,res)=>{
    logger.debug('Este es el debug')
    logger.http('Este es el http')
    logger.info('Este es el info')
    logger.warning('Este es el warning')
    logger.error('Este es el error')
    logger.fatal('Este es el fatal')
    res.json({
        message: 'Prueba realizada'
    })
})

export default loggerRouter 