import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";


const delete_stock_router = Router()
 delete_stock_router.get('/',passport_call('jwt'),authorizationJwt(['admin']),async (req,res,next) => {
    try {
        const cartUser = req.user.email
        const userActive = req.cookies.token
        const searchQuery = req.query.title || '';
        const pageQuery = req.query.page || 1;
        const response = await fetch(`http://localhost:8080/api/products?title=${searchQuery}&page=${pageQuery}`)
        const data = await response.json()
        return res.render('deleteStock', {
            title: "Eliminar Stock",
            userActive,
            products: data.products,
            cartUser
        })
    } catch (error) {
        next(error)
    }
})

export default delete_stock_router