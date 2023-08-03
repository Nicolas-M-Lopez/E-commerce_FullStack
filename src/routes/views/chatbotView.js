import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const chatbot_view_router = Router()

chatbot_view_router.get('/', passport_call('jwt'),authorizationJwt('user'),async(req,res,next) =>{
    try {
       return res.render('chatbot',
       {
        title: "Chatbot",
        script: './public/chatbot.js'
       }
       ) 
    } catch (error) {
        next(error)
    }

})

export default chatbot_view_router
