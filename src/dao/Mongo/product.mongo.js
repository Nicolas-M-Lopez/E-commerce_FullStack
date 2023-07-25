import { response } from "express";
import ProductModel from "./models/product.model.js"
class ProductDaoMongo {
    constructor() {
        this.ProductModel = ProductModel
    }
    
    getProducts = async(page,limit,titleRegex) =>{
        return await ProductModel.paginate({title: titleRegex}, {limit, page})
    }
    getProduct = async(pid) =>{
        return await ProductModel.findById(pid)
    }
    createProduct = async(data) =>{
        return await ProductModel.create(data)
    }
    updateProduct = async(pid,data) =>{
        return await ProductModel.findByIdAndUpdate(pid, data, {new:true})
    }
    deleteProduct = async(pid) =>{
        return await ProductModel.findByIdAndDelete(pid)
    }
}

export default ProductDaoMongo