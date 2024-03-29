import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from 'passport-github2'
import UserModel from "../dao/Mongo/models/user.model.js";
import jwt from 'passport-jwt'
import config from "./config.js";
import UserDTO from "../dto/user.dto.js";
import CustomError from "../utils/error/customError.js";
import EErrors from "../utils/error/enums.js";
import generateUserErrorInfo from "../utils/error/generateUserErrorInfo.js";
import CartModel from "../dao/Mongo/models/cart.model.js";

const callback = "http://localhost:8080/api/auth/github/callback"

export default function initializePassport(){
    passport.serializeUser(
        (user,done)=> done(null,user._id) //SI existe el usario guarda el id en una sesion
        ) 
    passport.deserializeUser(
        async(id,done)=>{
            const user = await UserModel.findById(id)
            return done(null,user)
        }
    )
    passport.use(  // Estrategia para registrar a un usuario
        'register',
        new Strategy(
            { passReqToCallback:true,usernameField:'email' }, //objeto de configuracion
            async (req,username,password,done) => {
                try {
                    let one = await UserModel.findOne({ email:username })
                    if (one) {
                        return done(null,false)
                    } else {
                        let {first_name,last_name,email,age,password} = req.body
                        if(!first_name || !last_name || !email){

                            CustomError.createError({
                                name: 'Create User Error',
                                cause: generateUserErrorInfo(first_name,last_name,email),
                                message: 'Error al crear el usuario',
                                code: EErrors.INVALID_TYPE_ERROR
                            }) 
                        }
                        let newUser = new UserDTO({first_name,last_name,email,age,password})
                        let user = await UserModel.create(newUser)
                        let newCart = await CartModel.create({productos:[],owner:user._id})
                        await UserModel.findByIdAndUpdate(user._id,{cart_owned: newCart._id})
                        delete user.password        //para el registro no es necesario continuar/inyectar la contraseña a la propeidad user del objeto de requerimientos
                        return done(null,user)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'github',
        new GHStrategy(
            {clientID: config.GH_CLIENT_ID, clientSecret: config.GH_CLIENT_SECRET, callbackURL: callback},
            async(accessToken,refreshToken,profile,done) => {
                try {
                    let one = await UserModel.findOne({email:profile._json.login})
                    if(one){
                        return done(null,one)
                    }
                    let user = await UserModel.create({
                        first_name: profile._json.name,
                        email: profile._json.login,
                        password: 'holas12345',
                        age: 18,
                        role: 'user'
                    })
                    return done(null,user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (username,password,done) => {
                try {
                    let one = await UserModel.findOne({ email:username })
                    if (one) {
                      return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
     
    let cookieExtractor = req => {
        let token = null
        if (req && req.cookies) {
            token = req.cookies['token'] // nombre del campo de cookie donde esta el token
        }
        return token
    }
    passport.use(   //estrategia para jwt (SOLO SIRVE PARA AUTENTIAR USUARIOS)
    'jwt',
    new jwt.Strategy( 
        {secretOrKey: config.SECRET_COOKIE, jwtFromRequest:jwt.ExtractJwt.fromExtractors([cookieExtractor])},
        async(jwt_payload,done)=>{
            try {
                return done(null,jwt_payload)
            } catch (error) {
                done(error)
            }
        }
    )
)
}

