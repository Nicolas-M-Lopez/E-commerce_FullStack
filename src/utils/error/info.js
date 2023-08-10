 const generateProductErrorInfo = (title,stock,price,description) =>{
    return `Una o mas propiedades estan incompleto o no es valido.
    *Title: Debe ser un String, ${title}
    *Description: Debe ser un String, ${description}
    *Price: Debe ser un Number, ${price}
    *Stock: Debe ser un Number, ${stock}` 
 }

 export default generateProductErrorInfo