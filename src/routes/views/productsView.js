import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";


const products_view_router = Router()

products_view_router.get('/', passport_call('jwt'),authorizationJwt(['admin','premium','user']),async(req,res,next) => {
    try{
        const cartUser = req.user.email
        const userActive = req.cookies.token
        const cartOwn = req.user.cart_owned
        const searchQuery = req.query.title || '';
        const pageQuery = req.query.page || 1;
        const response = await fetch(`http://localhost:8080/api/products?title=${searchQuery}&page=${pageQuery}`)
        const data = await response.json()
        if (data.status === 404) {
            res.render('products', {
                error: 'Producto no encontrado',
                title: 'productos',
                searchQuery:searchQuery
            })} else{
        return res.render(
            'products',
            {
                products: data.products,
                title: "productos",
                searchQuery:searchQuery,
                cart: cartOwn,
                userActive,
                cartUser
            }
            )}
    } catch(error){
        next(error)
    }
})

export default products_view_router