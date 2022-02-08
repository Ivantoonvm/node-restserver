const Role = require('../models/rol');
const Usuario = require('../models/usuario'); 

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailExiste = async (correo = ' ') => {
     //Verificar si el correo existe
     const existeEmail = await Usuario.findOne({correo});
     if(existeEmail){
         throw new Error(`El correo ${correo} ya esta registrado`)
     }
}

const existeUsuarioPorId = async (id) => {
    //Verificar si el id existe 
    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario con el  ${id} no existe`)
    }
}

module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}