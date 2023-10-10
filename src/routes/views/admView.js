import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const adm_view_router = Router()

adm_view_router.get('/', passport_call('jwt'),authorizationJwt(['admin']),async (req,res,next) => {
    try {
        const cartUser = req.user.email
        const response = await fetch(`http://localhost:8080/api/auth`)
        const data = await response.json()
        return res.render(
            'admin',
            {
                users: data,
                title: "Admnistrador",
                cartUser
            }
            )
    } catch (error) {
        next(error)
    }
})


export default adm_view_router