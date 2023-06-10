import mongoose from 'mongoose';
const {Schema, model} = mongoose

let collection = 'products'
let schema = new Schema({
    title: { type:String,required:true, unique:true },
    description: { type:String,required:true },
    stock: { type:Number,required:true },
    price: { type:Number,required:true },
    thumbnail: { type:String,required:true }
})

let Product = model(collection,schema)
export default Product