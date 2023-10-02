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

let sendMailDelete = async(email) =>{
    return await transport.sendMail({
        from: 'Commerce <nicolasmlopez00@gmail.com>',
        to: email,
        subject: "Eliminacion de Cuenta",
        html:`<h1>Su cuenta de Ecommerce Autos se ha eliminado por inactividad</h1>`
    })
}

export default sendMailDelete