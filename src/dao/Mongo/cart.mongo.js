import { response } from "express";
import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";
import TicketModel from "./models/ticket.model.js";
import sendMail from "../../middlewares/sendMail.js";
import { logger } from "../../config/logger.js";


class CartDaoMongo {
    constructor() {
        this.CartModel = CartModel
    }
    
    get = async() =>{
        return await CartModel.aggregate([
            { $unwind: "$productos" }, 
            { $lookup: { from: 'products', localField: 'productos.productId', foreignField: '_id', as: 'productos.product' } },
            { $sort: { "productos.product.title": 1 } } 
        ])
    }
    getById = async(cid) =>{
        return await CartModel.findById(cid).populate('productos.productId', 'title price _id')
    }
    create = async(uid) =>{
        return await CartModel.create({productos:[]},{owner:toString(uid)})
    }
    update = async(cid,dataProduct,dataUnits) =>{
        const cart = await CartModel.findById(cid);
        if (cart.productos.some((p) => p.productId.toString() === dataProduct)) {
          return await CartModel.updateOne(
            { _id: cid, 'productos.productId': dataProduct },
            { $inc: { 'productos.$.quantity': dataUnits } }
          );
        } else {
            return await CartModel.updateOne(
            { _id: cid },
            { $push: { productos: { productId: dataProduct, quantity: dataUnits } } }
          );
        }
    }
    delete = async(cid,dataProduct,dataUnits) =>{
        const cart = await CartModel.findById(cid)
        const product = cart.productos.find((product) => product.productId.equals(dataProduct));
        if (!product) {
            return logger.warning('No encontrado')
          }
          product.quantity -= dataUnits;
          if (product.quantity <= 0) {
            cart.productos = cart.productos.filter((p) => p.productId.toString() != dataProduct.toString());
          }
        return await cart.save()
    }

    purchase = async(cid,tokenEmail) => {
        const cart = await CartModel.findById(cid)
        let totalAmount = 0
        for(const producto of cart.productos) {
          let productToUpdate = await ProductModel.findById(producto.productId)
          let newStock = parseInt(productToUpdate.stock) - parseInt(producto.quantity)
          if(newStock >= 0){
          await ProductModel.updateOne({_id: productToUpdate._id},{$set:{stock: newStock}})
          totalAmount += productToUpdate.price * producto.quantity
          await this.delete(cid,producto.productId,producto.quantity)
          }else{
            logger.warning('No se hay suficiente stock en este producto: '+ productToUpdate)}
        }
        
        const generateRandomCode = (length = 10) => {
          const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          return Array.from({ length }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
        }; 
        const ticketData = {
          code:generateRandomCode(),
          amount: totalAmount,
          purchaser: tokenEmail,
          productos: cart.productos
        }
          const ticket = await TicketModel.create(ticketData)
          await sendMail(ticketData)
          logger.info('Ticket creado correctamente: ', ticket)
          return ticket
    }

    getBill = async(cid)=>{
        return await CartModel.findById(cid).populate('productos.productId') 
    }
}

export default CartDaoMongo