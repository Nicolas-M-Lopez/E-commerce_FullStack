import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";


const form_product_router = Router()

form_product_router.get('/',passport_call('jwt'),authorizationJwt(['admin','premium']),async (req,res,next) => {
    try {
        const cartUser = req.user.email
        const userActive = req.cookies.token
        const cartOwn = req.user.cart_owned
        return res.render('formProduct', {
            title: "Formulario Products",
            cart: cartOwn,
            userActive,
            cartUser
        })
    } catch (error) {
        next(error)
    }
})

export default form_product_router