import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import UserDTO from '../dto/user.dto.js'
import { logger } from '../config/logger.js'

class UserController{
    register = (req,res) => res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
    })

    failRegister = (req,res)=> res.status(400).json({
        success: false,
        message: 'Error al registrar el usuario'
    })

    github = (req,res) => {}

    githubCall = (req,res)=> {
        req.session.email = req.user
        return res.redirect('/')
    }

    failGithub = (req,res) => res.status(403).json({
        success: false,
        message: 'No Auth'
    })

    sigIn = (req,res)=> {
        let user = {
            email: req.body.email,
            role: req.user.role
        }
        let token = jwt.sign(user, config.SECRET_COOKIE, { expiresIn:60*60*24 })
        logger.info(token)
        res.cookie('token',token).send({token})
}

    failSignIn = (req,res)=> res.status(400).json({
        success: false,
        message: 'error sign in'
    })

    signOut = (req,res)=>{
        return res.status(200).clearCookie('token').json({
        success: true,
        message: 'user signed out!'
    })
}
    current = (req, res) => {
        let user = new UserDTO({email: req.user.email})
        logger.info(user)
        res.json({ user })
    }
}

export default new UserController()