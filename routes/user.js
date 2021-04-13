
const {Router}  = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete } = require('../controllers/user_controller');
const { RoleValido, emailExiste, existeUsuario } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/',usuarioGet)
  router.put('/:id',[
      check('id', 'no es un id valido').isMongoId(),
      check('id').custom(existeUsuario),
      check('role').custom(RoleValido),
      validarCampos
  ] ,usuarioPut)
  router.post('/',
  [
    check('correo', 'el correo no es valido').isEmail(),
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('pass', 'el pass es obligatorio ').not().isEmpty(),
    check('pass', 'la pass debe tener  mas de  6 letras').isLength({min:6}),
    //check('role', 'no es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(emailExiste),
    check('role').custom(RoleValido),
    validarCampos
  ]
  ,usuarioPost)
  router.delete('/:id', 
  [
    check('id', 'no es un id valido').isMongoId(),
    check('id').custom(existeUsuario),
    validarCampos,
  ],usuarioDelete)





module.exports = router;