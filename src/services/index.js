import ProductDaoMongo from "../dao/Mongo/product.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js"
import ProductRepository from "../repositories/product.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import TicketDaoMongo from "../dao/Mongo/ticket.mongo.js";
import TicketRepository from "../repositories/ticket.repository.js";

const productService = new ProductRepository(new ProductDaoMongo())
const cartService = new CartRepository(new CartDaoMongo())
const ticketService = new TicketRepository(new TicketDaoMongo())

export {productService, cartService, ticketService}