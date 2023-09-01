import { Router } from "express";
import cart_router from "./cartRoute.mongo.js";
import product_router from "./productRoute.mongo.js";
import auth_router from "./auth.js";
import mocking_router from "./mockingProducts.js";
import loggerRouter from "./loggerTest.js";
import reset_pass_router from "./resetPassRoute.js";

const index_api_router = Router()

index_api_router.use('/products', product_router)
index_api_router.use('/carts', cart_router)
index_api_router.use('/auth', auth_router)
index_api_router.use('/mockingproducts', mocking_router)
index_api_router.use('/loggerTest', loggerRouter)
index_api_router.use('/resetPassword', reset_pass_router)

export default index_api_router 