import { compareSync } from "bcrypt";

export default async function(req,res,next){
        let verified = compareSync(
        req.body.password,  //Lo que envia el cliente
        req.user.password //Lo que esta guardado en mongo
        )
        if(verified){
            return next()
         }
       return res.status(401).json({
            success: false,
            message:'auth error'
        })
    }  
