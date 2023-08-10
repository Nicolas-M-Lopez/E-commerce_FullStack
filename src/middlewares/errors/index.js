import EErrors from "../../utils/error/enums.js"

const errorMiddleware = (error,req,res,next) =>{
    console.log(error.cause)
    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            return res.send({status: 'error', error: error.name})
        case EErrors.ROUTING_ERROR:
            return res.send({status: 'error', error: error.name})
        case EErrors.DATABASE_ERROR:
            return res.send({status: 'error', error: error.name})
        default:
            return res.send({status: 'error', error: 'Undefined Error'})
    }
}

export default errorMiddleware