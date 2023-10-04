import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import UserDTO from '../dto/user.dto.js'
import { logger } from '../config/logger.js'
import UserModel from '../dao/Mongo/models/user.model.js'
import { userService } from '../services/index.js'

const userDao = userService

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

    sigIn = async (req,res)=> {
        let user = {
            email: req.body.email,
            role: req.user.role,
            _id: req.user._id
        }
        let token = jwt.sign(user, config.SECRET_COOKIE, { expiresIn:60*60*24 })
        console.log(req.user._id)
        await UserModel.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
        logger.info(token)
        res.cookie('token',token).send({token})
}

    failSignIn = (req,res)=> res.status(400).json({
        success: false,
        message: 'error sign in'
    })

    signOut = async(req,res)=>{
        await UserModel.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
        res.status(200).clearCookie('token').json({
        success: true,
        message: 'user signed out!'
    })
}
    current = (req, res) => {
        let user = new UserDTO({email: req.user.email})
        logger.info(user)
        res.json({ user })
    }

    getAllUsers = async(req,res) =>{
        return res.json(await userDao.getUsers())
    }

    deleteUsers = async(req,res) => {
        userDao.deleteUsers()
        return res.json('All inactive users have been deleted')
    }
}

export default new UserController()