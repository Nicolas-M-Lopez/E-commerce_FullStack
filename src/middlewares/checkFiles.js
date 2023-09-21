import fs from 'fs';
import path from 'path';
import UserModel from '../dao/Mongo/models/user.model.js';

const checkAndUpgradeToPremium = async (req, res, next) => {
  const uid = req.params.uid;
  const documentFolder = path.join(`D:\\Coderhouse\\Curso Backend\\Primer Entrega\\Practica-Server\\public\\documents\\document\\${uid}`);
  const user = await UserModel.findById(uid);
  const requiredDocuments = ['identificacion.txt', 'domicilio.txt', 'estado_cuenta.txt'];
  const filesInFolder = fs.readdirSync(documentFolder);
  const requiredFilesPresent = requiredDocuments.filter((doc) => filesInFolder.includes(doc));
  user.documents.splice(0, user.documents.length);
  requiredFilesPresent.forEach((filename) => {
    user.documents.push({ name: filename, reference: `Ruta al archivo ${filename}` });
  });

  await user.save();
if(requiredDocuments.length != user.documents.length){
    return res.status(400).json({ error: 'Faltan documentos requeridos' });
}
  next()
};

export default checkAndUpgradeToPremium;
