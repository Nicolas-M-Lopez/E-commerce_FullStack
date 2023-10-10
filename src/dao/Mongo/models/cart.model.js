import { model,Schema,Types } from 'mongoose'
let collection = 'carts'
let schema = new Schema({
    owner: {type:String},
    productos: [{
        productId: {type:Types.ObjectId,required:true,ref:'products' },
        quantity: {type: Number, required:true}
    }]
       
})


let CartModel = model(collection,schema)
export default CartModel