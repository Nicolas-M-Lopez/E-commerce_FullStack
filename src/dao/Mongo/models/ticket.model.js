import { Schema, model } from "mongoose";

const collection = 'tickets'
const schema = new Schema({
    code: { type: String, unique: true },
    purchase_datetime: { type: Date, default: Date.now },
    amount: { type: Number },
    purchaser: { type: String }
})

const TicketModel = model(collection,schema)
export default TicketModel