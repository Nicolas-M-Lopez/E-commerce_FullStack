import fs from 'fs'
import product from './ProductManager.js'

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.init(path);
  }

  init(path) {
    let file = fs.existsSync(path);

    if (!file) {
      fs.writeFileSync(path, '[]');
      console.log('file created at path: ' + this.path);
      return 'file created at path: ' + this.path;
    } else {
      this.carts = JSON.parse(fs.readFileSync(path, 'UTF-8'));
      console.log('Datos recuperados');
      return 'Datos recuperados';
    }
  }

  async update(cartId, productId, units) {
    try {
      console.log("entre al cart update")
      let cartExistente = this.get(cartId)
      if(cartExistente){
        console.log(Number(productId))
        let producto = product.get(productId)
        console.log(units)
      if(units <= producto.stock){
        let updateStock = producto.stock - units
        await product.update(productId, {stock:updateStock})
        if(!cartExistente.productos){
          cartExistente.productos = [];
        }
        let productoExistente = cartExistente.productos.find(p => p.title === producto.title)
        if(productoExistente){
          productoExistente.quantity += units
          let data_json = JSON.stringify(this.carts, null, 2)
        await fs.promises.writeFile(this.path, data_json)
        return 200
        } else {
          let newProduct = {
            idProducto: producto.id,
            title: producto.title,
            quantity: units
          }
          console.log(newProduct.id)
          cartExistente.productos.push(newProduct)
          let data_json = JSON.stringify(this.carts, null, 2)
          await fs.promises.writeFile(this.path, data_json)
          return 200
        }
       
      } else{
        return 'No hay suficiente stock'
      }
      }
      
    } catch (error) {
      return 'Error: Creating cart';
    }
  }  

 async create(){
  console.log("entre al cart add")
    let data = {productos:[]}
    if (this.carts.length>0) {
      let next_id = this.carts[this.carts.length-1].id+1
      data.id = next_id
  } else {
      data.id = 1
  }  
    this.carts.push(data)
    let data_json = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, data_json);
      console.log('cart id created: ' + data.id);
      return 201
  }

  get(){
    console.log("entre al cart get")
    try{
      if (this.carts === []){
        console.log('Not found')
        return 'Not found'
      } else{
        console.log(this.carts)
        return this.carts
      }
      
    } catch(error){
      console.log('Error al buscar carritos')
      return 'Error al buscar carritos'
    }
  }

  getById(cid){
    console.log("entre al cart get ID")

    try{
      const cartExistente = this.carts.find(cart => cart.id === cid)
      if(cartExistente){
        return cartExistente
      }else{
        return console.log('Cart Not found')
      }
    } catch (error){
      return 'Error al buscar el carrito'
    }  
  } 

  async delete(cId,pId,units){
    console.log("entre al cart delete")

    let cartExistente = this.getById(cId)
    if(cartExistente){
      let productInCart = this.getProductInCartById(cId, pId)
      if(productInCart){
        let producto = product.getById(pId)
        if (units === productInCart.quantity) {
          let updateStock = producto.stock + units
          await product.update(pId, {stock:updateStock})
          cartExistente.productos = cartExistente.productos.filter((p) => p.idProducto !== pId)
          let data_json = JSON.stringify(this.carts, null, 2);
          await fs.promises.writeFile(this.path, data_json);
          return 200   
        } else if(units < productInCart.quantity){
          let updateStock = producto.stock + units
          productInCart.quantity -= units
          console.log(productInCart)
          await product.update(pId, {stock:updateStock})
          let data_json = JSON.stringify(this.carts, null, 2);
          await fs.promises.writeFile(this.path, data_json);
          return 200
        }
      }
    }
  }

  getProductInCartById(cartId, productId) {
    console.log("entre al cart get Product in Cart")

    const cart = this.getById(cartId)
    if (cart && cart.productos) {
      const productInCart = cart.productos.find(p => p.idProducto === productId)
      if (productInCart) {
        return productInCart
      }
    } else{
      console.log('Product not found in cart')
      return 'Product not found in cart'
    }
  }
  
}
let cart = new CartManager('./src/data/carts.json')

export default cart
