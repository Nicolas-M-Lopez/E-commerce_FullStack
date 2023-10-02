Esta vez vamos a realizar lo siguente: Desde el router de /api/users, crear 2 rutas:
GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)

DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo). Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

    Para realizar la ruta Get, solo debemos utilizar el metodo find con un filtro para que solo muestre nombre, correo y rol de mongoose.
    Para realizar la ruta Delete debemos buscar y eliminar utilizando los meteodos de mongoose (find y deleteMany) donde filtramos por la ultima conexion. En caso que se hayan encontrado y eliminado usuarios, mandaremos un mail utilizando nodemailer para notificar la destruccion de la cuenta. 