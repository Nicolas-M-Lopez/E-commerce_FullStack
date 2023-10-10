import UserModel from "./models/user.model.js";
import sendMailDelete from "../../middlewares/sendMailDeletedAcc.js";

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
        const user = await UserModel.findById(uid)
        const newRole = user.role == 'user' ? 'premium' : 'user'
        return await UserModel.findOneAndUpdate({_id: uid}, {role: newRole})
    }

    getAll = async() =>{
        return await UserModel.find({}, 'first_name email role documents')
    }

    delete = async()=>{
        const currentTime = new Date()
        const inactiveUsers = await UserModel.find({last_connection: {$lt: new Date(currentTime - 2*24*60*60*1000)}})
        const deletedUsers = await UserModel.deleteMany({last_connection: {$lt: new Date(currentTime - 2*24*60*60*1000)}})
        if(deletedUsers.deletedCount > 0){
            const deletedUserEmails = inactiveUsers.map(user => user.email);
            deletedUserEmails.forEach(async(email)=>{
                await sendMailDelete(email)
            })
            return inactiveUsers
        }
        return []
    }

    deleteBy = async(uid)=>{
        return await UserModel.findByIdAndDelete(uid)
    }
}

export default UserDaoMongo