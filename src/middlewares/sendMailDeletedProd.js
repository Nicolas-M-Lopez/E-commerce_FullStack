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

let sendMailDeleteProd = async(email,product) =>{
    return await transport.sendMail({
        from: 'Commerce <nicolasmlopez00@gmail.com>',
        to: email,
        subject: "Eliminacion de Producto",
        html:`<h1>Su producto ${product} fue eliminado de la aplicacion</h1>`
    })
}

export default sendMailDeleteProd