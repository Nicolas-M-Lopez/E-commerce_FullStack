import { connect } from "mongoose";
import CartDaoMongo from "../src/dao/Mongo/cart.mongo.js"
import chai from "chai";

connect('mongodb+srv://nicolas:nicolas1@clusterpersonal.79mepts.mongodb.net/commerce')

const expect = chai.expect

describe('Testing Cart Dao', () => {
    before(function(){
        this.cartDao = new CartDaoMongo()
    })
    beforeEach(function(){
        this.timeout(2000)
    })
    it('Nuestro Dao de Cart debe obtener todos los carritos', async function(){
        const result = await this.cartDao.get()
        expect(Array.isArray(result)).to.be.ok
    })
    it('Nuestro Dao de Cart debe obtener un solo carrito que indiquemos por ID', async function(){
        const result = await this.cartDao.getById("6480e25e369065f0073640e0")
        expect(result).to.not.eql([])
    })
    it('Nuestro Dao de Cart debe crear un carrito vacio', async function(){
        const result = await this.cartDao.create()
        expect(result).to.have.property('productos')   
    })
})