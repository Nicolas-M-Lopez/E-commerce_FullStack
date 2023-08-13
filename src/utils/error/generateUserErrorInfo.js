const generateUserErrorInfo = (first_name,last_name,email) =>{
    return `Una o mas propiedades estan incompleto o no es valido.
    *First_name: Debe ser un String, ${first_name}
    *Last_name: Debe ser un String, ${last_name}
    *Email: Debe ser un String, ${email}` 
 }

 export default generateUserErrorInfo