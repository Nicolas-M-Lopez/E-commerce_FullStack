class CartRepository{
    constructor(dao){
        this.dao = dao
    }
    getCarts =async () =>{
        let result = await this.dao.get()
        return result
    }
    getCart =async (cid) =>{
        let result = await this.dao.getById(cid)
        return result
    }
    createCart = async() =>{
        let result = await this.dao.create()
        return result
    }
    updateCart =async (cid,dataProduct,dataUnits) =>{
        let result = await this.dao.update(cid,dataProduct,dataUnits)
        return result
    }
    deleteCart =async (cid,dataProduct,dataUnits) =>{
        let result = await this.dao.delete(cid,dataProduct,dataUnits)
        return result
    }
    purchaseCart = async(cid,tokenEmail) => {
        let result = await this.dao.purchase(cid,tokenEmail)
        return result
    }
    getBill = async(cid) =>{
        let result = await this.dao.getBill(cid)
        return result
    }
}

export default CartRepository