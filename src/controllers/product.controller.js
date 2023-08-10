import { productService } from "../services/index.js";
import CustomError from "../utils/error/customError.js";
import EErrors from "../utils/error/enums.js";
import generateProductErrorInfo from "../utils/error/info.js";

const productDao = productService

class ProductController {
    getProducts = async(req,res,next)=>{
        try{
            const titleRegex = new RegExp(req.query.title, 'i');
            let page = 1
            let limit = 6
            if (req.query.page > 0) { page = req.query.page }
            if (req.query.limit > 0) { limit = req.query.limit }
            const products = await productDao.getProducts(page,limit,titleRegex)
            if(products.totalDocs > 0){
                return res.json({ status:200,products })
            } else {
                let message = 'not found'
                return res.json({ status:404,message })
            }
        } catch(error){
            next(error) 
        }
    }
    getProduct = async(req,res,next)=>{
        try{
            const {pid} = req.params
            const one = await productDao. getProduct(pid)
            if(one){
                return res.json({ status:200,one })
            } 
                let message = 'not found'
                return res.json({ status:404,message })
               
            } catch(error){
                next(error)
            }
        }
    createProduct = async (req,res,next)=>{
        try{
        const {title,description,stock,price,thumbnail} = req.body
        if( !title || !description || !stock || !price ){
            CustomError.createError({
                name: 'Create Product Error',
                cause: generateProductErrorInfo(title,stock,price,description),
                message: 'Error al crear el producto',
                code: EErrors.INVALID_TYPE_ERROR
            })
        }
        let newProduct = await productDao.createProduct({title,description,stock,price,thumbnail})
        if (newProduct) {
            return res.redirect('http://localhost:8080/products')
        }
     } catch(error){
        next(error)
     }
    }
    updateProduct = async(req,res,next) => {
        try{
            let pid = req.params.pid
            let data = req.body
            let updateProduct = await productDao.updateProduct(pid,data)
            if (updateProduct) {
                return res.json({ status:200,message:'product updated'})
            }
            return res.json({ status:404,message:'not found'})
        } catch(error){
            next(error)
        }
    }
    deleteProduct = async(req,res,next) => {
        try{
            let pid = req.params.pid
            let deleteProduct = await productDao.deleteProduct(pid)
            if (deleteProduct) {
                return res.json({ status:200,message:'product deleted'})
            }
            return res.json({ status:404,message:'not found'})
        } catch(error){
            next(error)
        }
    }
}

export default new ProductController() 