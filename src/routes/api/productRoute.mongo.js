import { Router } from "express";
import productController from "../../controllers/product.controller.js";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const product_router = Router()

product_router.get('/', /* passport_call('jwt'),authorizationJwt('user'), */productController.getProducts)

product_router.get('/:pid', productController.getProduct)

product_router.post('/', productController.createProduct)

product_router.put('/:pid', productController.updateProduct)

product_router.delete('/:pid', productController.deleteProduct)

export default product_router