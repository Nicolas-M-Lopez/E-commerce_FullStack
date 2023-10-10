import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";

const home_view_router = Router()

home_view_router.get('/',async(req,res,next) => {
    try {
        const userActive = req.cookies.token
        const home = true
        return res.render('home', {
          userActive,
          home
        })
    } catch (error) {
      next(error)  
    }
})

export default home_view_router