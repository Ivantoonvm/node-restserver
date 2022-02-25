const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeCategoria, existeProductosporId, existeUsuarioPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();

//Obtener productos 
router.get('/', obtenerProductos);

//Obtener una por id- publico 
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductosporId),
    validarCampos,
],obtenerProducto);

//Crear categoria - privado- cualquier persona con un token valido  
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de de Mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto);

//Actualizar- privado- cualquier persona con un token valido  
router.put('/:id',[
    validarJWT,
    /* check('categoria', 'No es un id de de Mongo').isMongoId(), */
    check('id').custom(existeProductosporId),
    validarCampos
],actualizarProducto);

//delete una categoria - Admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductosporId),
    validarCampos
], borrarProducto);


module.exports =  router;
