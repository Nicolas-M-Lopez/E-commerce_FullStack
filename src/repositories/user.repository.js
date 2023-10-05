class UserRepository{
    constructor(dao){
        this.dao = dao
    }
    updatePass =async (email,password) =>{
        let result = await this.dao.update(email,password)
        return result
    }
    getUser = async(email)=>{
        let result = await this.dao.get(email)
        return result
    }
    changeRole = async(uid) =>{
        let result = await this.dao.change(uid)
        return result
    }
    getUsers = async()=>{
        let result = await this.dao.getAll()
        console.log(result)
        return result
    }

    deleteUsers = async()=>{
        let result = await this.dao.delete()
        return result
    }

    deleteUser = async(uid)=>{
        let result = await this.dao.deleteBy(uid)
        return result
    }
}

export default UserRepository