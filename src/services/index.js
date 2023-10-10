import ProductDaoMongo from "../dao/Mongo/product.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js"
import ProductRepository from "../repositories/product.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import UserDaoMongo from "../dao/Mongo/user.mongo.js";
import UserRepository from "../repositories/user.repository.js";

const productService = new ProductRepository(new ProductDaoMongo())
const cartService = new CartRepository(new CartDaoMongo())
const userService = new UserRepository(new UserDaoMongo())

export {productService, cartService, userService}