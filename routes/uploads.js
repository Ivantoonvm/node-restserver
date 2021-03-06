const { check } = require('express-validator');
const { Router } = require('express');

const { validarCampos,validarArchivoSubir } = require('../middlewares');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCoudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');





const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','EL id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],actualizarImagenCoudinary /*actualizarImagen*/);

router.get('/:coleccion/:id',[
    check('id','EL id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c=> coleccionesPermitidas(c,['usuarios','productos'])),
    validarCampos
],mostrarImagen);


module.exports = router;