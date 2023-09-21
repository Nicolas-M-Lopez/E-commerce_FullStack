import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const uid = req.params.uid
        const fieldname = file.fieldname
        console.log(fieldname)
        const destination =`D:\\Coderhouse\\Curso Backend\\Primer Entrega\\Practica-Server\\public\\documents\\${fieldname}\\${uid}`
        fs.mkdirSync(destination, {recursive:true})
        cb(null,destination)
    },
    filename: (req,file,cb) => cb(null,`${file.originalname}`)
})

const uploader = multer({storage})

export default uploader