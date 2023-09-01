import { Router } from "express";
import productController from "../../controllers/product.controller.js";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";
import authorizationUD from "../../middlewares/authorizationUD.js";
const product_router = Router()

product_router.get('/',productController.getProducts)

product_router.get('/:pid',productController.getProduct)

product_router.post('/',passport_call('jwt'),authorizationJwt(['admin','premium']), productController.createProduct)

product_router.put('/:pid',passport_call('jwt'),authorizationUD(['admin','premium']), productController.updateProduct)

product_router.delete('/:pid',passport_call('jwt'),authorizationUD(['admin','premium']), productController.deleteProduct)

export default product_router