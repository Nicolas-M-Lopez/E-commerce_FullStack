import { response } from "express";
import UserModel from "./models/user.model.js";
class UserDaoMongo {
    constructor() {
        this.UserModel = UserModel
    }
    update = async(email,password) =>{
        return await UserModel.findOneAndUpdate({email: email}, {password: password}, {new:true})
    }

    get = async(email) =>{
        return await UserModel.findOne({email:email})
    }

    change = async(uid) => {
        console.log(uid)
        const user = await UserModel.findById(uid)
        const newRole = user.role == 'user' ? 'premium' : 'user'
        return await UserModel.findOneAndUpdate({_id: uid}, {role: newRole})
    }
}

export default UserDaoMongo