import { Router } from "express"
import sendNewPass from "../../middlewares/createNewPass.js"
import jwt from "jsonwebtoken"
import config from "../../config/config.js"
import create_hash from "../../middlewares/create_hash.js";
import passport_call from "../../middlewares/passport_call.js"
import { userService } from "../../services/index.js";

const reset_pass_router = Router()

reset_pass_router.get('/',passport_call('jwt'), async(req,res,next) => {
    try {
        await sendNewPass(req.user.email)
        return res.status(200).json({succes: true, message:"Email enviado"})
    } catch (error) {
        console.log(error)
        next(error)
    }
})

reset_pass_router.post('/:token', passport_call('jwt'),create_hash,async(req,res,next) => {
    try {
        const token = req.params.token
        const email = req.user.email
        const user = await userService.getUser(email)
        const {password} = req.body
        const link = 'http://localhost:8080/api/resetPassword'
        jwt.verify(token, config.SECRET_COOKIE, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: `Token inválido o expirado, por favor toque el link ${link}` });
            }
            if(password != user.password){
            userService.updatePass(email,password)
            return res.status(200).json({ message: 'Su contraseña se cambio correctamente' });
            } else {
            return res.status(400).json({message: 'No puedes utilizar la misma contraseña que tenias'})
            } 
        })
    } catch (error) {
        next(error)
    }
})

export default reset_pass_router