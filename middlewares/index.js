const  validarCampos  = require('../middlewares/validar-campos');
const  validarJWT  = require('../middlewares/validar_jwt');
const   tieneRole  = require('../middlewares/validar_roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRole
}