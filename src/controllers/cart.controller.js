import {cartService} from "../services/index.js"

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
            next(error)
        }
    }
    updateCart  = async(req,res,next)=> {
        try {
            const cid = req.params.cid
            const dataProduct = req.params.pid
            const dataUnits = req.params.units
            const updatedCart = await cartDao.updateCart(cid,dataProduct,dataUnits);
            return res.status(200).json({
                success: true,
                response: updatedCart,
            });
        } catch (error) {
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
            next(error)
        }
    }
}

export default new CartController()