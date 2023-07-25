import { Router } from "express";
import cartController from "../../controllers/cart.controller.js";


const cart_router = Router()



cart_router.get('/', cartController.getCarts)

cart_router.get('/:cid', cartController.getCart)

cart_router.post('/', cartController.createCart)


cart_router.put('/:cid/products/:pid/:units', cartController.updateCart)

cart_router.delete('/:cid/products/:pid/:units', cartController.deleteCart)

cart_router.get('/bills/:cid', cartController.getBill)

export default cart_router