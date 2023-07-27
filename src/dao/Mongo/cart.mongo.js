import { response } from "express";
import CartModel from "./models/cart.model.js";
import ProductModel from "./models/product.model.js";

class CartDaoMongo {
    constructor() {
        this.CartModel = CartModel
    }
    
    getCarts = async() =>{
        return await CartModel.aggregate([
            { $unwind: "$productos" }, 
            { $lookup: { from: 'products', localField: 'productos.productId', foreignField: '_id', as: 'productos.product' } },
            { $sort: { "productos.product.title": 1 } } 
        ])
    }
    getCart = async(cid) =>{
        return await CartModel.findById(cid).populate('productos.productId', 'title price _id')
    }
    createCart = async() =>{
        return await CartModel.create({productos:[]})
    }
    updateCart = async(cid,dataProduct,dataUnits) =>{
        const cart = await CartModel.findById(cid);
        if (cart.productos.some((p) => p.productId.toString() === dataProduct)) {
            await ProductModel.updateOne(
                { _id: dataProduct },
                { $inc: { stock: -dataUnits } }
              );
          return await CartModel.updateOne(
            { _id: cid, 'productos.productId': dataProduct },
            { $inc: { 'productos.$.quantity': dataUnits } }
          );
        } else {
            await ProductModel.updateOne(
            { _id: dataProduct },
            { $inc: { stock: -dataUnits } }
            );
            return await CartModel.updateOne(
            { _id: cid },
            { $push: { productos: { productId: dataProduct, quantity: dataUnits } } }
          );
        }
    }
    deleteCart = async(cid,dataProduct,dataUnits) =>{
        const cart = await CartModel.findById(cid)
        const product = cart.productos.find((product) => product.productId == dataProduct);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Producto no encontrado en el carrito' });
          }
          product.quantity -= dataUnits;
          await ProductModel.updateOne(
              { _id: dataProduct },
              { $inc: { stock: dataUnits } }
          )
          if (product.quantity <= 0) {y
            cart.productos = cart.productos.filter((p) => p.productId != dataProduct);
          }
        return await cart.save()
    }

    getBill = async(cid)=>{
        return await CartModel.findById(cid).populate('productos.productId') 
    }
}

export default CartDaoMongo