import ProductDaoMongo from "../dao/Mongo/product.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js"

const productService = new ProductDaoMongo()
const cartService = new CartDaoMongo()

export {productService, cartService}