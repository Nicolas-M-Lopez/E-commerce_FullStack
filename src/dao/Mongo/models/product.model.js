import mongoose from 'mongoose';
const {Schema, model} = mongoose
import mongoosePaginate from 'mongoose-paginate-v2'

let collection = 'products'
let schema = new Schema({
    title: { type:String,required:true, unique:true, index:true},
    description: { type:String,required:true },
    stock: { type:Number,required:true },
    price: { type:Number,required:true },
    thumbnail: { type:String },
    owner:{type:String, default: 'admin'}
})

schema.plugin(mongoosePaginate)
let ProductModel = model(collection,schema)
export default ProductModel