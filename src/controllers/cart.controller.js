import {cartService, productService} from "../services/index.js"
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { logger } from "../config/logger.js"

const cartDao = cartService

class CartController{
    getCarts = async(req,res,next)=> {
        try {
            let carts = await cartDao.getCarts();
            return res.status(200).json({
                success:true,
                response:carts
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    getCart  = async(req,res,next)=> {
        try {
            const cid = req.params.cid
            let cart = await cartDao.getCart(cid)
            return res.status(200).json({
                success:true,
                response:cart
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    createCart  = async(req,res,next)=> {
        try {
            let one = await cartDao.createCart()
            return res.status(201).json({
                succes:true,
                message: 'id= '+one._id
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    updateCart  = async(req,res,next)=> {
        try {
            const cid = req.params.cid
            const dataProduct = req.params.pid
            const dataUnits = req.params.units
            const checkOwner = await productService.getProduct(dataProduct)
            if(req.user.email == checkOwner.owner) return res.json({message: "Cant purchase and item from yourself"}) 
            const updatedCart = await cartDao.updateCart(cid,dataProduct,dataUnits);
            return res.status(200).json({
                success: true,
                response: updatedCart,
            });
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
    deleteCart  = async(req,res,next)=> {
        try {
            const cid = req.params.cid
            const dataProduct = req.params.pid
            const dataUnits = req.params.units
            const cart = await cartDao.deleteCart(cid,dataProduct,dataUnits);
            return res.status(200).json({
                success: true,
                response: cart
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
 
    purchaseCart = async(req,res,next) => {
        try {
            const cid = req.params.cid
            const token = req.cookies.token
            const decodedToken = jwt.verify(token, config.SECRET_COOKIE);
            const tokenEmail = decodedToken.email;
            let purchase = await cartDao.purchaseCart(cid,tokenEmail)
            logger.info(purchase.productos)
            if(purchase){
            return res.status(200).json({
                    succes: true,
                    response: purchase
                })
            }
        } catch (error) {
            logger.error(error) 
            next(error)
        }
    }
    getBill = async(req,res,next)=>{
        try {
            const cid = req.params.cid
            const cart = await cartDao.getBill(cid)
            let total = 0
            for(const product of cart.productos){
                const totalUnit = product.productId.price * product.quantity
                total = total + totalUnit
            }
            return res.status(200).json({
                success:true,
                response:total
            })
        } catch (error) {
            logger.error(error)
            next(error)
        }
    }
}

export default new CartController()