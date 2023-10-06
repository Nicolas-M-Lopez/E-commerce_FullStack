import { Router } from "express";

const adm_view_router = Router()

adm_view_router.get('/', async (req,res,next) => {
    try {
        const response = await fetch(`http://localhost:8080/api/auth`)
        const data = await response.json()
        console.log(data)
        return res.render(
            'admin',
            {
                users: data,
                title: "Admnistrador",
            }
            )
    } catch (error) {
        next(error)
    }
})


export default adm_view_router