import { connect } from "mongoose";
import UserDaoMongo from "../src/dao/Mongo/user.mongo.js";
import Assert from 'assert'

connect('mongodb+srv://nicolas:nicolas1@clusterpersonal.79mepts.mongodb.net/commerce')

const assert = Assert.strict

describe('Testing user Dao', () => {
    before(function(){
        this.userDao = new UserDaoMongo()
    })
    beforeEach(function(){
        this.timeout(2000)
    })
    it('Nuestro Dao de Users debe obtener un solo usuario que indiquemos por mail', async function(){
        const result = await this.userDao.get('nicolasmlopez00@gmail.com')
        assert.strictEqual(typeof result, 'object')
    })
    it('Nuestro Dao de Users debe cambiar el rol del usuario que indiquemos por ID', async function(){
        const result = await this.userDao.change('64c7fb08823acaf38eaee3dd')
        assert.strictEqual(typeof result, 'object')
    })
    it('Nuestro Dao de Users debe cambiar las contraseña del usuario que indiquemos por email', async function(){
        const result = await this.userDao.update('nicolasmlopez00@gmail.com', 'nicolas123')
        assert.strictEqual(typeof result, 'object')   
    })
})