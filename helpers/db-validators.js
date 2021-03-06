const { Categoria, Producto } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la BD`);
    }
}

const emailExiste = async( correo = '' ) => {

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    }
}

const existeUsuarioPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await Usuario.findById(id);
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

//validaror de categorias 

const existeCategoria = async(id) =>{

    //verificar si existe categoria
    const existeCategoria = await Categoria.findById(id);
    if(!existeCategoria){
        throw new Error(`El id no existe ${id}`)
    }
}

//Productos

const existeProductosporId = async(id) =>{

    //verificar si existe categoria
    const existeProducto = await Producto.findById(id);
    if(!existeProducto){
        throw new Error(`El id no existe ${id}`)
    }
}

//Colecciones validar 

const coleccionesPermitidas = (coleccion = ' ', colecciones = [])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error (`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProductosporId,
    coleccionesPermitidas
}

