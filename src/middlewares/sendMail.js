import nodemailer from 'nodemailer'
import config from '../config/config.js'

const transport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: config.GM_USER,
        pass: config.GM_PASS
    }
})

let sendMail = async(ticketData) =>{
    let productsHTML = '';
    ticketData.productos.forEach(product => {
        productsHTML += `<h2>${product.title}</h2><h2>${product.quantity}</h2>`;
    })
    return await transport.sendMail({
        from: 'Commerce <nicolasmlopez00@gmail.com>',
        to: `${ticketData.purchaser}`,
        subject: 'Compra en Commerce',
        html:`<h1>Su compra se realizo con exito</h1>
        <div>
            <h2>${productsHTML}</h2>
            <h3>$${ticketData.amount}USD</h3>
            <h5>Codigo del ticket: ${ticketData.code}</h5>
        </div>`
    })
}

export default sendMail