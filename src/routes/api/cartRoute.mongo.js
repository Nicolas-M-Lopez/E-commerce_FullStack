import { Router } from "express";
import cartController from "../../controllers/cart.controller.js";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js"

const cart_router = Router()

cart_router.get('/', cartController.getCarts)

cart_router.get('/:cid', cartController.getCart)

cart_router.post('/', cartController.createCart)

cart_router.put('/:cid/products/:pid/:units',passport_call('jwt'),authorizationJwt(['admin','premium','user']), cartController.updateCart)

cart_router.delete('/:cid/products/:pid/:units',passport_call('jwt'),authorizationJwt(['admin','premium','user']), cartController.deleteCart)

cart_router.get('/:cid/purchase',passport_call('jwt'),authorizationJwt(['admin','premium','user']),cartController.purchaseCart)

cart_router.get('/bills/:cid', cartController.getBill)

export default cart_router