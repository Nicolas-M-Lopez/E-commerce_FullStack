import { Router } from "express";
import validator from "../../middlewares/validator.js";
import pass_is_8 from "../../middlewares/pass_is_8.js";
import login_validator from "../../middlewares/login_validator.js";
import create_hash from "../../middlewares/create_hash.js";
import is_valid_password from "../../middlewares/is_valid_password.js";
import passport from "passport";
import passport_call from "../../middlewares/passport_call.js";
import authorizationJwt from "../../middlewares/authorizationJwt.js";
import userController from "../../controllers/user.controller.js";
import { userService } from "../../services/index.js";
import uploader from "../../middlewares/multer.js";
import checkAndUpgradeToPremium from "../../middlewares/checkFiles.js";

const auth_router = Router()

auth_router.post('/register', validator, pass_is_8, create_hash, passport.authenticate(
    'register',
    { failureRedirect: '/api/auth/fail-register' } //objeto de configuracion de la ruta de redireccionamiento en caso de error
    ), userController.register)

auth_router.get('/fail-register', userController.failRegister)


auth_router.get('/github', passport.authenticate('github', {scope: ['user:email']}), userController.github)

auth_router.get('/github/callback',passport.authenticate('github', {failureRedirect: '/api/auth/fail-register-github'}), userController.githubCall)

auth_router.get('/fail-register-github', userController.failGithub)

auth_router.post('/signin', login_validator, pass_is_8, passport.authenticate('signin', {failureRedirect: '/api/auth/fail-signin'}), is_valid_password, userController.sigIn)                 

auth_router.get('/fail-signin', userController.failSignIn)

auth_router.post('/signout', passport_call('jwt', {session:false}), userController.signOut)
          
auth_router.get('/current',passport_call('jwt'),authorizationJwt('admin'), userController.current);
          
auth_router.get('/premium/:uid',checkAndUpgradeToPremium,async(req,res,next)=>{
    try {
        const uid = req.params.uid
        const changeRoles = await userService.changeRole(uid)
        return res.status(200).json({message: "Rol cambiado"})
    } catch (error) {
        next(error)
    }
})

auth_router.post('/:uid/documents', uploader.any(), (req,res,next) => {
    try {
        res.json({message: 'exito'})
    } catch (error) {
        next(error)
    }  
})

export default auth_router