import ProductModel from "./models/product.model.js"
class ProductDaoMongo {
    constructor() {
        this.ProductModel = ProductModel
    }
    
    get = async(page,limit,titleRegex) =>{
        return await ProductModel.paginate({title: titleRegex}, {limit, page})
    }
    getById = async(pid) =>{
        return await ProductModel.findById(pid)
    }
    create = async(data) =>{
        return await ProductModel.create(data)
    }
    update = async(pid,data) =>{
        return await ProductModel.findByIdAndUpdate(pid, data, {new:true})
    }
    delete = async(pid) =>{
        return await ProductModel.findByIdAndDelete(pid)
    }
}

export default ProductDaoMongo