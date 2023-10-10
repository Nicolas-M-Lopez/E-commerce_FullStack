import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const logout_view_router = Router()

logout_view_router.get('/',passport_call('jwt'),authorizationJwt(['admin','premium','user']), async (req,res,next) => {
    try {
        const cartUser = req.user.email
        const userActive = req.cookies.token
        const cartOwn = req.user.cart_owned
        return res.render('logout', {
            email: req.user.email,
            cart: cartOwn,
            userActive,
            cartUser
        })
    } catch (error) {
        next(error)
    }
})

export default logout_view_router