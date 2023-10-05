import multer from 'multer'
import fs from 'fs'
import UserModel from '../dao/Mongo/models/user.model.js'
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

const uploadDocuments = async (req, res, next) => {
    try {
      const uid = req.params.uid;
      const uploadedFiles = req.files.filter(file => file.fieldname == 'document'); // Filtrar archivos por fieldname "Document"
      const user = await UserModel.findById(uid);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const existingDocumentNames = user.documents.map(doc => doc.name);
      const newFiles = uploadedFiles.filter(file => !existingDocumentNames.includes(file.originalname));
  
      // Guardar los documentos en la base de datos
      newFiles.forEach(async (filename) => {
        console.log(filename)
        const document = {
          name: filename.originalname,
          reference: `Ruta al archivo ${filename.originalname}`
        };
        console.log(document)
        user.documents.push(document);
      });
  
      // Guardar el usuario actualizado en la base de datos
      await user.save();
  
      return res.status(200).json({ message: 'Documentos subidos y guardados en la base de datos.' });
    } catch (error) {
      console.error('Error al subir documentos y guardar en la base de datos:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  };

export {uploader, uploadDocuments}