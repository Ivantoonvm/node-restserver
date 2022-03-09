
const dbVAlidators = require('./db-validators');
const generarJWT   = require('./generar-jwt');
const googleVerify = require('./google-verify');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbVAlidators,
    ...generarJWT, 
    ...googleVerify,
    ...subirArchivo,



}