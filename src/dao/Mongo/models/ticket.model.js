import { Schema, model,Types } from "mongoose";

const collection = 'tickets'
const schema = new Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String },
    productos: [{
        productId: {type:Types.ObjectId,required:true,ref:'products' },
        quantity: {type: Number, required:true}
    }]
})

const TicketModel = model(collection,schema)
export default TicketModel