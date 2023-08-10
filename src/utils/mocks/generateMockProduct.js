import { faker } from "@faker-js/faker"

let generateMockProduct = () =>{
    let numProductos = parseInt(faker.string.numeric(1,{bannedDigits:['0']}))
    let products = []
    for(let i = 0; i < numProductos; i++){
        products.push({ 
        title: faker.vehicle.model(),
        manufacturer: faker.vehicle.manufacturer(),
        type: faker.vehicle.type(),
        stock: parseInt(faker.string.numeric()),
        id: faker.database.mongodbObjectId()
    })
    }
    return products
}

export default generateMockProduct