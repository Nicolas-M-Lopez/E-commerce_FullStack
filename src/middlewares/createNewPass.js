import nodemailer from 'nodemailer'
import config from '../config/config.js'
import  jwt  from 'jsonwebtoken'

const tokenPass = (email) => { return jwt.sign(
    { email:email },
    config.SECRET_COOKIE,
    { expiresIn:60 * 60 }
)}

const transport = nodemailer.createTransport({
    service:'gmail',
    port: 587,
    auth:{
        user: config.GM_USER,
        pass: config.GM_PASS
    }
})

const sendNewPass = (email) =>{
    const token = tokenPass(email)
    const mailOptions = {
        from: 'Commerce <nicolasmlopez00@gmail.com>',
        to: `${email}`,
        subject: 'Restablecer contraseña',
        html:`<h1>Ingrese al link para poder realizar el cambio de contraseña</h1>
        <div>
            <a href="http://localhost:8080/api/resetPassword/${token}">Restablecer contraseña</a>
        </div>`
    }

    return transport.sendMail(mailOptions)
}


export default sendNewPass

