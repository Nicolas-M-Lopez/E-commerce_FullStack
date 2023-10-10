import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";


const product_view_router = Router()

product_view_router.get('/:pid', passport_call('jwt'),async(req,res,next) => {

    try{
        const cartUser = req.user.email
        const user = req.user.email
        const userActive = req.cookies.token
        const cartOwn = req.user.cart_owned
        let id = req.params.pid
        const response = await fetch(`http://localhost:8080/api/products/${id}`)
        const data = await response.json()
        const response_cart = await fetch(`http://localhost:8080/api/carts/6521f41fd450e25f88244f8f`)
        const data_cart = await response_cart.json()
        return res.render(
            'product',
            {
                one: data.one,
                title: "producto",
                cart: cartOwn,
                userActive,
                user,
                cartUser
            }
            )
    } catch(error){
        next(error)
    }
})

export default product_view_router