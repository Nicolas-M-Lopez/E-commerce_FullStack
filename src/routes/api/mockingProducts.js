import { Router } from "express";
import generateMockProduct from "../../utils/mocks/generateMockProduct.js";

let mocking_router = Router()

mocking_router.get('/',async(req,res,next)=>{
    try {
        let products = []
        for(let i = 0; i < 100; i++){
            products.push(generateMockProduct())
        }
        res.json({
            success: true,
            payload: products
        })
    } catch (error) {
        next(error)
    }
})

export default mocking_router