class ProductRepository{
    constructor(dao){
        this.dao = dao
    }
    getProducts =async (page,limit,titleRegex) =>{
        let result = await this.dao.get(page,limit,titleRegex)
        return result
    }
    getProduct =async (pid) =>{
        let result = await this.dao.getById(pid)
        return result
    }
    createProduct = async(data) =>{
        let result = await this.dao.create(data)
        return result
    }
    updateProduct =async (pid,data) =>{
        let result = await this.dao.update(pid,data)
        return result
    }
    deleteProduct =async (pid) =>{
        let result = await this.dao.delete(pid)
        return result
    }
}

export default ProductRepository