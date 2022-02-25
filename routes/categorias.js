const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');


const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router();


//Obtener todas categorias - publico 
router.get('/', obtenerCategorias);

//Obtener una por id- publico 
router.get('/:id',[
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos,
],obtenerCategoria);

//Crear categoria - privado- cualquier persona con un token valido  
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Actualizar- privado- cualquier persona con un token valido  
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],actualizarCategoria);

//delete una categoria - Admin 
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategoria);


module.exports = router;