import { Router } from "express";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";

const profile_view_router = Router()

profile_view_router.get('/:email', passport_call('jwt'),authorizationJwt(['admin','premium','user']),async (req,res,next) => {
    try {
        const userActive = req.cookies.token
        const cartUser = req.user.email
        const email = req.user.email
        const response = await fetch(`http://localhost:8080/api/auth/${email}`)
        const data = await response.json()
        return res.render('profile', {
            title: "Perfil",
            usuario: data,
            cartUser,
            userActive
        })
    } catch (error) {
        next(error)
    }
})

export default profile_view_router