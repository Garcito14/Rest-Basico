const {Router}  = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth_controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo' , ' El correo es obligatorio').not().isEmpty(),
    check('correo' , ' El correo no es valido').isEmail(),
    check('pass' , 'La pass es obligatorio').not().isEmpty(),
    validarCampos
],login);



module.exports = router;