import { productService } from "../services/index.js"

export default (roles)=>{
    return async(req,res,next)=>{
        if(!req.user) return res.status(401).json({status: 'error', error: 'Unauthorized'})
        if(!roles.includes(req.user.role)) return res.status(403).json({status:'error', error: 'Not permissions'})
        if(req.user.email != productService.getProduct(req.params.pid).owner && req.user.role != 'admin') return res.status(403).json({status:'error', error: 'Not allow'})
        next()
    }}