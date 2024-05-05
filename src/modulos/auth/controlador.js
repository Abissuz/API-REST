//si presenta errores puede ser a que uso palbras como "password" y en la bdd es clave?
const bcrypt = require('bcrypt');
const auth = require('../../auth');
const TABLA = 'auth';
module.exports = function (dbInyectada){

let db = dbInyectada;

if(!db){
    db = require('../../DB/mysql');
}

async function login (usuario, password){
    //se consulta con el nombre de usuario
    const data = await db.query(TABLA, {usuario: usuario});
    return bcrypt.compare(password, data.password)
        .then(resultado => {
            if(resultado === true){
                //generar un token
                return auth.asignarToken({...data})
            }else{
                //error
                throw new Error('Informacion.');
            }
        })
}
async function agregar (data){

        const authDATA = {
            id: data.id,
        }
        if(data.usuario){
            authDATA.usuario = data.usuario;
        }

        if(data.password){
            authDATA.password = await bcrypt.hash(data.password.toString(), 5);
        }
        return db.agregar(TABLA, authDATA);
    }

    return{
        agregar,
        login
    }
}