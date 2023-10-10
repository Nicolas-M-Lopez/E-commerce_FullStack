import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const cart_view_router = Router()

cart_view_router.get('/:cid', passport_call('jwt'),authorizationJwt(['admin','premium','user']),async (req,res,next) => {
    try {
        const userActive = req.user.email
        const cartOwn = req.user.cart_owned
        const cartUser = req.user.email
        const id = req.params.cid
        const response = await fetch(`http://localhost:8080/api/carts/${id}`)
        const data = await response.json()
        const responseTotal = await fetch(`http://localhost:8080/api/carts/bills/${id}`)
        const dataTotal = await responseTotal.json()
        return res.render(
            'cart',
            {
                productos: data.response.productos,
                title: "carrito",
                total: dataTotal.response,
                cart: cartOwn,
                userActive,
                cartUser
            }
            )
            
    } catch (error) {
        next(error)
    }
})


export default cart_view_router