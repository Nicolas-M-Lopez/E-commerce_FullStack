import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default (req,res,next) => {
    let token = jwt.sign(
        { email:req.body.email },
        config.SECRET_COOKIE,
        { expiresIn:60*60*24 }
    )
    req.token = token
    return next()
}