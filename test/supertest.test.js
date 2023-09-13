import chai from "chai";
import supertest from "supertest";


const expect = chai.expect
const requester = supertest('http://localhost:8080')

describe('Testing DAO Products', function(){
    it('El endpoint Post /api/products debe crear un producto correctamente', async function(){
        const productMock = {
            title: 'pruebaasd',
            description: 'pruebas',
            stock: 1,
            price: 10
        }
        const {ok, statusCode, _body} = await requester.post('/api/products').send(productMock)
        expect(statusCode).to.be.equal(200)
    })
    it('El endpoint Get /api/products debe traer todos los productos', async function(){
        const {ok, statusCode, _body} = await requester.get('/api/products')
        expect(statusCode).to.be.equal(200)
        expect(_body).to.have.property("products")    
    })
    it('El endpoint Get /api/products/pid debe traer un producto correctamente a traves de un id', async function(){
        let pid = '646d499a7c5f3e404e2b91cd'
        const {ok, statusCode, _body} = await requester.get(`/api/products/${pid}`)
        expect(_body.one).to.have.property("_id")
        expect(_body.one._id).to.equal(pid)
    })
})